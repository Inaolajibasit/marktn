# marktn PR — Website

A premium editorial site for marktn PR, Africa's culturally intelligent luxury PR and
marketing agency. Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, GSAP,
Framer Motion, and Lenis. **No CMS** — all content and image paths live in
`lib/content.ts`, and images are served locally from `/public/images`.

## 1. Design system (see `tailwind.config.ts` for tokens)

| Role | Choice | Why |
|---|---|---|
| Color | Ink `#0A0A0A`, Paper `#F7F5F2`, Rust `#C36A2D` | Per brief — off-black + warm white, one accent used only for the smallest marks (a rule, a word, the cursor) so it stays a signature, not a fill color. |
| Display type | **Fraunces** | High optical-size contrast, an italic with real editorial swash — reads as a magazine headline, not a UI font. |
| Body/UI type | **Instrument Sans** | Quiet, neutral, doesn't compete with Fraunces. |
| Mono/data type | **IBM Plex Mono** | Used only for eyebrows, captions, nav labels, stat labels — gives the site a "production credits" texture. |
| Signature element | The hero image loads desaturated and slightly misregistered, then resolves to full color and correct registration as you scroll — literalizing "Perception Is Different" in the first five seconds. The cursor is a small aperture ring (camera iris), not a generic dot, tying the lens/perception motif through every page. |

## 2. Content & images — how to edit

**All copy lives in `lib/content.ts`.** Campaigns, press mentions, services,
founder bio/timeline, values, impact stats, brand partner names — one file,
typed, no CMS to configure. To change any text on the site, edit that file.

**All images are local.** Drop files into `/public/images/...` at the exact
paths listed in `public/images/README.md` (e.g.
`/public/images/work/dior-lagos-launch/hero.jpg`). Every component uses
`next/image` pointed at these paths — swap the file, the site updates, no
rebuild step beyond `npm run dev`/`next build` needed.

To add a new campaign: create its folder under `/public/images/work/`, add
a matching object to the `campaigns` array in `lib/content.ts`. That's the
whole workflow — no schema, no studio, no deploy step for content.

## 3. Folder structure

```
marktn-pr/
├── app/
│   ├── layout.tsx            # fonts, SEO defaults, Lenis + cursor providers
│   ├── page.tsx               # Home
│   ├── globals.css
│   ├── sitemap.ts / robots.ts
│   ├── about/page.tsx
│   ├── services/page.tsx
│   ├── work/
│   │   ├── page.tsx           # filterable grid, reads lib/content.ts
│   │   ├── layout.tsx         # metadata (page.tsx is a client component)
│   │   └── [slug]/page.tsx    # case study template, statically generated
│   ├── press/page.tsx
│   └── contact/
│       ├── page.tsx
│       ├── layout.tsx
│       └── actions.ts         # server action → Resend
├── components/                # Navigation, Hero, FeaturedWork, Services,
│                               # ImpactCounter, LogoMarquee, Founder, Press,
│                               # Footer, SmoothScrollProvider, CursorAperture
├── lib/
│   ├── content.ts              # ← single source of truth for all copy/images
│   ├── fonts.ts
│   ├── motion.ts               # shared easing/duration tokens + reduced-motion check
│   └── utils.ts
├── public/images/               # local photography — see README.md inside
├── tailwind.config.ts
└── .env.example
```

## 4. Component architecture

Sections on Home (`Hero`, `FeaturedWork`, `Services`, `Founder`, `Press`,
`ImpactCounter`, `LogoMarquee`) are standalone components reused directly on
`/about`, `/services`, and `/press` so content and motion stay consistent
instead of being re-implemented per page. All GSAP work is scoped with
`gsap.context()` inside `useEffect` and torn down on unmount — required for
Next.js App Router since components can remount during navigation.

`SmoothScrollProvider` wraps the whole app once in `layout.tsx`, syncing Lenis
to GSAP's ticker so `ScrollTrigger` (used for the pinned horizontal gallery,
scroll-scrubbed hero image, and counters) stays perfectly in step with the
smoothed scroll position.

The case study route (`app/work/[slug]/page.tsx`) uses `generateStaticParams`
sourced from `lib/content.ts`, so every campaign page is statically generated
at build time — no client-side fetch, no loading state.

## 5. SEO strategy

- Per-page `Metadata` (title template, description, canonical) in every route; client-component routes get a thin server `layout.tsx` sibling to carry metadata.
- Organization JSON-LD in the root layout.
- `app/sitemap.ts` generates campaign URLs directly from `lib/content.ts`; `app/robots.ts` points to it.
- Open Graph + Twitter card images per page; case studies use the campaign hero image automatically via `generateMetadata`.

## 6. Accessibility

- Skip-to-content link as the first focusable element.
- Visible `:focus-visible` outline (rust, 2px, offset) everywhere — never suppressed.
- `prefers-reduced-motion` respected globally (CSS override in `globals.css`) and explicitly checked in every custom GSAP animation via `lib/motion.ts#prefersReducedMotion`.
- Semantic landmarks (`header`, `main`, `footer`, `nav` with `aria-label`), and the mobile menu toggle uses `aria-expanded`/`aria-controls`.
- Form fields use associated `<label>`, `aria-invalid`, and `aria-describedby` pointing at inline error text; submission status uses `role="status" aria-live="polite"`.
- The custom cursor is `aria-hidden` and disabled entirely on coarse-pointer (touch) devices.

## 7. Performance

- Server Components by default; `"use client"` only where interactivity requires it (nav, hero, counters, form, filter grid).
- `next/font` for all three typefaces (self-hosted, zero layout shift, no external font request).
- `next/image` everywhere, with `fill` + explicit `sizes` per breakpoint — automatic responsive `srcset` and lazy loading with no CDN required, since everything is local.
- GSAP contexts are reverted on unmount to avoid leaking ScrollTriggers across client-side navigations.
- Target: Lighthouse 95+ — validate with `npx lighthouse` against a production build (`next build && next start`) before shipping, not against `next dev`.

## 8. Deployment

1. Add your real photography to `/public/images` per `public/images/README.md`.
2. Push to GitHub, import into Vercel.
3. Set `RESEND_API_KEY` (and `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` if using Plausible) in Vercel's dashboard.
4. Add the Plausible tracking snippet into `app/layout.tsx` once you have a production domain.
5. Point DNS at Vercel, confirm `sitemap.xml` and `robots.txt` resolve, submit the sitemap in Google Search Console.

## 9. Local setup

```
npm install
npm run dev
```

Until real images are dropped into `/public/images`, you'll see broken
image placeholders — everything else (layout, type, motion, copy) works
immediately since there's no CMS or external service to configure first.
