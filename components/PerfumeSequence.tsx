/**
 * © 2026 Bernie Vorster / WebWizSystems
 * 
 * Project: Ayoba Scrollytelling
 * File: PerfumeSequence.tsx
 * 
 * This codebase is proprietary and confidential.
 * Unauthorized use, copying, modification, or distribution is strictly prohibited.
 * 
 * Built & maintained by WebWizSystems
 * https://webwizsystems.com
 * 
 * Created: 2026-04-07
 * Last Updated: 2026-04-09
 * Signature ID: WWZ-AYOBA-SCROLLYTELLING-2026-911
 */

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import NextImage from "next/image";



const PerfumeSequence = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Detect mobile viewport
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile === null) return; // wait for window measure

    const FRAME_COUNT = 272;
    const folder = "Herofinalprod";

    // Preload images
    const loadImages = async () => {
      setLoaded(0); // Reset for new sequence
      const loadedImages: HTMLImageElement[] = new Array(FRAME_COUNT);
      let count = 0;

      const promises = Array.from({ length: FRAME_COUNT }, (_, i) => {
        return new Promise((resolve) => {
          const img = new Image();
          const frameNumber = (i + 1).toString().padStart(3, "0");
          img.src = `/${folder}/ezgif-frame-${frameNumber}.jpg`;

          img.onload = () => {
            count++;
            setLoaded((count / FRAME_COUNT) * 100);
            loadedImages[i] = img;
            resolve(true);
          };
          img.onerror = () => {
            loadedImages[i] = img;
            resolve(true); // Resolve even on error
          };
        });
      });

      await Promise.all(promises);
      setImages(loadedImages);
    };

    loadImages();
  }, [isMobile]);

  useEffect(() => {
    if (images.length === 0 || loaded < 100 || isMobile === null) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const frameCount = 272;

    // Responsive Canvas Resizing
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(currentFrameIndex);
    };

    let currentFrameIndex = 0;

    const renderFrame = (index: number) => {
      const img = images[index];
      if (!img) return;

      // Draw with cover logic instead of contain to avoid borders
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);

      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
      );
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas(); // Set initial size

    // Link framer motion progress to frame index
    const unsubscribe = smoothProgress.on("change", (latest) => {
      // Map progress to frames precisely
      const frameIndex = Math.min(
        frameCount - 1,
        Math.max(0, Math.floor(latest * frameCount))
      );
      if (frameIndex !== currentFrameIndex) {
        currentFrameIndex = frameIndex;
        if (images[currentFrameIndex] && images[currentFrameIndex].complete) {
          renderFrame(currentFrameIndex);
        }
      }
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      unsubscribe();
    };
  }, [images, loaded, smoothProgress, isMobile]);

  // Framer Motion Opacity Transformations for 5 Beats
  const t_1_opacity = useTransform(smoothProgress, [0.0, 0.05, 0.12, 0.15], [0, 1, 1, 0]);
  const t_1_y = useTransform(smoothProgress, [0.0, 0.05, 0.12, 0.15], [20, 0, 0, -20]);

  const t_2_opacity = useTransform(smoothProgress, [0.18, 0.23, 0.32, 0.35], [0, 1, 1, 0]);
  const t_2_y = useTransform(smoothProgress, [0.18, 0.23, 0.32, 0.35], [20, 0, 0, -20]);

  const t_3_opacity = useTransform(smoothProgress, [0.38, 0.43, 0.52, 0.55], [0, 1, 1, 0]);
  const t_3_y = useTransform(smoothProgress, [0.38, 0.43, 0.52, 0.55], [20, 0, 0, -20]);



  const t_5_opacity = useTransform(smoothProgress, [0.78, 0.83, 1.0, 1.0], [0, 1, 1, 1]);
  const t_5_y = useTransform(smoothProgress, [0.78, 0.83, 1.0, 1.0], [20, 0, 0, 0]);

  const t_Scroll_opacity = useTransform(smoothProgress, [0, 0.05], [1, 0]);

  return (
    <div ref={containerRef} className="h-[400vh] w-full bg-[#050505] relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505]">

        {loaded < 100 && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] px-8">
            <NextImage 
              src="/logos/header-logo.png" 
              alt="Loading Hero" 
              fill
              className="object-contain opacity-20 p-12 md:p-32" 
              priority
            />
            <div className="relative z-10 w-64 h-1 bg-white/10 rounded-full overflow-hidden mt-20">
              <div 
                className="h-full bg-white/80 transition-all duration-300"
                style={{ width: `${loaded}%` }}
              />
            </div>
            <p className="relative z-10 text-white/80 text-sm md:text-lg text-center mt-8 font-light tracking-widest uppercase leading-relaxed max-w-xl">
              Drop Selling International now operates as Ayoba Hobo
            </p>
            <p className="relative z-10 text-white/40 text-xs mt-4 font-mono tracking-tight">{Math.round(loaded)}%</p>
          </div>
        )}

        {/* Canvas container */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>

        {/* Overlay Beats */}
        <div className="absolute inset-0 z-20 pointer-events-none">

          <motion.div style={{ opacity: t_Scroll_opacity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
            <span className="text-white/40 text-xs tracking-widest uppercase">Scroll to Explore</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
          </motion.div>

          {/* Beat 1: Ayoba Hobo */}
          <motion.div
            style={{ opacity: t_1_opacity, y: t_1_y }}
            className="absolute inset-0 flex flex-col items-center md:items-start justify-start md:justify-center p-8 pt-48 md:p-24 text-center md:text-left"
          >
            <h1 className="text-gold text-7xl md:text-[10rem] font-bold tracking-tight mb-4 uppercase leading-none" style={{ fontFamily: 'var(--font-playfair)' }}>AYOBA HOBO</h1>
            <p className="text-white/40 text-base md:text-2xl font-light tracking-widest uppercase">The new standard.</p>
          </motion.div>

          {/* Beat 2: 20-35% (STINK) */}
          <motion.div
            style={{ opacity: t_2_opacity, y: t_2_y }}
            className="absolute inset-0 flex flex-col items-center md:items-start justify-center px-8 md:pl-24 text-center md:text-left"
          >
            <h1 className="text-gold text-7xl md:text-[14rem] font-bold tracking-tighter mb-4 uppercase leading-none" style={{ fontFamily: 'var(--font-playfair)' }}>STINK</h1>
          </motion.div>

          {/* Beat 3: 40-55% (KAKULA) */}
          <motion.div
            style={{ opacity: t_3_opacity, y: t_3_y }}
            className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
          >
            <h1 className="text-gold text-7xl md:text-[10rem] font-bold tracking-tighter mb-4 uppercase leading-none" style={{ fontFamily: 'var(--font-playfair)' }}>KAKULA</h1>
          </motion.div>

          {/* Beat 5: 80-100% (Sequence Ends) */}
          <motion.div
            style={{ opacity: t_5_opacity, y: t_5_y }}
            className="absolute inset-0 flex flex-col items-center md:items-end justify-center p-8 md:p-24 text-center md:text-right drop-shadow-2xl shadow-black"
          >
            <h1 className="text-white text-7xl md:text-[10rem] font-bold tracking-tighter mb-4 uppercase translate-y-[15vh] md:translate-y-0 leading-none" style={{ fontFamily: 'var(--font-playfair)' }}>LEKKER</h1>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default PerfumeSequence;

