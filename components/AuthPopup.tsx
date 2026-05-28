/**
 * © 2026 Bernie Vorster / WebWizSystems
 * 
 * Project: Ayoba Scrollytelling
 * File: AuthPopup.tsx
 * 
 * This codebase is proprietary and confidential.
 * Unauthorized use, copying, modification, or distribution is strictly prohibited.
 * 
 * Built & maintained by WebWizSystems
 * https://webwizsystems.com
 * 
 * Created: 2026-04-16
 * Last Updated: 2026-05-25
 * Signature ID: WWZ-AYOBA-SCROLLYTELLING-2026-911
 */

"use client";

import React, { useState } from "react";
import { useCart } from "./CartProvider";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";

export default function AuthPopup() {
  const supabase = createClient();
  const { isAuthOpen, setIsAuthOpen, setIsAuthenticated, setIsPaymentOpen } = useCart();
  const [authMode, setAuthMode] = useState<"signin" | "register">("register");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setIsAuthOpen(false);
    setError("");
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (authMode === "register") {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
          },
        });
        if (signUpError) throw signUpError;

        // Try to save to a public 'customers' table so they are visible in Table Editor
        if (signUpData.user) {
          try {
            const { error: dbError } = await supabase.from('customers').upsert({
              id: signUpData.user.id,
              full_name: fullName,
              email: email,
              created_at: new Date().toISOString()
            });
            if (dbError) {
              console.error("Supabase error saving to 'customers' table:", dbError);
            } else {
              console.log("Successfully saved customer profile to Supabase");
            }
          } catch (e) {
            console.error("Exception saving to 'customers' table:", e);
          }
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }

      setIsAuthenticated(true);
      setIsAuthOpen(false);
      setIsPaymentOpen(true);
    } catch (err: unknown) {
      const e = err as Error;
      setError(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isAuthOpen && (
        <div className="fixed inset-0 z-[200] flex items-start md:items-center justify-center p-4 overflow-y-auto pt-16 md:pt-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-none"
            onClick={handleClose}
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col font-sans text-white z-10"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 shadow-[0_0_20px_rgba(212,175,55,0.1)] rounded-full">
                  <Image src="/logos/products-logo.png" alt="Ayoba Hobo" fill className="object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
                </div>
                <div>
                  <h2 className="text-xl font-black tracking-tighter uppercase leading-none">
                    Account Access
                  </h2>
                  <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mt-1">
                    Required for Checkout
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-white/20 hover:text-white transition-colors p-2"
              >
                <span className="text-2xl leading-none">×</span>
              </button>
            </div>

            <div className="p-8 flex flex-col gap-6">
              <div className="text-center mb-2">
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">
                  {authMode === "signin" ? "Welcome Back" : "Create Account"}
                </h3>
                <p className="text-white/60 text-sm font-light">
                  {authMode === "signin"
                    ? "Sign in to securely complete your purchase."
                    : "Register an account to securely complete your purchase."}
                </p>
              </div>

              <form onSubmit={handleAuthSubmit} className="flex flex-col gap-5">
                {authMode === "register" && (
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Full Name</label>
                    <div className="relative">
                      <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                      <input
                        required
                        type="text"
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-5 text-sm focus:outline-none focus:border-gold/30 transition-colors"
                      />
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Email Address</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                    <input
                      required
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-5 text-sm focus:outline-none focus:border-gold/30 transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Password</label>
                  <input
                    required
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm focus:outline-none focus:border-gold/30 transition-colors"
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-xs text-center -mt-2">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-gold text-black font-black uppercase tracking-[0.3em] text-[13px] hover:bg-white transition-all duration-500 rounded-xl mt-2 shadow-[0_10px_40px_rgba(212,175,55,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "PLEASE WAIT..." : authMode === "signin" ? "SIGN IN & CONTINUE" : "REGISTER & CONTINUE"}
                </button>
              </form>

              <div className="text-center mt-2 border-t border-white/5 pt-4">
                <button
                  onClick={() => { setAuthMode(authMode === "signin" ? "register" : "signin"); setError(""); }}
                  className="text-xs text-white/40 hover:text-white transition-colors uppercase tracking-widest font-bold"
                >
                  {authMode === "signin"
                    ? "Don't have an account? Register here"
                    : "Already have an account? Sign in here"}
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 flex items-center justify-center gap-3 opacity-20 border-t border-white/5">
              <div className="h-[1px] flex-1 bg-white" />
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-white rounded-full" />
                <span className="text-[8px] uppercase tracking-[0.4em] whitespace-nowrap">Secure Access</span>
                <div className="w-1 h-1 bg-white rounded-full" />
              </div>
              <div className="h-[1px] flex-1 bg-white" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}