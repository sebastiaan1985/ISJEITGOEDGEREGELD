"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Loader2, Building2, Download, Flag, ShieldCheck } from "lucide-react";
import { Button } from "../ui/Button";
import { Cloud1Logo } from "../ui/Cloud1Logo";
import { ScoreCircle } from "./ScoreCircle";
import { CategoryResultCard } from "./CategoryResultCard";
import { QUESTIONS } from "@/lib/questions";
import { buildScanSummary } from "@/lib/cloud1OfferMapping";
import { zoneFor } from "@/lib/scoring";
import { getIndustryTip } from "@/lib/industryTips";
import type { Intake, ScanType, Scores } from "@/lib/types";

type Props = {
  scanType?: ScanType;
  intake: Intake;
  answers: number[];
  scores: Scores;
};

export function ResultView({ scanType = "it-health", intake, answers, scores }: Props) {
  const [leadState, setLeadState] = useState<"saving" | "saved" | "local" | "error">("saving");
  const [pdfGenerating, setPdfGenerating] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  const captured = useRef(false);
  const summary = buildScanSummary(answers, scores);

  const answersByQuestionId: Record<string, number> = {};
  answers.forEach((score, idx) => {
    const q = QUESTIONS[idx];
    answersByQuestionId[q.id] = score;
  });

  const totalZone = zoneFor(scores.total);
  const industryTip = getIndustryTip(intake.industry, totalZone);

  const submit = async (intent: "lead-capture" | "send-report") => {
    const res = await fetch("/api/scan/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scanType, intent, intake, answers, scores }),
    });
    if (!res.ok) throw new Error("submit failed");
    return res.json() as Promise<{ stored?: boolean; leadId?: string }>;
  };

  useEffect(() => {
    if (captured.current) return;
    captured.current = true;
    async function captureAndDownload() {
      try {
        const response = await submit("lead-capture");
        setLeadState(response.stored ? "saved" : "local");
      } catch {
        setLeadState("error");
      } finally {
        await handleDownloadPdf();
      }
    }

    captureAndDownload();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/cloud1/scan-bespreking";

  const handleDownloadPdf = async () => {
    setPdfGenerating(true);
    try {
      const { pdf } = await import("@react-pdf/renderer");
      const { PdfReport } = await import("./PdfReport");

      const blob = await pdf(
        <PdfReport intake={intake} answers={answers} scores={scores} industryTip={industryTip} />,
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Cloud-EEN-IT-Scan-${intake.company.replace(/\s+/g, "-")}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error("PDF generation failed", err);
      alert("Er ging iets mis bij het genereren van de PDF: " + (err.message || String(err)));
    } finally {
      setPdfGenerating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-slate-50 md:bg-transparent -mx-5 px-5 md:mx-0 md:px-0 pb-10"
    >
      <div ref={printRef} className="bg-slate-50 md:bg-transparent">
      <div className="text-center">
        <p className="eyebrow">Jouw resultaat</p>
        <h3 className="mt-3 text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          {intake.firstName ? `${intake.firstName}, dit is jouw IT-score` : "Dit is jouw IT-score"}
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          Op basis van je antwoorden voor {intake.company || "jouw organisatie"}.
        </p>
      </div>

      <div className="mt-10">
        <ScoreCircle score={scores.total} />
      </div>

      {industryTip && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="mt-8 rounded-2xl border border-[#13AEEB]/20 bg-[#13AEEB]/5 p-5 md:p-6"
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#13AEEB]/10 flex items-center justify-center mt-0.5">
              <Building2 size={18} className="text-[#13AEEB]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#13AEEB] uppercase tracking-wider">
                {industryTip.headline}
              </p>
              <p className="mt-1.5 text-sm text-slate-700 leading-relaxed">
                {industryTip.tip}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
        {summary.topPriorities.length === 0 ? (
          /* Perfect score */
          <div className="text-center py-4">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-50 mb-4">
              <ShieldCheck size={28} className="text-emerald-500" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Indrukwekkend — alles staat op groen!</h4>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
              Op basis van jouw antwoorden scoort {intake.company || "jouw organisatie"} op alle onderdelen maximaal.
              Dat is uitzonderlijk goed. Toch loont het om dit periodiek te toetsen: technologie en dreigingen
              veranderen, en zelfs een sterke basis vraagt om onderhoud en optimalisatie.
            </p>
            <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-left max-w-lg mx-auto">
              <p className="text-sm font-semibold text-emerald-800 mb-2">Zinvolle gesprekspunten voor een consultant</p>
              <ul className="text-sm text-emerald-700 space-y-1.5 list-disc list-inside">
                <li>Kosten- en licentieoptimalisatie — betaalt u niet te veel?</li>
                <li>Nieuwe mogelijkheden zoals Microsoft Copilot en AI-automatisering</li>
                <li>Periodieke beveiligingsaudit en penetratietest</li>
                <li>IT-roadmap voor de komende 2–3 jaar</li>
                <li>Benchmark: hoe verhouden uw kosten zich tot vergelijkbare organisaties?</li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <p className="eyebrow">Belangrijkste inzichten</p>
                <h4 className="mt-2 text-xl font-bold text-slate-900 tracking-tight">
                  Top 5 prioriteiten voor {intake.company || "jouw organisatie"}
                </h4>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Dit zijn de punten waar verbetering naar verwachting de meeste rust, veiligheid of
                  voorspelbaarheid oplevert.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#13AEEB]/10 px-3 py-1.5 text-sm font-semibold text-[#0B85B8]">
                <ShieldCheck size={16} />
                Rapport wordt gedownload
              </div>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-3">
              {summary.topPriorities.map((item, index) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-white text-sm font-bold text-[#13AEEB] shadow-sm">
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-slate-900">{item.question}</p>
                        <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-slate-500">
                          {item.category}
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                        {item.betterSetup}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="mt-12">
        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider text-center">
          Per categorie
        </h4>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {scores.perCategory.map((catScore, i) => (
            <CategoryResultCard
              key={i}
              category={i as 0 | 1 | 2 | 3}
              score={catScore}
              answers={answersByQuestionId}
              delay={0.1 + i * 0.08}
            />
          ))}
        </div>
      </div>

      <div 
        data-html2canvas-ignore="true"
        className="mt-12 rounded-2xl bg-gradient-to-br from-[#0B1F3A] to-[#1B2A4E] p-7 md:p-10 text-white text-center print:hidden"
      >
        <h4 className="text-xl md:text-2xl font-bold tracking-tight">
          Wil je hier samen doorheen?
        </h4>
        <p className="mt-2 text-white/75 max-w-md mx-auto text-sm md:text-base">
          Je volledige PDF-rapport wordt automatisch gedownload. Daarin staat per vraag wat de
          situatie betekent, wat beter kan en welke Cloud ÉÉN-oplossing logisch aansluit.
        </p>
        <div className="mt-6 mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/5 p-4 text-left">
          <div className="flex items-start gap-3">
            <Flag size={18} className="mt-0.5 text-[#13AEEB]" />
            <div>
              <p className="text-sm font-semibold text-white">{summary.packageAdvice.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-white/70">
                {summary.packageAdvice.summary}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="white">
              <Calendar size={18} className="mr-1" />
              Plan een vrijblijvend gesprek
            </Button>
          </a>
          <Button size="lg" variant="ghost" onClick={handleDownloadPdf} disabled={pdfGenerating} className="!text-white hover:!bg-white/10">
            {pdfGenerating ? (
              <Loader2 size={18} className="mr-1 animate-spin" />
            ) : (
              <Download size={18} className="mr-1" />
            )}
            {pdfGenerating ? "PDF maken..." : "Download rapport opnieuw"}
          </Button>
        </div>
        {leadState === "saved" && (
          <p className="mt-4 text-xs text-white/55">Je gegevens zijn goed ontvangen.</p>
        )}
        {leadState === "local" && (
          <p className="mt-4 text-xs text-white/55">
            Rapport gedownload. Leadopslag staat lokaal nog niet gekoppeld aan Supabase.
          </p>
        )}
        {leadState === "error" && (
          <p className="mt-4 text-xs text-red-200">
            Rapport gedownload. Het opslaan van je gegevens lukte niet automatisch.
          </p>
        )}
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col items-center gap-4">
          <Cloud1Logo className="text-white/80" width={100} height={38} />
          <p className="text-sm text-white/70 max-w-lg leading-relaxed">
            Helpt 6.000+ MKB organisaties met onder meer werkplekken, mobiele telefonie, vaste telefonie en connectivity.
          </p>
          <a
            href="https://www.google.com/search?q=Cloud+EEN+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 mt-2 hover:opacity-80 transition-opacity"
          >
            <div className="flex text-[#F59E0B]">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
              <span className="text-sm font-medium text-white/80 underline underline-offset-2">
                4.8/5 Google Reviews
              </span>
              <span className="text-xs text-white/60">
                (op basis van 100+ reviews)
              </span>
            </div>
          </a>
        </div>
      </div>
      </div>
    </motion.div>
  );
}
