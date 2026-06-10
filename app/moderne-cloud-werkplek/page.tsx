import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WorkplaceAdvisor } from "@/components/WorkplaceAdvisor";

export const metadata: Metadata = {
  title: "Welke moderne cloudwerkplek past bij mij? | Cloud EEN",
  description:
    "Ontdek welk Cloud EEN werkplekpakket past bij jouw computers, apparaten, beveiliging en manier van werken.",
};

export default function ModerneCloudWerkplekPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <WorkplaceAdvisor />
      </main>
      <Footer />
    </>
  );
}
