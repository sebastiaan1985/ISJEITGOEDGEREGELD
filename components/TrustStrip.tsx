"use client";

import { Cloud1Logo } from "./ui/Cloud1Logo";

const items = [
  {
    image: "/microsoft-solutions-partner.png",
    label: "Microsoft Solutions Partner",
    detail: "moderne werkplek & cloud",
    imageClassName: "h-8 w-14",
  },
  {
    logo: "cloud-een",
    label: "6.000+ MKB-klanten",
    detail: "dagelijks geholpen",
    imageClassName: "h-8 w-14",
  },
  {
    image: "/google-reviews.png",
    label: "4.8 sterren op Google",
    detail: "200+ reviews",
    imageClassName: "h-9 w-16",
  },
  {
    image: "/workplek-security-beheer.png",
    label: "Werkplek, security & beheer",
    detail: "alles onder één dak",
    imageClassName: "h-9 w-16",
  },
];

export function TrustStrip() {
  return (
    <section className="border-y border-slate-100 bg-white/95">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.label}
              className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#13AEEB]/30 hover:shadow-[0_14px_34px_rgba(15,23,42,0.08)]"
            >
              <span className="flex h-12 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-slate-50 px-2 ring-1 ring-slate-200 transition group-hover:scale-105">
                {item.logo === "cloud-een" ? (
                  <Cloud1Logo className="text-[#13AEEB]" width={58} height={22} />
                ) : (
                  <img
                    src={item.image}
                    alt=""
                    aria-hidden="true"
                    className={`${item.imageClassName} object-contain`}
                    loading="lazy"
                  />
                )}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold leading-tight text-slate-900">{item.label}</span>
                <span className="mt-0.5 block text-xs font-medium leading-tight text-slate-500">{item.detail}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
