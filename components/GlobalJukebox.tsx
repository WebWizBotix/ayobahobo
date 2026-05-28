/**
 * © 2026 Bernie Vorster / WebWizSystems
 * 
 * Project: Ayoba Scrollytelling
 * File: components/GlobalJukebox.tsx
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

import { useCart } from "./CartProvider";
import Jukebox from "./Jukebox";

export default function GlobalJukebox() {
  const { isJukeboxOpen, setIsJukeboxOpen } = useCart();
  return (
    <>
      {isJukeboxOpen && (
        <div 
          className="fixed inset-0 z-[2000] pointer-events-none flex items-start justify-center lg:items-start lg:justify-end p-4 md:p-8"
          style={{
            ['--jukebox-top' as string]: '80px',
            ['--jukebox-bottom' as string]: 'auto',
            ['--jukebox-left' as string]: '50%',
            ['--jukebox-right' as string]: 'auto',
            ['--jukebox-transform' as string]: 'translateX(-50%)',
          } as React.CSSProperties}
        >
          {/* Desktop Overrides */}
          <style jsx global>{`
            @media (min-width: 1024px) {
              .global-jukebox-container {
                --jukebox-top: 100px !important;
                --jukebox-bottom: auto !important;
                --jukebox-left: auto !important;
                --jukebox-right: 32px !important;
                --jukebox-transform: none !important;
              }
            }
          `}</style>
          <div className="global-jukebox-container pointer-events-auto">
            <Jukebox isFixed onClose={() => setIsJukeboxOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
