/**
 * © 2026 Bernie Vorster / WebWizSystems
 * 
 * Project: Ayoba Scrollytelling
 * File: Lightbox.tsx
 * 
 * This codebase is proprietary and confidential.
 * Unauthorized use, copying, modification, or distribution is strictly prohibited.
 * 
 * Built & maintained by WebWizSystems
 * https://webwizsystems.com
 * 
 * Created: 2026-04-07
 * Last Updated: 2026-04-14
 * Signature ID: WWZ-AYOBA-SCROLLYTELLING-2026-911
 */

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ShoppingCart, Info } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { useCart } from "./CartProvider";

interface Product {
  code: string;
  name: string;
  price: string;
  image: string;
  description?: string;
  volume?: string;
  fragranceType?: string;
  vibe?: string;
  bestTime?: string;
  concentration?: string;
}

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ isOpen, onClose, products, currentIndex, onNavigate }: LightboxProps) {
  const { addToCart } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex - 1 + products.length) % products.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex + 1) % products.length);
  };

  const product = products[currentIndex];

  const specs = [
    { label: "Volume", value: product.volume },
    { label: "Scent Type", value: product.fragranceType },
    { label: "Vibe / Mood", value: product.vibe },
    { label: "Best Time", value: product.bestTime },
    { label: "Concentration", value: product.concentration },
  ].filter(spec => spec.value);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black p-0"
          onClick={onClose}
        >
          {/* Close Button - Moved inside the relative container or kept absolute for mobile */}
          <button
            className="absolute top-6 right-6 text-white/80 hover:text-gold transition-colors z-[120] p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10"
            onClick={onClose}
          >
            <X size={24} />
          </button>

          <div 
            className="relative w-full h-full flex flex-col lg:flex-row items-center overflow-y-auto lg:overflow-hidden no-scrollbar bg-black lg:bg-[#050505] lg:max-w-7xl lg:max-h-[85vh] lg:rounded-xl lg:border lg:border-white/10 lg:shadow-2xl lg:shadow-black/50" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Section */}
            <motion.div
              key={`img-${currentIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-full aspect-square lg:aspect-auto lg:flex-[1.2] lg:h-full"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover lg:object-center"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent lg:hidden" />
            </motion.div>

            {/* Content Section */}
            <div className="w-full lg:flex-[0.8] lg:h-full px-8 py-10 lg:px-12 lg:py-16 flex flex-col gap-8 lg:justify-between bg-black lg:border-l lg:border-white/10 overflow-y-auto no-scrollbar">
              
              <div className="flex flex-col gap-8">
                {/* Product Title & Navigation */}
                <div className="relative flex flex-col items-center lg:items-start text-center lg:text-left">
                  <span className="text-gold text-[10px] uppercase tracking-[0.4em] font-bold mb-4 block">
                    Premium Selection
                  </span>
                  
                  <div className="relative w-full flex flex-col items-center lg:items-start">
                    {/* Title Area */}
                    <div className="flex flex-col items-center lg:items-start gap-2 mb-4">
                      <h2 className="text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-black text-white uppercase tracking-tighter leading-tight">
                        {product.name}
                      </h2>
                      <span className="text-gold text-2xl md:text-3xl lg:text-4xl font-serif italic">
                        {product.price}
                      </span>
                      <div className="w-16 h-[2px] bg-gold/40 mt-1" />
                    </div>

                    {/* Nav Arrows - Positioned below the title area for cleaner desktop layout */}
                    <div className="flex items-center gap-4 mt-2 lg:mt-4">
                      <button
                        className="p-3 bg-white/5 rounded-full text-white/40 hover:text-gold transition-colors hover:bg-white/10"
                        onClick={handlePrevious}
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        className="p-3 bg-white/5 rounded-full text-white/40 hover:text-gold transition-colors hover:bg-white/10"
                        onClick={handleNext}
                      >
                        <ChevronRight size={24} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Scent Story & Description */}
                <div className="space-y-3 text-center lg:text-left pt-2">
                  <h4 className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold">The Scent Story</h4>
                  <p 
                    className="text-white/80 text-lg lg:text-xl leading-relaxed font-light italic max-w-lg lg:max-w-none mx-auto lg:mx-0"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    {product.description || "Energizing yuzu and lime with a fizzy sugar kick. Bright, loud, and full of pure energy."}
                  </p>
                </div>

                {/* Technical Profile */}
                {specs.length > 0 && (
                  <div className="grid grid-cols-1 gap-3 py-6 border-y border-white/5">
                    <div className="flex items-center justify-center lg:justify-start gap-2 text-gold/60 mb-1">
                        <Info size={12} />
                        <h4 className="text-[9px] uppercase tracking-widest font-bold">Artisan Metadata</h4>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {specs.map((spec) => (
                        <div key={spec.label} className="flex justify-between items-center text-[11px] border-b border-white/[0.03] pb-1.5 last:border-0 last:pb-0">
                          <span className="text-white/30 uppercase tracking-widest text-[9px]">{spec.label}</span>
                          <span className="text-white/70 italic text-right text-[12px]">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Section */}
              <div className="flex flex-col gap-6 mt-6 lg:mt-auto">
                <button
                  onClick={() => {
                    addToCart({ name: product.name, price: product.price, image: product.image });
                  }}
                  className="w-full bg-gold hover:bg-white text-black py-5 rounded-sm flex items-center justify-center gap-3 transition-all duration-500 font-bold uppercase text-[12px] tracking-[0.3em] shadow-[0_10px_30px_rgba(212,175,55,0.15)]"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
                
                <div className="flex flex-col items-center lg:items-start gap-6">
                   <p className="text-white/30 text-[9px] text-center lg:text-left uppercase tracking-[0.15em] leading-loose max-w-xs">
                    Hand-mixed at 40% concentration for unmatched longevity
                  </p>
                  
                  {/* Pagination Stats */}
                  <div className="w-full flex items-center justify-between pt-6 border-t border-white/10">
                    <span className="text-white/20 text-[9px] font-bold tracking-widest uppercase">
                      {currentIndex + 1} / {products.length}
                    </span>
                    
                    <div className="flex gap-2">
                      {products.map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-gold w-4' : 'bg-white/10'}`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

