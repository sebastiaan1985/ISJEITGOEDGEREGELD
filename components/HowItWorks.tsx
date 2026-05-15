"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: 1,
    title: "32 vragen (7 min)",
    body: "Vier onderwerpen, acht vragen per onderwerp. Meerkeuze, geen technische kennis nodig. Je kan altijd terug.",
  },
  {
    num: 2,
    title: "Korte intake (1 min)",
    body: "Vul je gegevens in zodat we het rapport persoonlijk maken voor jouw organisatie.",
  },
  {
    num: 3,
    title: "Direct je rapport",
    body: "Je ziet meteen je score per onderdeel, met concrete inzichten. Je krijgt het rapport ook in je mailbox.",
  },
];

export function HowItWorks() {
  return (
    <section id="hoe-werkt-het" className="py-14 md:py-24 bg-[#F4F7FB]">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow">Zo werkt het</p>
          <h2 className="mt-3 text-[clamp(1.8rem,3vw,2.4rem)] font-bold leading-[1.15] tracking-tight text-slate-900">
            Van vraag tot rapport in ±8 minuten
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.42, delay: i * 0.1, ease: "easeOut" }}
              className="relative bg-white rounded-2xl p-7 border border-slate-200 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
            >
              <div className="w-12 h-12 rounded-full bg-[#13AEEB] text-white font-bold text-xl flex items-center justify-center">
                {step.num}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
