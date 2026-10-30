import { FlavorPick } from "@/components/flavor-pick";
import { TalloMark } from "@/components/logo";
import { ScrollFilm, type Chapter } from "@/components/scroll-film";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { WaitlistForm, type Flavor } from "@/components/waitlist-form";

const CHAPTERS: Chapter[] = [
  {
    id: "start",
    kicker: "Organic sweet potato",
    title: "Three ingredients. Not one more.",
    body: "Organic sweet potatoes, grass-fed beef tallow, and sea salt. That is the whole bag.",
    tags: ["No seed oils", "Organic potatoes", "Kettle cooked"],
    align: "left",
  },
  {
    id: "slice",
    kicker: "Sliced thick",
    title: "It starts with a real sweet potato.",
    body: "Whole organic sweet potatoes, washed and sliced thick so every chip keeps its natural sweetness.",
    align: "right",
  },
  {
    id: "crisp",
    kicker: "Grass-fed beef tallow",
    title: "A clean, traditional fat.",
    body: "We cook in grass-fed beef tallow instead of seed oils. It's the fat kitchens used for generations, and it gives a light, dry crunch.",
    tags: ["No canola", "No sunflower", "No soybean"],
    align: "left",
  },
  {
    id: "salt",
    kicker: "Finished with sea salt",
    title: "Crunch worth reading the label for.",
    body: "Flip the bag over. You will recognize every word on it.",
    actions: (
      <div className="t-chapter-actions">
        <a href="#waitlist" className="t-tear-cta">
          Get the first batch
        </a>
        <a href="#flavors" className="t-arrow-link">
          See the flavors
        </a>
      </div>
    ),
    align: "right",
  },
];

const FLAVORS: { id: Flavor; name: string; note: string; pairs: string }[] = [
  { id: "sea-salt", name: "Sea Salt", note: "The original. Sweet potato, tallow, salt, crunch.", pairs: "Burgers, a cold drink, a long drive" },
  { id: "smoked-chipotle", name: "Smoked Chipotle", note: "Slow smoky heat that builds, then gives way to the sweet.", pairs: "Tailgates, tacos, game night" },
  { id: "rosemary-garlic", name: "Rosemary & Garlic", note: "Herby and savory, a little Sunday roast on a chip.", pairs: "Cheese boards, steak night, wine" },
];

const FAQ = [
  {
    q: "Why beef tallow instead of vegetable oil?",
    a: "Tallow is rendered beef fat, the cooking fat most kitchens used before seed oils became the default. It holds up well to heat and gives a clean, savory crunch. Many people now look for it to avoid canola, sunflower, and soybean oil.",
  },
  { q: "Are Tallo chips greasy?", a: "No. We cook in small batches and drain every batch well, so the chips come out light, dry, and crisp, not oily." },
  { q: "Are Tallo chips vegetarian?", a: "No. Tallow comes from beef, so these are not vegetarian or vegan." },
  { q: "Are they gluten free?", a: "None of our three ingredients contain gluten. We will publish our facility and certification details before the first batch ships." },
  { q: "What size is the bag?", a: "A 5 oz (142 g) stand-up pouch with a zip reseal, so the last chip is as crisp as the first." },
  { q: "When can I buy them?", a: "The first batch is small. Join the list and you will get one email the day it opens, before anyone else." },
];

export default function Home() {
  return (
    <div className="t-site">
      <SiteNav />
      <main>
        <ScrollFilm
          chapters={CHAPTERS}
          src="/assets/film/film.mp4"
          mobileSrc="/assets/film/film-mobile.mp4"
          poster="/assets/film/poster.jpg"
          mobilePoster="/assets/film/poster-mobile.jpg"
        />

        <section className="t-band t-band--butter" id="bag" aria-labelledby="bag-title">
          <div className="t-wrap t-bag">
            <figure className="t-bag__figure">
              <img
                src="/assets/img/pouch.webp"
                srcSet="/assets/img/pouch-sm.webp 800w, /assets/img/pouch.webp 1600w"
                sizes="(max-width: 860px) 100vw, 50vw"
                alt="Tallo Sea Salt stand-up pouch with sweet potato chips and a whole sweet potato"
                width={1600}
                height={2000}
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
                <div><dt>Net wt</dt><dd>5 oz (142 g)</dd></div>
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

        <section className="t-band t-band--pasture" id="flavors" aria-labelledby="flavors-title">
          <div className="t-wrap">
            <div className="t-section-head">
              <p className="t-eyebrow t-eyebrow--yam">The lineup</p>
              <h2 id="flavors-title" className="t-h2">Three bags. Same three-ingredient rule.</h2>
            </div>
            <figure className="t-lineup">
              <img
                src="/assets/img/lineup.webp"
                srcSet="/assets/img/lineup-sm.webp 800w, /assets/img/lineup.webp 1600w"
                sizes="(max-width: 1200px) 100vw, 1200px"
                alt="Tallo Sea Salt, Smoked Chipotle, and Rosemary and Garlic stand-up pouches side by side"
                width={1600}
                height={905}
              />
            </figure>
            <ul className="t-flavors">
              {FLAVORS.map((f) => (
                <li key={f.id} className="t-flavor" data-flavor={f.id}>
                  <h3 className="t-flavor__name">{f.name}</h3>
                  <p className="t-flavor__note">{f.note}</p>
                  <p className="t-flavor__pairs"><span>Goes with</span> {f.pairs}</p>
                  <FlavorPick flavor={f.id} label={f.name} />
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

        <section className="t-label-hero" aria-labelledby="label-title">
          <img
            className="t-label-hero__img"
            src="/assets/img/ingredients.webp"
            srcSet="/assets/img/ingredients-sm.webp 800w, /assets/img/ingredients.webp 1600w"
            sizes="100vw"
            alt="A whole sweet potato, raw slices, a dish of white beef tallow, and a pile of sea salt"
            width={1600}
            height={2000}
            loading="lazy"
          />
          <div className="t-wrap t-label-hero__inner">
            <h2 id="label-title" className="t-label-hero__title">The whole label.</h2>
            <ol className="t-label-hero__list">
              <li><span className="t-mono">Sweet potato</span> Organic, sliced thick, skin on the edges.</li>
              <li><span className="t-mono">Beef tallow</span> From grass-fed cattle, rendered clean.</li>
              <li><span className="t-mono">Sea salt</span> A light dusting, right after cooking.</li>
            </ol>
          </div>
        </section>

        <section className="t-band t-band--pasture" aria-labelledby="wild-title">
          <div className="t-wrap">
            <div className="t-section-head">
              <p className="t-eyebrow t-eyebrow--yam">Out in the wild</p>
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
