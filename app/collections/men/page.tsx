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
 * Last Updated: 2026-05-25
 * Signature ID: WWZ-AYOBA-SCROLLYTELLING-2026-911
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ProductGallery from "@/components/ProductGallery";

export default function MenCollectionPage() {
  return (
    <main className="min-h-screen bg-[#050505]">
      <Header />
      
      {/* Category Hero Section */}
      <section className="relative h-[70vh] lg:h-[85vh] w-full overflow-hidden flex items-center justify-center pt-20">
        <Image 
          src="/categories/mens.jpeg" 
          alt="Ayoba Hobo Men's Collection" 
          fill 
          className="object-cover object-top lg:object-[65%_25%] opacity-85"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#050505]" />
        
        <div className="relative z-10 text-center px-6">
          <Link href="/collections" className="inline-flex items-center gap-2 text-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-8 hover:text-white transition-colors">
            <ChevronLeft size={16} />
            Back to Collections
          </Link>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter text-white mb-6 uppercase leading-tight">
            Stink like a <br />
            <span className="text-gold italic">real Man</span>
          </h1>
        </div>
      </section>

      {/* Product Grid Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-4">Ayoba Hobo Selection</span>
          <h2 className="text-white text-4xl lg:text-5xl font-bold uppercase tracking-tighter">The <span className="text-gold italic">Aroma</span> Range</h2>
          <div className="w-12 h-[1px] bg-gold mt-6" />
        </div>
        
        <ProductGallery products={[
          { 
            code: "AHMP00M",
            name: "STINK VOET / SMELLY FEET / UNYAWO OLUNUKAYO", 
            description: "Invest your time and adrenaline into what you love to do",
            price: "R165", 
            image: "/products/men/product_1.jpeg",
            volume: "50ML",
            fragranceType: "ORIENTAL WOODY / AMBER",
            vibe: "LUXURIOUS / MYSTERIOUS / MASCULINE",
            bestTime: "NIGHT / SPECIAL OCCASIONS / SOCIAL EVENTS",
            concentration: "PERFUME, MIXED AT 40%, ALCOHOL BASE"
          },
          { 
            code: "AHMP00Q",
            name: "GOM / GLUE / INHLAKA", 
            description: "Knowledge is real power and no one can take it away from you",
            price: "R165", 
            image: "/products/men/product_2.jpeg",
            volume: "50ML",
            fragranceType: "SPICY / FRESH TOUCH",
            vibe: "PLAYFULNESS / EARTHY / BAD BOY EDGE",
            bestTime: "DAY / NIGHT / OFFICE / SOCIAL OUTING",
            concentration: "PERFUME, MIXED AT 40%, ALCOHOL BASE"
          },
          { 
            code: "AHMP00R",
            name: "OLIE / OIL / UWOYELA", 
            description: "Tune up your happiness and make the best of this life",
            price: "R165", 
            image: "/products/men/product_8.jpeg",
            volume: "50ML",
            fragranceType: "MASCULINE / FRESH AROMATIC",
            vibe: "PLAYFUL / BOLD / CONFIDENCE",
            bestTime: "DAY / NIGHT / ALL OCCASIONS",
            concentration: "PERFUME, MIXED AT 40%, ALCOHOL BASE"
          },
          { 
            code: "AHMPOOT",
            name: "WAT? / WHAT? / INI?", 
            description: "Catch your own success",
            price: "R165", 
            image: "/products/men/product_4.jpeg",
            volume: "50ML",
            fragranceType: "FRESH AROMATIC / SPICY",
            vibe: "FRESH / PARTY MOOD / ENJOYMENT",
            bestTime: "DAY / NIGHT / FORMAL / SOCIAL EVENTS",
            concentration: "PERFUME, MIXED AT 40%, ALCOHOL BASE"
          },
          { 
            code: "AHMP00V",
            name: "PAP / PORRIDGE / IPAPA", 
            description: "The game is not over until the last ball is sunk",
            price: "R165", 
            image: "/products/men/product_5.jpeg",
            volume: "50ML",
            fragranceType: "SPICY / WOODY",
            vibe: "ENJOYMENT / CONFIDENCE / BOLD",
            bestTime: "NIGHT TIME",
            concentration: "PERFUME, MIXED AT 40%, ALCOHOL BASE"
          },
          { 
            code: "AHMP00W",
            name: "SE’ WAT? / SAY WHAT? / KONJE?", 
            description: "Miracles do happen when you believe in them",
            price: "R165", 
            image: "/products/men/product_6.jpeg",
            volume: "50ML",
            fragranceType: "WOODY / WARM SWEET",
            vibe: "SLIGHTLY MYSTERIOUS / LUXURIOUS / ROMANTIC",
            bestTime: "NIGHT TIME / FORMAL / SPECIAL OCCASIONS",
            concentration: "PERFUME, MIXED AT 40%, ALCOHOL BASE"
          },
          { 
            code: "AHMP00X",
            name: "HOUDING / ATTITUDE / ISIMO", 
            description: "It's never too late to score",
            price: "R165", 
            image: "/products/men/product_7.jpeg",
            volume: "50ML",
            fragranceType: "ORIENTAL SPICY / FRESH TOP NOTE",
            vibe: "DARING / GLAMOROUS / HANDSOME",
            bestTime: "NIGHT / FORMAL / SPECIAL OCCASIONS",
            concentration: "PERFUME, MIXED AT 40%, ALCOHOL BASE"
          },

          { 
            code: "AHMP00Z",
            name: "SPOEG / SPIT / AMATHE", 
            description: "Yes life can be hard, that is why you have knees to go down on",
            price: "R165", 
            image: "/products/men/rugby.jpeg",
            volume: "50ML",
            fragranceType: "FRESH AQUATIC / SLIGHTLY HERBAL",
            vibe: "EASY GOING / FRESH / RELAXED",
            bestTime: "DAY / CASUAL / OUTDOORS / OFFICE FRIENDLY",
            concentration: "PERFUME, MIXED AT 40%, ALCOHOL BASE"
          },
        ]} />
      </section>

      <Footer />
    </main>
  );
}

