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
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ProductGallery from "@/components/ProductGallery";

export default function TeenagersCollectionPage() {
  return (
    <main className="min-h-screen bg-[#050505]">
      <Header />
      
      {/* Category Hero Section */}
      <section className="relative h-[70vh] lg:h-[85vh] w-full overflow-hidden flex items-center justify-center pt-20">
        <Image 
          src="/categories/teenagers.jpeg" 
          alt="Ayoba Hobo Teenagers Collection" 
          fill 
          className="object-cover object-top lg:object-center opacity-85"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#050505]" />
        
        <div className="relative z-10 text-center px-6">
          <Link href="/collections" className="inline-flex items-center gap-2 text-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-8 hover:text-white transition-colors">
            <ChevronLeft size={16} />
            Back to Collections
          </Link>
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tighter text-white mb-6 uppercase leading-tight max-w-4xl mx-auto">
            Spray now, Stink lekker, <br />
            <span className="text-gold italic">Vibe hard & Never chill</span>
          </h1>
        </div>
      </section>

      {/* For Him Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 pb-0">
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-4">Ayoba Hobo Selection</span>
          <h2 className="text-white text-4xl lg:text-5xl font-bold uppercase tracking-tighter">Aroma Range <span className="text-gold italic">For Him</span></h2>
          <div className="w-12 h-[1px] bg-gold mt-6" />
        </div>
        
        <ProductGallery products={[
          { 
            code: "AHTBP00A", 
            name: "STOF / DUST / UTHULI", 
            description: "Never forget those who care and love you",
            price: "R165", 
            image: "/products/teenagers/product_1.jpeg", 
            volume: "50ML",
            fragranceType: "WOODY / SPICY / FRESH AROMATIC",
            vibe: "POLISHED / LUXURIOUS / ROMANCE",
            bestTime: "NIGHT / SMART CASUAL EVENTS / DATE NIGHTS",
            concentration: "PERFUME, MIXED AT 40%, ALCOHOL BASE"
          },
          { 
            code: "AHTBP00B", 
            name: "TAMATIE SOUS / TOMATO SAUCE / USOSO KATAMATISI", 
            description: "Let the rush of life build you and not break you",
            price: "R165", 
            image: "/products/teenagers/product_2.jpeg", 
            volume: "50ML",
            fragranceType: "WOODY CITRUS / FRESH",
            vibe: "DARING / CONFIDENCE / BOLD",
            bestTime: "DAY / NIGHT / FROMAL EVENTS",
            concentration: "PERFUME, MIXED AT 40%, ALCOHOL BASE"
          },
          { 
            code: "AHTBP00C", 
            name: "Sê wat? / Say what? / Konje?", 
            description: "Life is a party, make the best of it in a responsible way",
            price: "R165", 
            image: "/products/teenagers/product_3.jpeg", 
            volume: "50ML",
            fragranceType: "SPICY / SOFT SWEET",
            vibe: "WARM / OUTGOING / SOCIAL",
            bestTime: "NIGHT / SMART CASUAL EVENTS",
            concentration: "PERFUME, MIXED AT 40%, ALCOHOL BASE"
          },
          { 
            code: "AHTBP00D", 
            name: "GOM / GLUE / INHLAKA", 
            description: "To give up in life is easy, but working through the storms is hard but much rewarding",
            price: "R165", 
            image: "/products/teenagers/product_4.jpeg", 
            volume: "50ML",
            fragranceType: "WOODY AROMATIC",
            vibe: "APPEALING / BALANCED / PARTY MOOD",
            bestTime: "DAY / NIGHT / FORMAL & SOCIAL EVENTS",
            concentration: "PERFUME, MIXED AT 40%, ALCOHOL BASE"
          },
        ]} />
      </section>

      {/* For Her Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-4">Ayoba Hobo Selection</span>
          <h2 className="text-white text-4xl lg:text-5xl font-bold uppercase tracking-tighter">Aroma Range <span className="text-gold italic">For Her</span></h2>
          <div className="w-12 h-[1px] bg-gold mt-6" />
        </div>
        
        <ProductGallery products={[
          { 
            code: "AHTGP003", 
            name: "MY HOUDING / MY ATTITUDE / UMTHETHO WAMI", 
            description: "Love as much as the stars and enjoy a long life",
            price: "R165", 
            image: "/products/teenagers/product_6.jpg", 
            volume: "50ML",
            fragranceType: "CANDY SWEET / FRUITY FLORAL / GOURMAND",
            vibe: "FUN / VERY YOUTHFUL / PLAYFUL",
            bestTime: "DAY / NIGHT / FUN & PLAYFUL EVENTS",
            concentration: "PERFUME, MIXED AT 40%, ALCOHOL BASE"
          },
          { 
            code: "AHTGP005", 
            name: "BLOMME / FLOWERS / IZIMBALI", 
            description: "People are more attracted to inner beauty",
            price: "R165", 
            image: "/products/teenagers/product_5.jpg", 
            volume: "50ML",
            fragranceType: "FRUITY FLORAL / SWEET",
            vibe: "FUN IN THE SUN / PARTY MOOD / HAPPINESS",
            bestTime: "DAY TIME / CASUAL EVENTS",
            concentration: "PERFUME, MIXED AT 40%, ALCOHOL BASE"
          },
          { 
            code: "AHTGP006", 
            name: "WAT? / WHAT? / INI?", 
            description: "Always party with the crowd that will motivate you to do better",
            price: "R165", 
            image: "/products/teenagers/product_7.jpg", 
            volume: "50ML",
            fragranceType: "GOURMAND / FLORAL",
            vibe: "FUN GIRLY / CONFIDENCE / OUT GOING",
            bestTime: "NIGHT / FORMAL / CASUAL",
            concentration: "PERFUME, MIXED AT 40%, ALCOHOL BASE"
          },
          { 
            code: "AHTGP007", 
            name: "SOUS / GRAVY / ISOBHO", 
            description: "Let your humbleness entertain everyone in the world",
            price: "R165", 
            image: "/products/teenagers/product_8.jpg", 
            volume: "50ML",
            fragranceType: "FLORAL SWEET",
            vibe: "FEMININE / ELEGANCE / ROMANCE",
            bestTime: "DAY / NIGHT / ALL OCCASIONS",
            concentration: "PERFUME, MIXED AT 40%, ALCOHOL BASE"
          },
        ]} />
      </section>

      <Footer />
    </main>
  );
}

