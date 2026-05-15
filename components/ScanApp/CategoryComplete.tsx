"use client";

import { motion } from "framer-motion";
import { Check, TrendingUp, Zap, ThumbsUp } from "lucide-react";
import { CATEGORIES } from "@/lib/questions";

type Props = {
  category: 0 | 1 | 2 | 3;
  categoryScore?: number;
};

function getFeedback(score?: number): { icon: typeof Check; text: string; color: string } {
  if (score === undefined) {
    return { icon: Check, text: "", color: "#10B981" };
  }
  if (score < 40) {
    return {
      icon: TrendingUp,
      text: "Geen zorgen — juist hier liggen de grootste kansen.",
      color: "#F59E0B",
    };
  }
  if (score <= 70) {
    return {
      icon: Zap,
      text: "Goede basis! Er zijn nog een paar quick wins mogelijk.",
      color: "#13AEEB",
    };
  }
  return {
    icon: ThumbsUp,
    text: "Sterk! Je bent goed op weg.",
    color: "#10B981",
  };
}

export function CategoryComplete({ category, categoryScore }: Props) {
  const feedback = getFeedback(categoryScore);
  const FeedbackIcon = feedback.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="py-12 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 14, stiffness: 220, delay: 0.1 }}
        className="mx-auto w-20 h-20 rounded-full bg-[#10B981]/10 flex items-center justify-center"
      >
        <Check size={40} strokeWidth={3} className="text-[#10B981]" />
      </motion.div>
      <h3 className="mt-6 text-xl font-bold text-slate-900">
        Categorie {category + 1} voltooid
      </h3>
      <p className="mt-1 text-sm text-slate-500">{CATEGORIES[category]}</p>

      {categoryScore !== undefined && feedback.text && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border"
          style={{
            borderColor: `${feedback.color}33`,
            backgroundColor: `${feedback.color}0D`,
          }}
        >
          <FeedbackIcon size={16} style={{ color: feedback.color }} />
          <span className="text-sm font-medium text-slate-700">{feedback.text}</span>
        </motion.div>
      )}
    </motion.div>
  );
}
