import { NextResponse } from "next/server";
import type Stripe from "stripe";

import { CATALOG, type Flavor } from "@/lib/catalog";
import { orderConfirmationHtml, sendEmail } from "@/lib/email";
import { getStripe } from "@/lib/stripe";
import { db } from "@/lib/supabase";

export const runtime = "nodejs";

function orderNumber() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `TL-${s}`;
}

export async function POST(req: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const supa = db();
  if (!stripe || !secret || !supa) return NextResponse.json({ error: "Not configured" }, { status: 503 });

  const sig = req.headers.get("stripe-signature");
  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig ?? "", secret);
  } catch {
    return NextResponse.json({ error: "Bad signature" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed" && event.type !== "checkout.session.async_payment_succeeded") {
    return NextResponse.json({ received: true });
  }
  const session = event.data.object as Stripe.Checkout.Session;
  if (session.payment_status !== "paid") return NextResponse.json({ received: true });

  // Already saved? (Stripe can send the same event more than once.)
  const { data: existing } = await supa.from("orders").select("id").eq("stripe_session_id", session.id).maybeSingle();
  if (existing) return NextResponse.json({ received: true });

  const email = session.customer_details?.email ?? "";
  const name = session.customer_details?.name ?? null;
  const phone = session.customer_details?.phone ?? null;
  const optIn = session.consent?.promotions === "opt_in";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const s = session as any;
  const ship = s.collected_information?.shipping_details ?? s.shipping_details ?? null;

  // Customer record (keeps an existing opt-in if they already gave one)
  const { data: cust } = await supa
    .from("customers")
    .upsert({ email: email.toLowerCase(), name, phone, ...(optIn ? { email_opt_in: true } : {}) }, { onConflict: "email" })
    .select("id")
    .single();

  const cart = JSON.parse(session.metadata?.cart ?? "[]") as [string, number, number][];
  const items = cart.map(([id, qty, unit]) => ({
    product_id: id,
    name: CATALOG.find((p) => p.id === id)?.name ?? id,
    quantity: qty,
    unit_price_cents: unit,
  }));

  const totals = {
    subtotal_cents: session.amount_subtotal ?? 0,
    shipping_cents: session.total_details?.amount_shipping ?? 0,
    tax_cents: session.total_details?.amount_tax ?? 0,
    discount_cents: session.total_details?.amount_discount ?? 0,
    total_cents: session.amount_total ?? 0,
  };

  const number = orderNumber();
  const { data: order, error } = await supa
    .from("orders")
    .insert({
      order_number: number,
      stripe_session_id: session.id,
      stripe_payment_intent: typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id,
      customer_id: cust?.id ?? null,
      email,
      name: ship?.name ?? name,
      phone,
      shipping_address: ship?.address ?? null,
      ...totals,
      status: "paid",
    })
    .select("id")
    .single();
  if (error || !order) return NextResponse.json({ error: "Could not save order" }, { status: 500 });

  await supa.from("order_items").insert(items.map((i) => ({ ...i, order_id: order.id })));

  // Take the bags out of inventory (bundles use bags from each flavor)
  const used: Partial<Record<Flavor, number>> = {};
  for (const i of items) {
    const c = CATALOG.find((p) => p.id === i.product_id);
    for (const [f, n] of Object.entries(c?.contents ?? {}) as [Flavor, number][]) used[f] = (used[f] ?? 0) + n * i.quantity;
  }
  for (const [f, n] of Object.entries(used) as [Flavor, number][]) {
    await supa.rpc("decrement_stock", { p_id: f, qty: n });
  }

  if (email) {
    await sendEmail(email, `Your Tallo order ${number}`, orderConfirmationHtml({ order_number: number, name, items, ...totals }));
  }

  return NextResponse.json({ received: true });
}
