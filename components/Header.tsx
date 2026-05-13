"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/Button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToScan = () => {
    document.getElementById("scanApp")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-out ${
        scrolled
          ? "bg-white/85 backdrop-blur-md border-b border-slate-200 shadow-[0_1px_3px_rgba(15,23,42,0.04)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 h-[60px] md:h-[72px] flex items-center justify-between">
        <a href="#" className="flex items-center gap-2" aria-label="Cloud1 home">
          <Cloud1Logo dark={scrolled} />
        </a>
        <nav className="hidden md:flex items-center gap-7">
          <a
            href="#hoe-werkt-het"
            className={`text-sm font-medium transition-colors ${
              scrolled ? "text-slate-700 hover:text-[#0078D4]" : "text-white/85 hover:text-white"
            }`}
          >
            Hoe werkt het
          </a>
          <a
            href="#rapport"
            className={`text-sm font-medium transition-colors ${
              scrolled ? "text-slate-700 hover:text-[#0078D4]" : "text-white/85 hover:text-white"
            }`}
          >
            Het rapport
          </a>
          <a
            href="#faq"
            className={`text-sm font-medium transition-colors ${
              scrolled ? "text-slate-700 hover:text-[#0078D4]" : "text-white/85 hover:text-white"
            }`}
          >
            Vragen
          </a>
        </nav>
        <Button onClick={scrollToScan} size="md">
          Start de scan
        </Button>
      </div>
    </header>
  );
}

function Cloud1Logo({ dark }: { dark: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path
          d="M22 14a6 6 0 0 0-11.7-1.3A5 5 0 0 0 11 22h11a4 4 0 0 0 0-8Z"
          fill={dark ? "#0078D4" : "#50E6FF"}
        />
      </svg>
      <span className={`text-xl font-bold tracking-tight ${dark ? "text-[#0B1F3A]" : "text-white"}`}>
        Cloud1
      </span>
    </div>
  );
}
