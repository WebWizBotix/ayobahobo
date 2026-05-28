/**
 * © 2026 Bernie Vorster / WebWizSystems
 * 
 * Project: Ayoba Scrollytelling
 * File: ReviewsSection.tsx
 * 
 * This codebase is proprietary and confidential.
 * Unauthorized use, copying, modification, or distribution is strictly prohibited.
 * 
 * Built & maintained by WebWizSystems
 * https://webwizsystems.com
 * 
 * Created: 2026-04-07
 * Last Updated: 2026-05-25
 * Signature ID: WWZ-AYOBA-SCROLLYTELLING-2026-911
 */

"use client";

import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ReviewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };
  const reviews = [
    { 
      id: 1, 
      name: "Kyle and Jess", 
      text: `We were having the most dramatic "our lives are over" moment because our crushes hadn't replied in 3 minutes (a true tragedy). Then Kyle pulled out a bottle of Ayoba Hobo Perfume like it was a secret weapon. One spray later, suddenly we were laughing, dancing like background extras in a music video, and confidently waving at people who definitely weren't waving back at us. Jess even said, "If they don't reply, it's their loss—we smell like happiness now." By the end of the day, we didn't just find replies... we became main-character in our hoods.`, 
      rating: 5,
      image: "/reviews/Kyle and Jess.jpeg"
    },
    { 
      id: 2, 
      name: "Susanna Jacoba van der merwe", 
      text: `When I used to walk into a room, people would politely smile... then slowly open windows. But the day I discovered Ayoba Hobo Perfume, everything changed. Suddenly, doors opened before I even touched them, strangers complimented me like I was a celebrity, and even my ex started "accidentally" liking all my old photos again. The office printer started working without attitude. By lunchtime, I had three compliments, one free muffin, and a suspicious "Hey stranger" text from a guy I blocked in 2019. Even my budgie dumped his girlfriend. Ayoba Hobo didn't just upgrade my scent—it upgraded my entire happiness and now boosting my confidence.`, 
      rating: 5,
      image: "/reviews/Susanna.jpeg"
    },
    { 
      id: 3, 
      name: "Sipho Bongani Njabulo Ndlovu", 
      text: `From Zero to Hero

I used to smell like I fight with onions for a living.
People didn't avoid me...
they scheduled avoiding me.
Then one day, a mysterious guy whispered:
"Try Ayoba Hobo."
I sprayed once...
Now:
• Private bankers are calling me.
• My boss now makes me coffee
• Girls are paying for our dates
• My dog gained more respect for me
• Even mosquitoes ask for permission

Now I don't chase success...
I just smell like it.
Ayoba Hobo — Stay Fresh. Stay Ayoba.`, 
      rating: 5,
      image: "/reviews/Sipho.jpeg"
    },
  ];

  return (
    <section id="reviews" className="py-32 px-4 md:px-8 bg-[#050505] border-t border-white/10 text-white flex flex-col items-center">
      <div className="max-w-7xl w-full relative">
        <div className="flex items-end justify-between mb-16 px-4">
          <div className="flex flex-col">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter">Voices of the Hobo&apos;s</h2>
            <p className="text-white/40 uppercase tracking-[0.3em] text-[10px] mt-4">Real stories from the hood</p>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-gold/50 transition-all text-white/50 hover:text-gold group"
              aria-label="Previous reviews"
            >
              <ChevronLeft size={24} strokeWidth={1.5} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-gold/50 transition-all text-white/50 hover:text-gold group"
              aria-label="Next reviews"
            >
              <ChevronRight size={24} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-4"
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              // md:w-[calc(50%-12px)] creates exactly 2 items next to each other considering the 24px gap between items.
              className="flex-shrink-0 w-[85%] sm:w-[50%] md:w-[calc(50%-12px)] snap-start bg-white/5 border border-white/10 p-8 flex flex-col justify-between"
            >
              <div className="mb-6">
                {review.image && (
                  <div className="relative w-full aspect-square mb-6 overflow-hidden rounded-sm">
                    <Image 
                      src={review.image} 
                      alt={`Review by ${review.name}`} 
                      fill 
                      className="object-cover object-[center_15%] opacity-80"
                    />
                  </div>
                )}
                <div className="flex text-yellow-500 mb-4 text-xs gap-1">
                  {Array(5).fill("★").map((star, i) => (
                    <span key={i} className={i < review.rating ? "text-white" : "text-white/20 text-lg"}>{star}</span>
                  ))}
                </div>
                <p className="text-white/80 font-light text-base md:text-lg tracking-wide leading-relaxed whitespace-pre-line">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>
              <div className="flex items-center pt-4 border-t border-white/10 mt-auto">
                <p className="uppercase tracking-widest text-xs font-bold text-white/50">
                  — {review.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Scroll Hint */}
        <div className="flex justify-center mt-6">
          <div className="flex gap-2">
            <div className="w-12 h-1 bg-white/40"></div>
            <div className="w-12 h-1 bg-white/10"></div>
            <div className="w-12 h-1 bg-white/10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

