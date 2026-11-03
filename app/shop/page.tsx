import type { Metadata } from "next";

import { ShopGrid } from "@/components/shop-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { BAG_SIZE } from "@/lib/catalog";
import { SHIPPING_TIERS, FREE_SHIPPING_OVER_CENTS } from "@/lib/shipping";
import { storeOpen } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Shop | Tallo",
  description: "Sweet potato chips cooked in grass-fed beef tallow. Single bags, the Sampler and 6-packs.",
};

export default function Shop() {
  const open = storeOpen();
  return (
    <div className="t-site">
      <SiteNav onDark={false} />
      <main>
        <section className="t-band t-band--butter t-shop-band">
          <div className="t-wrap">
            <p className="t-eyebrow">{open ? "Shop" : "Coming soon"}</p>
            <h1 className="t-h2">{open ? "Pick your bags." : "The first batch is almost here."}</h1>
            <p className="t-lede">
              Every bag is {BAG_SIZE} of sweet potato chips cooked in grass-fed beef tallow and finished with sea salt.
              {open ? " Ships in the US." : " Join the list and we'll email you the day it opens."}
            </p>
            <ShopGrid storeOpen={open} />
            <div className="t-ship-note">
              <h2 className="t-mono">Shipping</h2>
              <ul>
                {SHIPPING_TIERS.map((t) => (
                  <li key={t.label}>
                    {t.label}: ${(t.cents / 100).toFixed(2)}
                  </li>
                ))}
                {FREE_SHIPPING_OVER_CENTS > 0 ? <li>Free on orders over ${(FREE_SHIPPING_OVER_CENTS / 100).toFixed(0)}</li> : null}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
