"use client";

import { FLAVOR_EVENT, type Flavor } from "./waitlist-form";

export function FlavorPick({ flavor, label }: { flavor: Flavor; label: string }) {
  return (
    <a
      href="#waitlist"
      className="t-band-cta"
      onClick={() => window.dispatchEvent(new CustomEvent(FLAVOR_EVENT, { detail: flavor }))}
    >
      Save me a bag of {label}
    </a>
  );
}
