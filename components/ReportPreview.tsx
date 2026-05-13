"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const points = [
  "Totaalscore (1–100) met directe duiding",
  "Score per categorie met top-3 verbeterpunten",
  "Concrete adviezen toegesneden op MKB",
  "Bespreking met een Cloud1-specialist — alleen als je dat wilt",
];

export function ReportPreview() {
  return (
    <section id="rapport" className="py-14 md:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="eyebrow">Het rapport</p>
            <h2 className="mt-3 text-[clamp(1.8rem,3vw,2.4rem)] font-bold leading-[1.15] tracking-tight text-slate-900">
              Wat krijg je na de scan?
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Een helder rapport dat je intern of met je IT-partner kunt bespreken.
              Geen verkooppraatje, wel concrete inzichten.
            </p>
            <ul className="mt-8 space-y-4">
              {points.map((p, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.3, delay: i * 0.08, ease: "easeOut" }}
                  className="flex items-start gap-3"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0078D4]/10 flex items-center justify-center mt-0.5">
                    <Check size={14} className="text-[#0078D4]" />
                  </span>
                  <span className="text-slate-700">{p}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative"
          >
            <div className="float-soft relative mx-auto max-w-md">
              <LaptopMockup />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function LaptopMockup() {
  return (
    <svg viewBox="0 0 480 360" className="w-full h-auto" aria-hidden="true">
      <defs>
        <linearGradient id="screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F4F7FB" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>
      </defs>
      <rect x="40" y="20" width="400" height="270" rx="14" fill="#1B2A4E" />
      <rect x="50" y="30" width="380" height="250" rx="8" fill="url(#screen)" />

      <rect x="70" y="50" width="80" height="8" rx="2" fill="#0078D4" />
      <rect x="70" y="68" width="200" height="14" rx="3" fill="#0F172A" />
      <rect x="70" y="92" width="160" height="6" rx="2" fill="#94A3B8" />

      <circle cx="370" cy="80" r="32" fill="none" stroke="#E2E8F0" strokeWidth="6" />
      <circle
        cx="370"
        cy="80"
        r="32"
        fill="none"
        stroke="#F59E0B"
        strokeWidth="6"
        strokeDasharray="200.96"
        strokeDashoffset="80"
        strokeLinecap="round"
        transform="rotate(-90 370 80)"
      />
      <text x="370" y="86" textAnchor="middle" fontSize="18" fontWeight="700" fill="#F59E0B">
        64
      </text>

      <g>
        <rect x="70" y="135" width="340" height="22" rx="4" fill="#FEF2F2" />
        <rect x="70" y="135" width="120" height="22" rx="4" fill="#EF4444" />
        <text x="78" y="151" fontSize="11" fontWeight="600" fill="#fff">
          Werkplek
        </text>

        <rect x="70" y="165" width="340" height="22" rx="4" fill="#FFFBEB" />
        <rect x="70" y="165" width="220" height="22" rx="4" fill="#F59E0B" />
        <text x="78" y="181" fontSize="11" fontWeight="600" fill="#fff">
          Beveiliging
        </text>

        <rect x="70" y="195" width="340" height="22" rx="4" fill="#ECFDF5" />
        <rect x="70" y="195" width="270" height="22" rx="4" fill="#10B981" />
        <text x="78" y="211" fontSize="11" fontWeight="600" fill="#fff">
          Connectiviteit
        </text>

        <rect x="70" y="225" width="340" height="22" rx="4" fill="#FFFBEB" />
        <rect x="70" y="225" width="200" height="22" rx="4" fill="#F59E0B" />
        <text x="78" y="241" fontSize="11" fontWeight="600" fill="#fff">
          Beheer
        </text>
      </g>

      <rect x="30" y="290" width="420" height="14" rx="3" fill="#0B1F3A" />
      <rect x="200" y="290" width="80" height="6" rx="2" fill="#1B2A4E" />
    </svg>
  );
}
