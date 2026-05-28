/**
 * © 2026 Bernie Vorster / WebWizSystems
 *
 * Project: Ayoba Scrollytelling
 * File: route.ts (api/notify-eft)
 *
 * This codebase is proprietary and confidential.
 * Unauthorized use, copying, modification, or distribution is strictly prohibited.
 *
 * Built & maintained by WebWizSystems
 * https://webwizsystems.com
 *
 * Created: 2026-05-23
 * Last Updated: 2026-05-26
 * Signature ID: WWZ-AYOBA-SCROLLYTELLING-2026-911
 */

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Resend } from "resend";

const resend = new Resend("re_G8DWyux4_H6x8XUTFva2VW41s3hcSsx2B");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerName,
      customerEmail,
      orderReference,
      items,
      total,
    } = body;

    const itemName = (items as { name: string; quantity: number; price: string }[])
      .map((i) => `${i.name} x${i.quantity} (${i.price})`)
      .join(", ");

    const amountFormatted = `R${Number(total).toFixed(2)}`;

    const templatePath = path.join(process.cwd(), "emails", "owner_template.html");
    if (!fs.existsSync(templatePath)) {
      return NextResponse.json({ error: "Template file not found" }, { status: 404 });
    }

    let htmlContent = fs.readFileSync(templatePath, "utf-8");

    // Replace all placeholders
    htmlContent = htmlContent.replace(/\{\{buyer_name\}\}/g, customerName || "Unknown");
    htmlContent = htmlContent.replace(/\{\{buyer_email\}\}/g, customerEmail || "");
    htmlContent = htmlContent.replace(/\{\{order_id\}\}/g, orderReference || "");
    htmlContent = htmlContent.replace(/\{\{item_name\}\}/g, itemName);
    htmlContent = htmlContent.replace(/\{\{amount\}\}/g, amountFormatted);
    htmlContent = htmlContent.replace(/\{\{payment_method\}\}/g, "EFT");
    htmlContent = htmlContent.replace(/\{\{payment_date\}\}/g, new Date().toLocaleDateString('en-ZA'));
    htmlContent = htmlContent.replace(/\{\{shipping_address\}\}/g, "EFT Pending (Address stored in database)");
    htmlContent = htmlContent.replace(/\{\{waybill_number\}\}/g, "N/A");

    console.log("Sending EFT owner notification via Resend...", orderReference);

    const { data, error } = await resend.emails.send({
      from: "Drop Selling International <sales@drop-selling.com>",
      to: "sales@drop-selling.com",
      replyTo: "sales@drop-selling.com",
      subject: `New Order — #${orderReference} | ${amountFormatted}`,
      html: htmlContent,
    });

    if (error) {
      console.error("Resend EFT notification error:", error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 200 });
    }

    console.log("Built by WebWizSystems – Signature: WWZ-AYOBA-SCROLLYTELLING-2026-911");
    return NextResponse.json({ ok: true, emailId: data?.id });
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error("notify-eft route error:", err);
    return NextResponse.json({ ok: false, error: errMsg || String(err) }, { status: 500 });
  }
}
