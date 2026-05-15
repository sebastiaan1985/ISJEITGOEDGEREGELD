import { ImageResponse } from "next/og";

export const alt = "Cloud EEN IT-Scan — Hoe staat jouw IT ervoor?";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0B1F3A",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "#13AEEB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 24, height: 24, background: "white", borderRadius: 4, display: "flex" }} />
          </div>
          <span style={{ color: "#13AEEB", fontSize: 28, fontWeight: 700, display: "flex" }}>Cloud EEN</span>
        </div>

        {/* Headline */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", marginBottom: 24 }}>
            <span style={{ color: "white", fontSize: 64, fontWeight: 800, lineHeight: 1.1, display: "flex" }}>
              Hoe staat jouw IT ervoor?
            </span>
          </div>
          <span style={{ color: "#94A3B8", fontSize: 28, lineHeight: 1.4, display: "flex" }}>
            Gratis IT-Scan · 5 minuten · Direct resultaat
          </span>
        </div>

        {/* Category pills */}
        <div style={{ display: "flex", gap: 12, marginTop: 48 }}>
          {(["Werkplek", "Beveiliging", "Connectiviteit", "Beheer"] as const).map((label) => (
            <div
              key={label}
              style={{
                background: "rgba(19,174,235,0.15)",
                border: "1px solid rgba(19,174,235,0.4)",
                borderRadius: 999,
                padding: "8px 20px",
                color: "#13AEEB",
                fontSize: 18,
                fontWeight: 600,
                display: "flex",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
