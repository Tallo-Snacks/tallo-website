import { FlavorPick } from "@/components/flavor-pick";
import { AddToBag } from "@/components/cart";
import { storeOpen } from "@/lib/stripe";
import { TalloMark } from "@/components/logo";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { WaitlistForm, type Flavor } from "@/components/waitlist-form";

const FLAVORS: { id: Flavor; name: string; note: string; pairs: string }[] = [
  { id: "sea-salt", name: "Sea Salt", note: "The original. Sweet potato, tallow, salt, crunch.", pairs: "Burgers, a cold drink, a long drive" },
  { id: "nashville-hot", name: "Nashville Hot", note: "Cayenne heat with a touch of sweet, Nashville style.", pairs: "Game day, wings night, a cold drink" },
  { id: "rosemary-garlic", name: "Rosemary Garlic", note: "Herby and savory, a little Sunday roast on a chip.", pairs: "Cheese boards, steak night, wine" },
];

const FAQ = [
  {
    q: "Why beef tallow instead of vegetable oil?",
    a: "Tallow is rendered beef fat, the cooking fat most kitchens used before seed oils became the default. It holds up well to heat and gives a clean, savory crunch. Many people now look for it to avoid canola, sunflower, and soybean oil.",
  },
  { q: "Are Tallo chips greasy?", a: "No. We cook in small batches and drain every batch well, so the chips come out light, dry, and crisp, not oily." },
  { q: "Are Tallo chips vegetarian?", a: "No. Tallow comes from beef, so these are not vegetarian or vegan." },
  { q: "Are they gluten free?", a: "None of our three ingredients contain gluten. We will publish our facility and certification details before the first batch ships." },
  { q: "What size is the bag?", a: "A full-size 8 oz (227 g) stand-up pouch with a zip reseal, so the last chip is as crisp as the first." },
  { q: "When can I buy them?", a: "The first batch is small. Join the list and you will get one email the day it opens, before anyone else." },
];

