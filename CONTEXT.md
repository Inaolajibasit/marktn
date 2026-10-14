# Codebase context

Last updated: 2026-10-14

## Maintenance

Read this file before working on the project. Update it after every codebase change, in the same task, before handing work back. Keep the architecture, behavior, configuration, known issues, and validation notes accurate. Add a concise entry to the change log with the date, affected files, purpose, and verification. Remove resolved issues or explicitly mark them resolved. Never record credentials, tokens, or environment variable values containing secrets.

This document describes the implementation. Maintenance is an agent workflow requirement; it is not an automated file watcher.

## Purpose

marktn PR is a public marketing and portfolio website for an African luxury PR and communications agency. It presents services, campaigns, founder information, press coverage, testimonials, and impact statistics; publishes articles; and collects enquiries and newsletter subscriptions.

## Stack and commands

- Next.js 15 App Router, TypeScript with strict mode, React, and Tailwind CSS 3.
- GSAP and ScrollTrigger for scroll animation; Framer Motion for interface transitions; Lenis for smooth scrolling.
- Sanity 4 and next-sanity for blog content and an embedded Studio.
- Portable Text for article bodies, Zod for input validation, and Resend for email and newsletter contacts.
- package-lock.json was reviewed with Next.js 15.5.22, React/React DOM 18.3.1, Sanity 4.19.0, next-sanity 11.6.10, and Resend 6.18.1. Recheck versions after dependency changes.
- npm run dev: local development.
- npm run build: production build; npm start: serve production build.
- npm run lint: eslint .; npm run typecheck: tsc --noEmit.
- No dedicated test script is defined in package.json.

## Structure

- app/: pages, layouts, API handlers, contact server action, sitemap, robots, and RSS.
- components/: shared homepage sections, navigation/footer, animation providers, and blog UI.
- lib/content.ts: typed static agency and portfolio data plus slug lookup helpers.
- lib/fonts.ts: next/font typography; lib/motion.ts: shared motion tokens and reduced-motion helper.
- lib/sectionRules.ts: scoped scroll-triggered hairline animation; lib/utils.ts: class merging.
- sanity/: environment defaults, client, cached fetch helper, GROQ queries, image URL builder, types, and schemas.
- sanity.config.ts: embedded Studio configuration and editing tools.
- public/images/: supplied identity artwork under images/hero; legacy founder/work stock images remain on disk but are unused by the redesigned site.
- tailwind.config.ts and app/globals.css: design tokens and global styling.
- app/page-v2.tsx: alternate homepage implementation; no imports referencing it were found in the source review. The active homepage is app/page.tsx.

## Routes and user-facing behavior

| Route | Behavior |
| --- | --- |
| / | Atlas-inspired hero, partner strip, project grid, impact receipt, stacked services, process, engagements, testimonials, founder story, journal and contact |
| /about | Founder profile and agency values |
| /services | Shared service overview component |
| /services/[slug] | Eight static service detail pages with audience, deliverables, FAQs, and enquiry link |
| /work | Client-side category filtering over four local campaigns |
| /work/[slug] | Static case studies with galleries, challenge, insight, strategy, execution, results, press coverage, and next campaign |
| /press | Shared list of press mentions |
| /blog | Sanity articles, featured article, category filters, and client-side load more in batches of six |
| /blog/[slug] | Rich article content, author bio, conditional table of contents, related articles, CTA, reading progress, and sharing |
| /contact | Server-action enquiry form with inline validation and submission status |
| /studio/[[...tool]] | Embedded Sanity Studio |
| /api/newsletter | POST validates email and creates a Resend contact |
| /api/revalidate | POST checks a bearer secret and invalidates the sanity-content cache tag |
| /rss.xml | RSS feed from blog articles |
| /sitemap.xml | Static pages, campaigns, services, and blog article URLs |
| /robots.txt | Crawl rules; disallows /studio |

## Content and data flow

The content setup is hybrid:

1. Agency content is imported from lib/content.ts. It includes four campaigns, eight services, press mentions, brand partners, testimonials, impact statistics, founder details, and values. The redesign uses the supplied MARKTN identity artwork through next/image as visual treatments for projects, not documentary campaign photography. Existing campaign claims, founder biography and press copy were preserved.
2. Blog content is fetched from Sanity on the server. Schemas cover posts, authors, categories, tags, and blockContent. Rich blocks include images, galleries, quotes, statistics, CTAs, and video links.
3. sanity/lib/fetch.ts applies a 60-second revalidation interval and the sanity-content tag. The client uses the Sanity CDN. HomeBlog requests the three latest eligible posts and shows a neutral empty state if unavailable. The journal index distinguishes fetch failures from an empty collection.
4. Work and service slugs are generated from static content. Blog slugs are generated from Sanity.
5. The contact action validates name, email, company, budget, service, and message, then sends a plain-text enquiry through Resend to hello@marktnpr.com with the sender email as replyTo. Newsletter signup creates a contact; newsletter campaign sending is not implemented here.

## Design and interaction

