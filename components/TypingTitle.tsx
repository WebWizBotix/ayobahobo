/**
 * © 2026 Bernie Vorster / WebWizSystems
 * 
 * Project: Ayoba Scrollytelling
 * File: TypingTitle.tsx
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

import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface TypingTitleProps {
  baseText?: string;
  firstWord?: string;
  secondWord?: string;
  className?: string;
  highlightClass?: string;
}

export default function TypingTitle({
  baseText = "Our real ",
  firstWord = "Parrafin",
  secondWord = "Perfume",
  className = "",
  highlightClass = "text-gold italic"
}: TypingTitleProps) {
  const [displayText, setDisplayText] = useState("");
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    
    let timeout: NodeJS.Timeout;
    const word1 = `${baseText}${firstWord}`;
    const word2 = `${baseText}${secondWord}`;

    const type = (text: string, i: number, callback: () => void) => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1));
        timeout = setTimeout(() => type(text, i + 1, callback), 80);
      } else {
        timeout = setTimeout(callback, 1200); 
      }
    };

    const backspace = (text: string, i: number, callback: () => void) => {
      if (i >= baseText.length) {
        setDisplayText(text.substring(0, i));
        timeout = setTimeout(() => backspace(text, i - 1, callback), 40);
      } else {
        timeout = setTimeout(callback, 300);
      }
    };

    // Sequence: Type first word -> Backspace -> Type second word
    type(word1, 0, () => {
      backspace(word1, word1.length, () => {
        type(word2, baseText.length - 1, () => {
          setIsDone(true);
        });
      });
    });

    return () => clearTimeout(timeout);
  }, [isInView, baseText, firstWord, secondWord]);

  // Helper to split text for highlighting
  const renderText = () => {
    if (displayText.startsWith(baseText)) {
      const variablePart = displayText.substring(baseText.length);
      return (
        <>
          {baseText}
          <span className={highlightClass}>{variablePart}</span>
        </>
      );
    }
    return displayText;
  };

  return (
    <span ref={containerRef} className={`uppercase inline-block ${className}`}>
      {renderText()}
      <span className={`ml-1 font-extralight transition-opacity duration-300 ${isDone ? 'opacity-0' : 'animate-pulse'}`}>|</span>
    </span>
  );
}

