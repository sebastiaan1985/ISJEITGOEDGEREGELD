import { NextResponse } from "next/server";
import { z } from "zod";
import { renderToBuffer } from "@react-pdf/renderer";
import { Resend } from "resend";
import { ReportDocument } from "@/lib/pdf/ReportDocument";
import { classify, LEAD_LABEL } from "@/lib/leadRouting";
import { CATEGORIES, QUESTIONS } from "@/lib/questions";
import { zoneFor } from "@/lib/scoring";
import { INDUSTRIES, M365_BUCKETS, SIZE_BUCKETS } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

const intakeSchema = z.object({
  firstName: z.string().min(2),
  company: z.string().min(2),
  industry: z.enum(INDUSTRIES),
  size: z.enum(SIZE_BUCKETS),
  m365Users: z.enum(M365_BUCKETS),
  email: z.email(),
});

const bodySchema = z.object({
  intake: intakeSchema,
  answers: z.array(z.number().min(0).max(100)).length(24),
  scores: z.object({
    total: z.number().min(0).max(100),
    perCategory: z.tuple([z.number(), z.number(), z.number(), z.number()]),
  }),
});

export async function POST(req: Request) {
  let payload: z.infer<typeof bodySchema>;
  try {
    const json = await req.json();
    payload = bodySchema.parse(json);
  } catch (err) {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const { intake, answers, scores } = payload;
  const leadType = classify(intake);

  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.MAIL_FROM || "Cloud1 IT-Scan <onboarding@resend.dev>";
  const salesAddress = process.env.LEAD_NOTIFICATION_EMAIL || "sales@cloud1.nl";

  let pdfBuffer: Buffer;
  try {
    pdfBuffer = await renderToBuffer(
      ReportDocument({ intake, answers, scores }),
    );
  } catch (err) {
    console.error("PDF generation failed", err);
    return NextResponse.json({ ok: false, error: "pdf_failed" }, { status: 500 });
  }

  if (!apiKey) {
    console.warn("RESEND_API_KEY not configured — skipping mail send (PDF was generated).");
    return NextResponse.json({ ok: true, mailSent: false, leadType });
  }

  const resend = new Resend(apiKey);
  const pdfBase64 = pdfBuffer.toString("base64");
  const filename = `Cloud1-IT-Scan-${intake.company.replace(/[^a-z0-9]/gi, "-")}.pdf`;

  try {
    await resend.emails.send({
      from: fromAddress,
      to: intake.email,
      subject: `${intake.firstName}, jouw Cloud1 IT-Scan rapport (${scores.total}/100)`,
      html: prospectEmail(intake, scores.total),
      attachments: [{ filename, content: pdfBase64 }],
    });

    if (leadType !== "self-serve") {
      await resend.emails.send({
        from: fromAddress,
        to: salesAddress,
        subject: `[Cloud1 Scan] ${LEAD_LABEL[leadType]} — ${intake.company} — score ${scores.total}/100`,
        html: salesEmail(intake, answers, scores, leadType),
        attachments: [{ filename, content: pdfBase64 }],
      });
    }
  } catch (err) {
    console.error("Mail send failed", err);
    return NextResponse.json({ ok: false, error: "mail_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, mailSent: true, leadType });
}

function prospectEmail(intake: { firstName: string }, score: number): string {
  const zone = zoneFor(score);
  const zoneText: Record<typeof zone, string> = {
    red: "Er liggen flinke kansen om je IT robuuster te maken.",
    orange: "Je hebt een werkbare basis — een paar gerichte stappen tillen het hoger.",
    green: "Je doet het goed. We zien nog ruimte voor fine-tuning.",
  };
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif; color: #0F172A; max-width: 560px; margin: 0 auto;">
      <p>Hoi ${intake.firstName},</p>
      <p>Bedankt voor het invullen van de Cloud1 IT-Scan. Je rapport zit als PDF bij deze mail.</p>
      <p><strong>Je totaalscore: ${score} / 100.</strong> ${zoneText[zone]}</p>
      <p>Mocht je samen door het rapport heen willen — vrijblijvend en zonder verkooppraat — plan dan een gesprek via onze planner of stuur deze mail terug.</p>
      <p>Groet,<br/>Team Cloud1</p>
    </div>
  `;
}

function salesEmail(
  intake: z.infer<typeof intakeSchema>,
  answers: number[],
  scores: { total: number; perCategory: number[] },
  leadType: ReturnType<typeof classify>,
): string {
  const top5 = answers
    .map((a, i) => ({ q: QUESTIONS[i], score: a }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 5);

  const catRows = scores.perCategory
    .map((s, i) => `<li><strong>${CATEGORIES[i]}:</strong> ${s}/100 (${zoneFor(s)})</li>`)
    .join("");

  const top5Rows = top5
    .map((t) => `<li><strong>${t.q.id}</strong> (${t.score}): ${t.q.text}</li>`)
    .join("");

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif; color: #0F172A;">
      <h2 style="color: #13AEEB;">Nieuwe scan — ${LEAD_LABEL[leadType]}</h2>
      <p><strong>${intake.company}</strong> · ${intake.industry}</p>
      <ul>
        <li>Contact: ${intake.firstName} — ${intake.email}</li>
        <li>Grootte: ${intake.size}</li>
        <li>M365-gebruikers: ${intake.m365Users}</li>
      </ul>
      <p><strong>Totaalscore: ${scores.total}/100</strong></p>
      <h3>Per categorie</h3>
      <ul>${catRows}</ul>
      <h3>Top 5 laagst-scorende vragen</h3>
      <ol>${top5Rows}</ol>
      <p>PDF-rapport bijgevoegd.</p>
    </div>
  `;
}
