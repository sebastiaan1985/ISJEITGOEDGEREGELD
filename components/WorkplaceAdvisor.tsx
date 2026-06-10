"use client";

import { useMemo, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Cloud,
  MonitorSmartphone,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "./ui/Button";
import {
  calculateWorkplaceAdvice,
  workplaceComparisonRows,
  workplacePackages,
  workplaceQuestions,
  type WorkplaceAdvice,
  type WorkplaceAnswerValue,
} from "@/lib/workplaceAdvisor";

const inputCls =
  "w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:border-[#13AEEB] focus:ring-2 focus:ring-[#13AEEB]/15 transition placeholder:text-slate-400";

type Contact = {
  firstName: string;
  company: string;
  email: string;
  phone: string;
  alreadyCustomer: string;
};

export function WorkplaceAdvisor() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, WorkplaceAnswerValue>>({});
  const [contact, setContact] = useState<Contact>({
    firstName: "",
    company: "",
    email: "",
    phone: "",
    alreadyCustomer: "",
  });
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "sent" | "error">("idle");

  const currentQuestion = workplaceQuestions[step];
  const complete = workplaceQuestions.every((question) => answers[question.id]);
  const advice = useMemo(() => (complete ? calculateWorkplaceAdvice(answers) : null), [answers, complete]);
  const isResult = step >= workplaceQuestions.length;
  const progress = Math.min(100, Math.round(((isResult ? workplaceQuestions.length : step) / workplaceQuestions.length) * 100));
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email);
  const contactValid =
    contact.firstName.trim().length >= 2 && contact.company.trim().length >= 2 && emailValid;

  function choose(value: WorkplaceAnswerValue) {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  }

  function next() {
    if (!answers[currentQuestion.id]) return;
    setStep((value) => Math.min(value + 1, workplaceQuestions.length));
  }

  function previous() {
    setStep((value) => Math.max(value - 1, 0));
  }

  async function submitLead(e: React.FormEvent) {
    e.preventDefault();
    if (!advice || !contactValid) return;
    setSubmitState("submitting");

    try {
      const response = await fetch("/api/workplace-advice/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: {
            ...contact,
            firstName: contact.firstName.trim(),
            company: contact.company.trim(),
            email: contact.email.trim(),
            phone: contact.phone.trim() || undefined,
            alreadyCustomer: contact.alreadyCustomer || "onbekend",
          },
          advice: {
            primary: advice.primary.id,
            secondary: advice.secondary?.id,
            score: advice.score,
            reason: advice.reason,
            missing: advice.missing,
            answers,
          },
        }),
      });

      if (!response.ok) throw new Error("submit_failed");
      setSubmitState("sent");
    } catch {
      setSubmitState("error");
    }
  }

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-28 pb-16">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="lg:sticky lg:top-28"
          >
            <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-[#13AEEB]/20 bg-[#13AEEB]/5 px-3 py-1">
              <Cloud size={15} />
              Cloud EEN werkplekadvies
            </span>
            <h1 className="mt-5 text-[clamp(2.1rem,4vw,3.7rem)] font-bold leading-[1.08] tracking-tight text-[#0B1F3A]">
              Welke moderne cloudwerkplek past bij jouw IT?
            </h1>
            <p className="mt-5 max-w-xl text-base md:text-lg leading-relaxed text-slate-600">
              Beantwoord een paar praktische vragen. Je ziet direct welk pakket past, wat je krijgt
              en waar je bewust niet voor kiest.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600">
              Elke vraag legt in gewone taal uit wat het onderdeel is, wat het doet en welk voordeel
              het voor jouw organisatie kan opleveren. Zo voelt het als een adviesgesprek dat je zelf
              rustig kunt invullen.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                { icon: MonitorSmartphone, label: "Computers en apparaten" },
                { icon: ShieldCheck, label: "Veilig werken" },
                { icon: Sparkles, label: "Professionele uitstraling" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <item.icon className="text-[#13AEEB]" size={22} />
                  <p className="mt-3 text-sm font-semibold leading-snug text-slate-800">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 rounded-2xl border border-[#13AEEB]/20 bg-[#13AEEB]/5 p-5">
              <p className="text-sm font-semibold text-[#0B1F3A]">Kortingsvoorstel mogelijk</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Neem je al vast/mobiel, internet of een andere dienst af bij Cloud EEN? Dan kom je
                mogelijk in aanmerking voor een aanvullend kortingsvoorstel.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, delay: 0.08, ease: "easeOut" }}
            className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_18px_60px_rgba(15,23,42,0.08)] md:p-6"
          >
            <div className="mb-6 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-[#13AEEB] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            {!isResult && currentQuestion ? (
              <QuestionStep
                step={step}
                value={answers[currentQuestion.id]}
                onChoose={choose}
                onNext={next}
                onPrevious={previous}
              />
            ) : advice ? (
              <ResultStep
                advice={advice}
                contact={contact}
                setContact={setContact}
                submitState={submitState}
                contactValid={contactValid}
                onSubmit={submitLead}
                onPrevious={previous}
              />
            ) : null}
          </motion.div>
        </div>

        <PackageComparison />
      </div>
    </section>
  );
}

