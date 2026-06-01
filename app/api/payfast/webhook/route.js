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

const PAYFAST_ORDER = [
  "merchant_id",
  "merchant_key",
  "return_url",
  "cancel_url",
  "notify_url",
  "name_first",
  "name_last",
  "email_address",
  "cell_number",
  "m_payment_id",
  "amount",
  "item_name",
  "item_description",
  "custom_int1",
  "custom_int2",
  "custom_int3",
  "custom_int4",
  "custom_int5",
  "custom_str1",
  "custom_str2",
  "custom_str3",
  "custom_str4",
  "custom_str5",
  "email_confirmation",
  "confirmation_address",
  "payment_method",
];

function pfEncode(value) {
  return encodeURIComponent(String(value).trim()).replace(/%20/g, "+");
}

function generateSignature(data, passphrase) {
  const parts = [];
  for (const key of PAYFAST_ORDER) {
    if (!(key in data)) continue;
    const raw = data[key];
    if (raw === null || raw === undefined) continue;
    const trimmed = String(raw).trim();
    if (!trimmed) continue;
    parts.push(`${key}=${pfEncode(trimmed)}`);
  }

  const pp = (passphrase ?? "").trim();
  if (pp) {
    parts.push(`passphrase=${pfEncode(pp)}`);
  }

  return createHash("md5").update(parts.join("&"), "utf8").digest("hex");
}

export async function POST(request) {
  try {
    const raw = await request.text();
    const params = new URLSearchParams(raw);

    const payload = {};
    for (const [key, value] of params.entries()) {
      payload[key] = value;
    }

    const providedSignature = String(payload.signature ?? "").trim().toLowerCase();
    delete payload.signature;

    const sandboxMerchantId = (
      process.env.PAYFAST_SANDBOX_MERCHANT_ID ?? "10000100"
    ).trim();
    const liveMerchantId = (
      process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_ID ?? 
      process.env.PAYFAST_MERCHANT_ID ?? 
      "34565375"
    ).trim();
    const merchantId = String(payload.merchant_id ?? "").trim();
    const allowedMerchantIds = [sandboxMerchantId, liveMerchantId].filter(Boolean);

    if (allowedMerchantIds.length && !allowedMerchantIds.includes(merchantId)) {
      return NextResponse.json({ error: "Invalid merchant_id" }, { status: 400 });
    }

    const passphrase =
      merchantId === sandboxMerchantId
        ? (process.env.PAYFAST_SANDBOX_PASSPHRASE ?? "").trim()
        : (process.env.PAYFAST_PASSPHRASE ?? "Dropsellint2026").trim();
    const calculatedSignature = generateSignature(payload, passphrase).toLowerCase();

    if (!providedSignature || providedSignature !== calculatedSignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Signature is valid; handle order update logic here as needed.
    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Webhook error" },
      { status: 500 }
    );
  }
}
