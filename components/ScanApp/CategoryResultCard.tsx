"use client";

import { motion } from "framer-motion";
import { zoneFor, zoneHex } from "@/lib/scoring";
import { ZONE_LABEL, ZONE_INTRO } from "@/lib/zoneText";
import { pickTips, GREEN_FALLBACK } from "@/lib/recommendations";
import { CATEGORIES } from "@/lib/questions";

type Props = {
  category: 0 | 1 | 2 | 3;
  score: number;
  answers: Record<string, number>;
  delay: number;
};

export function CategoryResultCard({ category, score, answers, delay }: Props) {
  const zone = zoneFor(score);
  const color = zoneHex(zone);
  const tips = pickTips(answers, category);
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
    >
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-semibold text-slate-900 leading-snug">{CATEGORIES[category]}</h4>
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ color, background: `${color}1A` }}
        >
          {ZONE_LABEL[zone]}
        </span>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-3xl font-bold" style={{ color }}>
          {score}
        </span>
        <span className="text-sm text-slate-500">/ 100</span>
      </div>

      <div className="mt-3 h-2 rounded-full bg-slate-100 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1.0, delay: delay + 0.2, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>

      <p className="mt-4 text-sm text-slate-600 leading-relaxed">{ZONE_INTRO[zone]}</p>

      {tips.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2" style={{ background: color }} />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-slate-700">{GREEN_FALLBACK}</p>
      )}
    </motion.article>
  );
}
