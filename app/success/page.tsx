/**
 * © 2026 Bernie Vorster / WebWizSystems
 * 
 * Project: Ayoba Scrollytelling
 * File: app/success/page.tsx
 * 
 * This codebase is proprietary and confidential.
 * Unauthorized use, copying, modification, or distribution is strictly prohibited.
 * 
 * Built & maintained by WebWizSystems
 * https://webwizsystems.com
 * 
 * Created: 2026-04-23
 * Last Updated: 2026-05-26
 * Signature ID: WWZ-AYOBA-SCROLLYTELLING-2026-911
 */

"use client";

import { useEffect, Suspense, useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2 } from "lucide-react";
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useCart } from "@/components/CartProvider";

function SuccessContent() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const [waybillNumber, setWaybillNumber] = useState<string | null>(null);
  const [shippingAddress, setShippingAddress] = useState<Record<string, string> | null>(null);
  const [emailsSent, setEmailsSent] = useState(false);

  useEffect(() => {
    clearCart();
  }, []);

  useEffect(() => {
    const storedAddr = localStorage.getItem('shippingAddress');
    if (storedAddr) {
      try {
        setShippingAddress(JSON.parse(storedAddr));
      } catch (e) {
        console.error('Error parsing shippingAddress from localStorage:', e);
      }
    }

    const stored = localStorage.getItem('waybill_number');
    if (stored) {
      setWaybillNumber(stored);
    } else {
      const interval = setInterval(() => {
        const val = localStorage.getItem('waybill_number');
        if (val) {
          setWaybillNumber(val);
          clearInterval(interval);
        }
      }, 500);
      const fallbackTimer = setTimeout(() => {
        if (!localStorage.getItem('waybill_number')) {
          setWaybillNumber("N/A");
          clearInterval(interval);
        }
      }, 5000);
      return () => {
        clearInterval(interval);
        clearTimeout(fallbackTimer);
      };
    }
  }, []);

  const sendSuccessEmails = async (waybill: string) => {
    const orderId = searchParams.get('order_id') || 'N/A';
    const storageKey = `email_sent_${orderId}`;
    if (sessionStorage.getItem(storageKey)) {
      return;
    }

    sessionStorage.setItem(storageKey, 'true');
    setEmailsSent(true);

    let shippingDetails = "N/A";
    const storedAddr = localStorage.getItem('shippingAddress');
    if (storedAddr) {
      try {
        const addr = JSON.parse(storedAddr);
        shippingDetails = `${addr.fullName}\n${addr.streetAddress}\n${addr.suburb}, ${addr.city}\n${addr.province}, ${addr.postalCode}\nPhone: ${addr.phoneNumber}`;
      } catch (e) {
        console.error("Error parsing shipping address:", e);
      }
    }

    const { data: { user } } = await supabase.auth.getUser();
    const buyerEmail = user?.email || searchParams.get('email') || localStorage.getItem('buyerEmail') || '';
    const buyerName = user?.user_metadata?.full_name || searchParams.get('name') || buyerEmail.split('@')[0] || 'Customer';
    const amountVal = searchParams.get('amount') || '0';
    const itemName = searchParams.get('item_name') || 'Ayoba Hobo Collection';

    const emailPayload = {
      buyer_name: buyerName,
      buyer_email: buyerEmail,
      order_id: orderId,
      item_name: itemName,
      amount: amountVal,
      payment_method: 'PayFast',
      payment_date: new Date().toLocaleDateString('en-ZA'),
      shipping_address: shippingDetails,
      waybill_number: waybill,
    };

    console.log('Sending confirmation emails via Resend API...', emailPayload);

    // 1. Send Buyer Email
    try {
      const resBuyer = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'buyer',
          ...emailPayload
        })
      });
      if (resBuyer.ok) {
        console.log('Buyer email sent successfully');
      } else {
        console.error('Failed to send buyer email:', await resBuyer.text());
      }
    } catch (err) {
      console.error('Buyer email error:', err);
    }

    // 2. Send Owner Email
    try {
      const resOwner = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'owner',
          ...emailPayload
        })
      });
      if (resOwner.ok) {
        console.log('Owner email sent successfully');
        localStorage.removeItem('shippingAddress');
      } else {
        console.error('Failed to send owner email:', await resOwner.text());
      }
    } catch (err) {
      console.error('Owner email error:', err);
    }
  };

  useEffect(() => {
    if (waybillNumber && !emailsSent) {
      sendSuccessEmails(waybillNumber);
    }
  }, [waybillNumber, emailsSent]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 pt-32 pb-20">

      <div className="w-full max-w-xl bg-[#0a0a0a] border border-gold/30 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="p-8 md:p-12 flex flex-col gap-8">
          {/* Logo & Status */}
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex items-center gap-2 text-white/80 font-bold tracking-widest text-xs uppercase">
               <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
               Drop Selling International
            </div>
            <div className="px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full flex items-center gap-2 text-green-500 text-[10px] font-bold uppercase tracking-widest">
              <CheckCircle2 size={12} />
              Payment Confirmed
            </div>
          </div>

          {/* Greeting */}
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-black text-gold uppercase tracking-tighter mb-2">
              Thank You, {searchParams.get('name') || 'Customer'}!
            </h1>
            <p className="text-white/40 text-xs uppercase tracking-widest font-medium">
              Your order has been received and confirmed.
            </p>
          </div>

          <div className="h-[1px] bg-white/5" />

          {/* Details */}
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex justify-between items-center py-1">
              <span className="text-white/30 uppercase tracking-widest text-[10px] font-bold">Order Reference</span>
              <span className="text-white font-mono font-bold tracking-widest">#{searchParams.get('order_id') || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-white/30 uppercase tracking-widest text-[10px] font-bold">Item</span>
              <span className="text-white font-bold text-right max-w-[200px] truncate">{searchParams.get('item_name') || 'Drop Selling Course'}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-white/30 uppercase tracking-widest text-[10px] font-bold">Email</span>
              <span className="text-gold font-medium lowercase tracking-normal">{searchParams.get('email') || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-white/30 uppercase tracking-widest text-[10px] font-bold">Payment Date</span>
              <span className="text-white/80">{new Date().toLocaleDateString('en-ZA')}</span>
            </div>
            {waybillNumber && (
              <div className="flex justify-between items-center py-1">
                <span className="text-white/30 uppercase tracking-widest text-[10px] font-bold">Your Tracking Number</span>
                <span className="text-gold font-bold tracking-widest font-mono">{waybillNumber}</span>
              </div>
            )}

            {shippingAddress && (
              <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-2">
                <span className="text-white/30 uppercase tracking-widest text-[10px] font-bold">Shipping Address</span>
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <div className="flex flex-col gap-1 text-[11px] text-white/70 uppercase tracking-wider font-medium">
                    <p className="text-gold font-bold">{shippingAddress.fullName}</p>
                    <p>{shippingAddress.streetAddress}</p>
                    <p>{shippingAddress.suburb}, {shippingAddress.city}</p>
                    <p>{shippingAddress.province}, {shippingAddress.postalCode}</p>
                    <p className="mt-1 text-white/40">{shippingAddress.phoneNumber}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="h-[1px] bg-white/5" />

          {/* Total */}
          <div className="flex justify-between items-center">
            <span className="text-gold font-black uppercase tracking-[0.2em] text-sm">Amount Paid</span>
            <span className="text-3xl font-black text-white">R{searchParams.get('amount') || '0'}</span>
          </div>
        </div>

        {/* Action */}
        <div className="bg-white/5 p-6 border-t border-white/5 flex justify-center">
          <a 
            href="/" 
            className="w-full py-4 bg-white text-black font-black uppercase tracking-[0.3em] text-[11px] hover:bg-gold transition-all duration-500 rounded-xl text-center shadow-lg"
          >
            Return Home
          </a>
        </div>
      </div>

      <p className="mt-12 text-[10px] text-white/20 uppercase tracking-[0.4em] font-medium">
        A confirmation email has been sent to your inbox
      </p>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-[#050505] flex flex-col">
      <Header />
      <Suspense fallback={<div className="flex-1 flex items-center justify-center text-gold uppercase tracking-widest">Loading confirmation...</div>}>
        <SuccessContent />
      </Suspense>
      <Footer />
      <script dangerouslySetInnerHTML={{ __html: `window.__WWZ_SIGNATURE__ = "WWZ-AYOBA-SCROLLYTELLING-2026-911"; console.log("Built by WebWizSystems — Signature: WWZ-AYOBA-SCROLLYTELLING-2026-911");` }} />
    </main>
  );
}
