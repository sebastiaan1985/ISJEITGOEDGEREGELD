"use client";

import { useEffect, useRef } from "react";

export function MascotteVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="py-10 md:py-14 bg-white flex justify-center">
      <div className="relative w-full max-w-xl">
        <video
          ref={videoRef}
          src="/mascotte.mp4"
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          className="w-full rounded-2xl"
          style={{ outline: "none" }}
        />
        {/* Dekt het Veo-watermerk af */}
        <div className="absolute bottom-0 right-0 w-16 h-8 bg-white rounded-br-2xl" />
      </div>
    </section>
  );
}
