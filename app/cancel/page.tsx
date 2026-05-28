/**
 * © 2026 Bernie Vorster / WebWizSystems
 * 
 * Project: Ayoba Scrollytelling
 * File: app/cancel/page.tsx
 * 
 * This codebase is proprietary and confidential.
 * Unauthorized use, copying, modification, or distribution is strictly prohibited.
 * 
 * Built & maintained by WebWizSystems
 * https://webwizsystems.com
 * 
 * Created: 2026-04-24
 * Last Updated: 2026-04-24
 * Signature ID: WWZ-AYOBA-SCROLLYTELLING-2026-911
 */

"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="min-h-screen bg-[#050505] flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center p-8 pt-32">
        <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-8">
          <XCircle size={40} strokeWidth={1.5} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-center mb-4 text-white">Payment Cancelled</h1>
        <p className="text-white/40 text-sm text-center max-w-md mb-12 uppercase tracking-widest font-medium">
          Your transaction was not completed. No funds were deducted from your account.
        </p>
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-sm">
          <Link 
            href="/" 
            className="flex-1 py-4 bg-white text-black font-black uppercase tracking-[0.2em] text-[11px] hover:bg-gold transition-all duration-500 rounded-xl text-center"
          >
            Try Again
          </Link>
          <Link 
            href="/collections" 
            className="flex-1 py-4 bg-white/5 border border-white/10 text-white font-black uppercase tracking-[0.2em] text-[11px] hover:bg-white/10 transition-all duration-500 rounded-xl text-center"
          >
            Collections
          </Link>
        </div>
      </div>
      <Footer />
      <script dangerouslySetInnerHTML={{ __html: `window.__WWZ_SIGNATURE__ = "WWZ-AYOBA-SCROLLYTELLING-2026-911"; console.log("Built by WebWizSystems — Signature: WWZ-AYOBA-SCROLLYTELLING-2026-911");` }} />
    </main>
  );
}