- Complete redesign follows the Knack Marketing Framer reference for cream editorial sections, rounded project cards, receipt-style statistics, sticky coloured service panels, process/engagement cards, dark testimonials, contact form and oversized footer branding.
- The homepage hero uses components/patternWaves.tsx (OGL/WebGL) as a decorative yellow pond-wave line background over the existing gradient, with pointer interaction disabled and built-in reduced-motion support. The gradient remains visible before canvas initialization.
- The homepage hero follows the supplied Atlas Studio screenshot: black/burgundy grain background, compact navigation, left introduction and split CTA, right featured-project carousel, and an oversized official MARKTN wordmark.
- Instrument Sans headlines and Inter body text; burgundy #8D1212, yellow #FFC904, blue #59D5FF, cream, black and white. The hero wordmark uses public/images/hero/LOGO-WHITE.svg; shared logos elsewhere use supplied PNGs without distortion or recolouring. Favicon uses the supplied K/asterisk mark.
- SiteShell provides public navigation, main, footer, smooth scrolling and RevealProvider. Studio gets a separate main without marketing chrome. CursorAperture remains unused; native cursors are used.
- Lenis still integrates with the GSAP ticker; reduced-motion users receive native scrolling. RevealProvider uses IntersectionObserver and the Web Animations API, without mutating React-owned class/style attributes. A MutationObserver registers streamed and newly inserted reveal targets; animations and observers are cleaned up on navigation, unmount or a switch to reduced motion. Content remains visible without JavaScript or with reduced motion.
- Featured projects use a two-column grid, category filtering and a manually controlled hero carousel. Service cards stack with sticky positioning on desktop and normal flow on mobile.
- Shared UI lives in BrandUI, ContactForm, Process, Reveal and SiteShell. ContactForm works with React 18; service links preselect an enquiry category. Server actions check Resend errors before reporting success.
- Mobile navigation traps focus, restores it on close, supports Escape and locks background scrolling. Forms provide labels, error focus and live status. Responsive and reduced-motion checks passed; this is not a full accessibility audit.

## Integrations and environment

Variable names are listed in .env.example:

- RESEND_API_KEY: contact email and newsletter integration.
- NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET: CMS project/dataset; sanity/env.ts contains fallback values.
- SANITY_API_READ_TOKEN: documented variable, but not connected to the current Sanity client.
- SANITY_REVALIDATE_SECRET: bearer secret for cache invalidation.
- NEXT_PUBLIC_GA_MEASUREMENT_ID: optional Google Analytics 4 scripts.
- NEXT_PUBLIC_SITE_URL: used by Studio preview, RSS, and some blog URLs. Root metadata uses this variable with the production-domain fallback; sitemap still uses the production domain.

Sanity images are allowed through next.config.mjs. Organization and article structured data, Open Graph metadata, canonical URLs, sitemap, robots, and RSS are implemented. README.md describes a Vercel deployment workflow, but deployment status was not verified.

## Identity deck and redesign direction

Source: IdentityDeck.pdf, 20 pages, October 2026, designed by Winx Studio. Reviewed visually and through text extraction on 2026-10-13. The user requested a total UI redesign, now implemented using this identity, the Knack website reference and the supplied Atlas hero screenshot.

- Brand name in the deck: MARKTN. Tagline: Beyond the brief. The deck describes marketing that challenges assumptions and explores beyond the initial brief. It does not explicitly confirm a change in business services or removal of PR from the business name.
- Signature symbol: an organic asterisk placed on the K, representing additional meaning, another angle, and opportunities beyond the obvious.
- Typography: Instrument Sans for headers/bold statements; Inter Display for body/supporting text. The custom rounded wordmark and handwritten tagline are logo artwork, not a direction to set all website text in those styles.
- Palette shown on page 3: deep red #8D1212, yellow #FFC904, fresh blue #59D5FF. Black and white are foundational backgrounds and approved logo variants. The yellow swatch is also labelled TERACOTTA in the deck, apparently a labelling inconsistency; preserve the displayed hex value.
- Mark hierarchy: full official logo with tagline and gradient asterisk; core wordmark without tagline when small-scale legibility requires it; K plus asterisk for favicons/avatars; standalone asterisk for graphic treatments.
- Approved logo states: full-colour asterisk, all black, or all white. Do not recolour arbitrarily, stretch, rotate, skew, or add visibility effects. Clear space on all sides must be at least the asterisk height. Use black on light backgrounds, white on dark, monochrome on brand-coloured backgrounds, and suitable contrast on photography.
- Art direction: glossy burgundy asterisk, red/gold abstract forms, blue/gold orbs, and environmental photography integrating asterisk shadows or marks. Campaign themes include Opening Doors to Bigger Brands, New Rays of Thoughts, and Culture Moves Markets.
- Interpretation for the website: confident sans-serif typography, generous space, expressive colour blocks, distinctive asterisk imagery, and room for playful motion consistent with logo rules. This is an interpretation, not a supplied wireframe or interaction specification.
- Deck references downloadable assets on Google Drive, but no Drive destination was supplied in the review. The user supplied high-resolution PNG artwork in public/images/hero, now used throughout the implementation.

