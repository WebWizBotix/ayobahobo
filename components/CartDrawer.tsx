/**
 * © 2026 Bernie Vorster / WebWizSystems
 * 
 * Project: Ayoba Scrollytelling
 * File: CartDrawer.tsx
 * 
 * This codebase is proprietary and confidential.
 * Unauthorized use, copying, modification, or distribution is strictly prohibited.
 * 
 * Built & maintained by WebWizSystems
 * https://webwizsystems.com
 * 
 * Created: 2026-04-07
 * Last Updated: 2026-04-15
 * Signature ID: WWZ-AYOBA-SCROLLYTELLING-2026-911
 */

"use client";

import { useCart } from "./CartProvider";
import Image from "next/image";
import { Trash2, Plus, Minus, X } from "lucide-react";

export default function CartDrawer() {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    setIsPaymentOpen, 
    setShouldAutoOpen,
    updateQuantity,
    clearItem,
    isAuthenticated,
    setIsAuthOpen
  } = useCart();

  if (!isCartOpen) return null;

  const getSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.-]+/g,""));
      return acc + price * item.quantity;
    }, 0);
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Drawer */}
      <div className="relative w-full max-w-md h-full bg-[#0a0a0a] border-l border-white/10 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out font-sans text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-black tracking-tighter uppercase leading-none">Your Cart</h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors"
          >
            <X size={24} className="text-white/40 hover:text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col scrollbar-hide">
          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-white/50 h-full">
              <p className="text-lg font-light tracking-wide mb-2 uppercase tracking-[0.2em] text-[10px]">Your cart is empty.</p>
              <p className="text-[9px] uppercase tracking-widest opacity-40">Discover your signature scent</p>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {/* Product Header Row */}
              <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-white/20 font-bold border-b border-white/5 pb-4">
                <span>Product</span>
                <span>Total</span>
              </div>

              {/* Items List */}
              <div className="flex flex-col gap-8">
                {cartItems.map((item) => (
                  <div key={item.name} className="flex gap-5 items-start justify-between">
                    <div className="flex gap-5 flex-1">
                      <div className="w-20 h-28 flex-shrink-0 bg-white/5 overflow-hidden relative border border-white/10 rounded-lg">
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          fill
                          className="object-cover opacity-80" 
                        />
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <h3 className="font-bold tracking-tight text-base uppercase leading-tight max-w-[160px]">{item.name}</h3>
                        <p className="text-white/40 text-sm font-mono">{item.price}</p>
                        
                        {/* Quantity Editor + Trash */}
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center border border-white/10 rounded-md bg-white/5 overflow-hidden">
                            <button 
                              onClick={() => updateQuantity(item.name, -1)}
                              className="p-2 hover:bg-white/10 transition-colors text-white/40 hover:text-white"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-10 text-center text-xs font-mono font-bold">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.name, 1)}
                              className="p-2 hover:bg-white/10 transition-colors text-white/40 hover:text-white"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          
                          <button 
                            onClick={() => clearItem(item.name)}
                            className="p-2 text-white/20 hover:text-red-500 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-sm font-bold text-white">
                        R{(parseFloat(item.price.replace(/[^0-9.-]+/g,"")) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-8 border-t border-white/5 bg-[#050505] flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-[11px] uppercase tracking-[0.2em] text-white/40">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              
              <div className="flex justify-between items-end pt-2 border-t border-white/5 mt-2">
                <span className="text-sm uppercase tracking-[0.2em] font-bold text-white/60">Estimated Total</span>
                <span className="text-2xl font-black text-white">R{getSubtotal().toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 mt-2">
              <button 
                onClick={() => {
                  setIsCartOpen(false);
                  if (isAuthenticated) {
                    setIsPaymentOpen(true);
                  } else {
                    setIsAuthOpen(true);
                  }
                }}
                className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.3em] text-[13px] hover:bg-gold transition-all duration-500 rounded-xl"
              >
                Proceed to Checkout
              </button>
              
              <button 
                onClick={() => {
                  setShouldAutoOpen(false);
                  setIsCartOpen(false);
                }}
                className="w-full py-3 text-white/20 font-bold uppercase tracking-[0.3em] text-[9px] hover:text-white transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

