import { createHash } from "crypto";
import { NextResponse } from "next/server";

const PAYFAST_SANDBOX_URL = "https://sandbox.payfast.co.za/eng/process";
const PAYFAST_LIVE_URL = "https://www.payfast.co.za/eng/process";
const PAYFAST_ORDER = [
  "merchant_id",
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
  return encodeURIComponent(String(value).trim())
    .replace(/%20/g, "+")
    .replace(/%[0-9a-f]{2}/gi, (m) => m.toUpperCase());
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

  const payload = parts.join("&");
  return createHash("md5").update(payload, "utf8").digest("hex");
}

export async function POST(request) {
  try {
    const body = await request.json();
    const amountNum = Number(body.amount);
    if (!Number.isFinite(amountNum) || amountNum <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const merchantId = (process.env.PAYFAST_MERCHANT_ID ?? "34565375").trim();
    const merchantKey = (process.env.PAYFAST_MERCHANT_KEY ?? "wzjgtpckgsck").trim();
    const passphrase = (process.env.PAYFAST_PASSPHRASE ?? "").trim();
    const isLive = String(process.env.PAYFAST_ENV ?? "").trim().toLowerCase() === "live";
    const payfastUrl = isLive ? PAYFAST_LIVE_URL : PAYFAST_SANDBOX_URL;

    const orderId = String(Date.now());
    const itemName = String(body.itemName ?? "").trim().slice(0, 100);
    const buyerEmail = String(body.buyerEmail ?? "").trim();
    const buyerName = String(body.buyerName ?? "").trim();

    const parts = buyerName.split(/\s+/).filter(Boolean);
    const nameFirst = parts[0] ?? "";
    const nameLast = parts.slice(1).join(" ");

    const origin = request.nextUrl.origin;
    const data = {
      merchant_id: merchantId,
      merchant_key: merchantKey,
      return_url: `${origin}/success?order_id=${orderId}&amount=${amountNum.toFixed(2)}`,
      cancel_url: `${origin}`,
      notify_url: `${origin}/api/payfast/webhook`,
      name_first: nameFirst,
      name_last: nameLast,
      email_address: buyerEmail,
      m_payment_id: orderId,
      amount: amountNum.toFixed(2),
      item_name: itemName || "Order",
    };

    const signature = generateSignature(data, passphrase);

    return NextResponse.json({
      url: payfastUrl,
      fields: { ...data, signature },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Checkout error" },
      { status: 500 }
    );
  }
}
