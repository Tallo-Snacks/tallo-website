# Tallo website

The site for Tallo: organic sweet potato chips kettle cooked in grass-fed beef tallow.

Built with [Next.js](https://nextjs.org). Hosted on Vercel: every push to `main` goes live automatically.

## Editing the site

Open this folder in Claude Code (or Cowork) and ask for what you want changed, for example:
"change the FAQ answer about gluten" or "add a fourth flavor called Maple". Then push to `main`.

Where things live:

| What | File |
|---|---|
| Home page copy, flavors, FAQ | `app/page.tsx` |
| Brand kit page | `app/brand/page.tsx` |
| Colors, fonts, all styling | `app/globals.css` (color tokens at the top) |
| Logo (mark, wordmark, lockup) | `components/logo.tsx`, SVG files in `public/assets/brand/` |
| Scroll film behavior | `components/scroll-film.tsx` |
| Photos and the film | `public/assets/img/`, `public/assets/film/` |
| Waitlist form / storage | `components/waitlist-form.tsx`, `app/api/waitlist/route.ts` |

## Running it on your computer

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Waitlist

Signups are saved to a Supabase table. Run `supabase/waitlist.sql` once in your Supabase project,
then set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in Vercel (Project > Settings > Environment Variables).
Until those are set, the form tells visitors the list isn't open yet.
