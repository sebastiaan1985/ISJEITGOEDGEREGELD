"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";

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
    <section className="py-10 md:py-14 bg-white flex justify-center">
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-2xl cursor-pointer"
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
    </section>
  );
}
