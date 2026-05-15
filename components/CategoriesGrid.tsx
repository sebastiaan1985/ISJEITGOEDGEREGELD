"use client";

import { motion } from "framer-motion";

const cats = [
  {
    num: "01",
    image: "/category-workplace.png",
    title: "Werkplek & Apparaten",
    body: "Laptops, mobiel en de tools waarmee je werkt. Hoe vlot en veilig kan iedereen aan de slag?",
  },
  {
    num: "02",
    image: "/category-security.png",
    title: "Beveiliging & Back-up",
    body: "Toegang, virusbescherming, herstel bij incidenten. Wie kan bij wat? Wat als het misgaat?",
  },
  {
    num: "03",
    image: "/category-connectivity.png",
    title: "Connectiviteit & Telefonie",
    body: "Internet, wifi, vaste en mobiele telefonie. Werkt iedereen overal even goed?",
  },
  {
    num: "04",
    image: "/category-support.png",
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
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_4px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.06)] transition-all duration-250 ease-out hover:-translate-y-1.5 hover:border-[#13AEEB]/25 hover:shadow-[0_4px_8px_rgba(15,23,42,0.06),0_16px_36px_rgba(19,174,235,0.15)]"
            >
              <span className="absolute top-0 left-0 h-[2px] bg-[#13AEEB] w-0 group-hover:w-full transition-all duration-300 ease-out" />
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={cat.image}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white via-white/80 to-transparent" />
                <div className="absolute left-4 top-4 flex h-9 w-24 items-center justify-center rounded-full bg-white/90 px-3 shadow-[0_8px_22px_rgba(15,23,42,0.12)] ring-1 ring-white/70 backdrop-blur-sm">
                  <img src="/cloud1-logo-blue.png" alt="Cloud ÉÉN" className="h-5 w-full object-contain" />
                </div>
              </div>
              <div className="relative -mt-9 px-6 pb-6">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#1D5FAE] text-lg font-bold text-white shadow-[0_8px_20px_rgba(29,95,174,0.28)] ring-1 ring-white/30">
                  {cat.num}
                </span>
                <h3 className="mt-5 text-xl font-bold text-slate-950 leading-snug">
                  {cat.title}
                </h3>
                <p className="mt-3 text-[15px] text-slate-700 leading-relaxed">{cat.body}</p>
                <p className="mt-6 text-sm font-semibold text-[#1D5FAE]">8 vragen</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