## Known gaps and resolved findings

- Sanity Studio preview references /api/draft-mode/enable, but that route remains absent.
- Blog detail, slug and related-post queries do not consistently exclude future-dated posts.
- Existing testimonials are explicitly placeholder quotes awaiting approved attribution. Campaign metrics, press claims and founder history remain inherited content, not independently verified facts.
- Legacy work images repeat stock photography, and the legacy founder image is a fashion advertisement. These remain on disk but are no longer used by the redesigned pages; genuine campaign photography and an approved founder portrait can replace identity artwork later.
- Public contact/newsletter handlers have no explicit rate limiting or bot protection.
- CursorAperture still contains a ticker cleanup issue, but it is no longer mounted. app/page-v2.tsx is also unused.
- Resolved in the redesign: React 18 contact form compatibility, Resend error checking, missing sharing image, placeholder WhatsApp link, mobile focus trapping/restoration, outdated README and Next build root inference.

## Validation status

Production build, ESLint and TypeScript checks passed during the redesign. Automated browser checks passed on desktop (1440 × 1000), mobile (375 × 812), and landscape (812 × 375): public pages returned 200, images loaded, no horizontal overflow or browser errors were found, filters and carousels worked, mobile Escape closed navigation, and invalid contact submissions displayed errors. Reduced-motion content remained visible. Contact validation was tested without sending an actual enquiry. Resend delivery, newsletter subscription delivery, analytics and deployment were not verified.

Local reference screenshots and browser verification scripts/results are under ignored tmp/redesign. Temporary Playwright dependencies live under ignored tmp/browser-check; project dependencies were unchanged.

## Change log

### 2026-10-13

- Created CONTEXT.md to record architecture, routes, content ownership, integrations, known gaps, and validation limitations from the codebase review.
- Created AGENTS.md to require reading and maintaining this context after every codebase change.
- Verification: read back both files and checked the maintenance instructions. Documentation-only change; application behavior unchanged.

### 2026-10-13 - Identity review

- Reviewed all 20 pages of IdentityDeck.pdf and recorded the verified palette, typography, logo rules, visual direction, and redesign intent in CONTEXT.md.
- Verification: extracted all page text and visually inspected rendered pages, including a full-size palette page. No application changes were made.

### 2026-10-13 - Full identity-led UI redesign

- Rebuilt all public pages and shared homepage sections around the Knack reference and Atlas hero composition, using the supplied MARKTN artwork and identity palette/typography. Updated app/globals.css, lib/fonts.ts, tailwind.config.ts and lib/content.ts; added BrandUI, ContactForm, Process, Reveal and SiteShell.
- Reworked navigation/footer, portfolio/service detail pages, journal cards/articles and enquiry flows. Retained static agency content, Sanity integration and existing routes. Removed the custom cursor from the active layout and kept Studio separate from marketing chrome.
- Fixed React 18 form compatibility and Resend error handling, replaced missing sharing/favicons, added ESLint configuration, set the Next build tracing root and ignored local verification artifacts. Updated README.md and this context.
- Replaced misleading legacy stock campaign/founder images with supplied identity artwork. Existing testimonial placeholders and unverified claims remain explicitly documented.
- Verification: production build, lint, typecheck and desktop/mobile interaction checks passed. External delivery and deployment were not exercised.

### 2026-10-13 - Streamed blog hydration fix

- Replaced RevealProvider's DOM class mutations with Web Animations API effects so parent effects cannot change attributes before streamed HomeBlog/PostCard content hydrates. Added registration for late content, removed obsolete reveal class CSS, and preserved card rotations with independent translate animation.
- Verification: lint, TypeScript and diff whitespace checks passed. Chrome development-mode regression checks passed across three CPU-throttled homepage reloads, streamed blog cards, reveal visibility, navigation/project filtering and reduced motion, with no console errors or reveal class/style mutations. Local regression script: ignored tmp/redesign/hydration.cjs. Production build was not rerun for this targeted fix.

### 2026-10-14 - PatternWaves hero background

- Mounted the supplied components/patternWaves.tsx in components/Hero.tsx with burgundy silk waves, transparent canvas background and disabled pointer interaction. Updated app/globals.css to clip the decorative background and prevent it from intercepting controls. Existing gradient remains as the fallback.
- Verification: inspected the component props and hero layering. TypeScript/lint verification could not complete: shell process setup failed, and the alternate Node check timed out. Browser appearance and production build were not verified.

### 2026-10-14 - Hero SVG logo

- Updated components/Hero.tsx to use the supplied public/images/hero/LOGO-WHITE.svg for the oversized hero logo, retaining its native 399:167 aspect ratio and priority loading. Shared BrandLogo consumers are unchanged. Recorded the current user-selected yellow pond/line wave settings.
- Verification: confirmed the SVG exists, inspected its dimensions, and read back the hero reference. Runtime/build checks were not run for this asset substitution.
