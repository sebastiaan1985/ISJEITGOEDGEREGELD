"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const FALSE_SECURITY = [
  {
    belief: '"Wij hebben een back-up."',
    twist: "Wanneer heeft u die voor het laatste getest? 58% van de organisaties ontdekte pas bij een incident dat het herstel niet werkte.",
  },
  {
    belief: '"Onze medewerkers zijn voorzichtig."',
    twist: "9 op de 10 cyberincidenten begint bij iemand die ergens op klikt. Niet omdat ze dom zijn — maar omdat de aanvallen steeds echter lijken.",
  },
  {
    belief: '"Wij werken met een IT-bedrijf."',
    twist: "Weet u welke beveiligingsinstellingen actief zijn? Of wanneer de laatste back-up is gedraaid? Als het antwoord 'nee' is, heeft u geen grip.",
  },
  {
    belief: '"Wij zijn te klein om interessant te zijn."',
    twist: "43% van alle cyberaanvallen richt zich juist op kleine bedrijven — omdat die makkelijker te raken zijn dan grote organisaties.",
  },
];

const STATS = [
  {
    number: "1 op 5",
    label: "MKB-bedrijven getroffen",
    sub: "in 2024 door een cyberincident",
  },
  {
    number: "€187.000",
    label: "gemiddelde herstelkosten",
    sub: "bij een ransomware-aanval op MKB",
  },
  {
    number: "197 dagen",
    label: "gemiddelde detectietijd",
    sub: "zo lang loopt een aanvaller ongemerkt mee",
  },
  {
    number: "60%",
    label: "sluit binnen 6 maanden",
    sub: "van MKB-bedrijven na een ernstige cyberaanval",
  },
];

export function UrgencySection() {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">

        {/* Opener */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl"
        >
          <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-bold text-slate-900 leading-[1.15] tracking-tight">
            De meeste ondernemers denken dat het goed zit.<br />
            <span className="text-gradient">Totdat het misgaat.</span>
          </h2>
          <p className="mt-4 text-slate-500 text-base leading-relaxed max-w-xl">
            Herken je jezelf in één van deze uitspraken? Dan weet je waarschijnlijk niet precies hoe kwetsbaar je bent.
          </p>
        </motion.div>

        {/* Valse gerustheid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {FALSE_SECURITY.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
            >
              <p className="text-base font-semibold text-slate-800 italic">{item.belief}</p>
              <div className="mt-3 flex items-start gap-2">
                <ChevronRight size={14} className="flex-shrink-0 text-[#13AEEB] mt-0.5" />
                <p className="text-sm text-slate-500 leading-relaxed">{item.twist}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Statistieken */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-12 rounded-2xl bg-slate-50 border border-slate-200 p-6 md:p-8"
        >
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-6">
            Cijfers die Nederlandse MKB-ondernemers zouden moeten kennen — 2024/2025
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.08 }}
              >
                <p className="text-[clamp(1.6rem,3vw,2.2rem)] font-bold text-[#13AEEB] leading-none">{stat.number}</p>
                <p className="mt-1.5 text-sm font-semibold text-slate-800">{stat.label}</p>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stel je voor scenario */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-10 p-6"
        >
          <p className="text-sm font-semibold text-red-500 uppercase tracking-wider mb-3">Stel je voor</p>
          <p className="text-slate-700 leading-relaxed">
            Maandagochtend. Je opent je laptop — maar al je bestanden zijn versleuteld. Een bericht vraagt om €15.000 om ze terug te krijgen.
            Je belt je IT-bedrijf. Die zegt: de back-up staat er, maar die is 8 maanden niet getest en lijkt corrupt.
            Je verzekeraar vraagt of je MFA had ingesteld. Je weet het niet zeker.
            De werkweek staat stil. En dat voor elke dag dat het duurt.
          </p>
          <p className="mt-3 text-sm text-slate-500">
            Dit scenario speelt zich jaarlijks af bij duizenden MKB-bedrijven in Nederland.
            Weet jij of jouw organisatie hiertegen beschermd is?
          </p>
        </motion.div>

      </div>
    </section>
  );
}
