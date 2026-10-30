import Link from "next/link";

import { TalloLockup } from "./logo";

export function SiteFooter() {
  return (
    <footer className="t-footer">
      <div className="t-wrap t-footer__inner">
        <TalloLockup className="t-footer__logo" />
        <p className="t-mono t-footer__line">Organic sweet potatoes · Grass-fed beef tallow · Sea salt</p>
        <nav className="t-footer__nav" aria-label="Footer">
          <Link href="/#flavors">Flavors</Link>
          <Link href="/#faq">FAQ</Link>
          <Link href="/brand">Brand kit</Link>
          <Link href="/#waitlist">First batch</Link>
        </nav>
        <p className="t-footer__fine">© 2026 Tallo Snack Co.</p>
      </div>
    </footer>
  );
}
