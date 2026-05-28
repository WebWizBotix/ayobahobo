/**
 * © 2026 Bernie Vorster / WebWizSystems
 * 
 * Project: Ayoba Scrollytelling
 * File: tailwind.config.ts
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

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gold: "#D4A017",
      },
      fontFamily: {
        display: ["var(--font-roboto-slab)", "serif"],
        accent: ["var(--font-roboto-slab)", "serif"],
      },
      animation: {
        glow: "glow 4s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%, 100%": { opacity: "0.2", transform: "translateX(-50%) scale(1)" },
          "50%": { opacity: "0.5", transform: "translateX(-50%) scale(1.2)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
