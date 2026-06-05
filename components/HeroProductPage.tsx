/**
 * © 2026 Bernie Vorster / WebWizSystems
 * 
 * Project: Ayoba Scrollytelling
 * File: HeroProductPage.tsx
 * 
 * This codebase is proprietary and confidential.
 * Unauthorized use, copying, modification, or distribution is strictly prohibited.
 * 
 * Built & maintained by WebWizSystems
 * https://webwizsystems.com
 * 
 * Created: 2026-04-07
 * Last Updated: 2026-04-15
 * Signature ID: WWZ-AYOBA-SCROLLYTELLING-2026-911
 */

"use client";

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from './CartProvider';

export default function HeroProductPage() {
  const { addToCart } = useCart();
  const containerRef = useRef(null);
  
  // useInView to trigger the cinematic slide-up when entering the viewport
  const isInView = useInView(containerRef, { once: true, amount: 0.01 });

  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const products = [
    { 
      name: "My Attitude", 
      image: "/Sticky perfume/Transparent Perfume NO BG.png" 
    },
    { 
      name: "Smelly Feet", 
      image: "/Heroproducts/Transparent Perfumemenhero.png" 
    },
    { 
      name: "Spit Drops", 
      image: "/Heroproducts/Transparent Perfumewomenhero.png" 
    },
  ];

  const handleAddToCart = () => {
    addToCart({
      name: products[currentProductIndex].name,
      price: "R165",
      image: products[currentProductIndex].image,
    });
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentProductIndex((prev) => (prev + newDirection + products.length) % products.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section 
      id="scent"
      ref={containerRef}
      className="relative w-full lg:h-screen bg-[#050505] overflow-y-auto lg:overflow-hidden z-[5]"
    >
      <main 
        className="flex flex-col lg:flex-row min-h-screen lg:h-screen w-full bg-[#050505] relative"
        style={{
          background: "radial-gradient(circle at center, #1a1f12 0%, #050505 80%)",
        }}
      >
        {/* Background Overlay (Unified texture for depth) */}
        <div className="absolute inset-0 bg-transparent pointer-events-none">
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        </div>

        {/* Left Column (Desktop) / Bottom Section (Mobile): About Us */}
        <section className="w-full lg:w-[30%] h-auto lg:h-full flex flex-col justify-center px-6 pt-8 pb-16 lg:py-12 lg:pl-16 lg:pr-8 bg-transparent relative overflow-hidden order-3 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 1.0, delay: 0.5, ease: "easeOut" }}
            className="relative z-20"
          >
            <span className="text-gold tracking-[0.3em] text-xs lg:text-[10px] uppercase mb-6 block font-bold">
              Ayoba Hobo
            </span>

            <div className="font-sans text-gray-400 text-sm lg:text-xs max-w-xs mb-10 leading-relaxed space-y-4">
              <p className="font-bold text-gold uppercase tracking-widest text-xs lg:text-[11px]">About Us — Ayoba Hobo</p>
              <p>
                Ayoba Hobo is a perfume brand created for generations to follow. Built on simple but powerful life lessons in mind to encourage people to stay happy, to feel inspire, to feel confidence and to celebrate life&apos;s Untold Happy Secrets.
              </p>
              <p>
                Inspired by the resilience of real-life hobos—who find joy and meaning despite life&apos;s hardships—the brand reflects a spirit of freedom, hope, and appreciation for everyday beauty.
              </p>
              <p>
                Ayoba Hobo creates high-quality and real perfumes by blending inspired perfumes to create new luxurious and lasting fragrances that yet remain affordable, making the experience of “luxurious happiness” accessible to everyone at affordable rates.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Center Column: Product Display */}
        <section className="w-full lg:w-[40%] h-[80vh] lg:h-full relative flex items-center justify-center px-8 pt-32 lg:pt-0 overflow-hidden bg-transparent order-1 lg:order-2">
          {/* Moved Titles to Center */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 1.0, delay: 0.8, ease: "easeOut" }}
            className="absolute top-4 lg:top-6 left-0 right-0 z-30 flex flex-col items-center pointer-events-none"
          >
            <h1 className="font-display text-4xl lg:text-7xl font-bold leading-tight text-white uppercase text-center drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">
              This week&apos;s <br />
              <span className="text-gold italic">Top Stinks</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1.0, delay: 1.0, ease: "easeOut" }}
            className="absolute bottom-8 lg:bottom-12 left-0 right-0 z-30 flex flex-col items-center pointer-events-none"
          >
            <h4 className="font-display text-2xl lg:text-4xl text-white font-bold leading-tight text-center drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
              {products[currentProductIndex].name} <br />
              <span className="text-gold italic text-xl lg:text-2xl">Untold happy secrets</span>
            </h4>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -200 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: -200 }}
            transition={{ duration: 2.0, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 w-full max-w-[280px] lg:max-w-md aspect-[3/4] flex items-center justify-center p-4"
          >
            {/* Decorative glow behind bottle - Amber/Gold to match liquid */}
            <div className="absolute inset-0 bg-gold/20 blur-[100px] rounded-full scale-75" />
            
            {/* Navigation Arrows */}
            <button 
              onClick={() => paginate(-1)}
              className="absolute left-[-40px] lg:left-[-80px] z-50 p-2 lg:p-4 text-white/50 hover:text-gold transition-colors group"
            >
              <ChevronLeft className="w-10 h-10 lg:w-16 lg:h-16 group-hover:scale-110 transition-transform" />
            </button>
            <button 
              onClick={() => paginate(1)}
              className="absolute right-[-40px] lg:right-[-80px] z-50 p-2 lg:p-4 text-white/50 hover:text-gold transition-colors group"
            >
              <ChevronRight className="w-10 h-10 lg:w-16 lg:h-16 group-hover:scale-110 transition-transform" />
            </button>

            <div className="relative w-full h-[85%] z-30">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentProductIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Image 
                    src={products[currentProductIndex].image} 
                    alt="Ayoba Hobo Perfume" 
                    width={600}
                    height={800}
                    className="h-full w-auto object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.6)]"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Floating particle effects */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0.1, 0.4, 0.1],
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute w-1 h-1 bg-gold rounded-full"
                  style={{
                    top: `${15 + Math.random() * 70}%`,
                    left: `${15 + Math.random() * 70}%`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </section>

        {/* Right Column (Desktop) / Second Section (Mobile): Actions & Price */}
        <section className="w-full lg:w-[30%] h-auto lg:h-full flex flex-col justify-center px-6 py-12 lg:pr-16 lg:pl-8 bg-transparent relative overflow-hidden order-2 lg:order-3">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 1.0, delay: 0.5, ease: "easeOut" }}
            className="relative z-20 flex flex-col gap-8"
          >
            <div className="space-y-4">
              <span className="text-[10px] text-gold uppercase tracking-[0.2em] font-bold">The Experience</span>
              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-5xl lg:text-6xl font-display font-bold text-white">R165</span>
              </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={handleAddToCart}
                className="w-full bg-gold hover:bg-[#c5a02d] text-black px-8 py-5 rounded-none font-bold tracking-[0.2em] uppercase text-xs transition-all flex items-center justify-center gap-3 group cursor-pointer shadow-lg shadow-gold/10"
              >
                Add to Cart
                <ShoppingCart size={18} className="group-hover:scale-110 transition-transform" />
              </button>
              
              <Link href="/collections" className="w-full">
                <button className="w-full border border-white/20 hover:border-gold text-white px-8 py-5 rounded-none font-bold tracking-[0.2em] uppercase text-xs transition-all flex items-center justify-center gap-3 cursor-pointer group">
                  More Products
                  <Info size={18} className="group-hover:scale-110 transition-transform" />
                </button>
              </Link>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest">Collection</span>
                  <span className="text-[10px] text-white font-bold">Untold Secrets</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest">Availability</span>
                  <span className="text-[10px] text-white font-bold">In Stock</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Vertical Rail Text */}
          <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 rotate-180 [writing-mode:vertical-rl] text-[10px] tracking-[0.5em] uppercase text-white/20 font-bold">
            Ayoba Hobo • Street Favourite
          </div>
        </section>
      </main>
    </section>
  );
}

