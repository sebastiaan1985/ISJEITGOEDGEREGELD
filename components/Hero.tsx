"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, FileText, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/Button";

const trustItems = [
  { icon: ShieldCheck, label: "Geen technische kennis nodig" },
  { icon: Clock, label: "±8 minuten" },
  { icon: FileText, label: "Persoonlijk PDF-rapport" },
  { icon: CheckCircle2, label: "Gratis & vrijblijvend" },
];

export function Hero() {
  return (
    <section className="relative min-h-[560px] md:min-h-[680px] flex items-center overflow-hidden pt-20 pb-16 bg-white">
      {/* Achtergrond afbeelding */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.png"
          alt="Cloud1 IT Omgeving"
          fill
          className="object-cover object-[70%_center] md:object-center opacity-95"
          priority
        />
        {/* Lichte overlay zodat donkere tekst goed leesbaar blijft op de lichte achtergrond */}
        <div className="absolute inset-0 bg-white/45" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-white via-white/85 to-transparent" />
      </div>

      {/* Ambient glow achter headline */}
      <div
        className="absolute left-0 top-0 w-[700px] h-[500px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at 20% 40%, rgba(19,174,235,0.13) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8">
        <div className="max-w-xl text-left text-[#0B1F3A]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="inline-flex"
        >
          <span className="eyebrow-glow eyebrow inline-flex items-center px-3 py-1 rounded-full border border-[#13AEEB]/25 bg-white/85 text-[#13AEEB] backdrop-blur-md shadow-[0_2px_12px_rgba(19,174,235,0.12)] font-semibold">
            Gratis · ±8 minuten · Direct inzicht
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, delay: 0.12, ease: "easeOut" }}
          className="mt-6 text-[clamp(2.2rem,4vw,3.4rem)] font-bold leading-[1.1] tracking-tight drop-shadow-sm"
        >
          Hoe goed is jouw IT eigenlijk geregeld?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.34, delay: 0.24, ease: "easeOut" }}
          className="mt-5 max-w-lg text-base md:text-lg text-slate-700 leading-relaxed font-medium"
        >
          32 vragen over werkplek, beveiliging, connectiviteit en IT-beheer. In ±8 minuten
          weet je precies waar risico's zitten — en wat je er morgen aan kunt doen.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.31, ease: "easeOut" }}
          className="mt-4 max-w-lg text-sm text-slate-600 leading-relaxed"
        >
          Twijfel je daarna welke IT-oplossing voor computers, laptops en veilig cloudwerken past?
          Gebruik dan de moderne cloudwerkplek-keuzehulp.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.26, delay: 0.36, ease: "easeOut" }}
          className="mt-8 flex items-center gap-3 flex-wrap"
        >
          <Link href="/scan">
            <Button size="lg" className="bg-[#13AEEB] hover:bg-[#0f92c7] text-white">
              Start de gratis scan
            </Button>
          </Link>
          <Link href="/moderne-cloud-werkplek">
            <Button size="lg" variant="secondary">
              Welke cloudwerkplek past bij mij?
            </Button>
          </Link>
          <a href="#hoe-werkt-het" className="text-sm font-semibold text-slate-600 hover:text-[#13AEEB] px-3 py-2">
            Bekijk hoe het werkt →
          </a>
        </motion.div>

        <ul className="mt-10 flex items-center gap-x-6 gap-y-3 flex-wrap">
          {trustItems.map((item, i) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, delay: 0.48 + i * 0.06, ease: "easeOut" }}
              className="inline-flex items-center gap-2 text-sm text-slate-600 font-semibold"
            >
              <item.icon size={16} className="text-[#13AEEB]" aria-hidden="true" />
              <span>{item.label}</span>
            </motion.li>
          ))}
        </ul>
        </div>
      </div>
    </section>
  );
}
