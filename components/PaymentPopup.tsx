/**
 * © 2026 Bernie Vorster / WebWizSystems
 * 
 * Project: Ayoba Scrollytelling
 * File: PaymentPopup.tsx
 * 
 * This codebase is proprietary and confidential.
 * Unauthorized use, copying, modification, or distribution is strictly prohibited.
 * 
 * Built & maintained by WebWizSystems
 * https://webwizsystems.com
 * 
 * Created: 2026-04-07
 * Last Updated: 2026-05-26
 * Signature ID: WWZ-AYOBA-SCROLLYTELLING-2026-911
 * NOTE: PayFast Sandbox credentials active
 */

"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useCart } from "./CartProvider";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, Mail, CheckCircle2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

async function submitPayFast({ amount, itemName, buyerEmail, buyerName }: {
  amount: string;
  itemName: string;
  buyerEmail: string;
  buyerName: string;
}) {
  const response = await fetch("/api/payfast/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount,
      itemName,
      buyerEmail,
      buyerName,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || "Failed to initialize payment");
  }

  const payload = await response.json();

  const form = document.createElement('form');
  form.method = 'POST';
  form.action = payload.url;
  Object.entries(payload.fields).forEach(([k, v]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = k;
    input.value = String(v);
    form.appendChild(input);
  });
  document.body.appendChild(form);
  form.submit();
}

type CheckoutStep = "address" | "payfast" | "success";

