"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Mail, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/Button";
import { ScoreCircle } from "./ScoreCircle";
import { CategoryResultCard } from "./CategoryResultCard";
import { QUESTIONS } from "@/lib/questions";
import type { Intake, Scores } from "@/lib/types";

type Props = {
  intake: Intake;
  answers: number[];
  scores: Scores;
};

export function ResultView({ intake, answers, scores }: Props) {
  const [mailState, setMailState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const answersByQuestionId: Record<string, number> = {};
  answers.forEach((score, idx) => {
    const q = QUESTIONS[idx];
    answersByQuestionId[q.id] = score;
  });

  const sendMail = async () => {
    setMailState("sending");
    try {
      const res = await fetch("/api/scan/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intake, answers, scores }),
      });
      if (!res.ok) throw new Error("submit failed");
      setMailState("sent");
    } catch {
      setMailState("error");
    }
  };

  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/cloud1/scan-bespreking";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
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

      <div className="mt-12 rounded-2xl bg-gradient-to-br from-[#0B1F3A] to-[#1B2A4E] p-7 md:p-10 text-white text-center">
        <h4 className="text-xl md:text-2xl font-bold tracking-tight">
          Wil je hier samen doorheen?
        </h4>
        <p className="mt-2 text-white/75 max-w-md mx-auto text-sm md:text-base">
          Onze specialisten kijken graag samen met jou waar de grootste impact zit — vrijblijvend en
          zonder verkooppraat.
        </p>
        <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="white">
              <Calendar size={18} className="mr-1" />
              Plan een vrijblijvend gesprek
            </Button>
          </a>
          {mailState === "idle" && (
            <Button size="lg" variant="ghost" onClick={sendMail} className="!text-white hover:!bg-white/10">
              <Mail size={18} className="mr-1" />
              Stuur het rapport ook naar mijn mail
            </Button>
          )}
          {mailState === "sending" && (
            <span className="inline-flex items-center gap-2 text-sm text-white/80 px-3">
              <Loader2 size={16} className="animate-spin" /> Verzenden…
            </span>
          )}
          {mailState === "sent" && (
            <span className="inline-flex items-center gap-2 text-sm text-[#10B981] px-3">
              <CheckCircle2 size={16} /> Rapport verstuurd naar {intake.email}
            </span>
          )}
          {mailState === "error" && (
            <span className="text-sm text-red-300 px-3">
              Versturen lukte niet — probeer het later opnieuw.
            </span>
          )}
        </div>
        <p className="mt-7 text-xs text-white/55">
          Cloud1 helpt 6.000+ Nederlandse organisaties met hun Microsoft-werkplek.
        </p>
      </div>
    </motion.div>
  );
}
