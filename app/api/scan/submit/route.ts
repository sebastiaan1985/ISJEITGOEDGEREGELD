import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { renderToBuffer } from "@react-pdf/renderer";
import { buildScanSummary } from "@/lib/cloud1OfferMapping";
import { classify, LEAD_LABEL } from "@/lib/leadRouting";
import { ReportDocument } from "@/lib/pdf/ReportDocument";
import { INDUSTRIES, M365_BUCKETS, SIZE_BUCKETS } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

// ---------------------------------------------------------------------------
// Rate limiting (Upstash Redis — skipped gracefully when env vars are absent)
// ---------------------------------------------------------------------------
async function checkRateLimit(ip: string): Promise<{ allowed: boolean }> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return { allowed: true };

  try {
    const { Ratelimit } = await import("@upstash/ratelimit");
    const { Redis } = await import("@upstash/redis");
    const redis = new Redis({ url, token });
    // 5 requests per IP per 10 minutes
    const ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "10 m"),
      prefix: "scan:submit",
    });
    const { success } = await ratelimit.limit(ip);
    return { allowed: success };
  } catch {
    return { allowed: true };
  }
}

// ---------------------------------------------------------------------------
// Validation schemas
// ---------------------------------------------------------------------------
const intakeSchema = z.object({
  firstName: z.string().min(2),
  company: z.string().min(2),
  industry: z.enum(INDUSTRIES),
  size: z.enum(SIZE_BUCKETS),
  m365Users: z.enum(M365_BUCKETS),
  email: z.email(),
  phone: z.string().optional(),
});

const bodySchema = z.object({
  scanType: z.literal("it-health").default("it-health"),
  intent: z.enum(["lead-capture", "send-report"]).default("send-report"),
  intake: intakeSchema,
  answers: z.array(z.number().min(0).max(100)).length(24),
  scores: z.object({
    total: z.number().min(0).max(100),
    perCategory: z.tuple([z.number(), z.number(), z.number(), z.number()]),
  }),
});

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------
export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const { allowed } = await checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let payload: z.infer<typeof bodySchema>;
  try {
    const json = await req.json();
    payload = bodySchema.parse(json);
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const leadType = classify(payload.intake);
  const summary = buildScanSummary(payload.answers, payload.scores);
  const storage = await storeLead(payload, summary, leadType);
  const notification = await sendLeadNotification(payload, summary, leadType, storage.leadId);

  return NextResponse.json({
    ok: true,
    mailSent: notification.sent,
    leadType,
    stored: storage.stored,
    leadId: storage.leadId,
    storageError: storage.error,
    notificationError: notification.error,
    topPriorities: summary.topPriorities,
    packageAdvice: summary.packageAdvice,
  });
}

