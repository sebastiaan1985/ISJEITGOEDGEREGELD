import Link from "next/link";
import { Button } from "./ui/Button";

export function BottomCTA() {
  return (
    <section className="bg-[#0B1F3A] py-20 md:py-24 relative overflow-hidden">
      {/* Glow top-right */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "#13AEEB", opacity: 0.15, filter: "blur(90px)", transform: "translate(20%, -20%)" }}
        aria-hidden="true"
      />
      {/* Glow bottom-left */}
      <div
        className="absolute bottom-0 left-0 w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{ background: "#50E6FF", opacity: 0.08, filter: "blur(80px)", transform: "translate(-25%, 25%)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-3xl px-5 md:px-8 text-center text-white">
        <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-bold leading-[1.15] tracking-tight">
          Klaar om te ontdekken waar het beter kan?
        </h2>
        <p className="mt-4 text-white/75 text-lg">
          ±8 minuten. Geen technische kennis nodig. Direct je rapport.
        </p>
        <div className="mt-8 flex justify-center">
          <Link href="/scan">
            <Button size="lg" variant="white">
              Start de gratis scan
            </Button>
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {["Microsoft Solutions Partner", "ISO 27001-geborgd", "6.000+ klanten"].map((label) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/10 text-xs text-white/70 font-medium backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#13AEEB]" aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
