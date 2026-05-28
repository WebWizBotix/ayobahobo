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

export default function WomenCollectionPage() {
  return (
    <main className="min-h-screen bg-[#050505]">
      <Header />
      
      {/* Category Hero Section */}
      <section className="relative h-[70vh] lg:h-[85vh] w-full overflow-hidden flex items-center justify-center pt-20">
        <Image 
          src="/categories/womens.jpeg" 
          alt="Ayoba Hobo Women's Collection" 
          fill 
          className="object-cover object-top lg:object-[center_35%] opacity-85"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#050505]" />
        
        <div className="relative z-10 text-center px-6">
          <Link href="/collections" className="inline-flex items-center gap-2 text-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-8 hover:text-white transition-colors">
            <ChevronLeft size={16} />
            Back to Collections
          </Link>
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tighter text-white mb-6 uppercase leading-tight max-w-2xl mx-auto">
            Stink pretty and smell like <br />
            <span className="text-gold italic">an expensive decision</span>
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
            code: "AHFP00013",
            name: "IETS / SOMETHING / OKUTHILE", 
            description: "It's okay to take time for yourself",
            price: "R165", 
            image: "/products/women/product_6.jpeg",
            volume: "50ML",
            fragranceType: "AMBER WOODY / FLORAL FRUITY",
            vibe: "SMOOTH / WARM / ATTENTION GRABBING",
            bestTime: "NIGHT / DATES / CASUAL OCCASIONS",
            concentration: "PERFUME, MIXED AT 40%, ALCOHOL BASE"
          },
          { 
            code: "AHFP00015",
            name: "SPOEG DRUPPELS / SPIT DROPS / AMACONSI AMATHE", 
            description: "Life is not what you wear on the outside, it's what you wear in your heart",
            price: "R165", 
            image: "/products/women/product_7.jpeg",
            volume: "50ML",
            fragranceType: "BRIGHT SWEET / ORIENTAL VANILLA",
            vibe: "GLAMOROUS / EDGY / OUTGOING",
            bestTime: "DAY / NIGHT / SOCIAL EVENTS",
            concentration: "PERFUME, MIXED AT 40%, ALCOHOL BASE"
          },
          { 
            code: "AHFP00020",
            name: "VERSKOON MY / EXCUSE ME / ANGIZWANGA", 
            description: "Make time for those you love and also don't love",
            price: "R165", 
            image: "/products/women/product_8.jpeg",
            volume: "50ML",
            fragranceType: "AMBER WOODY / FLORAL FRUITY",
            vibe: "READY TO GO / DOMINANT / SEXY",
            bestTime: "NIGHT / DAY / DATE NIGHTS / SOCIAL EVENTS",
            concentration: "PERFUME, MIXED AT 40%, ALCOHOL BASE"
          },
          { 
            code: "AHFP00021",
            name: "MY HOUDING / MY ATTITUDE / UMTHETHO WAMI", 
            description: "Do the extreme, you only live once",
            price: "R165", 
            image: "/products/women/product_9.jpeg",
            volume: "50ML",
            fragranceType: "SWEET/ AMBER WOODY",
            vibe: "BOLD / SWEET / ELEGANT",
            bestTime: "NIGHT / ALL OCCASIONS",
            concentration: "PERFUME, MIXED AT 40%, ALCOHOL BASE"
          },
          { 
            code: "AHFP00022",
            name: "LOS MY UIT! / LEAVE ME ALONE! / NGIYEKE PHAMSI!", 
            description: "Let your catwalk display your inner beauty",
            price: "R165", 
            image: "/products/women/product_11.jpeg",
            volume: "50ML",
            fragranceType: "ORIENTAL VANILLA / SWEET FLORAL",
            vibe: "CONFIDANTS / FLIRTY / PEACEFULNESS",
            bestTime: "NIGHT / DAY / SOCIAL EVENTS",
            concentration: "PERFUME, MIXED AT 40%, ALCOHOL BASE"
          },
          { 
            code: "AHFP00025",
            name: "WAT DINK JY? / WHAT DO YOU THINK? / UCABANGANI?", 
            description: "You are more worth than any idolstone, so take good care of yourself",
            price: "R165", 
            image: "/products/women/product_12.jpeg",
            volume: "50ML",
            fragranceType: "CHYPRE FRUITY / ORIENTAL FLORAL",
            vibe: "SOFT / GLAMOROUS / HAPPINESS",
            bestTime: "DAY / NIGHT / FORMAL / CASUAL EVENTS",
            concentration: "PERFUME, MIXED AT 40%, ALCOHOL BASE"
          },
        ]} />
      </section>

      <Footer />
    </main>
  );
}

