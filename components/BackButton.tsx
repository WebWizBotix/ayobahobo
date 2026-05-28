/**
 * © 2026 Bernie Vorster / WebWizSystems
 * 
 * Project: Ayoba Scrollytelling
 * File: BackButton.tsx
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

import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  // Don't show on home page
  if (pathname === "/") return null;

  return (
    <AnimatePresence>
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 0.4, x: 0 }}
        whileHover={{ opacity: 1, scale: 1.1 }}
        exit={{ opacity: 0, x: -20 }}
        onClick={() => router.back()}
        className="fixed top-28 left-6 z-[60] p-3 rounded-full bg-white/5 border border-white/10 text-white backdrop-blur-md transition-all group"
        title="Go Back"
      >
        <ArrowLeft size={20} className="group-hover:text-gold transition-colors" />
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-full bg-gold/0 group-hover:bg-gold/5 blur-md transition-all" />
      </motion.button>
    </AnimatePresence>
  );
}

