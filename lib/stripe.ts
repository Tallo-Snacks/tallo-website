import Stripe from "stripe";

let stripe: Stripe | null = null;

/** Server-only Stripe client. Returns null until STRIPE_SECRET_KEY is set in Vercel. */
export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (!stripe) stripe = new Stripe(key);
  return stripe;
}

export function storeOpen() {
  return Boolean(process.env.STRIPE_SECRET_KEY) && process.env.NEXT_PUBLIC_STORE_OPEN === "true";
}
