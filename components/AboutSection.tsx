/**
 * © 2026 Bernie Vorster / WebWizSystems
 * 
 * Project: Ayoba Scrollytelling
 * File: AboutSection.tsx
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

import Image from "next/image";

export default function AboutSection() {
  
  return (
    <section id="about" className="relative w-full bg-[#050505] text-white border-t border-white/10 flex flex-col md:flex-row min-h-screen">

      {/* Visual Half (Sticky on Desktop) */}
      <div className="w-full md:w-1/2 h-[60vh] md:h-screen md:sticky md:top-0 relative overflow-hidden bg-black flex items-center justify-center p-12 md:p-24">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image
          src="/Logo Header/logo.png"
          alt="Drop Selling International Logo"
          width={800}
          height={600}
          className="max-w-[80%] max-h-[60%] object-contain relative z-20 opacity-90 brightness-[1.1] transition-transform duration-700 hover:scale-[1.02]"
        />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#050505] to-transparent md:hidden" />
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-transparent to-[#050505] hidden md:block" />
      </div>

      {/* Copy Half (Scrolling) */}
      <div className="w-full md:w-1/2 flex items-center p-8 md:p-16 lg:p-24 relative z-30 -mt-16 md:mt-0">
        <div className="max-w-xl mx-auto flex flex-col gap-8 md:gap-12">

          <div className="mb-4">
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter mb-4 uppercase">OUR STORY.</h2>
            <p className="tracking-widest uppercase text-white/50 text-sm md:text-base border-b border-white/10 pb-4">
              Drop Selling International
            </p>
          </div>

          <div className="flex flex-col gap-10 text-white/80 font-light text-lg md:text-xl leading-relaxed tracking-wide">
            <div>
              <h3 className="text-gold font-bold uppercase text-xs tracking-[0.3em] mb-4">Our mission</h3>
              <p>
                Drop Selling International was created to provide a global platform where emerging entrepreneurs can showcase their unique and quality hand-crafted products to the world. We believe innovation and creativity deserve recognition, and our mission is to connect talented creators with a wider audience. Being a marketplace, we are passionate about empowering entrepreneurs to grow sustainable businesses by offering customers happiness knowing they have access to quality products made with passion and love.
              </p>
            </div>

            <div>
              <h3 className="text-gold font-bold uppercase text-xs tracking-[0.3em] mb-4">Our vision</h3>
              <p>
                Our vision is to become a trusted international platform known for quality, affordability, and opportunity—where customers discover great products and entrepreneurs turn ideas into success.
              </p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}

