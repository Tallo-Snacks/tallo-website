// The product list shown on the site. Prices here are display prices only:
// checkout always re-reads prices from the database so nobody can change them in the browser.
export type Flavor = "sea-salt" | "nashville-hot" | "rosemary-garlic";

export type Product = {
  id: string;
  name: string;
  kind: "bag" | "bundle";
  priceCents: number;
  bags: number;
  /** How many of each flavor one unit uses (for bundles) */
  contents: Partial<Record<Flavor, number>>;
  blurb: string;
  image: string;
  imageSm: string;
  band?: string;
};

export const BAG_SIZE = "8 oz (227 g)";

export const CATALOG: Product[] = [
  {
    id: "sea-salt",
    name: "Sea Salt",
    kind: "bag",
    priceCents: 1099,
    bags: 1,
    contents: { "sea-salt": 1 },
    blurb: "The original. Sweet potato, tallow, salt, crunch.",
    image: "/assets/img/bag-sea-salt.webp",
    imageSm: "/assets/img/bag-sea-salt-sm.webp",
    band: "sea-salt",
  },
  {
    id: "nashville-hot",
    name: "Nashville Hot",
    kind: "bag",
    priceCents: 1099,
    bags: 1,
    contents: { "nashville-hot": 1 },
    blurb: "Cayenne heat with a touch of sweet, Nashville style.",
    image: "/assets/img/bag-nashville-hot.webp",
    imageSm: "/assets/img/bag-nashville-hot-sm.webp",
    band: "nashville-hot",
  },
  {
    id: "rosemary-garlic",
    name: "Rosemary Garlic",
    kind: "bag",
    priceCents: 1099,
    bags: 1,
    contents: { "rosemary-garlic": 1 },
    blurb: "Herby and savory, a little Sunday roast on a chip.",
    image: "/assets/img/bag-rosemary-garlic.webp",
    imageSm: "/assets/img/bag-rosemary-garlic-sm.webp",
    band: "rosemary-garlic",
  },
  {
    id: "sampler-3",
    name: "The Sampler",
    kind: "bundle",
    priceCents: 2999,
    bags: 3,
    contents: { "sea-salt": 1, "nashville-hot": 1, "rosemary-garlic": 1 },
    blurb: "One bag of each flavor. The best way to find your favorite.",
    image: "/assets/img/lineup.webp",
    imageSm: "/assets/img/lineup-sm.webp",
  },
  {
    id: "pack-6",
    name: "The 6-Pack",
    kind: "bundle",
    priceCents: 5499,
    bags: 6,
    contents: { "sea-salt": 2, "nashville-hot": 2, "rosemary-garlic": 2 },
    blurb: "Two of each flavor, for the pantry, the truck and the tailgate.",
    image: "/assets/img/lineup.webp",
    imageSm: "/assets/img/lineup-sm.webp",
  },
];

export function findProduct(id: string) {
  return CATALOG.find((p) => p.id === id);
}

export function money(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}
