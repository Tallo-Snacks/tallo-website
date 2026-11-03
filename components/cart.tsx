"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { CATALOG, findProduct, money } from "@/lib/catalog";
import { shippingFor } from "@/lib/shipping";

type Line = { id: string; qty: number };
type Cart = {
  lines: Line[];
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
  count: number;
  bags: number;
  subtotal: number;
};

const CartCtx = createContext<Cart | null>(null);
const KEY = "tallo-cart";

export function CartProvider({ children, storeOpen }: { children: ReactNode; storeOpen: boolean }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines((JSON.parse(raw) as Line[]).filter((l) => findProduct(l.id)));
    } catch {
      /* private mode or blocked storage: start empty */
    }
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  const add = useCallback((id: string, qty = 1) => {
    setLines((ls) => {
      const found = ls.find((l) => l.id === id);
      return found ? ls.map((l) => (l.id === id ? { ...l, qty: Math.min(l.qty + qty, 24) } : l)) : [...ls, { id, qty }];
    });
    setOpen(true);
  }, []);
  const setQty = useCallback((id: string, qty: number) => {
    setLines((ls) => (qty <= 0 ? ls.filter((l) => l.id !== id) : ls.map((l) => (l.id === id ? { ...l, qty: Math.min(qty, 24) } : l))));
  }, []);
  const remove = useCallback((id: string) => setLines((ls) => ls.filter((l) => l.id !== id)), []);
  const clear = useCallback(() => setLines([]), []);

  const value = useMemo(() => {
    let count = 0, bags = 0, subtotal = 0;
    for (const l of lines) {
      const p = findProduct(l.id);
      if (!p) continue;
      count += l.qty;
      bags += l.qty * p.bags;
      subtotal += l.qty * p.priceCents;
    }
    return { lines, add, setQty, remove, clear, open, setOpen, count, bags, subtotal };
  }, [lines, add, setQty, remove, clear, open]);

  return (
    <CartCtx.Provider value={value}>
      {children}
      {storeOpen ? <CartDrawer /> : null}
    </CartCtx.Provider>
  );
}

export function useCart() {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart must be inside CartProvider");
  return c;
}

export function CartButton() {
  const { count, setOpen } = useCart();
  return (
    <button type="button" className="t-cart-btn" onClick={() => setOpen(true)} aria-label={`Open bag, ${count} items`}>
      <span>Bag</span>
      <span className="t-cart-btn__count">{count}</span>
    </button>
  );
}

export function AddToBag({ id, label = "Add to bag" }: { id: string; label?: string }) {
  const { add } = useCart();
  const p = findProduct(id);
  return (
    <button type="button" className="t-add-cta" data-band={p?.band ?? "bundle"} onClick={() => add(id)}>
      {label}
    </button>
  );
}

function CartDrawer() {
  const { lines, setQty, remove, open, setOpen, bags, subtotal } = useCart();
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const [msg, setMsg] = useState("");
  const ship = bags ? shippingFor(bags, subtotal) : 0;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  async function checkout() {
    setState("sending");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines }),
      });
      const json = (await res.json()) as { url?: string; error?: string };
      if (json.url) {
        window.location.href = json.url;
        return;
      }
      setState("error");
      setMsg(json.error ?? "Checkout didn't open. Try again in a minute.");
    } catch {
      setState("error");
      setMsg("We couldn't reach checkout. Check your connection and try again.");
    }
  }

  return (
    <div className="t-drawer" data-open={open ? "true" : "false"} aria-hidden={!open}>
      <button type="button" className="t-drawer__scrim" aria-label="Close bag" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} />
      <aside className="t-drawer__panel" role="dialog" aria-modal="true" aria-label="Your bag">
        <header className="t-drawer__head">
          <h2>Your bag</h2>
          <button type="button" className="t-drawer__close" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            Close
          </button>
        </header>
        {lines.length === 0 ? (
          <p className="t-drawer__empty">Your bag is empty. The Sampler is a good place to start.</p>
        ) : (
          <ul className="t-drawer__lines">
            {lines.map((l) => {
              const p = findProduct(l.id)!;
              return (
                <li key={l.id} className="t-line">
                  <img src={p.imageSm} alt="" width={64} height={80} />
                  <div className="t-line__info">
                    <strong>{p.name}</strong>
                    <span className="t-mono">{p.kind === "bundle" ? `${p.bags} bags` : "1 bag"} · {money(p.priceCents)}</span>
                    <div className="t-line__qty">
                      <button type="button" aria-label={`One less ${p.name}`} onClick={() => setQty(l.id, l.qty - 1)} tabIndex={open ? 0 : -1}>−</button>
                      <span aria-live="polite">{l.qty}</span>
                      <button type="button" aria-label={`One more ${p.name}`} onClick={() => setQty(l.id, l.qty + 1)} tabIndex={open ? 0 : -1}>+</button>
                      <button type="button" className="t-line__remove" onClick={() => remove(l.id)} tabIndex={open ? 0 : -1}>Remove</button>
                    </div>
                  </div>
                  <span className="t-line__total">{money(p.priceCents * l.qty)}</span>
                </li>
              );
            })}
          </ul>
        )}
        {lines.length ? (
          <footer className="t-drawer__foot">
            <div className="t-drawer__row"><span>Subtotal</span><span>{money(subtotal)}</span></div>
            <div className="t-drawer__row"><span>Shipping ({bags} {bags === 1 ? "bag" : "bags"})</span><span>{money(ship)}</span></div>
            <p className="t-drawer__fine">Tax, if any, is added at checkout. Ships in the US.</p>
            <button type="button" className="t-slab-cta" onClick={checkout} disabled={state === "sending"} tabIndex={open ? 0 : -1}>
              {state === "sending" ? "Opening checkout" : `Check out · ${money(subtotal + ship)}`}
            </button>
            {state === "error" ? <p className="t-form__error" role="alert">{msg}</p> : null}
          </footer>
        ) : null}
      </aside>
    </div>
  );
}

export { CATALOG };
