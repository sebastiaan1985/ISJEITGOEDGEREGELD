"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const items = [
  {
    q: "Is de scan echt gratis?",
    a: "Ja, volledig gratis. Geen creditcard, geen abonnement. Je krijgt direct je rapport, ook als je daarna nooit meer iets van ons hoort.",
  },
  {
    q: "Hoe lang duurt het?",
    a: "Gemiddeld 8 minuten. Een kort intake-blokje en daarna 32 meerkeuzevragen (8 per onderdeel).",
  },
  {
    q: "Moet ik technisch zijn?",
    a: "Nee. De vragen zijn bewust in normale taal. Twijfel je bij een vraag? Kies wat het meest in de buurt komt — dat is precies wat we willen weten.",
  },
  {
    q: "Wat gebeurt er met mijn gegevens?",
    a: "We bewaren je antwoorden zodat we het rapport kunnen samenstellen. We verkopen niets door. Zie ons privacybeleid voor de details.",
  },
  {
    q: "Word ik gebeld na de scan?",
    a: "Alleen als je dat zelf wilt. Je kan via de bedankpagina een gesprek inplannen — anders horen we niets van elkaar.",
  },
  {
    q: "Voor wie is deze scan bedoeld?",
    a: "Voor MKB-organisaties van 10 medewerkers tot 500. Werk je zelfstandig of in een hele klein team? Vul hem gerust in, maar het rapport zal minder gedetailleerd matchen.",
  },
  {
    q: "Wat als ik bij een vraag niets weet?",
    a: "Kies dan de optie die het meest in de buurt komt. Dat is ook informatie. Je kunt altijd terug om aan te passen.",
  },
  {
    q: "Krijg ik het rapport ook op papier?",
    a: "Je ontvangt een PDF in je mail. Print 'em desgewenst — hij is gemaakt om als gespreksdocument te gebruiken.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-14 md:py-24 bg-[#F4F7FB]">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow">Vaak gevraagd</p>
          <h2 className="mt-3 text-[clamp(1.8rem,3vw,2.4rem)] font-bold leading-[1.15] tracking-tight text-slate-900">
            Wat je nog wil weten
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-slate-900 leading-snug">{item.q}</span>
                  <ChevronDown
                    size={20}
                    className={`flex-shrink-0 text-slate-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-slate-600 leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
