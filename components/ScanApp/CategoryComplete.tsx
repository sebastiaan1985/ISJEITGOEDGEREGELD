"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { CATEGORIES } from "@/lib/questions";

export function CategoryComplete({ category }: { category: 0 | 1 | 2 | 3 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="py-16 text-center"
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
    </motion.div>
  );
}
