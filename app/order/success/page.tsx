import type { Metadata } from "next";
import Link from "next/link";

import { ClearCart } from "@/components/clear-cart";
import { TalloMark } from "@/components/logo";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { getStripe } from "@/lib/stripe";

export const metadata: Metadata = { title: "Order placed | Tallo", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function Success({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  let name: string | null = null;
  let email: string | null = null;
  const stripe = getStripe();
  if (stripe && session_id) {
    try {
      const s = await stripe.checkout.sessions.retrieve(session_id);
      name = s.customer_details?.name ?? null;
      email = s.customer_details?.email ?? null;
    } catch {
      /* show the generic thank-you */
    }
  }
  return (
    <div className="t-site">
      <SiteNav onDark={false} />
      <ClearCart />
      <main>
        <section className="t-band t-band--butter t-thanks">
          <div className="t-wrap">
            <TalloMark className="t-waitlist__mark" title="" />
            <h1 className="t-h2">Thanks{name ? `, ${name.split(" ")[0]}` : ""}. Your order is in.</h1>
            <p className="t-lede">
              {email ? <>A receipt is on its way to <strong>{email}</strong>. </> : null}
              We pack every order by hand and email a tracking number when it ships, usually within 2 business days.
            </p>
            <Link href="/" className="t-arrow-link">Back to Tallo</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
