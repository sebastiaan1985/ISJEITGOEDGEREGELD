"use client";

import { motion } from "framer-motion";
import { Laptop, ShieldCheck, Wifi, Settings2 } from "lucide-react";

const cats = [
  {
    num: "01",
    icon: Laptop,
    title: "Werkplek & Apparaten",
    body: "Laptops, mobiel en de tools waarmee je werkt. Hoe vlot en veilig kan iedereen aan de slag?",
  },
  {
    num: "02",
    icon: ShieldCheck,
    title: "Beveiliging & Back-up",
    body: "Toegang, virusbescherming, herstel bij incidenten. Wie kan bij wat? Wat als het misgaat?",
  },
  {
    num: "03",
    icon: Wifi,
    title: "Connectiviteit & Telefonie",
    body: "Internet, wifi, vaste en mobiele telefonie. Werkt iedereen overal even goed?",
  },
  {
    num: "04",
    icon: Settings2,
    title: "Beheer & Ondersteuning",
    body: "Wie houdt het draaiende, hoe meld je een probleem, en past het bij waar je heen wilt?",
  },
];

export function CategoriesGrid() {
  return (
    <section className="py-14 md:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow">Wat meten we?</p>
          <h2 className="mt-3 text-[clamp(1.8rem,3vw,2.4rem)] font-bold leading-[1.15] tracking-tight text-slate-900">
            Vier kerngebieden van moderne IT
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            We doorlopen samen vier onderdelen. Per onderdeel beantwoord je acht korte
            meerkeuzevragen — geen technische kennis nodig.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cats.map((cat, i) => (
            <motion.article
              key={cat.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.42, delay: i * 0.08, ease: "easeOut" }}
              className="group relative rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_4px_12px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_24px_rgba(19,174,235,0.12)] hover:-translate-y-1 transition-all duration-200 ease-out overflow-hidden"
            >
              <span className="absolute top-0 left-0 h-[2px] bg-[#13AEEB] w-0 group-hover:w-full transition-all duration-300 ease-out" />
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-xl bg-[#13AEEB]/8 flex items-center justify-center">
                  <cat.icon size={28} className="text-[#13AEEB]" aria-hidden="true" />
                </div>
                <span className="eyebrow text-slate-400">{cat.num}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900 leading-snug">
                {cat.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{cat.body}</p>
              <p className="mt-5 pt-4 border-t border-slate-100 text-xs font-medium text-slate-500">
                8 vragen
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
