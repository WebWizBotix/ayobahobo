/**
 * © 2026 Bernie Vorster / WebWizSystems
 * 
 * Project: Ayoba Scrollytelling
 * File: app/api/send-email/route.ts
 * 
 * This codebase is proprietary and confidential.
 * Unauthorized use, copying, modification, or distribution is strictly prohibited.
 * 
 * Built & maintained by WebWizSystems
 * https://webwizsystems.com
 * 
 * Created: 2026-05-26
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
      type,
      buyer_name,
      buyer_email,
      order_id,
      item_name,
      amount,
      payment_method,
      payment_date,
      shipping_address,
      waybill_number,
    } = body;

    if (!type || (type !== "buyer" && type !== "owner")) {
      return NextResponse.json({ error: "Invalid email type" }, { status: 400 });
    }

    const templateFileName = type === "buyer" ? "buyer_template.html" : "owner_template.html";
    const templatePath = path.join(process.cwd(), "emails", templateFileName);

    if (!fs.existsSync(templatePath)) {
      return NextResponse.json({ error: `Template file not found at ${templatePath}` }, { status: 404 });
    }

    let htmlContent = fs.readFileSync(templatePath, "utf-8");

    // Replace all placeholders
    htmlContent = htmlContent.replace(/\{\{buyer_name\}\}/g, buyer_name || "");
    htmlContent = htmlContent.replace(/\{\{buyer_email\}\}/g, buyer_email || "");
    htmlContent = htmlContent.replace(/\{\{order_id\}\}/g, order_id || "");
    htmlContent = htmlContent.replace(/\{\{item_name\}\}/g, item_name || "");
    htmlContent = htmlContent.replace(/\{\{amount\}\}/g, amount || "");
    htmlContent = htmlContent.replace(/\{\{payment_method\}\}/g, payment_method || "");
    htmlContent = htmlContent.replace(/\{\{payment_date\}\}/g, payment_date || "");
    htmlContent = htmlContent.replace(/\{\{shipping_address\}\}/g, shipping_address || "");
    htmlContent = htmlContent.replace(/\{\{waybill_number\}\}/g, waybill_number || "N/A");

    const subject = type === "buyer"
      ? `Your Order is Confirmed — #${order_id}`
      : `New Order — #${order_id} | R${amount}`;

    const toEmail = type === "buyer" ? buyer_email : "sales@drop-selling.com";

    console.log(`Sending Resend email of type ${type} to ${toEmail}...`);

    const { data, error } = await resend.emails.send({
      from: "Drop Selling International <sales@drop-selling.com>",
      to: toEmail,
      replyTo: "sales@drop-selling.com",
      subject: subject,
      html: htmlContent,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Built by WebWizSystems – Signature: WWZ-AYOBA-SCROLLYTELLING-2026-911");
    console.log(`Resend email sent successfully. ID: ${data?.id}`);
    return NextResponse.json({ success: true, emailId: data?.id });
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error("Send-email API error:", err);
    return NextResponse.json({ error: errMsg || "Internal Server Error" }, { status: 500 });
  }
}
