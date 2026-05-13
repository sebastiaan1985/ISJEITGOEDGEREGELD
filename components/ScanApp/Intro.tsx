"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/Button";

export function Intro({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="text-center"
    >
      <p className="eyebrow">Welkom</p>
      <h3 className="mt-3 text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
        Klaar voor 5 minuten?
      </h3>
      <p className="mt-4 mx-auto max-w-lg text-slate-600 leading-relaxed">
        We stellen je 24 korte vragen over vier IT-onderdelen. Geen technische kennis nodig —
        beantwoord op gevoel. Je rapport krijg je direct te zien.
      </p>
      <div className="mt-8 flex justify-center">
        <Button onClick={onStart} size="lg">
          Begin met de scan
        </Button>
      </div>
    </motion.div>
  );
}
