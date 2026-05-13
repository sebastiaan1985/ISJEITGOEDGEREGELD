"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, ShieldCheck, FileDown } from "lucide-react";
import { Button } from "./ui/Button";

const trustItems = [
  { icon: CheckCircle2, label: "100% gratis" },
  { icon: Clock, label: "5 minuten" },
  { icon: ShieldCheck, label: "Geen registratie nodig" },
  { icon: FileDown, label: "Direct rapport" },
];

export function Hero() {
  const scrollToScan = () => {
    document.getElementById("scanApp")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-[560px] md:min-h-[680px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0B1F3A] via-[#1B2A4E] to-[#0B1F3A] pt-20 pb-16">
      <div
        className="absolute -top-[200px] -right-[180px] w-[720px] h-[720px] rounded-full pointer-events-none"
        style={{ background: "#0078D4", opacity: 0.25, filter: "blur(80px)" }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-[120px] -left-[100px] w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ background: "#50E6FF", opacity: 0.18, filter: "blur(100px)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-5 md:px-8 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="inline-flex"
        >
          <span className="eyebrow inline-flex items-center px-3 py-1 rounded-full border border-[#50E6FF]/40 bg-white/8 text-[#50E6FF]">
            Gratis · 5 minuten · Direct inzicht
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, delay: 0.12, ease: "easeOut" }}
          className="mt-6 text-[clamp(2.2rem,4vw,3.4rem)] font-bold leading-[1.1] tracking-tight"
        >
          Hoe goed is jouw IT eigenlijk geregeld?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.34, delay: 0.24, ease: "easeOut" }}
          className="mt-5 mx-auto max-w-xl text-base md:text-lg text-white/80 leading-relaxed"
        >
          In 5 minuten zie je waar het loopt en waar het beter kan — over werkplekken,
          beveiliging, internet/telefonie en IT-beheer. Geen technische kennis nodig.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.26, delay: 0.36, ease: "easeOut" }}
          className="mt-8 flex items-center justify-center gap-3 flex-wrap"
        >
          <Button onClick={scrollToScan} size="lg" variant="white">
            Start de gratis scan
          </Button>
          <a
            href="#hoe-werkt-het"
            className="text-sm font-semibold text-white/80 hover:text-white px-3 py-2"
          >
            Bekijk hoe het werkt →
          </a>
        </motion.div>

        <ul className="mt-10 flex items-center justify-center gap-x-6 gap-y-3 flex-wrap">
          {trustItems.map((item, i) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, delay: 0.48 + i * 0.06, ease: "easeOut" }}
              className="inline-flex items-center gap-2 text-sm text-white/70"
            >
              <item.icon size={16} className="text-[#50E6FF]" aria-hidden="true" />
              <span>{item.label}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
