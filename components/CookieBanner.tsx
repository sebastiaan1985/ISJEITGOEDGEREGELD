"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "cloud1_cookie_consent";

type Consent = "accepted" | "declined" | null;

export function CookieBanner() {
  const [consent, setConsent] = useState<Consent>("accepted"); // start hidden to avoid flash

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Consent | null;
    setConsent(stored);
  }, []);

  if (consent !== null) return null;

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setConsent("accepted");
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, "declined");
    setConsent("declined");
  }

  return (
    <div
      role="dialog"
      aria-label="Cookiemelding"
      className="fixed bottom-0 inset-x-0 z-50 bg-[#0B1F3A] border-t border-white/10 text-white shadow-2xl"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
        <p className="text-sm text-white/80 flex-1">
          Wij gebruiken functionele cookies om de scan goed te laten werken.{" "}
          <Link href="/privacy#cookies" className="underline hover:text-white whitespace-nowrap">
            Meer informatie
          </Link>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={decline}
            className="text-sm text-white/60 hover:text-white underline underline-offset-2 transition"
          >
            Alleen functioneel
          </button>
          <button
            onClick={accept}
            className="text-sm font-semibold bg-[#13AEEB] text-white px-5 py-2 rounded-lg hover:bg-[#0e9fd6] transition"
          >
            Accepteren
          </button>
        </div>
      </div>
    </div>
  );
}
