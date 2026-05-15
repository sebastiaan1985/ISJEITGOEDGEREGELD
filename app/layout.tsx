import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CookieBanner } from "@/components/CookieBanner";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://isjeitgoedgeregeld.vercel.app";

export const metadata: Metadata = {
  title: "Cloud ÉÉN IT-Scan — Hoe staat jouw IT ervoor?",
  description:
    "Doe de gratis Cloud ÉÉN IT-Scan. 32 vragen over werkplek, beveiliging, connectiviteit en beheer. Direct inzicht, geen technische kennis nodig.",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: "Cloud ÉÉN IT-Scan — Hoe staat jouw IT ervoor?",
    description:
      "In 5 minuten inzicht in je werkplek, beveiliging, connectiviteit en IT-beheer. Geen technische kennis nodig.",
    type: "website",
    locale: "nl_NL",
    url: BASE_URL,
    siteName: "Cloud ÉÉN IT-Scan",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cloud ÉÉN IT-Scan — ontdek in 5 minuten hoe jouw IT ervoor staat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cloud ÉÉN IT-Scan — Hoe staat jouw IT ervoor?",
    description: "In 5 minuten inzicht in je werkplek, beveiliging en IT-beheer.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-slate-900">
        {children}
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
