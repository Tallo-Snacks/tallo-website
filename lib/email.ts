// Sends email through Resend (https://resend.com). Quietly does nothing until RESEND_API_KEY is set.
type Item = { name: string; quantity: number; unit_price_cents: number };

export async function sendEmail(to: string, subject: string, html: string) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? "Tallo <orders@tallosnacks.com>";
  if (!key) return { skipped: true };
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject, html }),
  });
  return { ok: res.ok };
}

const wrap = (inner: string) => `
<div style="background:#F7E7B4;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#0F1F17">
  <div style="max-width:560px;margin:0 auto;background:#FBF3DF;border-radius:6px;padding:28px">
    <div style="font-family:Georgia,serif;font-weight:900;font-size:30px;color:#E8641E;letter-spacing:1px">TALLO</div>
    ${inner}
    <p style="font-size:12px;color:#3B4A3F;margin-top:28px">Tallo Snack Co. · Organic sweet potatoes · Grass-fed beef tallow · Sea salt</p>
  </div>
</div>`;

const dollars = (c: number) => `$${(c / 100).toFixed(2)}`;

export function orderConfirmationHtml(o: {
  order_number: string;
  name?: string | null;
  items: Item[];
  subtotal_cents: number;
  shipping_cents: number;
  tax_cents: number;
  discount_cents: number;
  total_cents: number;
}) {
  const rows = o.items
    .map(
      (i) =>
        `<tr><td style="padding:6px 0">${i.quantity} × ${i.name}</td><td style="padding:6px 0;text-align:right">${dollars(i.unit_price_cents * i.quantity)}</td></tr>`,
    )
    .join("");
  const line = (label: string, c: number) =>
    c ? `<tr><td style="padding:4px 0;color:#3B4A3F">${label}</td><td style="padding:4px 0;text-align:right">${dollars(c)}</td></tr>` : "";
  return wrap(`
    <h1 style="font-family:Georgia,serif;font-size:24px;margin:18px 0 6px">Thanks${o.name ? `, ${o.name.split(" ")[0]}` : ""}. Your chips are on the way soon.</h1>
    <p style="margin:0 0 18px">Order <strong>${o.order_number}</strong>. We'll email you a tracking number when it ships.</p>
    <table style="width:100%;border-collapse:collapse;border-top:2px solid #0F1F17">${rows}
      ${line("Subtotal", o.subtotal_cents)}${line("Shipping", o.shipping_cents)}${line("Tax", o.tax_cents)}${o.discount_cents ? line("Discount", -o.discount_cents) : ""}
      <tr><td style="padding:8px 0;font-weight:bold;border-top:1px solid #ccc">Total</td><td style="padding:8px 0;text-align:right;font-weight:bold;border-top:1px solid #ccc">${dollars(o.total_cents)}</td></tr>
    </table>`);
}
