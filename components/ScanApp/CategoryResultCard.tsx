"use client";

import { motion } from "framer-motion";
import { zoneFor, zoneHex } from "@/lib/scoring";
import { ZONE_LABEL, ZONE_INTRO } from "@/lib/zoneText";
import { pickTips, GREEN_FALLBACK, pickInsights } from "@/lib/recommendations";
import { CATEGORIES } from "@/lib/questions";

/** Fictieve benchmark-scores per categorie (gemiddelde MKB-bedrijf) */
const BENCHMARK: [number, number, number, number] = [48, 38, 52, 42];

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
  const insights = pickInsights(answers, category);
  const benchmark = BENCHMARK[category];
  const diff = score - benchmark;

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
        {diff !== 0 && (
          <span
            className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{
              color: diff > 0 ? "#10B981" : "#EF4444",
              background: diff > 0 ? "#10B98115" : "#EF444415",
            }}
          >
            {diff > 0 ? "+" : ""}{diff} vs gemiddeld
          </span>
        )}
      </div>

      {/* Score bar met benchmark-lijn */}
      <div className="mt-3 relative">
        <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1.0, delay: delay + 0.2, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ background: color }}
          />
        </div>
        {/* Benchmark stippellijn */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: delay + 0.8 }}
          className="absolute top-0 h-2 flex flex-col items-center"
          style={{ left: `${benchmark}%` }}
          title={`Gemiddelde MKB: ${benchmark}/100`}
        >
          <div className="w-[2px] h-full bg-slate-400" style={{ backgroundImage: "repeating-linear-gradient(to bottom, #94A3B8 0px, #94A3B8 2px, transparent 2px, transparent 4px)" }} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: delay + 1.0 }}
          className="mt-1 text-right"
        >
          <span
            className="text-[10px] text-slate-400 font-medium"
            style={{ marginLeft: `${Math.min(benchmark - 4, 85)}%` }}
          >
            ▼ MKB gem. {benchmark}
          </span>
        </motion.div>
      </div>

      <p className="mt-3 text-sm text-slate-600 leading-relaxed">{ZONE_INTRO[zone]}</p>

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

      {insights.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">💡 Wist je dat?</p>
          <ul className="space-y-2">
            {insights.map((insight, i) => (
              <li key={i} className="text-xs text-slate-600 leading-relaxed bg-slate-50 rounded-lg p-3">
                {insight}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.article>
  );
}
