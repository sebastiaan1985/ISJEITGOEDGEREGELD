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
      <div className="w-full max-w-xl overflow-hidden rounded-2xl">
        <video
          ref={videoRef}
          src="/mascotte.mp4"
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          className="w-full block"
          style={{ outline: "none", transform: "scale(1.1) translateY(-2%)", transformOrigin: "top center" }}
        />
      </div>
    </section>
  );
}
