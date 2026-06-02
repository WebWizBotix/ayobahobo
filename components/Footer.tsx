/**
 * © 2026 Bernie Vorster / WebWizSystems
 * 
 * Project: Ayoba Scrollytelling
 * File: Footer.tsx
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
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({ subsets: ["latin"] });

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] text-white py-12 px-6 md:px-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        {/* Brand Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Image src="/logos/header-logo.png" alt="Ayoba Hobo" width={48} height={48} className="h-10 w-auto object-contain" />
            <div className={`flex flex-col tracking-widest uppercase text-[10px] leading-tight ${openSans.className}`}>
              <span className="text-white/50 lowercase">Drop Selling International /</span>
              <span className="font-bold text-white tracking-widest text-sm mt-0.5 uppercase">Ayoba Hobo</span>
            </div>
          </div>
          <p className="text-white/40 text-xs max-w-xs font-light tracking-wide leading-relaxed">
            The new standard in luxurious fragrances. Reach for the Untold Happy Secrets.
          </p>
        </div>

        {/* Social Section */}
        <div className="flex flex-col items-start md:items-end gap-6 text-right">
          <div className="flex items-center gap-6">
            <a href="https://www.facebook.com/profile.php?id=61573405146939" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity" title="Facebook">
              <Image src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png" alt="Facebook" width={24} height={24} className="w-6 h-6 grayscale hover:grayscale-0 transition-all" />
            </a>
            <a href="https://www.tiktok.com/@ayoba.hobo.perfume?_r=1&_t=ZS-96sNgcRC8gh" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity" title="TikTok">
              <Image src="https://cdn-icons-png.flaticon.com/512/15713/15713404.png" alt="TikTok" width={24} height={24} className="w-6 h-6 grayscale hover:grayscale-0 transition-all" />
            </a>
            <a href="https://www.instagram.com/ayobahobo?igsh=YXBjbGw2aDMzN2Zn" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity" title="Instagram">
              <Image src="https://cdn-icons-png.flaticon.com/512/4923/4923005.png" alt="Instagram" width={24} height={24} className="w-6 h-6 grayscale hover:grayscale-0 transition-all" />
            </a>
          </div>
          
          <div className="flex flex-col md:items-end gap-3 text-[10px] text-white/50 tracking-widest uppercase font-medium">
             <div className="flex flex-wrap md:justify-end items-center gap-3">
               <span>&copy; {currentYear} Ayoba Hobo</span>
               <span className="opacity-30">|</span>
               <a href="/terms-and-conditions" className="hover:text-gold transition-colors">Terms & Conditions</a>
               <span className="opacity-30">|</span>
               <a href="/ai-disclaimer" className="hover:text-gold transition-colors">AI Disclaimer</a>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