function QuestionStep({
  step,
  value,
  onChoose,
  onNext,
  onPrevious,
}: {
  step: number;
  value?: WorkplaceAnswerValue;
  onChoose: (value: WorkplaceAnswerValue) => void;
  onNext: () => void;
  onPrevious: () => void;
}) {
  const question = workplaceQuestions[step];

  return (
    <div>
      <p className="text-sm font-semibold text-[#13AEEB]">
        Vraag {step + 1} van {workplaceQuestions.length}
      </p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#0B1F3A]">{question.title}</h2>
      <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs font-bold uppercase text-[#13AEEB]">Wat is het en wat levert het op?</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{question.help}</p>
      </div>

      <div className="mt-7 grid gap-3">
        {question.options.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.label}
              type="button"
              onClick={() => onChoose(option.value)}
              className={`group flex min-h-[92px] w-full items-start gap-4 rounded-2xl border p-4 text-left transition ${
                selected
                  ? "border-[#13AEEB] bg-[#13AEEB]/6 shadow-[0_8px_24px_rgba(19,174,235,0.16)]"
                  : "border-slate-200 bg-white hover:border-[#13AEEB]/45 hover:bg-slate-50"
              }`}
            >
              <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                  selected ? "border-[#13AEEB] bg-[#13AEEB] text-white" : "border-slate-300 text-transparent"
                }`}
              >
                <Check size={15} />
              </span>
              <span>
                <span className="block font-semibold text-slate-900">{option.label}</span>
                <span className="mt-1 block text-sm leading-relaxed text-slate-600">
                  {option.description}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-7 flex items-center justify-between gap-3">
        <Button type="button" variant="secondary" onClick={onPrevious} disabled={step === 0}>
          <ArrowLeft size={17} />
          Terug
        </Button>
        <Button type="button" onClick={onNext} disabled={!value}>
          Volgende
          <ArrowRight size={17} />
        </Button>
      </div>
    </div>
  );
}

function ResultStep({
  advice,
  contact,
  setContact,
  submitState,
  contactValid,
  onSubmit,
  onPrevious,
}: {
  advice: WorkplaceAdvice;
  contact: Contact;
  setContact: Dispatch<SetStateAction<Contact>>;
  submitState: "idle" | "submitting" | "sent" | "error";
  contactValid: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onPrevious: () => void;
}) {
  return (
    <div>
      <p className="eyebrow">Jouw advies</p>
      <div className="mt-4 rounded-3xl bg-[#0B1F3A] p-6 text-white">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#50E6FF]">Beste match</p>
            <h2 className="mt-1 text-3xl font-bold">{advice.primary.name}</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/75">{advice.primary.tagline}</p>
          </div>
          <div className="rounded-2xl bg-white/10 px-4 py-3 text-right">
            <p className="text-xs font-semibold uppercase text-white/55">Vanaf</p>
            <p className="text-2xl font-bold">{advice.primary.price}</p>
            <p className="text-xs text-white/65">per gebruiker / maand</p>
          </div>
        </div>
        <p className="mt-5 text-sm leading-relaxed text-white/82">{advice.reason}</p>
      </div>

      {advice.secondary && (
        <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <p className="font-semibold text-amber-950">
            Overweeg ook {advice.secondary.name}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-amber-900">
            {advice.missing} Als je voor {advice.primary.name} kiest, is dat prima,
            maar dan kies je bewust voor minder ontzorging op dit onderdeel.
          </p>
        </div>
      )}

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <FeatureList title="Dit krijg je" items={advice.primary.includes} positive />
        <FeatureList title="Dit zit er niet standaard in" items={advice.primary.notIncluded} />
      </div>

      <form onSubmit={onSubmit} className="mt-7 rounded-3xl border border-slate-200 bg-slate-50 p-5">
        <h3 className="text-xl font-bold text-[#0B1F3A]">Vraag advies aan over dit pakket</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          We slaan je uitkomst op, zodat Cloud EEN gericht kan meekijken en eventueel een kortingsvoorstel kan maken.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Field label="Voornaam" required>
            <input
              value={contact.firstName}
              onChange={(e) => setContact((prev) => ({ ...prev, firstName: e.target.value }))}
              className={inputCls}
              autoComplete="given-name"
              required
            />
          </Field>
          <Field label="Bedrijfsnaam" required>
            <input
              value={contact.company}
              onChange={(e) => setContact((prev) => ({ ...prev, company: e.target.value }))}
              className={inputCls}
              autoComplete="organization"
              required
            />
          </Field>
          <Field label="Zakelijk e-mailadres" required>
            <input
              value={contact.email}
              onChange={(e) => setContact((prev) => ({ ...prev, email: e.target.value }))}
              className={inputCls}
              type="email"
              autoComplete="email"
              required
            />
          </Field>
          <Field label="Telefoonnummer">
            <input
              value={contact.phone}
              onChange={(e) => setContact((prev) => ({ ...prev, phone: e.target.value }))}
              className={inputCls}
              type="tel"
              autoComplete="tel"
            />
          </Field>
        </div>

        <Field label="Neemt u al vast/mobiel, internet of een andere Cloud EEN-dienst af?">
          <select
            value={contact.alreadyCustomer}
            onChange={(e) => setContact((prev) => ({ ...prev, alreadyCustomer: e.target.value }))}
            className={inputCls}
          >
            <option value="">Kies een optie</option>
            <option value="ja">Ja</option>
            <option value="nee">Nee</option>
            <option value="weet-niet">Weet ik niet</option>
          </select>
        </Field>

        {submitState === "sent" && (
          <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-900">
            Je aanvraag is ontvangen. Cloud EEN kan nu gericht met je meekijken.
          </div>
        )}
        {submitState === "error" && (
          <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-900">
            Verzenden lukte niet. Probeer het nog een keer.
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <Button type="button" variant="secondary" onClick={onPrevious}>
            <ArrowLeft size={17} />
            Antwoord aanpassen
          </Button>
          <Button type="submit" disabled={!contactValid || submitState === "submitting" || submitState === "sent"}>
            {submitState === "submitting" ? "Versturen..." : "Vraag advies aan"}
            <Send size={17} />
          </Button>
        </div>
      </form>
    </div>
  );
}

function FeatureList({ title, items, positive = false }: { title: string; items: string[]; positive?: boolean }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h3 className="font-bold text-slate-900">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-600">
            {positive ? (
              <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-500" size={17} />
            ) : (
              <X className="mt-0.5 shrink-0 text-slate-400" size={17} />
            )}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PackageComparison() {
  return (
    <div className="mt-16">
      <div className="max-w-3xl">
        <p className="eyebrow">Pakketten</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0B1F3A]">
          Wat mag je verwachten per moderne cloudwerkplek?
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          De prijzen zijn richtprijzen per gebruiker per maand. Bestaande Cloud EEN-klanten met vast/mobiel,
          internet of andere diensten kunnen in aanmerking komen voor een aanvullend kortingsvoorstel.
        </p>
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-4">
        {workplacePackages.map((item) => (
          <article
            key={item.id}
            className={`rounded-3xl border p-5 ${
              item.id === "standaard"
                ? "border-[#13AEEB] bg-[#13AEEB]/5 shadow-[0_12px_34px_rgba(19,174,235,0.14)]"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xl font-bold text-[#0B1F3A]">{item.name}</h3>
              {item.id === "standaard" && (
                <span className="rounded-full bg-[#13AEEB] px-3 py-1 text-xs font-bold text-white">
                  Vaak passend
                </span>
              )}
            </div>
            <p className="mt-1 text-xs font-semibold text-slate-400">Voorheen vergelijkbaar met {item.originalName}</p>
            <p className="mt-4 text-3xl font-bold text-slate-950">{item.price}</p>
            <p className="text-xs text-slate-500">per gebruiker / maand</p>
            <p className="mt-4 min-h-[66px] text-sm leading-relaxed text-slate-600">{item.bestFor}</p>
            <ul className="mt-5 space-y-2">
              {item.includes.slice(0, 4).map((feature) => (
                <li key={feature} className="flex gap-2 text-sm leading-relaxed text-slate-700">
                  <ChevronRight className="mt-0.5 shrink-0 text-[#13AEEB]" size={16} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
        <div className="grid grid-cols-1 border-b border-slate-200 bg-slate-50 lg:grid-cols-[1.35fr_repeat(4,minmax(0,1fr))]">
          <div className="p-5">
            <p className="text-sm font-bold text-[#0B1F3A]">Onderdeel</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              Per regel staat eerst wat het betekent, daarna wat je per pakket krijgt.
            </p>
          </div>
          {workplacePackages.map((item) => (
            <div
              key={item.id}
              className={`border-t border-slate-200 p-5 lg:border-l lg:border-t-0 ${
                item.id === "standaard" ? "bg-[#13AEEB]/6" : "bg-white/60"
              }`}
            >
              <div className="flex items-start justify-between gap-3 lg:block">
                <div>
                  <p className="text-lg font-bold text-[#0B1F3A]">{item.name}</p>
                  <p className="mt-1 text-xs text-slate-500">vanaf {item.price} p.p./mnd</p>
                </div>
                {item.id === "standaard" && (
                  <span className="rounded-full bg-[#13AEEB] px-3 py-1 text-xs font-bold text-white lg:mt-3 lg:inline-block">
                    Vaak passend
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="divide-y divide-slate-200">
          {workplaceComparisonRows.map((row) => (
            <div
              key={`${row.category}-${row.label}`}
              className="grid grid-cols-1 lg:grid-cols-[1.35fr_repeat(4,minmax(0,1fr))]"
            >
              <div className="bg-white p-5">
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold uppercase text-slate-500">
                  {row.category}
                </span>
                <h3 className="mt-3 text-base font-bold text-slate-950">{row.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{row.description}</p>
              </div>
              {workplacePackages.map((item) => {
                const value = row.values[item.id];
                const muted = value.toLowerCase().includes("niet standaard") || value.toLowerCase().includes("handmatig");
                return (
                  <div
                    key={item.id}
                    className={`flex items-center border-t border-slate-100 p-5 lg:border-l lg:border-t-0 ${
                      item.id === "standaard" ? "bg-[#13AEEB]/4" : "bg-white"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          muted ? "bg-slate-100 text-slate-400" : "bg-emerald-50 text-emerald-600"
                        }`}
                      >
                        {muted ? <X size={13} /> : <Check size={13} />}
                      </span>
                      <p className={`text-sm font-medium leading-relaxed ${muted ? "text-slate-500" : "text-slate-800"}`}>
                        {value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="mt-4 block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="ml-0.5 text-[#13AEEB]">*</span>}
      </span>
      {children}
    </label>
  );
}