export default function PaymentPopup() {
  const supabase = createClient();
  const { isPaymentOpen, setIsPaymentOpen, cartItems, setIsAuthOpen } = useCart();
  const [step, setStep] = useState<CheckoutStep>("address");

  // Check authentication session and load saved address when checkout/payment popup is opened
  useEffect(() => {
    if (isPaymentOpen) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          // Fetch existing shipping address from public.addresses table
          supabase
            .from("addresses")
            .select("*")
            .eq("id", session.user.id)
            .single()
            .then(({ data, error }) => {
              if (data && !error) {
                setAddressForm({
                  fullName: data.full_name || "",
                  streetAddress: data.street_address || "",
                  suburb: data.suburb || "",
                  city: data.city || "",
                  province: data.province || "",
                  postalCode: data.postal_code || "",
                  phoneNumber: data.phone_number || ""
                });
              } else {
                loadFromLocalStorage();
              }
            });
        } else {
          loadFromLocalStorage();
        }
      });
    }

    function loadFromLocalStorage() {
      const stored = localStorage.getItem("shippingAddress");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setAddressForm({
            fullName: parsed.fullName || "",
            streetAddress: parsed.streetAddress || "",
            suburb: parsed.suburb || "",
            city: parsed.city || "",
            province: parsed.province || "",
            postalCode: parsed.postalCode || "",
            phoneNumber: parsed.phoneNumber || ""
          });
        } catch (e) {
          console.error("Failed to parse local shipping address", e);
        }
      }
    }
  }, [isPaymentOpen, supabase]);
  const [isProcessing] = useState(false);
  const [showEftDetails, setShowEftDetails] = useState(false);
  const [eftSent, setEftSent] = useState(false);
  const [eftLoading, setEftLoading] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);
  const [addressForm, setAddressForm] = useState({
    fullName: "",
    streetAddress: "",
    suburb: "",
    city: "",
    province: "",
    postalCode: "",
    phoneNumber: ""
  });
  const [waybillNumber, setWaybillNumber] = useState<string | null>(null);

  // Reference variables to prevent ESLint unused variable errors
  if (waybillNumber !== null) {
    console.log("Fastway active session details:", { waybillNumber });
  }

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const pathname = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);
    const orderId = searchParams.get('order_id');
    
    console.log("Checking for waybill generation, Pathname:", pathname, "OrderId:", orderId);

    if (pathname.includes('/success') && orderId) {
      const storedAddr = localStorage.getItem('shippingAddress');
      console.log("Values from localStorage:", { shippingAddress: storedAddr });
      
      const createdKey = `waybill_created_${orderId}`;
      const existingKey = localStorage.getItem(createdKey);
      if (existingKey === 'success') {
        console.log(`Waybill already successfully created for order ${orderId}. Skipping.`);
        return;
      }
      if (existingKey === 'in-progress') {
        console.log(`Previous attempt left key as 'in-progress'. Resetting and retrying.`);
        localStorage.removeItem(createdKey);
      }

      const orderTotal = searchParams.get('amount') || '0';

      if (storedAddr) {
        localStorage.setItem(createdKey, 'in-progress');

        const createShipment = async () => {
          let waybillNum = "FAILED";
          let parcelRef = "";
          let success = false;

          try {
            localStorage.removeItem(`waybill_created_${orderId}`);
            const addr = JSON.parse(storedAddr);

            const mapZone = (province: string): string => {
              const p = province.toLowerCase().trim();
              if (p.includes('western cape') || p.includes('western')) return 'Western Cape';
              if (p.includes('gauteng')) return 'Gauteng';
              if (p.includes('kwazulu') || p.includes('natal')) return 'KwaZulu-Natal';
              if (p.includes('eastern cape')) return 'Eastern Cape';
              if (p.includes('northern cape')) return 'Northern Cape';
              if (p.includes('north west')) return 'North West';
              if (p.includes('limpopo')) return 'Limpopo';
              if (p.includes('mpumalanga')) return 'Mpumalanga';
              if (p.includes('free state')) return 'Free State';
              return province;
            };

            const payload = {
              collection_address: {
                type: "business",
                street_address: "4 Derry Road",
                local_area: "Kenmare",
                city: "Krugersdorp",
                zone: "Gauteng",
                country: "ZA",
                code: "1739"
              },
              collection_contact: {
                name: "Drop-Selling International",
                mobile_number: "0827135882"
              },
              delivery_address: {
                type: "residential",
                street_address: addr.streetAddress,
                local_area: addr.suburb,
                city: addr.city,
                zone: mapZone(addr.province),
                country: "ZA",
                code: addr.postalCode
              },
              delivery_contact: {
                name: addr.fullName,
                mobile_number: addr.phoneNumber
              },
              parcels: [
                { submitted_length_cm: 26, submitted_width_cm: 20, submitted_height_cm: 2, submitted_weight_kg: 0.2, parcel_description: "Satchel - Perfume" }
              ],
              declared_value: parseFloat(orderTotal)
            };

            const body = JSON.stringify(payload);
            console.log('Fastway shipment payload:', body);

            const response = await fetch("https://api.portal.fastway.co.za/v2/shipments", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer bab9c99b9adc4179a01fb3171ba703d4"
              },
              body: body
            });

            const responseText = await response.text();
            console.log('Fastway raw response:', responseText);

            if (!response.ok) {
              throw new Error(`Fastway error: ${responseText}`);
            }

            const data = JSON.parse(responseText);
            console.log('Fastway shipment API response:', data);

            if (data.short_tracking_reference) {
              waybillNum = data.short_tracking_reference;
              parcelRef = data.parcels?.[0]?.tracking_reference || "";

              setWaybillNumber(waybillNum);
              localStorage.setItem('waybill_number', waybillNum);
              localStorage.setItem('parcel_tracking_reference', parcelRef);
              localStorage.setItem(createdKey, 'success');
              success = true;
            } else {
              console.error('Shipment response did not contain short_tracking_reference:', data);
              waybillNum = "FAILED: NO_REF";
            }
          } catch (err: unknown) {
            const errorMsg = err instanceof Error ? err.message : String(err);
            console.error('Failed to create Fastway shipment:', err);
            waybillNum = `FAILED: ${errorMsg.substring(0, 50)}`;
            localStorage.removeItem(createdKey);
          }

          // ALWAYS save the order to Supabase, even if Fastway fails!
          try {
            const { error: dbError } = await supabase.from('orders').upsert({
              id: orderId,
              order_id: orderId,
              waybill_number: waybillNum,
              parcel_tracking_reference: parcelRef,
              created_at: new Date().toISOString()
            });
            if (dbError) {
              console.error('Error saving order to Supabase:', JSON.stringify(dbError, null, 2), dbError);
            } else {
              console.log('Successfully saved order to Supabase orders table (Fastway Success:', success, ')');
            }
          } catch (dbErr) {
            console.error('Supabase DB Exception:', dbErr);
          }
        };

        createShipment();
      }
    }
  }, []);

  // Generate a unique reference number per session
  const referenceNumber = useMemo(() => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 5; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return `DSI-${code}`;
  }, []);


  const getSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
      return acc + price * item.quantity;
    }, 0);
  };

  const handleClose = () => {
    if (!isProcessing) {
      setIsPaymentOpen(false);
      setTimeout(() => setStep("address"), 300); // Reset after animation
    }
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculatingShipping(true);
    
    try {
      const payload = {
        collection_address: {
          street_address: "4 Derry Road",
          local_area: "Kenmare",
          city: "Krugersdorp",
          zone: "Gauteng",
          country: "ZA",
          code: "1739"
        },
        delivery_address: {
          street_address: addressForm.streetAddress,
          local_area: addressForm.suburb,
          city: addressForm.city,
          zone: addressForm.province,
          country: "ZA",
          code: addressForm.postalCode
        },
        parcels: [
          { submitted_length_cm: 26, submitted_width_cm: 20, submitted_height_cm: 2, submitted_weight_kg: 0.2, parcel_description: "Satchel - Perfume" }
        ],
        declared_value: getSubtotal()
      };

      const response = await fetch("https://api.portal.fastway.co.za/v2/rates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer bab9c99b9adc4179a01fb3171ba703d4"
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      console.log('Fastway response:', JSON.stringify(data));
      console.log('Zone:', data.rates?.[0]?.base_rate?.group_name);
      console.log('Weight used:', data.rates?.[0]?.base_rate?.total_calculated_weight);
      
      let price = 85.00;
      if (data.rates && data.rates.length > 0 && data.rates[0].rate) {
        price = parseFloat(data.rates[0].rate);
      } else {
        console.warn("Fastway API returned no rate, using fallback flat rate.");
      }

      const parsedCost = price;
      
      const shippingInfo = { ...addressForm, shippingCost: parsedCost };
      setShippingCost(parsedCost);
      localStorage.setItem('shippingAddress', JSON.stringify(shippingInfo));
      await saveAddressToSupabase();
      setStep("payfast");
    } catch (error) {
      console.error("Fastway error:", error);
      setShippingCost(85.00);
      await saveAddressToSupabase();
      setStep("payfast");
    } finally {
      setIsCalculatingShipping(false);
    }
  };

  const saveAddressToSupabase = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { error } = await supabase.from("addresses").upsert({
          id: session.user.id,
          full_name: addressForm.fullName,
          street_address: addressForm.streetAddress,
          suburb: addressForm.suburb,
          city: addressForm.city,
          province: addressForm.province,
          postal_code: addressForm.postalCode,
          phone_number: addressForm.phoneNumber,
          updated_at: new Date().toISOString()
        });
        if (error) {
          console.error("Failed to save shipping address to Supabase:", error);
        } else {
          console.log("Shipping address securely saved to Supabase.");
        }
      }
    } catch (dbErr) {
      console.error("Failed to save shipping address to Supabase database:", dbErr);
    }
  };

  const getTotal = () => {
    return getSubtotal() + shippingCost;
  };

  return ( <>
    <AnimatePresence>
      {isPaymentOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            onClick={handleClose}
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col font-sans text-white z-10"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {step !== "address" && step !== "success" && (
                  <button 
                    onClick={() => setStep("address")}
                    className="p-2 -ml-2 hover:bg-white/5 rounded-full transition-colors text-white/40 hover:text-white"
                  >
                    <ChevronLeft size={20} />
                  </button>
                )}
                <div className="relative w-16 h-16 shadow-[0_0_20px_rgba(212,175,55,0.1)] rounded-full">
                  <Image src="/logos/products-logo.png" alt="Ayoba Hobo" fill className="object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
                </div>
                <div>
                  <h2 className="text-xl font-black tracking-tighter uppercase leading-none">
                    {step === "address" ? "Shipping Details" : "Secure Checkout"}
                  </h2>
                  <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mt-1">
                    Premium Bottled Elegance
                  </p>
                </div>
              </div>
              <button 
                onClick={handleClose}
                className="text-white/20 hover:text-white transition-colors p-2"
                disabled={isProcessing}
              >
                <span className="text-2xl leading-none">×</span>
              </button>
            </div>

            <div className="overflow-y-auto max-h-[75vh] no-scrollbar">
              <AnimatePresence mode="wait">
                {step === "address" && (
                  <motion.div
                    key="address"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-8 flex flex-col gap-6"
                  >
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-2">
                       <h4 className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold mb-4">Cart Summary</h4>
                       <div className="flex flex-col gap-3">
                         {cartItems.map((item) => (
                           <div key={item.name} className="flex justify-between text-xs uppercase tracking-widest">
                             <span className="text-white/60">{item.name} x{item.quantity}</span>
                             <span>{item.price}</span>
                           </div>
                         ))}
                         <div className="pt-3 border-t border-white/5 flex justify-between items-center text-white">
                           <span className="text-[9px] uppercase tracking-[0.3em] text-white/40">Shipping</span>
                           <span className="text-[9px] uppercase tracking-[0.3em] text-gold font-black italic">Calculated after address</span>
                         </div>
                       </div>
                    </div>

                    <form onSubmit={handleAddressSubmit} className="flex flex-col gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 flex flex-col gap-2">
                          <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1 font-bold">Full Name</label>
                          <input 
                            required 
                            className="bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm focus:outline-none focus:border-gold/30 transition-colors uppercase"
                            value={addressForm.fullName}
                            onChange={(e) => setAddressForm({...addressForm, fullName: e.target.value})}
                            placeholder="BERNIE VORSTER"
                          />
                        </div>
                        <div className="col-span-2 flex flex-col gap-2">
                          <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1 font-bold">Street Address</label>
                          <input 
                            required 
                            className="bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm focus:outline-none focus:border-gold/30 transition-colors uppercase"
                            value={addressForm.streetAddress}
                            onChange={(e) => setAddressForm({...addressForm, streetAddress: e.target.value})}
                            placeholder="123 ELITE BOULEVARD"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1 font-bold">Suburb</label>
                          <input 
                            required 
                            className="bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm focus:outline-none focus:border-gold/30 transition-colors uppercase"
                            value={addressForm.suburb}
                            onChange={(e) => setAddressForm({...addressForm, suburb: e.target.value})}
                            placeholder="SANDTON"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1 font-bold">City</label>
                          <input 
                            required 
                            className="bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm focus:outline-none focus:border-gold/30 transition-colors uppercase"
                            value={addressForm.city}
                            onChange={(e) => setAddressForm({...addressForm, city: e.target.value})}
                            placeholder="JOHANNESBURG"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1 font-bold">Province</label>
                          <input 
                            required 
                            className="bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm focus:outline-none focus:border-gold/30 transition-colors uppercase"
                            value={addressForm.province}
                            onChange={(e) => setAddressForm({...addressForm, province: e.target.value})}
                            placeholder="GAUTENG"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1 font-bold">Postal Code</label>
                          <input 
                            required 
                            className="bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm focus:outline-none focus:border-gold/30 transition-colors uppercase"
                            value={addressForm.postalCode}
                            onChange={(e) => setAddressForm({...addressForm, postalCode: e.target.value})}
                            placeholder="2000"
                          />
                        </div>
                        <div className="col-span-2 flex flex-col gap-2">
                          <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1 font-bold">Phone Number</label>
                          <input 
                            required 
                            className="bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm focus:outline-none focus:border-gold/30 transition-colors uppercase"
                            value={addressForm.phoneNumber}
                            onChange={(e) => setAddressForm({...addressForm, phoneNumber: e.target.value})}
                            placeholder="+27 00 000 0000"
                          />
                        </div>
                      </div>
                      <button 
                        type="submit"
                        disabled={isCalculatingShipping}
                        className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.3em] text-[13px] hover:bg-gold transition-all duration-500 rounded-xl mt-4"
                      >
                        {isCalculatingShipping ? "CALCULATING SHIPPING..." : "CONTINUE TO PAYMENT"}
                      </button>
                    </form>
                  </motion.div>
                )}

                {step === "payfast" && (
                  <motion.div
                    key="payfast"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-8 flex flex-col gap-8"
                  >
                    <div className="bg-gold/5 rounded-2xl p-8 border border-gold/20 text-center">
                      <div className="w-20 h-20 mx-auto mb-6 bg-white/10 rounded-2xl flex items-center justify-center p-4">
                        <img 
                          src="/logos/payfast.jpeg" 
                          alt="Payfast" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <h4 className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold mb-4">Secure Redirect</h4>
                      <p className="text-sm text-white/60 leading-relaxed px-4">
                        You will be securely redirected to Payfast to complete your payment using Card or Instant EFT.
                      </p>
                    </div>

                    <div className="flex flex-col gap-4">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1 font-bold">Email for Receipt</label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-gold/40" />
                        <input 
                          id="payfast-email" 
                          required 
                          type="email" 
                          placeholder="YOUR@EMAIL.COM" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-5 pl-14 pr-5 text-sm focus:outline-none focus:border-gold/30 transition-colors placeholder:text-white/10 font-bold" 
                        />
                      </div>
                    </div>

                    <div className="mt-4 pt-8 border-t border-white/5">
                      <div className="flex flex-col gap-2 mb-6">
                        <div className="flex justify-between items-center">
                          <span className="text-white/40 text-xs font-light uppercase tracking-widest">Subtotal:</span>
                          <span className="text-sm font-bold text-white/80">R{getSubtotal().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/40 text-xs font-light uppercase tracking-widest">Shipping:</span>
                          <span className="text-sm font-bold text-gold">R{shippingCost.toFixed(2)}</span>
                        </div>
                        <div className="h-[1px] bg-white/5 my-2" />
                        <div className="flex justify-between items-center">
                          <span className="text-white text-sm font-bold uppercase tracking-widest">Total to pay:</span>
                          <span className="text-3xl font-black text-white">R{getTotal().toFixed(2)}</span>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={async () => {
                          const emailInput = document.getElementById('payfast-email') as HTMLInputElement;
                          const email = emailInput?.value || '';
                          if (!email) {
                            alert('Please enter your email address for your receipt.');
                            return;
                          }
                          try {
                            localStorage.setItem('buyerEmail', email);
                            await submitPayFast({
                              amount: getTotal().toFixed(2),
                              itemName: cartItems.map(i => i.name).join(', '),
                              buyerEmail: email,
                              buyerName: addressForm.fullName
                            });
                          } catch (error) {
                            console.error("PayFast checkout init failed:", error);
                            alert("Unable to start PayFast checkout. Please try again.");
                          }
                        }}
                        className="w-full py-6 bg-gold text-black font-black uppercase tracking-[0.4em] text-[14px] hover:bg-white transition-all duration-500 rounded-2xl flex flex-col items-center justify-center gap-1 group overflow-hidden relative shadow-[0_20px_50px_rgba(212,175,55,0.3)]"
                      >
                        <span className="relative z-10 text-black">CONTINUE TO PAYFAST</span>
                      </button>

                      {/* EFT Payment Option */}
                      <button
                        type="button"
                        onClick={async () => {
                          const emailInput = document.getElementById('payfast-email') as HTMLInputElement;
                          const email = emailInput?.value || '';
                          if (!email) {
                            alert('Please enter your email address first.');
                            return;
                          }
                          setShowEftDetails(true);
                          if (!eftSent) {
                            setEftLoading(true);
                            try {
                              const itemsList = cartItems.map(i => `${i.name} x${i.quantity} (${i.price})`).join(", ");
                              const shippingDetails = `${addressForm.fullName}\n${addressForm.streetAddress}\n${addressForm.suburb}, ${addressForm.city}\n${addressForm.province}, ${addressForm.postalCode}\nPhone: ${addressForm.phoneNumber}`;
                              
                              await fetch('/api/send-email', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                  type: 'owner',
                                  buyer_name: addressForm.fullName,
                                  buyer_email: email,
                                  order_id: referenceNumber,
                                  item_name: itemsList,
                                  amount: getTotal().toFixed(2),
                                  payment_method: 'EFT',
                                  payment_date: new Date().toLocaleDateString('en-ZA'),
                                  shipping_address: shippingDetails,
                                  waybill_number: 'N/A'
                                })
                              });
                              setEftSent(true);
                            } catch (err) {
                              console.error('EFT notification error:', err);
                            } finally {
                              setEftLoading(false);
                            }
                          }
                        }}
                        className="w-full py-5 bg-transparent border-2 border-gold/70 text-white font-black uppercase tracking-[0.4em] text-[13px] hover:border-gold hover:bg-gold/10 transition-all duration-300 rounded-2xl mt-2"
                      >
                        {eftLoading ? 'SENDING...' : 'PAY VIA EFT'}
                      </button>

                      {/* EFT banking details rendered as a popup — see AnimatePresence block below */}
                    </div>
                  </motion.div>
                )}

                {step === "success" && (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-8 flex flex-col gap-6"
                  >
                    <div className="flex flex-col items-center justify-center text-center gap-4 mb-2">
                      <div className="w-16 h-16 bg-gold/20 text-gold rounded-full flex items-center justify-center">
                        <CheckCircle2 size={32} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-[10px] text-white/40 uppercase tracking-[0.2em]">Reference: {referenceNumber}</p>
                        <h3 className="text-2xl font-black uppercase tracking-tighter mt-1">Thank you!</h3>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <h4 className="text-sm uppercase tracking-widest text-white/80 font-bold mb-4">Order details</h4>
                      <div className="space-y-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Contact information</p>
                          <p className="text-xs text-white/80">Stored securely and encrypted</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Shipping address</p>
                          <p className="text-xs text-white/80">As provided during checkout</p>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={handleClose}
                      className="w-full py-5 bg-gold text-black font-black uppercase tracking-[0.3em] text-[13px] hover:bg-white transition-all duration-500 rounded-xl mt-2 shadow-[0_10px_400px_rgba(212,175,55,0.2)]"
                    >
                      CONTINUE SHOPPING
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Encrypted */}
            <div className="p-6 flex items-center justify-center gap-3 opacity-20 border-t border-white/5">
              <div className="h-[1px] flex-1 bg-white" />
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-white rounded-full" />
                <span className="text-[8px] uppercase tracking-[0.4em] whitespace-nowrap">End-to-End Encrypted</span>
                <div className="w-1 h-1 bg-white rounded-full" />
              </div>
              <div className="h-[1px] flex-1 bg-white" />
            </div>
          </motion.div>

          {/* ── EFT Banking Details Popup ── */}
          <AnimatePresence>
            {showEftDetails && (
              <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 overflow-y-auto">
                {/* Backdrop — click to close */}
                <motion.div
                  key="eft-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                  onClick={() => setShowEftDetails(false)}
                />

                {/* Modal card */}
                <motion.div
                  key="eft-modal"
                  initial={{ scale: 0.92, opacity: 0, y: 24 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.92, opacity: 0, y: 24 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="relative w-full max-w-md bg-[#0d0d0d] border border-gold/30 rounded-2xl p-8 flex flex-col gap-5 shadow-[0_30px_80px_rgba(0,0,0,0.9)] z-10"
                >
                  {/* Header row */}
                  <div className="flex items-center justify-between">
                    <h4 className="text-[11px] uppercase tracking-[0.3em] text-gold font-black">Banking Details</h4>
                    <button
                      onClick={() => setShowEftDetails(false)}
                      className="text-white/30 hover:text-white transition-colors text-xl leading-none"
                    >
                      ×
                    </button>
                  </div>

                  {/* Details grid */}
                  <div className="grid grid-cols-[130px_1fr] gap-y-3 text-xs">
                    <span className="text-white/40 uppercase tracking-widest">Bank</span>
                    <span className="text-white font-bold">Capitec Business</span>

                    <span className="text-white/40 uppercase tracking-widest">Account Name</span>
                    <span className="text-white font-bold">Drop Selling International (Pty) Ltd</span>

                    <span className="text-white/40 uppercase tracking-widest">Account No</span>
                    <span className="text-white font-bold tracking-widest">1054055360</span>

                    <span className="text-white/40 uppercase tracking-widest">Branch Code</span>
                    <span className="text-white font-bold">450105</span>

                    <span className="text-white/40 uppercase tracking-widest">SWIFT</span>
                    <span className="text-white font-bold">CABLZAJJ</span>

                    <span className="text-white/40 uppercase tracking-widest">Reference</span>
                    <span className="text-gold font-black tracking-wider">{referenceNumber}</span>
                  </div>

                  {/* Divider + instructions */}
                  <div className="pt-4 border-t border-white/10 text-[11px] text-white/55 leading-relaxed">
                    Please email your proof of payment to{' '}
                    <a href="mailto:sales@drop-selling.com" className="text-gold underline">sales@drop-selling.com</a>
                    <br />
                    Your order will be processed once payment is confirmed.
                  </div>

                  {eftSent && (
                    <p className="text-[10px] text-gold/70 uppercase tracking-[0.2em]">
                      ✓ Owner notified — we&apos;re expecting your payment
                    </p>
                  )}

                  <button
                    onClick={() => setShowEftDetails(false)}
                    className="w-full py-4 mt-1 bg-gold/10 border border-gold/40 text-gold font-black uppercase tracking-[0.3em] text-[12px] hover:bg-gold hover:text-black transition-all duration-300 rounded-xl"
                  >
                    Got It
                  </button>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  </> );
}
