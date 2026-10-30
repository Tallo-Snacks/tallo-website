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
  Flavor band colors (Sea Salt `#D9531E`, Smoked Chipotle `#7A2420`, Rosemary & Garlic `#7F936B`) appear only on flavor elements.
- Type: Fraunces Black with SOFT 100 for headlines, Bricolage Grotesque for body, DM Mono for label-style text.
- Voice: plain and confident. Name the ingredient instead of using adjectives. No health claims.
- Imagery must look clean, dry, and crisp. Avoid greasy, glistening, frying, or oil-dripping visuals;
  the founders heard this turns off customers, especially older shoppers.
- Product facts: 3 ingredients (organic sweet potatoes, grass-fed beef tallow, sea salt), 5 oz (142 g) stand-up pouch with zip.
  Not vegetarian. Gluten status and certifications are not finalized, so don't claim them.

## Before pushing
Run `npm run typecheck` and `npm run build`. Both must pass.
