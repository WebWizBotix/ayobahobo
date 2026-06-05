/**
 * © 2026 Bernie Vorster / WebWizSystems
 * 
 * Project: Ayoba Scrollytelling
 * File: CollectionCard.tsx
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

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface CollectionCardProps {
  title: string;
  image: string;
  href: string;
  description: string;
}

export default function CollectionCard({ title, image, href, description }: CollectionCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative w-full aspect-[4/5] lg:aspect-[3/4] overflow-hidden bg-[#111]"
    >
      <Link href={href} className="block w-full h-full relative">
        {/* Background Image */}
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
        
        {/* Content */}
        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end transition-transform duration-500 group-hover:translate-y-[-10px]">
          <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-1 md:mb-2">Category</span>
          <h3 className="text-white text-3xl md:text-4xl font-bold tracking-tighter mb-2 md:mb-4">{title}</h3>
          <p className="text-white/60 text-xs md:text-sm max-w-[80%] leading-relaxed max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:mb-8 transition-all duration-500 overflow-hidden">
            {description}
          </p>
          
          <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest group/btn">
            Explore Collection
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronRight className="w-4 h-4 text-gold" />
            </motion.div>
          </div>
        </div>

        {/* Decorative Border on Hover */}
        <div className="absolute inset-4 border border-white/0 group-hover:border-white/10 transition-colors duration-500 pointer-events-none" />
      </Link>
    </motion.div>
  );
}

