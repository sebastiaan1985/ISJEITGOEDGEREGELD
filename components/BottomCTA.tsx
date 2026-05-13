"use client";

import { Button } from "./ui/Button";

export function BottomCTA() {
  const scrollToScan = () => {
    document.getElementById("scanApp")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="bg-[#0B1F3A] py-20 md:py-24 relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "#0078D4", opacity: 0.15, filter: "blur(80px)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-3xl px-5 md:px-8 text-center text-white">
        <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-bold leading-[1.15] tracking-tight">
          Klaar om te ontdekken waar het beter kan?
        </h2>
        <p className="mt-4 text-white/75 text-lg">
          5 minuten. Geen registratie. Direct je rapport.
        </p>
        <div className="mt-8 flex justify-center">
          <Button onClick={scrollToScan} size="lg" variant="white">
            Start de gratis scan
          </Button>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-white/60 font-medium">
          <span>✓ Microsoft Solutions Partner</span>
          <span>✓ ISO 27001-geborgd</span>
          <span>✓ 6.000+ klanten</span>
        </div>
      </div>
    </section>
  );
}
