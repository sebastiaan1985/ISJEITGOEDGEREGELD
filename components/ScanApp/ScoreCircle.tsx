"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { zoneFor, zoneHex } from "@/lib/scoring";
import { TOTAL_SCORE_HEADLINE } from "@/lib/zoneText";

const MKB_BENCHMARK = 54;

export function ScoreCircle({ score }: { score: number }) {
  const zone = zoneFor(score);
  const color = zoneHex(zone);
  const [animatedScore, setAnimatedScore] = useState(0);
  const progress = useMotionValue(0);
  const RADIUS = 96;
  const CIRC = 2 * Math.PI * RADIUS;
  const dashOffset = useTransform(progress, (p) => CIRC - (CIRC * p) / 100);
  const diff = score - MKB_BENCHMARK;

  useEffect(() => {
    const controls = animate(progress, score, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setAnimatedScore(Math.round(v)),
    });
    return () => controls.stop();
  }, [score, progress]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="mx-auto relative w-[220px] h-[220px]">
        <svg width="220" height="220" viewBox="0 0 220 220" className="-rotate-90">
          <circle cx="110" cy="110" r={RADIUS} fill="none" stroke="#E2E8F0" strokeWidth="12" />
          <motion.circle
            cx="110" cy="110" r={RADIUS}
            fill="none" stroke={color} strokeWidth="12" strokeLinecap="round"
            strokeDasharray={CIRC}
            style={{ strokeDashoffset: dashOffset }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl md:text-6xl font-bold leading-none" style={{ color }}>
            {animatedScore}
          </span>
          <span className="mt-1 text-sm text-slate-500">van 100</span>
          <span className="mt-3 text-xs font-semibold text-center px-3" style={{ color }}>
            {TOTAL_SCORE_HEADLINE[zone]}
          </span>
        </div>
      </div>

      {/* Benchmark vergelijking */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1.6 }}
        className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm text-sm"
      >
        <span className="text-slate-500">MKB-gemiddelde: <strong className="text-slate-700">{MKB_BENCHMARK}</strong></span>
        <span className="w-px h-4 bg-slate-200" />
        <span
          className="font-semibold"
          style={{ color: diff >= 0 ? "#10B981" : "#EF4444" }}
        >
          {diff >= 0 ? `+${diff} boven gemiddeld` : `${diff} onder gemiddeld`}
        </span>
      </motion.div>
    </div>
  );
}
