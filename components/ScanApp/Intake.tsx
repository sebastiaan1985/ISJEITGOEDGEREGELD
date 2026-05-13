"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { INDUSTRIES, M365_BUCKETS, SIZE_BUCKETS } from "@/lib/types";
import type { Intake as IntakeData, Industry, M365Bucket, SizeBucket } from "@/lib/types";

const M365_LABEL: Record<M365Bucket, string> = {
  "0": "0 / geen",
  "1-9": "1–9",
  "10-25": "10–25",
  "26-50": "26–50",
  "51-100": "51–100",
  "101+": "101 of meer",
  "weet-niet": "Weet ik niet",
};

const SIZE_LABEL: Record<SizeBucket, string> = {
  "1-9": "1–9 medewerkers",
  "10-25": "10–25 medewerkers",
  "26-50": "26–50 medewerkers",
  "51-100": "51–100 medewerkers",
  "101-250": "101–250 medewerkers",
  "251-500": "251–500 medewerkers",
  "500+": "500+ medewerkers",
};

export function Intake({ onSubmit }: { onSubmit: (data: IntakeData) => void }) {
  const [firstName, setFirstName] = useState("");
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState<Industry | "">("");
  const [size, setSize] = useState<SizeBucket | "">("");
  const [m365Users, setM365Users] = useState<M365Bucket | "">("");
  const [email, setEmail] = useState("");

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const valid =
    firstName.trim().length >= 2 &&
    company.trim().length >= 2 &&
    industry !== "" &&
    size !== "" &&
    m365Users !== "" &&
    emailValid;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    onSubmit({
      firstName: firstName.trim(),
      company: company.trim(),
      industry: industry as Industry,
      size: size as SizeBucket,
      m365Users: m365Users as M365Bucket,
      email: email.trim(),
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onSubmit={submit}
      className="space-y-5"
    >
      <div className="text-center md:text-left">
        <p className="eyebrow">Korte intake</p>
        <h3 className="mt-2 text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
          Vertel kort iets over je bedrijf
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          Zo maken we het rapport relevant voor jouw situatie.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Voornaam" required>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            autoComplete="given-name"
            className={inputCls}
            required
            minLength={2}
          />
        </Field>
        <Field label="Bedrijfsnaam" required>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            type="text"
            autoComplete="organization"
            className={inputCls}
            required
            minLength={2}
          />
        </Field>
      </div>

      <Field label="Branche" required>
        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value as Industry)}
          className={inputCls}
          required
        >
          <option value="">Kies een branche</option>
          {INDUSTRIES.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Aantal medewerkers" required>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value as SizeBucket)}
            className={inputCls}
            required
          >
            <option value="">Kies een bereik</option>
            {SIZE_BUCKETS.map((s) => (
              <option key={s} value={s}>
                {SIZE_LABEL[s]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Microsoft 365 gebruikers" required>
          <select
            value={m365Users}
            onChange={(e) => setM365Users(e.target.value as M365Bucket)}
            className={inputCls}
            required
          >
            <option value="">Kies een bereik</option>
            {M365_BUCKETS.map((m) => (
              <option key={m} value={m}>
                {M365_LABEL[m]}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Zakelijk e-mailadres" hint="We sturen je rapport hierheen." required>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          autoComplete="email"
          className={inputCls}
          required
        />
      </Field>

      <p className="text-xs text-slate-500">
        We gebruiken deze gegevens om je rapport relevant te maken. Geen spam — beloofd.
      </p>

      <div className="pt-2 flex justify-end">
        <Button type="submit" disabled={!valid} size="lg">
          Start de vragen →
        </Button>
      </div>
    </motion.form>
  );
}

const inputCls =
  "w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:border-[#13AEEB] focus:ring-2 focus:ring-[#13AEEB]/15 transition placeholder:text-slate-400";

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
        {required && <span className="text-[#13AEEB] ml-0.5">*</span>}
      </span>
      {children}
      {hint && <span className="block mt-1 text-xs text-slate-500">{hint}</span>}
    </label>
  );
}
