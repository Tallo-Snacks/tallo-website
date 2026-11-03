import { NextResponse } from "next/server";

import { CATALOG, type Flavor } from "@/lib/catalog";
import { shippingFor } from "@/lib/shipping";
import { getStripe, storeOpen } from "@/lib/stripe";
import { db } from "@/lib/supabase";

type Line = { id: string; qty: number };

export async function POST(req: Request) {
  const stripe = getStripe();
  if (!stripe || !storeOpen()) {
    return NextResponse.json({ error: "The shop isn't open yet. Join the list and we'll email you the day it opens." }, { status: 503 });
  }

  let lines: Line[] = [];
  try {
    const body = (await req.json()) as { lines?: Line[] };
    lines = (body.lines ?? []).filter((l) => l && typeof l.id === "string" && Number.isInteger(l.qty) && l.qty > 0 && l.qty <= 24);
  } catch {
    return NextResponse.json({ error: "Your bag didn't come through. Refresh and try again." }, { status: 400 });
  }
  if (!lines.length) return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });

  // Prices and stock come from the database (falls back to the site catalog if the database isn't connected yet).
  const supa = db();
  const live = new Map<string, { name: string; price_cents: number; bags_per_unit: number; stock: number; active: boolean }>();
  if (supa) {
    const { data } = await supa.from("products").select("id,name,price_cents,bags_per_unit,stock,active");
    for (const p of data ?? []) live.set(p.id, p);
  }

  const need: Partial<Record<Flavor, number>> = {};
  const items: { id: string; name: string; qty: number; unit: number; bags: number }[] = [];
  for (const l of lines) {
    const c = CATALOG.find((p) => p.id === l.id);
    if (!c) continue;
    const row = live.get(c.id);
    if (row && !row.active) {
      return NextResponse.json({ error: `${c.name} isn't available right now. Remove it and try again.` }, { status: 409 });
    }
    items.push({ id: c.id, name: row?.name ?? c.name, qty: l.qty, unit: row?.price_cents ?? c.priceCents, bags: row?.bags_per_unit ?? c.bags });
    for (const [f, n] of Object.entries(c.contents) as [Flavor, number][]) need[f] = (need[f] ?? 0) + n * l.qty;
  }
  if (!items.length) return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });

  if (supa) {
    for (const [f, n] of Object.entries(need) as [Flavor, number][]) {
      const stock = live.get(f)?.stock ?? 0;
      if (n > stock) {
        const name = CATALOG.find((p) => p.id === f)?.name ?? f;
        return NextResponse.json(
          { error: stock > 0 ? `Only ${stock} bags of ${name} left. Lower the amount and try again.` : `${name} is sold out right now.` },
          { status: 409 },
        );
      }
    }
  }

  const bags = items.reduce((s, i) => s + i.bags * i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.unit * i.qty, 0);
  const shipping = shippingFor(bags, subtotal);
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin;

  let session;
  try {
  session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: items.map((i) => ({
      quantity: i.qty,
      price_data: {
        currency: "usd",
        unit_amount: i.unit,
        product_data: { name: `Tallo ${i.name}`, metadata: { product_id: i.id } },
      },
    })),
    shipping_address_collection: { allowed_countries: ["US"] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          display_name: shipping === 0 ? "Free shipping (USPS Ground Advantage)" : "USPS Ground Advantage",
          fixed_amount: { amount: shipping, currency: "usd" },
          delivery_estimate: { minimum: { unit: "business_day", value: 3 }, maximum: { unit: "business_day", value: 7 } },
        },
      },
    ],
    phone_number_collection: { enabled: true },
    allow_promotion_codes: true,
    consent_collection: { promotions: "auto" },
    automatic_tax: { enabled: process.env.STRIPE_TAX === "true" },
    metadata: { cart: JSON.stringify(items.map((i) => [i.id, i.qty, i.unit])) },
    success_url: `${site}/order/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${site}/shop`,
  });
  } catch (err) {
    console.error("checkout failed", err);
    return NextResponse.json({ error: "Checkout couldn't open just now. Try again in a minute." }, { status: 502 });
  }

  return NextResponse.json({ url: session.url });
}
