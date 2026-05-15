import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { UrgencySection } from "@/components/UrgencySection";
import { MascotteVideo } from "@/components/MascotteVideo";
import { CategoriesGrid } from "@/components/CategoriesGrid";
import { HowItWorks } from "@/components/HowItWorks";
import { ReportPreview } from "@/components/ReportPreview";
import { ScanApp } from "@/components/ScanApp";
import { FAQ } from "@/components/FAQ";
import { BottomCTA } from "@/components/BottomCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <UrgencySection />
        <MascotteVideo />
        <ScanApp />
        <CategoriesGrid />
        <HowItWorks />
        <ReportPreview />
        <FAQ />
        <BottomCTA />
      </main>
      <Footer />
    </>
  );
}
