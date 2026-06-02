/**
 * © 2026 Bernie Vorster / WebWizSystems
 * 
 * Project: Ayoba Scrollytelling
 * File: Header.tsx
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

import { Open_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { ShoppingCart, Menu, X, Music, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Jukebox from "./Jukebox";
import { supabase } from "@/lib/supabase";

const openSans = Open_Sans({ subsets: ["latin"] });

export default function Header() {
  const { cartCount, setIsCartOpen, isJukeboxOpen, setIsJukeboxOpen, isAuthenticated, setIsAuthenticated, setIsAuthOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMobileAccountOpen, setIsMobileAccountOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userMetadata, setUserMetadata] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [shippingAddress, setShippingAddress] = useState<any>(null);

  // Sync Supabase auth state into CartProvider
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      if (session?.user) {
        setUserMetadata(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      setUserMetadata(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, [setIsAuthenticated]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setIsMenuOpen(false);
    setIsAccountOpen(false);
  };

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  // Load shipping address from localStorage when account opens
  useEffect(() => {
    if (isAccountOpen || isMenuOpen) {
      const stored = localStorage.getItem('shippingAddress');
      if (stored) {
        try {
          setShippingAddress(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to parse shipping address", e);
        }
      }
    }
  }, [isAccountOpen, isMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/", type: "route" },
    { name: "The Scent", href: "/#scent", type: "anchor" },
    { name: "Collections", href: "/collections", type: "route" },
    { name: "Reviews", href: "/#reviews", type: "anchor" },
    { name: "Our Story", href: "/#about", type: "anchor" }
  ];

  const handleNavClick = (link: { name: string, href: string, type: string }) => {
    setIsMenuOpen(false);
    if (link.type === 'anchor' && window.location.pathname === '/') {
      const id = link.href.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-8 py-4 md:py-6 flex items-center justify-between text-white pointer-events-none drop-shadow-md">
        <Link href="/" className="pointer-events-auto cursor-pointer flex items-center gap-2 md:gap-4 hover:opacity-80 transition-opacity">
          <Image src="/logos/header-logo.png" alt="Ayoba Hobo" width={120} height={48} className="h-10 md:h-16 w-auto object-contain" priority />
          <div className={`flex flex-col tracking-widest uppercase text-[10px] md:text-sm leading-tight border-l border-white/20 pl-2 md:pl-4 ${openSans.className}`}>
            <span className="text-white/70 hidden md:inline">Drop Selling International /</span>
            <span className="font-bold text-white tracking-tighter text-sm md:text-base mt-0.5">Ayoba Hobo</span>
          </div>
        </Link>

        <div className="flex items-center gap-4 md:gap-8 pointer-events-auto">
          <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <Link href="/collections" className="hover:text-white/60 transition-colors">Collections</Link>
            <Link href="/#reviews" className="hover:text-white/60 transition-colors">Reviews</Link>
            <Link href="/#about" className="hover:text-white/60 transition-colors">Our Story</Link>

            <motion.button
              onClick={() => setIsJukeboxOpen(!isJukeboxOpen)}
              className={`flex items-center gap-2 px-3 py-1 border border-gold rounded-full hover:bg-gold/20 text-gold ${isJukeboxOpen ? 'bg-gold/10' : ''}`}
              animate={{
                opacity: [1, 0.9, 1, 0.4, 1, 0.8, 1],
                scale: [1, 1.03, 1, 1.01, 1],
                boxShadow: [
                  "0 0 0px rgba(197, 160, 89, 0)",
                  "0 0 15px rgba(197, 160, 89, 0.5)",
                  "0 0 2px rgba(197, 160, 89, 0.2)",
                  "0 0 20px rgba(197, 160, 89, 0.6)",
                  "0 0 0px rgba(197, 160, 89, 0)"
                ]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                times: [0, 0.05, 0.08, 0.12, 0.15, 0.3, 1],
                ease: "easeInOut"
              }}
            >
              <Music size={14} className={isJukeboxOpen ? 'animate-pulse' : ''} />
              <span className="text-[10px] font-bold tracking-widest uppercase">Jive with us</span>
            </motion.button>

            <div className="flex items-center gap-4 ml-4 border-l border-white/10 pl-8">
              <a href="https://www.facebook.com/profile.php?id=61573405146939" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity" title="Facebook">
                <Image src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png" alt="Facebook" width={18} height={18} className="w-[18px] h-[18px] grayscale-0 brightness-200" />
              </a>
              <a href="https://www.tiktok.com/@ayoba.hobo.perfume?_r=1&_t=ZS-96sNgcRC8gh" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity" title="TikTok">
                <Image src="https://cdn-icons-png.flaticon.com/512/15713/15713404.png" alt="TikTok" width={18} height={18} className="w-[18px] h-[18px] grayscale-0 brightness-200" />
              </a>
              <a href="https://www.instagram.com/ayobahobo?igsh=YXBjbGw2aDMzN2Zn" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity" title="Instagram">
                <Image src="https://cdn-icons-png.flaticon.com/512/4923/4923005.png" alt="Instagram" width={18} height={18} className="w-[18px] h-[18px] grayscale-0 brightness-200" />
              </a>
            </div>

            {/* Account button — desktop */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsAccountOpen(!isAccountOpen)}
                  className={`flex items-center gap-2 px-4 py-1.5 border rounded-full transition-all text-white group ${isAccountOpen ? 'bg-gold/20 border-gold' : 'bg-white/10 border-white/20 hover:bg-white/20'}`}
                >
                  <User size={16} className={`transition-transform ${isAccountOpen ? 'scale-110 text-gold' : 'text-gold group-hover:scale-110'}`} />
                  <span className="text-[10px] font-black tracking-widest uppercase">Account</span>
                </button>

                <AnimatePresence>
                  {isAccountOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-64 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
                    >
                      <div className="p-6 border-b border-white/5 relative">
                        <button 
                          onClick={() => setIsAccountOpen(false)}
                          className="absolute top-5 right-5 text-white/20 hover:text-white transition-colors"
                        >
                          <X size={16} />
                        </button>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold mb-3">Profile Details</p>
                        <div className="flex flex-col gap-1">
                          <p className="font-bold text-sm truncate uppercase tracking-tight">{userMetadata?.user_metadata?.full_name || userMetadata?.email?.split('@')[0] || 'Member'}</p>
                          <p className="text-white/40 text-[11px] truncate lowercase tracking-normal">{userMetadata?.email}</p>
                        </div>

                        {shippingAddress && (
                          <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-2">
                            <p className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-bold">Shipping Address</p>
                            <div className="flex flex-col gap-0.5 text-[10px] text-white/60 uppercase tracking-wider">
                              <p className="truncate">{shippingAddress.streetAddress}</p>
                              <p>{shippingAddress.city}, {shippingAddress.province}</p>
                              <p className="mt-1 text-gold/60 font-bold">{shippingAddress.phoneNumber}</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-colors text-white/60 hover:text-white"
                        >
                          <LogOut size={16} className="text-white/40" />
                          <span className="text-[11px] font-black tracking-widest uppercase">Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="flex items-center gap-2 px-4 py-1.5 border rounded-full transition-all text-white group bg-white/10 border-white/20 hover:bg-white/20"
              >
                <User size={16} className="text-gold group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black tracking-widest uppercase">Sign In / Register</span>
              </button>
            )}
          </nav>

          <motion.button
            onClick={() => setIsJukeboxOpen(!isJukeboxOpen)}
            className={`md:hidden flex items-center gap-2 px-3 py-1.5 border border-gold rounded-full mr-2 text-gold ${isJukeboxOpen ? 'bg-gold/20' : 'bg-gold/5'}`}
            animate={{
              opacity: [1, 0.9, 1, 0.4, 1, 0.8, 1],
              boxShadow: [
                "0 0 0px rgba(197, 160, 89, 0)",
                "0 0 12px rgba(197, 160, 89, 0.5)",
                "0 0 18px rgba(197, 160, 89, 0.6)",
                "0 0 0px rgba(197, 160, 89, 0)"
              ]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              times: [0, 0.05, 0.08, 0.12, 1],
              ease: "easeInOut"
            }}
          >
            <Music size={14} className={isJukeboxOpen ? 'animate-pulse' : ''} />
            <span className="text-[10px] font-bold tracking-widest uppercase">Jive</span>
          </motion.button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 hover:text-white/60 transition-colors group relative"
          >
            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
            <span className="absolute -top-1 -right-2 bg-gold text-black w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold">
              {cartCount}
            </span>
          </button>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex md:hidden items-center justify-center p-1"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-[#050505]/70 backdrop-blur-2xl z-[100] px-6 py-8 pb-40 flex flex-col pointer-events-auto overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-16">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                <Image src="/logos/header-logo.png" alt="Ayoba Hobo" width={100} height={40} className="h-10 w-auto object-contain" />
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-white/70 hover:text-white transition-colors"
              >
                <X size={32} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.type === 'route' ? (
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-4xl font-bold tracking-tighter hover:text-gold transition-colors"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      onClick={() => handleNavClick(link)}
                      className="text-4xl font-bold tracking-tighter hover:text-gold transition-colors"
                    >
                      {link.name}
                    </a>
                  )}
                </div>
              ))}

              {/* Account details — mobile menu */}
              {isAuthenticated ? (
                <div className="flex flex-col gap-4 mt-2">
                  <button
                    onClick={() => setIsMobileAccountOpen(!isMobileAccountOpen)}
                    className="flex items-center gap-4 text-white hover:text-gold transition-colors w-full text-left"
                  >
                    <User size={24} className={isMobileAccountOpen ? "text-gold" : "text-white/70"} strokeWidth={2} />
                    <span className="text-3xl font-black tracking-tighter">My Account</span>
                  </button>
                  
                  <AnimatePresence>
                    {isMobileAccountOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pl-10 flex flex-col gap-4 border-l border-white/10 overflow-hidden"
                      >
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold mb-1">Profile Details</p>
                          <p className="font-bold text-lg uppercase tracking-tight text-white">
                            {userMetadata?.user_metadata?.full_name || userMetadata?.email?.split('@')[0] || 'Member'}
                          </p>
                          <p className="text-white/40 text-xs lowercase tracking-normal">{userMetadata?.email}</p>
                        </div>

                        {shippingAddress && (
                          <div>
                            <p className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-bold mb-1">Shipping Address</p>
                            <div className="flex flex-col gap-0.5 text-xs text-white/60 uppercase tracking-wider">
                              <p>{shippingAddress.streetAddress}</p>
                              <p>{shippingAddress.city}, {shippingAddress.province}</p>
                              <p className="mt-1 text-gold/60 font-bold">{shippingAddress.phoneNumber}</p>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 text-white/30 hover:text-white transition-colors pl-1"
                  >
                    <LogOut size={18} strokeWidth={1.5} />
                    <span className="text-lg font-bold tracking-tighter">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4 mt-2">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsAuthOpen(true);
                    }}
                    className="flex items-center gap-4 text-white hover:text-gold transition-colors w-full text-left"
                  >
                    <User size={24} className="text-white/70" strokeWidth={2} />
                    <span className="text-3xl font-black tracking-tighter">Sign In / Register</span>
                  </button>
                </div>
              )}

              <div className="flex gap-6 mt-4">
                <a href="https://www.facebook.com/profile.php?id=61573405146939" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                  <Image src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png" alt="Facebook" width={24} height={24} className="w-6 h-6 brightness-200" />
                </a>
                <a href="https://www.instagram.com/ayobahobo?igsh=YXBjbGw2aDMzN2Zn" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                  <Image src="https://cdn-icons-png.flaticon.com/512/4923/4923005.png" alt="Instagram" width={24} height={24} className="w-6 h-6 brightness-200" />
                </a>
                <a href="https://www.tiktok.com/@ayoba.hobo.perfume?_r=1&_t=ZS-96sNgcRC8gh" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                  <Image src="https://cdn-icons-png.flaticon.com/512/15713/15713404.png" alt="TikTok" width={24} height={24} className="w-6 h-6 brightness-200" />
                </a>
              </div>
            </nav>

            <div className="mt-auto pt-12 border-t border-white/10 flex flex-col gap-8 text-white">
              <AnimatePresence>
                {isJukeboxOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden py-1"
                  >
                    <Jukebox />
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="text-[10px] text-white/30 uppercase tracking-[0.3em]">
                Drop Selling International / Ayoba Hobo
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}