export default function Home() {
  const open = storeOpen();
  return (
    <div className="t-site">
      <SiteNav />
      <main>
        <section className="t-hero" aria-labelledby="hero-title">
          <picture className="t-hero__img">
            <source media="(max-width: 860px)" srcSet="/assets/img/hero-mobile.webp" />
            <img
              src="/assets/img/hero.webp"
              srcSet="/assets/img/hero-sm.webp 1200w, /assets/img/hero.webp 2400w"
              sizes="100vw"
              alt="A Sea Salt bag of sweet potato chips beside a pile of chips with flaky salt, a crock of white beef tallow, and a whole sweet potato"
              width={2400}
              height={1344}
              fetchPriority="high"
            />
          </picture>
          <div className="t-wrap t-hero__inner">
            <div className="t-hero__copy">
              <p className="t-hero__kicker">Organic sweet potato · Grass-fed beef tallow · Sea salt</p>
              <h1 id="hero-title" className="t-hero__title">Three ingredients. Not one more.</h1>
              <p className="t-hero__lede">Thick-cut sweet potatoes, kettle cooked in grass-fed beef tallow and finished with flaky sea salt.</p>
              <div className="t-chapter-actions">
                <a href={open ? "/shop" : "#waitlist"} className="t-tear-cta">Get the first batch</a>
                <a href="#flavors" className="t-arrow-link">See the flavors</a>
              </div>
              <ul className="t-hero__tags">
                <li>No seed oils</li>
                <li>Organic potatoes</li>
                <li>Kettle cooked</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="t-band t-band--pasture" aria-labelledby="inside-title">
          <div className="t-wrap">
            <div className="t-section-head">
              <p className="t-eyebrow">What goes in</p>
              <h2 id="inside-title" className="t-h2">You can count the ingredients on one hand. With fingers to spare.</h2>
            </div>
            <ol className="t-ingredients">
              <li className="t-ingredient">
                <img src="/assets/img/ing-potato-sm.webp" alt="A whole sweet potato, thick raw slices, crisp chips, a dish of tallow, and flaky salt on cream linen" width={800} height={1000} loading="lazy" />
                <span className="t-ingredient__num">01 · Organic sweet potato</span>
                <h3>A real sweet potato, sliced thick.</h3>
                <p>Whole organic sweet potatoes, washed and cut thick so every chip keeps its natural sweetness.</p>
              </li>
              <li className="t-ingredient">
                <img src="/assets/img/ing-tallow-sm.webp" alt="A stoneware crock of firm white beef tallow with a wooden spoon beside sliced sweet potatoes" width={800} height={1000} loading="lazy" />
                <span className="t-ingredient__num">02 · Grass-fed beef tallow</span>
                <h3>Cooked in tallow, not seed oil.</h3>
                <p>The traditional fat kitchens used for generations. It holds up in the kettle and gives a light, dry crunch.</p>
              </li>
              <li className="t-ingredient">
                <img src="/assets/img/ing-salt-sm.webp" alt="Fingers sprinkling flaky sea salt over a pile of crisp sweet potato chips" width={800} height={1000} loading="lazy" />
                <span className="t-ingredient__num">03 · Sea salt</span>
                <h3>Finished with flaky sea salt.</h3>
                <p>A light pinch right out of the kettle, so you taste the potato first.</p>
              </li>
            </ol>
          </div>
        </section>

        <section className="t-band t-band--butter" id="bag" aria-labelledby="bag-title">
          <div className="t-wrap t-bag">
            <figure className="t-bag__figure">
              <img
                src="/assets/img/bag-sea-salt.webp"
                srcSet="/assets/img/bag-sea-salt-sm.webp 800w, /assets/img/bag-sea-salt.webp 896w"
                sizes="(max-width: 860px) 100vw, 50vw"
                alt="Sea Salt stand-up pouch, cream with a brown band"
                width={896}
                height={1120}
              />
            </figure>
            <div className="t-bag__copy">
              <p className="t-eyebrow">Meet the bag</p>
              <h2 id="bag-title" className="t-h2">A stand-up pouch you will actually reseal.</h2>
              <p className="t-lede">
                Thick-cut, kettle-cooked sweet potato chips in a pouch that stands on the shelf, in the cupboard, and
                on the tailgate. Zip it shut and they stay crisp.
              </p>
              <dl className="t-specs">
                <div><dt>Net wt</dt><dd>8 oz (227 g)</dd></div>
                <div><dt>Cooked in</dt><dd>Grass-fed beef tallow</dd></div>
                <div><dt>Potato</dt><dd>Organic sweet potato</dd></div>
                <div><dt>Closure</dt><dd>Press-to-close zip</dd></div>
              </dl>
              <div className="t-label-box">
                <p className="t-label-box__head">Ingredients</p>
                <p>Organic sweet potatoes, grass-fed beef tallow, sea salt.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="t-band t-band--white" id="flavors" aria-labelledby="flavors-title">
          <div className="t-wrap">
            <div className="t-section-head">
              <p className="t-eyebrow">The lineup</p>
              <h2 id="flavors-title" className="t-h2">Three bags. Same short label.</h2>
            </div>
            <figure className="t-lineup">
              <img
                src="/assets/img/lineup-scene.webp"
                srcSet="/assets/img/lineup-scene-sm.webp 1200w, /assets/img/lineup-scene.webp 2400w"
                sizes="(max-width: 1200px) 100vw, 1200px"
                alt="Sea Salt, Nashville Hot, and Rosemary Garlic bags side by side with chips, chili flakes, and rosemary"
                width={2400}
                height={1344}
                loading="lazy"
              />
            </figure>
            <ul className="t-flavors">
              {FLAVORS.map((f) => (
                <li key={f.id} className="t-flavor" data-flavor={f.id}>
                  <h3 className="t-flavor__name">{f.name}</h3>
                  <p className="t-flavor__note">{f.note}</p>
                  <p className="t-flavor__pairs"><span>Goes with</span> {f.pairs}</p>
                  {open ? <AddToBag id={f.id} label={`Add ${f.name} to bag`} /> : <FlavorPick flavor={f.id} label={f.name} />}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="t-band t-band--butter" id="tallow" aria-labelledby="tallow-title">
          <div className="t-wrap t-why">
            <div className="t-why__copy">
              <p className="t-eyebrow">Why tallow</p>
              <h2 id="tallow-title" className="t-h2">The cooking fat your great-grandparents trusted.</h2>
              <p className="t-lede">
                Most chips on the shelf are cooked in canola, sunflower, or safflower oil. We use grass-fed beef
                tallow, a traditional fat that stays stable in the kettle and lets a sweet potato taste like itself.
              </p>
              <div className="t-compare-wrap">
                <table className="t-compare">
                  <caption>How a bag of Tallo compares</caption>
                  <thead>
                    <tr><th scope="col"><span className="t-sr">Item</span></th><th scope="col">Tallo</th><th scope="col">Typical kettle chip</th></tr>
                  </thead>
                  <tbody>
                    <tr><th scope="row">Cooking fat</th><td>Grass-fed beef tallow</td><td>Canola, sunflower, or safflower oil</td></tr>
                    <tr><th scope="row">Base</th><td>Organic sweet potato</td><td>Conventional white potato</td></tr>
                    <tr><th scope="row">Seed oils</th><td>None</td><td>Usually</td></tr>
                    <tr><th scope="row">Ingredients</th><td>3</td><td>Often 5 or more</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="t-why__images">
              <img className="t-why__img" src="/assets/img/farm-sm.webp" alt="A crate of freshly dug sweet potatoes with grass-fed cattle grazing behind" width={800} height={1000} loading="lazy" />
              <img className="t-why__img t-why__img--b" src="/assets/img/chip-hand-sm.webp" alt="A hand holding up a single crisp sweet potato chip in soft daylight" width={800} height={1000} loading="lazy" />
            </div>
          </div>
        </section>

        <section className="t-band t-band--white" aria-labelledby="wild-title">
          <div className="t-wrap">
            <div className="t-section-head">
              <p className="t-eyebrow">Out in the wild</p>
              <h2 id="wild-title" className="t-h2">Built for tailgates, trailheads, and the kitchen table.</h2>
            </div>
            <div className="t-mosaic">
              <img className="t-mosaic__a" src="/assets/img/tailgate-sm.webp" alt="Friends reaching into a bowl of sweet potato chips at an autumn tailgate" width={800} height={1000} loading="lazy" />
              <img className="t-mosaic__b" src="/assets/img/chips-clean.webp" alt="Crisp sweet potato chips scattered on pale linen with flakes of sea salt" width={1600} height={900} loading="lazy" />
              <img className="t-mosaic__c" src="/assets/img/bowl-sm.webp" alt="A white bowl of sweet potato chips beside a whole sweet potato on an oak table" width={800} height={1000} loading="lazy" />
            </div>
          </div>
        </section>

        <section className="t-band t-band--butter" id="faq" aria-labelledby="faq-title">
          <div className="t-wrap t-faq">
            <h2 id="faq-title" className="t-h2">Questions people ask us.</h2>
            <div className="t-faq__list">
              {FAQ.map((item) => (
                <details key={item.q} className="t-faq__item">
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="t-band t-band--yam" id="waitlist" aria-labelledby="waitlist-title">
          <div className="t-wrap t-waitlist">
            <div className="t-waitlist__copy">
              <TalloMark className="t-waitlist__mark" title="" />
              <h2 id="waitlist-title" className="t-h2">The first batch is small. Get on the list.</h2>
              <p className="t-lede">
                We are making the launch run in small kettles. Pick your flavor and we will email you the day bags go
                on sale.
              </p>
            </div>
            <WaitlistForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
