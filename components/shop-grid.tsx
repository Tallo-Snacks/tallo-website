"use client";

import { CATALOG, money } from "@/lib/catalog";

import { AddToBag } from "./cart";

export function ShopGrid({ storeOpen }: { storeOpen: boolean }) {
  return (
    <ul className="t-shop">
      {CATALOG.map((p) => (
        <li key={p.id} className="t-product" data-kind={p.kind} data-flavor={p.band ?? "bundle"}>
          <img src={p.imageSm} alt={`Tallo ${p.name}`} width={800} height={1000} loading="lazy" />
          <div className="t-product__body">
            <div className="t-product__top">
              <h3>{p.name}</h3>
              <span className="t-product__price">{money(p.priceCents)}</span>
            </div>
            <p className="t-mono t-product__meta">{p.kind === "bundle" ? `${p.bags} bags` : "1 bag"}</p>
            <p className="t-product__blurb">{p.blurb}</p>
            {storeOpen ? (
              <AddToBag id={p.id} />
            ) : (
              <a href="/#waitlist" className="t-band-cta t-product__soon">Join the list for the first batch</a>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
