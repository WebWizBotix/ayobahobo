/**
 * © 2026 Bernie Vorster / WebWizSystems
 * 
 * Project: Ayoba Scrollytelling
 * File: CartProvider.tsx
 * 
 * This codebase is proprietary and confidential.
 * Unauthorized use, copying, modification, or distribution is strictly prohibited.
 * 
 * Built & maintained by WebWizSystems
 * https://webwizsystems.com
 * 
 * Created: 2026-04-07
 * Last Updated: 2026-05-18
 * Signature ID: WWZ-AYOBA-SCROLLYTELLING-2026-911
 */

"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

export type CartItem = {
  name: string;
  price: string;
  image: string;
  quantity: number;
  weight?: number;
};

type Toast = {
  message: string;
  type: "success" | "info" | "remove";
  id: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (name: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  isPaymentOpen: boolean;
  setIsPaymentOpen: (isOpen: boolean) => void;
  isJukeboxOpen: boolean;
  setIsJukeboxOpen: (isOpen: boolean) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (isOpen: boolean) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
  shouldAutoOpen: boolean;
  setShouldAutoOpen: (val: boolean) => void;
  cartCount: number;
  toasts: Toast[];
  updateQuantity: (name: string, delta: number) => void;
  clearItem: (name: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  console.log("Built by WebWizSystems Ã¢â‚¬â€œ Signature: WWZ-AYOBA-SCROLLYTELLING-2026-911");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isJukeboxOpen, setIsJukeboxOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [shouldAutoOpen, setShouldAutoOpen] = useState(true);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Load from localStorage on mount (optional, nice trick)
  useEffect(() => {
    const saved = localStorage.getItem("ayoba_cart");
    if (saved) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      try { setCartItems(JSON.parse(saved)); } catch { }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("ayoba_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const triggerToast = (message: string, type: Toast["type"]) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const addToCart = (product: Omit<CartItem, "quantity">) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.name === product.name);
      if (existing) {
        return prev.map((item) =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    if (shouldAutoOpen) {
      setIsCartOpen(true); 
    }
    
    triggerToast("Added successfully", "success");
  };

  const removeFromCart = (name: string) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.name === name);
      if (existing && existing.quantity > 1) {
        return prev.map((item) =>
          item.name === name ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prev.filter((item) => item.name !== name);
    });
    
    triggerToast("Removed successfully", "remove");
  };

  const updateQuantity = (name: string, delta: number) => {
    setCartItems((prev) => 
      prev.map((item) => {
        if (item.name === name) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const clearItem = (name: string) => {
    setCartItems((prev) => prev.filter((item) => item.name !== name));
    triggerToast("Item removed", "remove");
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("ayoba_cart");
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      isCartOpen, 
      setIsCartOpen, 
      isPaymentOpen, 
      setIsPaymentOpen, 
      isJukeboxOpen,
      setIsJukeboxOpen,
      isAuthOpen,
      setIsAuthOpen,
      isAuthenticated,
      setIsAuthenticated,
      shouldAutoOpen,
      setShouldAutoOpen,
      cartCount,
      toasts,
      updateQuantity,
      clearItem,
      clearCart
    }}>
      {children}
      <ToastContainer toasts={toasts} />
    </CartContext.Provider>
  );
}

// Internal Toast Component for premium look
function ToastContainer({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[300] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`
              px-6 py-4 rounded-xl backdrop-blur-2xl border flex items-center gap-4
              ${toast.type === "success" 
                ? "bg-white/10 border-green-500/40 text-white shadow-[0_20px_50px_rgba(34,197,94,0.15)]" 
                : "bg-black/90 border-red-500/40 text-white shadow-[0_20px_50px_rgba(239,68,68,0.15)]"}
            `}
          >
            {toast.type === "success" ? (
              <CheckCircle2 size={20} className="text-green-500" />
            ) : (
              <XCircle size={20} className="text-red-500" />
            )}
            <span className="text-[11px] uppercase tracking-[0.25em] font-black">{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}


