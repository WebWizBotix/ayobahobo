/**
 * © 2026 Bernie Vorster / WebWizSystems
 * 
 * Project: Ayoba Scrollytelling
 * File: ProductGallery.tsx
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
import { motion } from "framer-motion";
import Lightbox from "./Lightbox";
import { Maximize2 } from "lucide-react";

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

interface ProductGalleryProps {
  products: Product[];
}

export default function ProductGallery({ products }: ProductGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  // const { addToCart } = useCart();

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 py-12">
        {products.map((product, index) => (
          <motion.div
            key={product.code}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative h-[450px] bg-white/5 border border-white/10 overflow-hidden cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            {/* Image Container */}
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-gold/90 rounded-full flex items-center justify-center text-black transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100 shadow-lg shadow-gold/20">
                  <Maximize2 size={24} />
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black via-black/60 to-transparent z-10">
              <div className="flex flex-col gap-1">
                <span className="text-gold text-[10px] uppercase font-bold tracking-[0.2em] mb-1">
                  Premium Selection
                </span>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-bold text-lg uppercase tracking-tight">
                    {product.name}
                  </h3>
                  <span className="text-gold font-bold text-lg">
                    {product.price}
                  </span>
                </div>
                
              </div>
            </div>

            {/* Border glow on hover */}
            <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/30 transition-colors duration-500 pointer-events-none" />
          </motion.div>
        ))}
      </div>

      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        products={products}
        currentIndex={currentIndex}
        onNavigate={setCurrentIndex}
      />
    </div>
  );
}

