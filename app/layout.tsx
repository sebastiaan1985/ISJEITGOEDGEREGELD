import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Cloud1 IT-Scan - Hoe staat jouw IT ervoor? | Cloud1",
  description:
    "Doe de gratis Cloud1 IT-Scan. In gewone taal inzicht in je werkplek, beveiliging, Microsoft 365 en IT-beheer.",
  openGraph: {
    title: "Cloud1 IT-Scan - Hoe staat jouw IT ervoor?",
    description:
      "In 5 minuten inzicht in je werkplek, beveiliging, connectiviteit en IT-beheer. Geen technische kennis nodig.",
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