// ---------------------------------------------------------------------------
// Lead storage
// ---------------------------------------------------------------------------
async function storeLead(
  payload: z.infer<typeof bodySchema>,
  summary: ReturnType<typeof buildScanSummary>,
  leadType: ReturnType<typeof classify>,
): Promise<{ stored: boolean; leadId?: string; error?: string }> {
  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    console.warn("Supabase is not configured - lead storage skipped.");
    return { stored: false, error: "supabase_not_configured" };
  }

  const record = {
    scan_type: payload.scanType,
    lead_type: leadType,
    first_name: payload.intake.firstName,
    company: payload.intake.company,
    industry: payload.intake.industry,
    company_size: payload.intake.size,
    m365_users: payload.intake.m365Users,
    email: payload.intake.email,
    phone: payload.intake.phone || null,
    total_score: payload.scores.total,
    category_scores: payload.scores.perCategory,
    weakest_categories: summary.weakestCategories,
    top_priorities: summary.topPriorities.map((item) => ({
      id: item.id,
      category: item.category,
      question: item.question,
      score: item.score,
      priority: item.priority,
      consequence: item.consequence,
      betterSetup: item.betterSetup,
      cloud1Fit: item.cloud1Fit,
    })),
    package_advice: summary.packageAdvice,
    report_status: "download_started",
    source: "cloud1-it-scan",
  };

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/scan_leads`, {
      method: "POST",
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(record),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Supabase lead insert failed", errorText);
      return { stored: false, error: "supabase_insert_failed" };
    }

    const rows = (await response.json()) as Array<{ id?: string }>;
    return { stored: true, leadId: rows[0]?.id };
  } catch (err) {
    console.error("Supabase lead insert failed", err);
    return { stored: false, error: "supabase_request_failed" };
  }
}

// ---------------------------------------------------------------------------
// Lead notification email
// ---------------------------------------------------------------------------
async function sendLeadNotification(
  payload: z.infer<typeof bodySchema>,
  summary: ReturnType<typeof buildScanSummary>,
  leadType: ReturnType<typeof classify>,
  leadId?: string,
): Promise<{ sent: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const toAddress = process.env.LEAD_NOTIFICATION_EMAIL;
  const fromAddress = process.env.MAIL_FROM || "Cloud ÉÉN IT-Scan <onboarding@resend.dev>";

  if (!apiKey || !toAddress) {
    return { sent: false, error: "mail_not_configured" };
  }

  try {
    const resend = new Resend(apiKey);
    const pdfBuffer = await renderToBuffer(
      ReportDocument({ intake: payload.intake, answers: payload.answers, scores: payload.scores }),
    );
    const filename = `Cloud-EEN-IT-Scan-${payload.intake.company.replace(/[^a-z0-9]/gi, "-")}.pdf`;

    await resend.emails.send({
      from: fromAddress,
      to: toAddress,
      subject: `[Cloud ÉÉN IT-Scan] ${payload.intake.company} - score ${payload.scores.total}/100`,
      html: buildSalesEmail(payload, summary, leadType, leadId),
      attachments: [{ filename, content: pdfBuffer.toString("base64") }],
    });

    return { sent: true };
  } catch (err) {
    console.error("Lead notification failed", err);
    return { sent: false, error: "mail_send_failed" };
  }
}

// ---------------------------------------------------------------------------
// Email HTML builder
// ---------------------------------------------------------------------------
function buildSalesEmail(
  payload: z.infer<typeof bodySchema>,
  summary: ReturnType<typeof buildScanSummary>,
  leadType: ReturnType<typeof classify>,
  leadId?: string,
): string {
  const topPriorities = summary.topPriorities
    .map(
      (item) => `
        <li style="margin-bottom:12px">
          <strong>${escapeHtml(item.category)} (${item.score}/100)</strong><br/>
          ${escapeHtml(item.question)}<br/>
          <span style="color:#475569">${escapeHtml(item.betterSetup)}</span>
        </li>
      `,
    )
    .join("");

  const weakestCategories = summary.weakestCategories
    .map((item) => `<li><strong>${escapeHtml(item.name)}:</strong> ${item.score}/100</li>`)
    .join("");

  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:#0f172a;line-height:1.5;max-width:680px">
      <h2 style="color:#13AEEB;margin:0 0 8px">Nieuwe Cloud ÉÉN IT-Scan lead</h2>
      <p style="margin:0 0 18px;color:#475569">Leadtype: ${escapeHtml(LEAD_LABEL[leadType])}</p>

      <h3>Contact</h3>
      <ul>
        <li><strong>Naam:</strong> ${escapeHtml(payload.intake.firstName)}</li>
        <li><strong>Bedrijf:</strong> ${escapeHtml(payload.intake.company)}</li>
        <li><strong>E-mail:</strong> ${escapeHtml(payload.intake.email)}</li>
        ${payload.intake.phone ? `<li><strong>Telefoon:</strong> ${escapeHtml(payload.intake.phone)}</li>` : ""}
        <li><strong>Branche:</strong> ${escapeHtml(payload.intake.industry)}</li>
        <li><strong>Grootte:</strong> ${escapeHtml(payload.intake.size)}</li>
        <li><strong>Microsoft 365-gebruikers:</strong> ${escapeHtml(payload.intake.m365Users)}</li>
        ${leadId ? `<li><strong>Supabase lead-id:</strong> ${escapeHtml(leadId)}</li>` : ""}
      </ul>

      <h3>Score</h3>
      <p><strong>Totaalscore: ${payload.scores.total}/100</strong></p>
      <ul>${weakestCategories}</ul>

      <h3>Topprioriteiten</h3>
      <ol>${topPriorities}</ol>

      <h3>Aanbevolen opvolging</h3>
      <p><strong>${escapeHtml(summary.packageAdvice.title)}</strong><br/>
      ${escapeHtml(summary.packageAdvice.summary)}</p>
    </div>
  `;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
