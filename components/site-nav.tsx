import Link from "next/link";

import { storeOpen } from "@/lib/stripe";

import { CartButton } from "./cart";
import { TalloLockup } from "./logo";

export function SiteNav({ onDark = true }: { onDark?: boolean }) {
  const open = storeOpen();
  return (
    <header className="t-nav" data-on-dark={onDark ? "true" : "false"}>
      <div className="t-nav__inner">
        <Link href="/" className="t-nav__brand" aria-label="Tallo home">
          <TalloLockup />
        </Link>
        <nav className="t-nav__links" aria-label="Main">
          <Link href="/shop">Shop</Link>
          <Link href="/#flavors">Flavors</Link>
          <Link href="/#tallow">Why tallow</Link>
          <Link href="/#faq">FAQ</Link>
          <Link href="/brand">Brand</Link>
        </nav>
        {open ? (
          <CartButton />
        ) : (
          <Link href="/#waitlist" className="t-tag-cta">
            <span>First batch</span>
          </Link>
        )}
      </div>
    </header>
  );
}
