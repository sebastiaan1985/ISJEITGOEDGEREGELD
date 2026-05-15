"use client";

import { useEffect, useState } from "react";
import { Cloud1Logo } from "./ui/Cloud1Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-out ${
        scrolled
          ? "bg-white/85 backdrop-blur-md border-b border-slate-200 shadow-[0_1px_3px_rgba(15,23,42,0.04)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 h-[60px] md:h-[72px] flex items-center justify-between">
        <a href="#" aria-label="Cloud ÉÉN home" className="flex items-center">
          <Cloud1Logo
            className={`transition-colors duration-200 ${
              scrolled ? "text-[#13AEEB]" : "text-[#0B1F3A]"
            }`}
            width={110}
            height={42}
          />
        </a>
        <nav className="hidden md:flex items-center gap-7">
          <a
            href="#hoe-werkt-het"
            className={`text-sm font-medium transition-colors ${
              scrolled ? "text-slate-700 hover:text-[#13AEEB]" : "text-slate-700 hover:text-[#13AEEB]"
            }`}
          >
            Hoe werkt het
          </a>
          <a
            href="#rapport"
            className={`text-sm font-medium transition-colors ${
              scrolled ? "text-slate-700 hover:text-[#13AEEB]" : "text-slate-700 hover:text-[#13AEEB]"
            }`}
          >
            Het rapport
          </a>
          <a
            href="#faq"
            className={`text-sm font-medium transition-colors ${
              scrolled ? "text-slate-700 hover:text-[#13AEEB]" : "text-slate-700 hover:text-[#13AEEB]"
            }`}
          >
            Vragen
          </a>
        </nav>
      </div>
    </header>
  );
}
