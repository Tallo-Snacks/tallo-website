import type { Metadata } from "next";

import { TalloLockup, TalloMark, TalloWordmark } from "@/components/logo";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

export const metadata: Metadata = {
  title: "Tallo Brand Kit",
  description: "Logo, colors, type, voice, and packaging for Tallo sweet potato chips.",
};

const COLORS = [
  { name: "Deep maroon", hex: "#3A1214", use: "Dark bands, footer, the hero wall", ink: "#FBF5EA" },
  { name: "Maroon", hex: "#5A1416", use: "Headlines, the name, outline buttons", ink: "#FBF5EA" },
  { name: "Cream", hex: "#F3E9D8", use: "Pouch stock and light bands", ink: "#2B1214" },
  { name: "Gold", hex: "#C69A4A", use: "The sunrise, fine accents, the main button", ink: "#2B1214" },
];
const FLAVOR_COLORS = [
  { name: "Sea Salt band", hex: "#4A2416" },
  { name: "Nashville Hot band", hex: "#7A2420" },
  { name: "Rosemary Garlic band", hex: "#3F4A2E" },
];
const VOICE = [
  { rule: "Say the ingredient, not the adjective.", yes: "Cooked in grass-fed beef tallow.", no: "Crafted with premium artisanal fats." },
  { rule: "Confident, never preachy.", yes: "Three ingredients. Not one more.", no: "Seed oils are poisoning you." },
  { rule: "Clean and crisp, never greasy.", yes: "A light, dry crunch.", no: "Dripping, sizzling, oozing." },
  { rule: "No health claims we can't back up.", yes: "No seed oils.", no: "Boosts metabolism and heart health." },
];
const DOWNLOADS = [
  { file: "/assets/brand/talo-emblem.svg", label: "Sunrise emblem, for light backgrounds" },
  { file: "/assets/brand/talo-emblem-reversed.svg", label: "Sunrise emblem, for dark backgrounds" },
  { file: "/assets/brand/favicon.svg", label: "App icon" },
];

export default function BrandPage() {
  return (
    <div className="t-site t-brand">
      <SiteNav onDark={false} />
      <main>
        <section className="t-band t-band--butter t-brand__hero">
          <div className="t-wrap">
            <p className="t-eyebrow">Brand kit · v2 · November 2026</p>
            <TalloMark className="t-brand__emblem" title="" />
            <h1 className="t-brand__title"><TalloWordmark className="t-brand__wordmark" /></h1>
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
              The sunrise from the top of the bag: gold rays over two leaves, with a fine line on each side. Use it
              small and quiet. In the site header it sits next to the name; alone it works as the app icon and a seal.
            </p>
            <div className="t-logo-grid">
              <div className="t-logo-tile t-logo-tile--butter"><TalloLockup className="t-logo-tile__lockup" /><span className="t-mono">Header lockup on cream</span></div>
              <div className="t-logo-tile t-logo-tile--pasture"><TalloLockup className="t-logo-tile__lockup" /><span className="t-mono">Reversed on deep maroon</span></div>
              <div className="t-logo-tile t-logo-tile--paper"><TalloMark className="t-logo-tile__mark" /><span className="t-mono">Emblem with lines</span></div>
              <div className="t-logo-tile t-logo-tile--yam"><img src="/assets/brand/favicon.svg" alt="" width={96} height={96} /><span className="t-mono">App icon</span></div>
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
              Taken from the bag: cream stock, maroon type, and a gold sunrise. Gold is the only accent. Flavor colors
              live on the pouch bands and flavor buttons only.
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
              <div className="t-type-card"><span className="t-mono">Headlines · Libre Caslon Text</span><p className="t-type-card__display">A clean, traditional fat.</p></div>
              <div className="t-type-card"><span className="t-mono">Body · Instrument Sans</span><p className="t-type-card__body">Thick-cut, kettle-cooked sweet potato chips in a pouch that stands on the shelf and zips shut.</p></div>
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
              8 oz full-size stand-up pouch with a flat gusseted bottom, press-to-close zip, and tear notch. Matte paper-texture
              cream stock, serif wordmark, gold details, and a slanted flavor band across the bottom with the flavor name in gold.
            </p>
            <div className="t-pack-grid">
              <img src="/assets/img/lineup.webp" alt="All three pouches" width={1600} height={904} loading="lazy" />
              <img src="/assets/img/bag-nashville-hot-sm.webp" alt="Nashville Hot pouch, front" width={800} height={1000} loading="lazy" />
              <img src="/assets/img/bag-rosemary-garlic-sm.webp" alt="Rosemary Garlic pouch, front" width={800} height={1000} loading="lazy" />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
