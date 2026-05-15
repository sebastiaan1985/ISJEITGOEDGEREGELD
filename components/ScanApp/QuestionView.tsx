"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { getQuestion, CATEGORIES } from "@/lib/questions";

type Props = {
  category: 0 | 1 | 2 | 3;
  question: 0 | 1 | 2 | 3 | 4 | 5;
  selected: number | null;
  onSelect: (score: number) => void;
  onNext: () => void;
  onBack: () => void;
  canGoBack: boolean;
};

export function QuestionView({
  category,
  question,
  selected,
  onSelect,
  onNext,
  onBack,
  canGoBack,
}: Props) {
  const q = getQuestion(category, question);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      const letterIdx = ["A", "B", "C", "D"].indexOf(key);
      if (letterIdx >= 0) {
        e.preventDefault();
        onSelect(q.options[letterIdx].score);
      } else if (e.key === "ArrowRight" || e.key === "Enter") {
        if (selected !== null) {
          e.preventDefault();
          onNext();
        }
      } else if (e.key === "ArrowLeft") {
        if (canGoBack) {
          e.preventDefault();
          onBack();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [q, selected, onNext, onBack, onSelect, canGoBack]);

  return (
    <motion.div
      key={q.id}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      <p className="eyebrow">
        Categorie {category + 1} van 4 · Vraag {question + 1} van 6 · {CATEGORIES[category]}
      </p>
      <h3 className="mt-3 text-xl md:text-[1.4rem] font-semibold text-slate-900 leading-snug">
        {q.text}
      </h3>
      {q.scenario && (
        <p className="mt-2 text-sm text-slate-500 italic leading-relaxed">
          💡 {q.scenario}
        </p>
      )}

      <div role="radiogroup" className="mt-6 space-y-3">
        {q.options.map((opt) => {
          const isSelected = selected === opt.score;
          return (
            <button
              key={opt.letter}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(opt.score)}
              className={`w-full text-left p-4 rounded-xl border-[1.5px] transition-all duration-150 ease-out flex items-start gap-4 ${
                isSelected
                  ? "border-[#13AEEB] bg-[#13AEEB]/8 ring-2 ring-[#13AEEB]/15"
                  : "border-slate-200 bg-white hover:border-[#13AEEB]/50 hover:bg-[#13AEEB]/3"
              }`}
            >
              <span
                className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  isSelected
                    ? "bg-[#13AEEB] text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {opt.letter}
              </span>
              <span className="flex-1 text-sm md:text-[0.95rem] text-slate-700 leading-relaxed pt-0.5">
                {opt.text}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-7 flex items-center justify-between">
        {canGoBack ? (
          <button
            type="button"
            onClick={onBack}
            className="text-sm font-medium text-slate-500 hover:text-slate-700 px-1"
          >
            ← Vorige
          </button>
        ) : (
          <span />
        )}
        <Button onClick={onNext} disabled={selected === null} size="md">
          Volgende →
        </Button>
      </div>
    </motion.div>
  );
}
