import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { workplaceQuestions, type WorkplacePackageId } from "@/lib/workplaceAdvisor";

export const runtime = "nodejs";

const packageIds = ["instap", "standaard", "premium", "ultimate"] as const;
const answerValues = ["instap", "standaard", "premium", "ultimate"] as const;

const contactSchema = z.object({
  firstName: z.string().min(2),
  company: z.string().min(2),
  email: z.email(),
  phone: z.string().optional(),
  alreadyCustomer: z.enum(["ja", "nee", "weet-niet", "onbekend"]).default("onbekend"),
});

const bodySchema = z.object({
  contact: contactSchema,
  advice: z.object({
    primary: z.enum(packageIds),
    secondary: z.enum(packageIds).optional(),
    score: z.number().min(0).max(100),
    reason: z.string().min(10),
    missing: z.string().optional(),
    answers: z.record(z.string(), z.enum(answerValues)),
  }),
});

export async function POST(req: Request) {
  let payload: z.infer<typeof bodySchema>;

  try {
    payload = bodySchema.parse(await req.json());
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const storage = await storeLead(payload);
  const notification = await sendNotification(payload, storage.leadId);

  return NextResponse.json({
    ok: true,
    stored: storage.stored,
    leadId: storage.leadId,
    storageError: storage.error,
    mailSent: notification.sent,
    notificationError: notification.error,
  });
}

async function storeLead(
  payload: z.infer<typeof bodySchema>,
): Promise<{ stored: boolean; leadId?: string; error?: string }> {
  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    console.warn("Supabase is not configured - workplace advice storage skipped.");
    return { stored: false, error: "supabase_not_configured" };
  }

  const record = {
    scan_type: "workplace-advice",
    lead_type: "werkplek-keuzehulp",
    first_name: payload.contact.firstName,
    company: payload.contact.company,
    industry: "Anders",
    company_size: "onbekend",
    m365_users: "weet-niet",
    email: payload.contact.email,
    phone: payload.contact.phone || null,
    total_score: payload.advice.score,
    category_scores: {
      type: "workplace-advice",
      primary: payload.advice.primary,
      secondary: payload.advice.secondary ?? null,
      alreadyCustomer: payload.contact.alreadyCustomer,
    },
    weakest_categories: [],
    top_priorities: buildAnswerSummary(payload.advice.answers),
    package_advice: {
      primary: payload.advice.primary,
      secondary: payload.advice.secondary ?? null,
      reason: payload.advice.reason,
      missing: payload.advice.missing ?? null,
      alreadyCustomer: payload.contact.alreadyCustomer,
    },
    report_status: "advies_aangevraagd",
    source: "cloud1-werkplek-keuzehulp",
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
      console.error("Supabase workplace advice insert failed", errorText);
      return { stored: false, error: "supabase_insert_failed" };
    }

    const rows = (await response.json()) as Array<{ id?: string }>;
    return { stored: true, leadId: rows[0]?.id };
  } catch (err) {
    console.error("Supabase workplace advice insert failed", err);
    return { stored: false, error: "supabase_request_failed" };
  }
}

async function sendNotification(
  payload: z.infer<typeof bodySchema>,
  leadId?: string,
): Promise<{ sent: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const toAddress = process.env.LEAD_NOTIFICATION_EMAIL;
  const fromAddress = process.env.MAIL_FROM || "Cloud EEN Werkplekadvies <onboarding@resend.dev>";

  if (!apiKey || !toAddress) return { sent: false, error: "mail_not_configured" };

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: fromAddress,
      to: toAddress,
      subject: `[Cloud EEN Werkplekadvies] ${payload.contact.company} - ${labelPackage(payload.advice.primary)}`,
      html: buildEmail(payload, leadId),
    });
    return { sent: true };
  } catch (err) {
    console.error("Workplace advice notification failed", err);
    return { sent: false, error: "mail_send_failed" };
  }
}

function buildAnswerSummary(answers: Record<string, string>) {
  return workplaceQuestions.map((question) => ({
    id: question.id,
    question: question.title,
    answer: answers[question.id] ?? "onbekend",
  }));
}

function buildEmail(payload: z.infer<typeof bodySchema>, leadId?: string) {
  const answers = buildAnswerSummary(payload.advice.answers)
    .map(
      (item) => `
        <li style="margin-bottom:8px">
          <strong>${escapeHtml(item.question)}</strong><br/>
          <span style="color:#475569">${escapeHtml(labelPackage(item.answer as WorkplacePackageId))}</span>
        </li>
      `,
    )
    .join("");

  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:#0f172a;line-height:1.5;max-width:680px">
      <h2 style="color:#13AEEB;margin:0 0 8px">Nieuwe Cloud EEN werkplekadvies-aanvraag</h2>
      <p style="margin:0 0 18px;color:#475569">Advies: <strong>${escapeHtml(labelPackage(payload.advice.primary))}</strong></p>

      <h3>Contact</h3>
      <ul>
        <li><strong>Naam:</strong> ${escapeHtml(payload.contact.firstName)}</li>
        <li><strong>Bedrijf:</strong> ${escapeHtml(payload.contact.company)}</li>
        <li><strong>E-mail:</strong> ${escapeHtml(payload.contact.email)}</li>
        ${payload.contact.phone ? `<li><strong>Telefoon:</strong> ${escapeHtml(payload.contact.phone)}</li>` : ""}
        <li><strong>Bestaande Cloud EEN-dienst:</strong> ${escapeHtml(payload.contact.alreadyCustomer)}</li>
        ${leadId ? `<li><strong>Supabase lead-id:</strong> ${escapeHtml(leadId)}</li>` : ""}
      </ul>

      <h3>Uitkomst</h3>
      <p>${escapeHtml(payload.advice.reason)}</p>
      ${
        payload.advice.secondary
          ? `<p><strong>Tweede optie:</strong> ${escapeHtml(labelPackage(payload.advice.secondary))}<br/>${escapeHtml(payload.advice.missing ?? "")}</p>`
          : ""
      }

      <h3>Antwoorden</h3>
      <ol>${answers}</ol>
    </div>
  `;
}

function labelPackage(id: WorkplacePackageId | string) {
  const labels: Record<WorkplacePackageId, string> = {
    instap: "Instap",
    standaard: "Standaard",
    premium: "Premium",
    ultimate: "Ultimate",
  };
  return labels[id as WorkplacePackageId] ?? id;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
