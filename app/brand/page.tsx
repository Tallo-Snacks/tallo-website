import type { Metadata } from "next";

import { TalloLockup, TalloMark, TalloWordmark } from "@/components/logo";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

export const metadata: Metadata = {
  title: "Tallo Brand Kit",
  description: "Logo, colors, type, voice, and packaging for Tallo sweet potato chips.",
};

const COLORS = [
  { name: "Pasture", hex: "#0F1F17", use: "Dark bands, film backdrop, text on light", ink: "#FBF3DF" },
  { name: "Butter", hex: "#F7E7B4", use: "Light bands and cards", ink: "#0F1F17" },
  { name: "Paper", hex: "#FBF3DF", use: "Pouch stock, text on dark", ink: "#0F1F17" },
  { name: "Yam", hex: "#E8641E", use: "The one accent. Wordmark, key actions", ink: "#0F1F17" },
];
const FLAVOR_COLORS = [
  { name: "Sea Salt band", hex: "#D9531E" },
  { name: "Smoked Chipotle band", hex: "#7A2420" },
  { name: "Rosemary & Garlic band", hex: "#7F936B" },
];
const VOICE = [
  { rule: "Say the ingredient, not the adjective.", yes: "Cooked in grass-fed beef tallow.", no: "Crafted with premium artisanal fats." },
  { rule: "Confident, never preachy.", yes: "Three ingredients. Not one more.", no: "Seed oils are poisoning you." },
  { rule: "Clean and crisp, never greasy.", yes: "A light, dry crunch.", no: "Dripping, sizzling, oozing." },
  { rule: "No health claims we can't back up.", yes: "No seed oils.", no: "Boosts metabolism and heart health." },
];
const DOWNLOADS = [
  { file: "/assets/brand/tallo-lockup-yam.svg", label: "Lockup, Yam" },
  { file: "/assets/brand/tallo-lockup-pasture.svg", label: "Lockup, Pasture" },
  { file: "/assets/brand/tallo-lockup-paper.svg", label: "Lockup, Paper (for dark)" },
  { file: "/assets/brand/tallo-wordmark-yam.svg", label: "Wordmark, Yam" },
  { file: "/assets/brand/tallo-mark-pasture.svg", label: "Mark, Pasture" },
  { file: "/assets/brand/tallo-mark-yam.svg", label: "Mark, Yam" },
];

export default function BrandPage() {
  return (
    <div className="t-site t-brand">
      <SiteNav onDark={false} />
      <main>
        <section className="t-band t-band--butter t-brand__hero">
          <div className="t-wrap">
            <p className="t-eyebrow">Brand kit · v1 · October 2026</p>
            <h1 className="t-brand__title">Tallo</h1>
            <p className="t-lede">
              Organic sweet potato chips, kettle cooked in grass-fed beef tallow. This page is the source of truth for
              how Tallo looks and sounds.
            </p>
          </div>
        </section>

        <section className="t-band t-band--paper" aria-labelledby="logo-title">
          <div className="t-wrap">
            <h2 id="logo-title" className="t-h2">Logo</h2>
            <p className="t-brand__note">
              The mark is a sweet potato wearing a pair of cow horns: both halves of the product in one line drawing.
              Use the lockup by default and the mark alone at small sizes (favicon, stickers, the pouch seal).
            </p>
            <div className="t-logo-grid">
              <div className="t-logo-tile t-logo-tile--butter"><TalloLockup className="t-logo-tile__lockup" /><span className="t-mono">Primary lockup on Butter</span></div>
              <div className="t-logo-tile t-logo-tile--pasture"><TalloLockup className="t-logo-tile__lockup" /><span className="t-mono">Reversed on Pasture</span></div>
              <div className="t-logo-tile t-logo-tile--yam"><TalloWordmark className="t-logo-tile__word" /><span className="t-mono">Wordmark on Yam</span></div>
              <div className="t-logo-tile t-logo-tile--paper"><TalloMark className="t-logo-tile__mark" /><span className="t-mono">Mark alone, 24px and up</span></div>
            </div>
            <ul className="t-downloads">
              {DOWNLOADS.map((d) => (
                <li key={d.file}>
                  <a href={d.file} download className="t-dl">{d.label} <span className="t-mono">SVG</span></a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="t-band t-band--butter" aria-labelledby="color-title">
          <div className="t-wrap">
            <h2 id="color-title" className="t-h2">Color</h2>
            <p className="t-brand__note">
              Pasture, Butter, and Yam come straight from the supply chain: green grass, rendered tallow, orange sweet
              potato. Yam is the only accent. Flavor colors live on the pouch bands only.
            </p>
            <ul className="t-swatches">
              {COLORS.map((c) => (
                <li key={c.name} className="t-swatch" style={{ background: c.hex, color: c.ink }}>
                  <strong>{c.name}</strong><span className="t-mono">{c.hex}</span><span className="t-swatch__use">{c.use}</span>
                </li>
              ))}
            </ul>
            <ul className="t-swatches t-swatches--small">
              {FLAVOR_COLORS.map((c) => (
                <li key={c.name} className="t-swatch" style={{ background: c.hex, color: "#FBF3DF" }}>
                  <strong>{c.name}</strong><span className="t-mono">{c.hex}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="t-band t-band--paper" aria-labelledby="type-title">
          <div className="t-wrap">
            <h2 id="type-title" className="t-h2">Type</h2>
            <div className="t-type-grid">
              <div className="t-type-card"><span className="t-mono">Display · Fraunces Black, Soft 100</span><p className="t-type-card__display">A clean, traditional fat.</p></div>
              <div className="t-type-card"><span className="t-mono">Body · Bricolage Grotesque</span><p className="t-type-card__body">Thick-cut, kettle-cooked sweet potato chips in a pouch that stands on the shelf and zips shut.</p></div>
              <div className="t-type-card"><span className="t-mono">Label · DM Mono</span><p className="t-mono t-type-card__mono">INGREDIENTS: ORGANIC SWEET POTATOES, GRASS-FED BEEF TALLOW, SEA SALT.</p></div>
            </div>
          </div>
        </section>

        <section className="t-band t-band--butter" aria-labelledby="voice-title">
          <div className="t-wrap">
            <h2 id="voice-title" className="t-h2">Voice</h2>
            <div className="t-compare-wrap">
              <table className="t-compare t-voice">
                <thead><tr><th scope="col">Rule</th><th scope="col">Say</th><th scope="col">Don&apos;t say</th></tr></thead>
                <tbody>
                  {VOICE.map((v) => (
                    <tr key={v.rule}><th scope="row">{v.rule}</th><td>{v.yes}</td><td className="t-voice__no">{v.no}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="t-band t-band--pasture" aria-labelledby="pack-title">
          <div className="t-wrap">
            <h2 id="pack-title" className="t-h2">Packaging</h2>
            <p className="t-brand__note t-brand__note--dark">
              5 oz stand-up pouch with a flat gusseted bottom, press-to-close zip, and tear notch. Matte paper-texture
              stock, Yam wordmark at the top, mark centered, flavor band across the bottom with the organic seal.
            </p>
            <div className="t-pack-grid">
              <img src="/assets/img/lineup.webp" alt="All three Tallo pouches" width={1600} height={905} loading="lazy" />
              <img src="/assets/img/pouch-sm.webp" alt="Tallo Sea Salt pouch, front" width={800} height={1000} loading="lazy" />
              <img src="/assets/img/pouch-open-sm.webp" alt="Tallo pouch, three-quarter view, opened" width={800} height={1000} loading="lazy" />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
