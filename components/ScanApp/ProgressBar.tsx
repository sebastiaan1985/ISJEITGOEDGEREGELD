"use client";

import { Check } from "lucide-react";
import { CATEGORY_SHORT } from "@/lib/questions";

type Props = {
  currentCategory: 0 | 1 | 2 | 3;
  currentQuestion: 0 | 1 | 2 | 3 | 4 | 5;
  finished: boolean;
};

export function ProgressBar({ currentCategory, currentQuestion, finished }: Props) {
  return (
    <div className="w-full">
      <div className="flex items-center">
        {[0, 1, 2, 3].map((i) => {
          const isCompleted = finished || i < currentCategory;
          const isActive = !finished && i === currentCategory;
          const isFuture = !finished && i > currentCategory;
          const progressWithin = isActive
            ? ((currentQuestion + 1) / 6) * 100
            : isCompleted
              ? 100
              : 0;
          return (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={`relative w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    isCompleted
                      ? "bg-[#10B981] border-[#10B981] text-white"
                      : isActive
                        ? "bg-[#13AEEB] border-[#13AEEB] text-white"
                        : "bg-white border-slate-300 text-slate-400"
                  }`}
                  aria-current={isActive ? "step" : undefined}
                >
                  {isCompleted ? <Check size={16} strokeWidth={3} /> : i + 1}
                </div>
              </div>
              {i < 3 && (
                <div className="h-[2px] flex-1 mx-2 bg-slate-200 relative overflow-hidden rounded-full">
                  <div
                    className={`absolute inset-y-0 left-0 transition-[width] duration-300 ease-out ${
                      isCompleted || isActive ? "bg-[#13AEEB]" : "bg-transparent"
                    }`}
                    style={{ width: `${isCompleted ? 100 : isActive ? progressWithin : 0}%` }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-3 hidden md:grid grid-cols-4 gap-2 text-xs font-medium text-center">
        {CATEGORY_SHORT.map((label, i) => (
          <span
            key={label}
            className={
              i === currentCategory && !finished
                ? "text-[#13AEEB] font-semibold"
                : i < currentCategory || finished
                  ? "text-slate-700"
                  : "text-slate-400"
            }
          >
            {label}
          </span>
        ))}
      </div>
      <div className="mt-3 md:hidden text-center text-xs font-medium text-[#13AEEB]">
        {!finished && CATEGORY_SHORT[currentCategory]}
      </div>
    </div>
  );
}
