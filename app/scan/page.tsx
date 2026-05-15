import type { Metadata } from "next";
import { ScanApp } from "@/components/ScanApp";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Start de IT-Scan | Cloud1",
  description:
    "Doe nu de gratis Cloud1 IT-Scan. In 5 minuten inzicht in je werkplek, beveiliging, connectiviteit en IT-beheer.",
};

export default function ScanPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-[72px]">
        <ScanApp autoStart />
      </main>
      <Footer />
    </>
  );
}
