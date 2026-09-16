@AGENTS.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing website for Cloveode Technologies (cloveode.com), an IT services studio in Mandi, Himachal Pradesh. Next.js 16 App Router, TypeScript, Tailwind CSS v4, `motion` (Framer Motion successor) for animation, Lenis for smooth scrolling. Deploys to Vercel. Apple-style visual direction: black/white section rhythm, one typeface (Onest), the brand pink→orange gradient reserved for the hero metaballs and small accents.

Next 16 differs from older training data. Read `node_modules/next/dist/docs/` before using an unfamiliar API (params are Promises, `proxy.ts` replaces middleware, `next lint` is gone).

## Commands

```bash
npm run dev                 # dev server on :3000
npm run build               # production build (also type-checks)
npm run start -- -p 3011    # serve the production build
npm run lint                # eslint (flat config, eslint-config-next)
npx tsc --noEmit -p .       # type-check only
node scripts/screenshots.mjs --base http://localhost:3011 --out ./shots --full /            # stitched full-page shot
node scripts/screenshots.mjs --base http://localhost:3011 --out ./shots --mobile / /about  # 390px iPhone viewport
```

No test runner is set up. Visual QA is done with `scripts/screenshots.mjs`, which drives the local Chrome binary via puppeteer-core and logs console errors per page. Use it after any layout or animation change; headless Chrome is the only reliable way to see motion here because background tabs pause `requestAnimationFrame`.

`scripts/brand-assets.mjs` regenerates `public/brand/*` and `src/app/icon.png` / `apple-icon.png` from a source logo PNG using sharp. Re-run it when the client sends final logo files.

## Architecture

**Content is separated from presentation.** Everything a non-developer might change lives in `src/content/`:
- `site.ts` – name, tagline, email, address, socials, nav, headline figures. The `figures` object drives the count-up sentence in `Figures`.
- `services.ts` – six services. `slug` values match the old site's URLs (`/services/web-development` etc.) and must not change without a redirect. `hue` rotates the brand gradient per service card.
- `projects.ts` – **placeholder** case studies until real ones arrive; `variant` + `hue` pick the abstract `CoverArt` composition. Swap `CoverArt` for real imagery in `ProjectTile` when screenshots exist.
- `process.ts`, `faq.ts` – copy for the pinned process section and accordion.

**Pages** (`src/app/`): `/`, `/services`, `/services/[slug]` (SSG via `generateStaticParams`), `/work`, `/about`, `/contact`. Old `/blog*` URLs 308 to `/` in `next.config.ts`. `sitemap.ts`, `robots.ts`, `opengraph-image.tsx` and the icon files are generated from content.

**Layout shell**: `layout.tsx` loads Onest via `next/font`, injects Organization JSON-LD, and wraps everything in `SmoothScroll` (Lenis, disabled under `prefers-reduced-motion`) → `Nav` → `main` → `Footer`. `body` is black; light sections set their own `bg-white`/`bg-fog` and `text-graphite`.

**Design tokens** are in `src/app/globals.css` under `@theme` (colors `ink`, `graphite`, `fog`, `mist`, `mute`, `brand-pink`, `brand-orange`; easings `ease-apple`, `ease-out-expo`). Type scale is exposed as utilities: `text-display`, `text-headline`, `text-title`, `text-lede`, `text-copy`, `text-fine`. Containers: `wrap` (82.5rem) and `wrap-narrow` (54rem). Use these instead of ad-hoc font sizes.

**Motion conventions**:
- `Reveal` (whileInView, once) is the only entrance animation; use it on headlines and key blocks, not on every element. `WordReveal` is for the single H1 on each page.
- Scroll-linked pieces use `useScroll` + `useTransform`: `Hero` (parallax), `Process` (pinned step counter), `ServicesRail` (progress bar for a horizontal snap scroller, which needs `data-lenis-prevent`).
- `Metaballs` is a raw WebGL fragment shader (no library). Ball orbits live in the `seeds` array; the last ball is the pointer and has zero radius until a pointer is present. Pauses when off-screen; renders one static frame under reduced motion.
- Every animated component checks `useReducedMotion`.

**Contact form**: `contact-form.tsx` (client, `useActionState`) → `actions.ts` server action → Resend. Requires `RESEND_API_KEY`, optional `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` (see `.env.example`). Without a key the action returns a friendly error pointing at info@cloveode.com. Has a honeypot field named `website`.

## Conventions

- Typographic apostrophes (’) in all prose, including string content. Straight quotes in JSX text fail lint.
- No ALL-CAPS eyebrows, no "→" in link text; text links use `TextLink` (chevron). Buttons are pill `Button` with `tone` matching the section background.
- Placeholder content must be flagged in the content file's header comment, as `projects.ts` is now.
- Don't commit or deploy without being asked.

## Deploying

Vercel project not yet linked. First deploy: `npx vercel login` (interactive, user runs it), then `npx vercel --prod`, then point the GoDaddy DNS for cloveode.com at Vercel (A record `76.76.21.21`, CNAME `www` → `cname.vercel-dns.com`) and add the env vars from `.env.example` in the Vercel dashboard.
