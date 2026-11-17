# Tallo website: notes for Claude

This is the marketing site for Tallo, organic sweet potato chips kettle cooked in grass-fed beef tallow.
The two founders edit it through Claude Code / Cowork and are not developers, so explain changes in plain words.

## Stack
- Next.js 15 (App Router), React 19, TypeScript. Plain CSS in `app/globals.css`, no Tailwind.
- Hosted on Vercel. A push to `main` deploys to production automatically.
- Waitlist signups go to a Supabase table (`supabase/waitlist.sql`) through `app/api/waitlist/route.ts`.

## Where things are
- Home page content (film chapters, flavors, FAQ): `app/page.tsx`
- Brand kit page: `app/brand/page.tsx`
- Design tokens (colors, fonts) at the top of `app/globals.css`
- Logo components: `components/logo.tsx`; SVG exports in `public/assets/brand/`
- Scroll-driven film: `components/scroll-film.tsx`, media in `public/assets/film/`
- Photos: `public/assets/img/` (each has a full size and a `-sm` version)

## Brand rules (keep these when editing)
- Palette: Pasture `#0F1F17`, Butter `#F7E7B4`, Paper `#FBF3DF`, Yam `#E8641E` (the only accent).
  Flavor band colors (Sea Salt `#4A2416`, Nashville Hot `#7A2420`, Rosemary Garlic `#3F4A2E`) appear only on flavor elements.
- Type: Schibsted Grotesk (bold) for headlines, Instrument Sans for body, DM Mono for label-style text. The TALLO logo wordmark is chunky Fraunces Black, drawn as an SVG in `components/logo.tsx`; don't redraw it in a font.
- Look: clean and light. Mostly cream/white backgrounds, thin borders, rounded corners, pill buttons. Dark green mainly for the film and footer.
- Voice: plain and confident. Name the ingredient instead of using adjectives. No health claims.
- Imagery must look clean, dry, and crisp. Avoid greasy, glistening, frying, or oil-dripping visuals;
  the founders heard this turns off customers, especially older shoppers.
- Product facts: 3 ingredients (organic sweet potatoes, grass-fed beef tallow, sea salt), 8 oz (227 g) full-size stand-up pouch with zip (changed from 5 oz in Nov 2026; the pouch renderings still show 5 oz).
  Not vegetarian. Gluten status and certifications are not finalized, so don't claim them.

## Store
- Products and display prices: `lib/catalog.ts`. Real prices and stock live in the Supabase `products` table; checkout reads those.
- Shipping prices: `lib/shipping.ts`.
- Checkout: `app/api/checkout/route.ts` (Stripe Checkout). Paid orders are saved by `app/api/stripe-webhook/route.ts`.
- The shop only opens when `STRIPE_SECRET_KEY` is set and `NEXT_PUBLIC_STORE_OPEN=true` in Vercel. Until then it shows the waitlist.
- Env vars: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, RESEND_API_KEY, EMAIL_FROM, NEXT_PUBLIC_STORE_OPEN, NEXT_PUBLIC_SITE_URL, STRIPE_TAX.
- Supabase project: `tallo` (ref kjhfxyungqjwnychawsz). Schema is in `supabase/schema.sql`.

## Before pushing
Run `npm run typecheck` and `npm run build`. Both must pass.
