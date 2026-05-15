"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ArrowRight, CheckCircle2, LockKeyhole, TrendingUp } from "lucide-react";
import { Button } from "../ui/Button";
import { CATEGORIES } from "@/lib/questions";
import { zoneFor } from "@/lib/scoring";
import type { Scores } from "@/lib/types";

type Props = {
  scores: Scores;
  onUnlock: () => void;
  onRestart: () => void;
};

const zoneCopy = {
  red: {
    title: "Er liggen duidelijke risico's en snelle verbeterkansen.",
    icon: AlertTriangle,
    color: "text-red-600",
    bg: "bg-red-50",
  },
  orange: {
    title: "De basis staat, maar een paar punten vragen aandacht.",
    icon: TrendingUp,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  green: {
    title: "Je bent goed op weg. Nu gaat het om finetunen en aantonen.",
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
};

export function TeaserView({ scores, onUnlock, onRestart }: Props) {
  const totalZone = zoneFor(scores.total);
  const copy = zoneCopy[totalZone];
  const Icon = copy.icon;
  const weakest = scores.perCategory
    .map((score, index) => ({ score, label: CATEGORIES[index] }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="text-center"
    >
      <p className="eyebrow">Eerste indruk</p>
      <h3 className="mt-3 text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
        Je IT-score is ongeveer {scores.total}/100
      </h3>
      <div className={`mx-auto mt-6 flex max-w-xl items-start gap-3 rounded-2xl ${copy.bg} p-5 text-left`}>
        <Icon size={22} className={`${copy.color} mt-0.5 flex-shrink-0`} aria-hidden="true" />
        <div>
          <p className="font-semibold text-slate-900">{copy.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            We zien vooral ruimte bij {weakest.map((item) => item.label).join(" en ")}. Vul je gegevens in voor het volledige rapport met prioriteiten en concrete vervolgstappen.
          </p>
        </div>
      </div>

      <div className="mt-7 grid grid-cols-1 gap-3 md:grid-cols-2">
        {weakest.map((item) => (
          <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4 text-left">
            <p className="text-sm font-semibold text-slate-900">{item.label}</p>
            <p className="mt-1 text-2xl font-bold text-[#13AEEB]">{item.score}/100</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-[#13AEEB]/20 bg-[#13AEEB]/5 p-5">
        <LockKeyhole className="mx-auto text-[#13AEEB]" size={24} aria-hidden="true" />
        <p className="mt-3 font-semibold text-slate-900">Ontgrendel je volledige adviesrapport</p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">
          Je krijgt de score per categorie, de belangrijkste risico's en een praktisch gesprekshaakje voor je IT-partner of Cloud1-specialist.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Button onClick={onUnlock} size="lg">
            Bekijk volledig rapport
            <ArrowRight size={18} aria-hidden="true" />
          </Button>
          <button type="button" onClick={onRestart} className="px-3 py-2 text-sm font-semibold text-slate-500 hover:text-slate-700">
            Vragen opnieuw doen
          </button>
        </div>
      </div>
    </motion.div>
  );
}
