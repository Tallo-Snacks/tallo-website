// Flat-rate shipping by number of bags (USPS Ground Advantage). Edit these to change shipping prices.
export const SHIPPING_TIERS = [
  { maxBags: 2, cents: 850, label: "1–2 bags" },
  { maxBags: 5, cents: 1050, label: "3–5 bags" },
  { maxBags: 11, cents: 1350, label: "6–11 bags" },
  { maxBags: Infinity, cents: 1650, label: "12+ bags" },
];

/** Orders at or above this subtotal ship free. Set to 0 to turn free shipping off. */
export const FREE_SHIPPING_OVER_CENTS = 0;

export function shippingFor(bags: number, subtotalCents: number) {
  if (FREE_SHIPPING_OVER_CENTS > 0 && subtotalCents >= FREE_SHIPPING_OVER_CENTS) return 0;
  return SHIPPING_TIERS.find((t) => bags <= t.maxBags)!.cents;
}
