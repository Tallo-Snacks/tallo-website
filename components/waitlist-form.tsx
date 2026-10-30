"use client";

import { useEffect, useState, type FormEvent } from "react";

export type Flavor = "sea-salt" | "smoked-chipotle" | "rosemary-garlic" | "all";
export const FLAVOR_EVENT = "tallo:flavor";

const OPTIONS: { value: Flavor; label: string }[] = [
  { value: "sea-salt", label: "Sea Salt" },
  { value: "smoked-chipotle", label: "Smoked Chipotle" },
  { value: "rosemary-garlic", label: "Rosemary & Garlic" },
  { value: "all", label: "One of each" },
];

export function WaitlistForm() {
  const [flavor, setFlavor] = useState<Flavor>("all");
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const onPick = (e: Event) => {
      const detail = (e as CustomEvent<Flavor>).detail;
      if (detail) setFlavor(detail);
    };
    window.addEventListener(FLAVOR_EVENT, onPick);
    return () => window.removeEventListener(FLAVOR_EVENT, onPick);
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, flavor, zip }),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (json.ok) {
        setState("done");
      } else {
        setState("error");
        setMessage(json.error ?? "Something went wrong. Try again in a minute.");
      }
    } catch {
      setState("error");
      setMessage("We couldn't reach the list. Check your connection and try again.");
    }
  }

  if (state === "done") {
    return (
      <div className="t-form t-form--done" role="status">
        <p className="t-form__done-title">Saved you a bag.</p>
        <p>You&apos;re on the list. We&apos;ll send one email the day the first batch goes on sale.</p>
      </div>
    );
  }

  return (
    <form className="t-form" onSubmit={onSubmit} noValidate>
      <fieldset className="t-form__flavors">
        <legend>Which bag do you want first?</legend>
        <div className="t-form__chips">
          {OPTIONS.map((o) => (
            <label key={o.value} className="t-chip">
              <input
                type="radio"
                name="flavor"
                id={`flavor-${o.value}`}
                value={o.value}
                checked={flavor === o.value}
                onChange={() => setFlavor(o.value)}
              />
              <span>{o.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="t-form__row">
        <label className="t-field">
          <span>Email</span>
          <input
            id="waitlist-email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="t-field">
          <span>ZIP (optional)</span>
          <input
            id="waitlist-zip"
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="48864"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </label>
      </div>
      <button type="submit" className="t-slab-cta" disabled={state === "sending"}>
        {state === "sending" ? "Saving your spot" : "Put me on the list"}
      </button>
      {state === "error" ? (
        <p className="t-form__error" role="alert">
          {message}
        </p>
      ) : (
        <p className="t-form__fine">One email when the first batch drops. No spam, ever.</p>
      )}
    </form>
  );
}
