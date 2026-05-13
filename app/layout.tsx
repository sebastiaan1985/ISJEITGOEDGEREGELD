import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Cloud1 IT-Scan — Hoe staat jouw IT ervoor? | Cloud1",
  description:
    "In 5 minuten zie je waar het loopt en waar het beter kan — over werkplekken, beveiliging, internet/telefonie en IT-beheer. Geen technische kennis nodig.",
  openGraph: {
    title: "Cloud1 IT-Scan — Hoe staat jouw IT ervoor?",
    description:
      "Doe de gratis Cloud1 IT-Scan. In 5 minuten inzicht in je werkplek, beveiliging, connectiviteit en IT-beheer. Direct rapport.",
    type: "website",
    locale: "nl_NL",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-slate-900">{children}</body>
    </html>
  );
}
