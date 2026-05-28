/**
 * © 2026 Bernie Vorster / WebWizSystems
 * 
 * Project: Ayoba Scrollytelling
 * File: ProductsSection.tsx
 * 
 * This codebase is proprietary and confidential.
 * Unauthorized use, copying, modification, or distribution is strictly prohibited.
 * 
 * Built & maintained by WebWizSystems
 * https://webwizsystems.com
 * 
 * Created: 2026-04-07
 * Last Updated: 2026-04-13
 * Signature ID: WWZ-AYOBA-SCROLLYTELLING-2026-911
 */

"use client";

import { useState } from "react";
import Image from "next/image";
import TypingTitle from "./TypingTitle";
import ProductGallery from "./ProductGallery";


export default function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  // const { addToCart } = useCart();

  const collections = [
    {
      title: "MEN",
      description: "Bold, woodsy, and uncompromising.",
      cover: "/categories/mens.jpeg",
      products: [
        { name: "Oud Noir", price: "R165", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop", description: "A deep, mysterious blend of rare agarwood and dark spices. Designed for the midnight hour." },
        { name: "Santal Reserve", price: "R165", image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=600&auto=format&fit=crop", description: "Creamy Australian sandalwood paired with cardamom and cedar. A warm, intellectual signature." },
        { name: "Vetiver Smoke", price: "R165", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600&auto=format&fit=crop", description: "Earthy vetiver infused with wisps of white smoke and bergamot. Sophisticated and grounded." },
        { name: "Leather & Spice", price: "R165", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop", description: "Rugged Italian leather balanced by black pepper and saffron. Bold, masculine, and timeless." }
      ]
    },
    {
      title: "WOMEN",
      description: "Elegant, floral, and deeply complex.",
      cover: "/categories/womens.jpeg",
      products: [
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
          name: "SPOEG DRUPPELS / SPIT DROPS", 
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
          name: "VERSKOON MY / EXCUSE ME", 
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
          name: "MY HOUDING / MY ATTITUDE", 
          description: "Do the extreme, you only live once",
          price: "R165", 
          image: "/products/women/product_9.jpeg",
          volume: "50ML",
          fragranceType: "SWEET/ AMBER WOODY",
          vibe: "BOLD / SWEET / ELEGANT",
          bestTime: "NIGHT / ALL OCCASIONS",
          concentration: "PERFUME, MIXED AT 40%, ALCOHOL BASE"
        }
      ]
    },
    {
      title: "TEENAGERS",
      description: "Spray now, Stink lekker, Vibe hard & Never chill",
      cover: "/categories/teenagers.jpeg",
      products: [
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
        }
      ]
    }
  ];

  const activeData = activeCategory ? collections.find(c => c.title === activeCategory) : null;

  return (
    <section 
      id="products" 
      className="relative w-full py-32 px-8 flex flex-col items-center min-h-screen bg-[#050505]"
    >
      {/* Background Banner with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-fixed bg-center opacity-90"
        style={{ backgroundImage: "url('/categories/banner.jpeg')" }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#050505] via-black/20 to-[#050505]" />
      <div className="absolute top-32 left-0 right-0 z-10 hidden md:flex justify-center pointer-events-none">
        <p className="text-[9px] text-white/30 uppercase tracking-widest bg-black/50 px-4 py-1 backdrop-blur-md rounded-full">
          This image contains AI-generated content. No real persons are depicted.
        </p>
      </div>

      <div className="max-w-7xl w-full relative z-10 text-white flex flex-col gap-16">
        
        {/* Header */}
        <div className="flex flex-col items-center">
          <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-4 text-center min-h-[1.2em] flex items-center justify-center">
            <TypingTitle />
          </h2>
          <Image src="/logos/products-logo.png" alt="Ayoba Hobo Logo" width={256} height={256} className="h-48 md:h-64 w-auto object-contain mb-8" />
          <p className="text-white/50 tracking-widest uppercase text-sm md:text-base text-center">Discover your signature</p>
        </div>

        {/* Dynamic View: Either 3 Categories OR 4 Products */}
        {!activeCategory ? (
          // View 1: 3 CATEGORY CARDS
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.map((category) => (
              <div 
                key={category.title} 
                onClick={() => setActiveCategory(category.title)}
                className="group relative cursor-pointer overflow-hidden bg-white/5 border border-white/10"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <Image 
                    src={category.cover} 
                    alt={category.title}
                    width={400}
                    height={533}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity">
                  <h3 className="text-3xl font-light tracking-tight mb-2">{category.title}</h3>
                  <p className="text-white/60 text-sm tracking-wide translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    {category.description}
                  </p>
                  <span className="mt-4 text-xs tracking-widest uppercase border-b border-white w-max pb-1 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                    Explore Line
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-[#050505]/80 backdrop-blur-md p-1.5 z-20">
                  <p className="text-[6px] md:text-[7px] text-white/40 uppercase tracking-widest text-center leading-tight">
                    This image contains AI-generated content. No real persons are depicted.
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // View 2: 4 PRODUCTS FOR ACTIVE CATEGORY
          <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/20 pb-4">
              <div>
                <h3 className="text-3xl tracking-widest uppercase font-light">{activeData?.title}</h3>
                <p className="text-white/60 mt-2 font-light">{activeData?.description}</p>
              </div>
              <button 
                onClick={() => setActiveCategory(null)}
                className="text-sm uppercase tracking-widest hover:text-white/60 transition-colors mt-4 md:mt-0 opacity-80"
              >
                ← Back to Collections
              </button>
            </div>

            <ProductGallery 
              products={activeData?.products.map(p => ({
                ...p,
                code: (p as { code?: string }).code || "AH-GEN",
                description: (p as { description?: string }).description || "A signature Ayoba Hobo fragrance, hand-mixed for unmatched longevity and character."
              })) || []} 
            />
          </div>
        )}

        {/* Bottom CTA */}
        <div className="py-32 flex flex-col items-center justify-center text-center mt-12 bg-black/40 border-y border-white/10 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter mb-6">NOT SURE WHERE TO START?</h2>
            <p className="text-white/60 text-lg md:text-xl font-light tracking-wide mb-10 max-w-xl mx-auto">
              Take our artisan scent profile quiz to discover the perfect fragrance tailored to your unique chemistry.
            </p>
            <button className="px-10 py-5 bg-white text-black hover:bg-white/90 font-medium tracking-widest uppercase transition-colors">
              Find Your Scent
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

