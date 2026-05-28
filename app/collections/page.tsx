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
 * Last Updated: 2026-04-07
 * Signature ID: WWZ-AYOBA-SCROLLYTELLING-2026-911
 */

"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CollectionCard from "@/components/CollectionCard";
import Image from "next/image";
import TypingTitle from "@/components/TypingTitle";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Copy, Check } from "lucide-react";

export default function CollectionsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const copyToClipboard = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const collections = [
    {
      title: "Men",
      description: "Powerful and sophisticated fragrances designed for the modern man. Stay happy, stay inspired.",
      image: "/categories/mens.jpeg",
      href: "/collections/men"
    },
    {
      title: "Women",
      description: "Elegant and captivating scents that celebrate the beauty and strength of femininity.",
      image: "/categories/womens.jpeg",
      href: "/collections/women"
    },
    {
      title: "Teenagers",
      description: "Fresh and vibrant fragrances for a new generation. Celebrate life's untold happy secrets.",
      image: "/categories/teenagers.jpeg",
      href: "/collections/teenagers"
    }
  ];

  return (
    <main className="min-h-screen bg-[#050505]">
      <Header />
      
      {/* Hero Banner Section */}
      <section className="relative h-[60vh] lg:h-[70vh] w-full overflow-hidden flex items-center justify-center pt-20">
        <Image 
          src="/categories/banner.jpeg" 
          alt="Ayoba Hobo Collections" 
          fill 
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-transparent to-[#050505]" />
        
        <div className="relative z-10 text-center px-6">
          <span className="text-gold tracking-[0.3em] text-[10px] uppercase mb-4 block font-bold">
            Ayoba Hobo
          </span>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter text-white mb-6 uppercase flex items-center justify-center min-h-[1.2em]">
            <TypingTitle 
              baseText="Our real "
              firstWord="Parrafin"
              secondWord="Perfume"
              highlightClass="text-gold italic"
            />
          </h1>
          <p className="text-white/60 text-sm lg:text-base max-w-xl mx-auto leading-relaxed">
            Every bottle tells a story of happiness and resilience. Discover the fragrance that reflects your spirit.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 -mt-24 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((item, index) => (
            <CollectionCard 
              key={index}
              title={item.title}
              description={item.description}
              image={item.image}
              href={item.href}
            />
          ))}
        </div>
      </section>

      {/* Shop All Call to Action */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center border-t border-white/5">
        <h2 className="text-white text-3xl font-bold mb-8">
          Ready to <span className="text-gold italic">experience</span> the fragrance?
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href="/#scent" 
            className="px-10 py-5 bg-gold text-black font-bold uppercase text-xs tracking-widest hover:bg-white transition-colors"
          >
            The Scent Selection
          </a>
          <button 
            onClick={() => setIsOpen(true)}
            className="px-10 py-5 border border-white/20 text-white font-bold uppercase text-xs tracking-widest hover:border-gold transition-colors"
          >
            Contact Specialist
          </button>
        </div>
      </section>

      {/* Contact Specialist Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] z-10 flex flex-col font-sans text-white"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors p-1 rounded-full hover:bg-white/5"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center text-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gold/10 text-gold rounded-full flex items-center justify-center">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-wider text-white">Contact Specialist</h3>
                  <p className="text-[10px] text-gold uppercase tracking-[0.2em] mt-1 font-bold">Direct Inquiries</p>
                </div>
              </div>

              <p className="text-sm text-white/60 leading-relaxed text-center mb-8">
                If you would like any further information, please contact our team directly at the following email addresses:
              </p>

              <div className="flex flex-col gap-4">
                {[
                  "sales@dropselling.com",
                  "info@dropselling.com"
                ].map((email) => (
                  <div 
                    key={email} 
                    className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-4 hover:border-gold/30 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Mail size={16} className="text-gold/60" />
                      <a 
                        href={`mailto:${email}`} 
                        className="text-sm font-semibold tracking-wider hover:text-gold transition-colors text-white/90"
                      >
                        {email}
                      </a>
                    </div>
                    
                    <button 
                      onClick={() => copyToClipboard(email)}
                      className="text-white/40 hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-lg"
                      title="Copy email to clipboard"
                    >
                      {copiedEmail === email ? (
                        <Check size={14} className="text-green-500" />
                      ) : (
                        <Copy size={14} className="group-hover:opacity-100 opacity-60 transition-opacity" />
                      )}
                    </button>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setIsOpen(false)}
                className="w-full py-4 bg-white hover:bg-gold text-black font-black uppercase tracking-[0.2em] text-[11px] transition-colors rounded-xl mt-8"
              >
                CLOSE
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}

