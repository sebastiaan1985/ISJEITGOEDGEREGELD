"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/Button";

export function MascotteVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play();
    setPlaying(true);
  };

  return (
    <section className="py-10 md:py-14 bg-white flex flex-col items-center relative overflow-hidden">
      {/* Zachte glow achter de video */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-[520px] h-[320px] rounded-full bg-[#13AEEB]/10 blur-[72px]" />
      </div>

      <div
        className="relative w-full max-w-xl overflow-hidden rounded-2xl cursor-pointer shadow-[0_8px_40px_rgba(19,174,235,0.18),0_2px_8px_rgba(15,23,42,0.08)]"
        onClick={!playing ? handlePlay : undefined}
      >
        <video
          ref={videoRef}
          src="/mascotte.mp4"
          playsInline
          disablePictureInPicture
          className="w-full block"
          style={{ outline: "none", transform: "scale(1.1) translateY(-2%)", transformOrigin: "top center" }}
          onEnded={() => setPlaying(false)}
        />

        {/* Afspeelknop overlay — verdwijnt zodra video speelt */}
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/90 shadow-lg">
              <Play size={28} className="text-[#13AEEB] ml-1" fill="#13AEEB" />
            </div>
          </div>
        )}
      </div>

      {/* CTA naar de gratis IT scan — waar de video naar verwijst */}
      <div className="relative mt-8 flex flex-col items-center gap-2">
        <Link href="/scan">
          <Button size="lg">Start de gratis IT scan</Button>
        </Link>
        <span className="text-xs text-slate-500 font-medium">
          Gratis · ±8 minuten · Direct PDF-rapport
        </span>
      </div>
    </section>
  );
}
