/**
 * © 2026 Bernie Vorster / WebWizSystems
 * 
 * Project: Ayoba Scrollytelling
 * File: route.js
 * 
 * This codebase is proprietary and confidential.
 * Unauthorized use, copying, modification, or distribution is strictly prohibited.
 * 
 * Built & maintained by WebWizSystems
 * https://webwizsystems.com
 * 
 * Created: 2026-06-01
 * Last Updated: 2026-06-01
 * Signature ID: WWZ-AYOBA-SCROLLYTELLING-2026-911
 */

import { createHash } from "crypto";
import { NextResponse } from "next/server";

const PAYFAST_SANDBOX_URL = "https://sandbox.payfast.co.za/eng/process";
const PAYFAST_LIVE_URL = "https://www.payfast.co.za/eng/process";

function generateSignature(data, passphrase) {
  // 1. Build parameter string in this exact order:
  const order = [
    "merchant_id",
    "merchant_key",
    "return_url",
    "cancel_url",
    "notify_url",
    "name_first",
    "name_last",
    "email_address",
    "amount",
    "item_name"
  ];

  const parts = [];

  for (const key of order) {
    const raw = data[key];
    if (raw === null || raw === undefined) continue;
    const value = String(raw).trim();
    if (value === "") continue;

    // 2. URL encode each value using encodeURIComponent, replace %20 with +
    const encodedValue = encodeURIComponent(value).replace(/%20/g, "+");
    
    // 3. Join as key=value pairs with & between them
    parts.push(`${key}=${encodedValue}`);
  }

  let signatureString = parts.join("&");

  // 4. Append &passphrase=... at the end
  const pp = (passphrase ?? "").trim();
  if (pp) {
    signatureString += `&passphrase=${encodeURIComponent(pp).replace(/%20/g, "+")}`;
  }

  // 5. MD5 hash the entire string
  return createHash("md5").update(signatureString, "utf8").digest("hex");
}

export async function POST(request) {
  try {
    const body = await request.json();
    const amountNum = Number(body.amount);
    if (!Number.isFinite(amountNum) || amountNum <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const nextUrl = new URL(request.url);
    const origin = nextUrl.origin;
    
    const isLive = false;
    const payfastUrl = isLive ? PAYFAST_LIVE_URL : PAYFAST_SANDBOX_URL;

    const merchantId = isLive
      ? (process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_ID ?? process.env.PAYFAST_MERCHANT_ID ?? "34565375").trim()
      : "10000100";

    const merchantKey = isLive
      ? (process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_KEY ?? process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_KEY ?? "wzjqtpckgqsck").trim()
      : "46f0cd694581a";

    const passphrase = isLive
      ? (process.env.PAYFAST_PASSPHRASE ?? "Dropsellint2026").trim()
      : "jt7NOE43FZPn";

    const orderId = String(Date.now());
    const itemName = String(body.itemName ?? "").trim().slice(0, 100);
    const buyerEmail = String(body.buyerEmail ?? "").trim();
    const buyerName = String(body.buyerName ?? "").trim();

    const nameParts = buyerName.split(/\s+/).filter(Boolean);
    const nameFirst = nameParts[0] ?? "";
    const nameLast = nameParts.slice(1).join(" ");

    const signatureData = {
      merchant_id: merchantId,
      merchant_key: merchantKey,
      return_url: `${origin}/success?order_id=${orderId}&amount=${amountNum.toFixed(2)}&item_name=${encodeURIComponent(itemName || "Order")}`,
      cancel_url: `${origin}`,
      notify_url: `${origin}/api/payfast/webhook`,
      name_first: nameFirst,
      name_last: nameLast,
      email_address: buyerEmail,
      amount: amountNum.toFixed(2),
      item_name: itemName || "Order",
    };

    const signature = generateSignature(signatureData, passphrase);

    console.log("DEBUG PAYFAST OUTGOING:", {
      payfastUrl,
      merchantId,
      merchantKey,
      passphrase,
      signatureData,
      signature
    });

    return NextResponse.json({
      url: payfastUrl,
      fields: {
        ...signatureData,
        signature,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Checkout error" },
      { status: 500 }
    );
  }
}