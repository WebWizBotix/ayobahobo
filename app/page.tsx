/**
 * © 2026 Bernie Vorster / WebWizSystems
 * 
 * Project: Ayoba Scrollytelling
 * File: page.tsx
 * 
 * This codebase is proprietary and confidential.
 * Unauthorized use, copying, modification, or distribution is strictly prohibited.
 * 
 * Built & maintained by WebWizSystems
 * https://webwizsystems.com
 * 
 * Created: 2026-04-07
 * Last Updated: 2026-04-09
 * Signature ID: WWZ-AYOBA-SCROLLYTELLING-2026-911
 */

import Header from "@/components/Header";
import PerfumeSequence from "@/components/PerfumeSequence";
import HeroProductPage from "@/components/HeroProductPage";
import ReviewsSection from "@/components/ReviewsSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505]">
      <Header />
      <PerfumeSequence />
      <HeroProductPage />
      <ReviewsSection />
      <AboutSection />
      <Footer />
    </main>
  );
}

