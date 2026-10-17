# Codebase context

Last updated: 2026-10-17

## Maintenance

Read this file before working on the project. Update it after every codebase change, in the same task, before handing work back. Keep the architecture, behavior, configuration, known issues, and validation notes accurate. Add a concise entry to the change log with the date, affected files, purpose, and verification. Remove resolved issues or explicitly mark them resolved. Never record credentials, tokens, or environment variable values containing secrets.

This document describes the implementation. Maintenance is an agent workflow requirement; it is not an automated file watcher.

## Purpose

MARKTN is a public marketing and portfolio website for a marketing and public relations company founded in 2026, serving Nigerian and broader African audiences across industries. It presents services, campaigns, founder information, press coverage, testimonials, and impact statistics; publishes articles; and collects enquiries and newsletter subscriptions.

## Stack and commands

- Next.js 15 App Router, TypeScript with strict mode, React, and Tailwind CSS 3.
- GSAP and ScrollTrigger for scroll animation; Framer Motion for interface transitions; Lenis for smooth scrolling.
- Sanity 4 and next-sanity for blog content and an embedded Studio.
- Portable Text for article bodies, Zod for input validation, and Resend for email and newsletter contacts.
- package-lock.json was reviewed with Next.js 15.5.22, React/React DOM 18.3.1, Sanity 4.19.0, next-sanity 11.6.10, and Resend 6.18.1. Recheck versions after dependency changes.
- npm run dev: local development with generated output in .next-dev.
- npm run build: production build in .next; npm start: serve that production build. next.config.mjs selects distDir by phase so production builds cannot overwrite development chunks.
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
| / | Atlas-inspired hero, partner strip, project grid, impact receipt, stacked services, Who We Are, client audiences, testimonials, company story, journal and contact |
| /about | Company story, four roles, purpose, mission and vision, approach, five values, target clients, identity and contact |
| /services | Shared service overview component |
| /services/[slug] | Five deck-based service detail pages with audience, deliverables, FAQs, and enquiry link |
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

1. Agency content is imported from lib/content.ts. It includes four inherited campaigns, five deck-based services, press mentions, brand partners, testimonials, legacy impact statistics, company information, four company roles, and five values. The redesign uses the supplied MARKTN identity artwork through next/image as visual treatments for projects, not documentary campaign photography. Existing campaign and press claims remain inherited. The unsupported founder biography/timeline was removed; the active company story uses the deck’s 2026 founding date. The homepage impact receipt uses the original impactStats at the user’s request: ₦18.8M+ PR value, 10.9M+ impressions, 40+ campaigns, 30K+ community reached, and four countries. These inherited metrics are not substantiated by the company deck.
2. Blog content is fetched from Sanity on the server. Schemas cover posts, authors, categories, tags, and blockContent. Rich blocks include images, galleries, quotes, statistics, CTAs, and video links.
3. sanity/lib/fetch.ts applies a 60-second revalidation interval and the sanity-content tag. The client uses the Sanity CDN. HomeBlog requests the three latest eligible posts and shows a neutral empty state if unavailable. The journal index distinguishes fetch failures from an empty collection.
4. Work and service slugs are generated from static content. Blog slugs are generated from Sanity.
5. General contact links use Info@marktn.com; Onyeka@marktn.com appears only in a dedicated Reach Onyeka section on About. The contact action validates name, email, company, budget, service, and message, then sends a plain-text enquiry through Resend to Info@marktn.com with the sender email as replyTo. Newsletter signup creates a contact; newsletter campaign sending is not implemented here.

## Design and interaction

- Complete redesign follows the Knack Marketing Framer reference for cream editorial sections, rounded project cards, receipt-style statistics, sticky coloured service panels, process/engagement cards, dark testimonials, contact form and oversized footer branding.
- The homepage hero uses components/patternWaves.tsx (OGL/WebGL) as a decorative yellow pond-wave line background over the existing gradient, with pointer interaction disabled and built-in reduced-motion support. The gradient remains visible before canvas initialization.
- The homepage hero follows the supplied Atlas Studio screenshot: black/burgundy grain background, compact navigation, left introduction and split CTA, right featured-project carousel, and an oversized official MARKTN wordmark.
- Instrument Sans headlines and Inter body text; burgundy #8D1212, yellow #FFC904, blue #59D5FF, cool white #F5F7FA, black and white. Light surfaces use #E9EDF3 and borders #D8DFE8, synchronized between CSS variables and Tailwind colours. The hero signature uses public/images/hero/BeyoundTheBrief.svg at its native 405:111 aspect ratio; the footer uses public/images/hero/LOGO-WHITE.svg at 399:167, and other shared logos use supplied PNGs without distortion or recolouring. Favicon uses the supplied K/asterisk mark.
- SiteShell provides public navigation, main, footer, smooth scrolling and RevealProvider. Studio gets a separate main without marketing chrome. CursorAperture remains unused; native cursors are used.
- Lenis still integrates with the GSAP ticker; reduced-motion users receive native scrolling. RevealProvider uses IntersectionObserver and the Web Animations API, without mutating React-owned class/style attributes. A MutationObserver registers streamed and newly inserted reveal targets; animations and observers are cleaned up on navigation, unmount or a switch to reduced motion. Content remains visible without JavaScript or with reduced motion.
- Featured projects use a two-column grid, category filtering and a manually controlled hero carousel. Service cards stack with sticky positioning on desktop and normal flow on mobile. The five groups are Public & Media Relations, Influencer & Community Marketing (editorial completion of the deck’s truncated heading), Experiential Marketing, Campaign Production, and Integrated Campaign. Old media-relations redirects to public-relations; brand-strategy and consulting redirect to integrated-campaigns. Legacy contact query slugs map to the new categories.
- Shared UI lives in BrandUI, ContactForm, Process, Reveal and SiteShell. ContactForm works with React 18; service links preselect an enquiry category. Server actions check Resend errors before reporting success.
- Mobile navigation slides in/out from the right with a no-bounce Framer Motion spring. Links reveal sequentially from blur to clarity; reduced-motion users receive short fades without slide, blur or stagger. The close button uses public/images/hero/ASTERISK-FULLCOLOR.svg. Focus trapping and background scroll locking remain active through exit, then focus returns to the trigger. Escape and route/link navigation close the menu. Forms provide labels, error focus and live status. Responsive and reduced-motion checks passed; this is not a full accessibility audit.

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

## Company deck reference

CompanyDeck.pdf (MARKTN Company Deck v1., October 2026, 13 pages) was fully extracted and visually reviewed on 2026-10-15. COMPANY_DECK.md records its substantive content with page references, all five service groups and seventeen capabilities, source wording issues, visual observations, and website alignment notes. The deck describes a marketing and PR company founded in 2026 serving African businesses across industries and global entrants, and gives onyeka@marktn.com as its contact. It supersedes the previous luxury-only positioning and eight-service structure. Site copy now follows the deck: About is expanded, five service groups replace eight entries, public contact links use the user-confirmed general address Info@marktn.com, and the homepage process section is replaced in place by Who We Are. Enquiry delivery now goes to Info@marktn.com. The authenticated sender remains enquiries@marktnpr.com; site origin is unchanged. Personal contact is separated into the About page’s Reach Onyeka section. The deck contains no named client work, performance metrics, founder biography or testimonial evidence.

## Known gaps and resolved findings

- Sanity Studio preview references /api/draft-mode/enable, but that route remains absent.
- Blog detail, slug and related-post queries do not consistently exclude future-dated posts.
- Existing testimonials are explicitly placeholder quotes awaiting approved attribution. Campaign metrics and press claims remain inherited content, not independently verified facts; the company deck does not substantiate these. Founder history was removed from active pages.
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

### 2026-10-14 - Cool white palette

- Updated app/globals.css and tailwind.config.ts to use cool white #F5F7FA with matching #E9EDF3 secondary surfaces and #D8DFE8 borders, including the Tailwind compatibility border alias. Preserved the existing user edit to the CSS paper colour.
- Verification: read back both files and checked the expected CSS tokens and removal of the previous cream Tailwind tokens. Browser and production build checks were not run for this colour-only change.

### 2026-10-14 - Animated mobile navigation

- Updated components/Navigation.tsx with AnimatePresence right-side entry/exit, staggered blur-to-clear navigation links, reduced-motion fades and the supplied full-colour asterisk close icon. Kept focus trapping and scroll lock until exit completes. Updated app/globals.css for a centered close icon and 44px touch target.
- Verification: read back the implementation and confirmed the SVG asset exists. Full typecheck could not run because the shell helper failed to start; an alternate TypeScript module import exposed no checker API. Browser interactions and production build were not verified.

### 2026-10-15 - Company deck extraction

- Added COMPANY_DECK.md with the full substantive information from all 13 pages of CompanyDeck.pdf, page references, visual identity observations, editorial ambiguities, contact details, and explicitly separated website alignment findings. Updated CONTEXT.md with the reference and reconciliation gaps.
- Verification: extracted all 13 pages with PyMuPDF, rendered and visually inspected every page, checked all five service groups and seventeen capabilities, and read back the Markdown with a complete 13-page coverage index. No application source or project dependencies changed; application tests were not applicable. Temporary PDF tooling was installed under tmp/pdfs only.

### 2026-10-15 - Company deck website content update

- Rebuilt app/about/page.tsx around the deck’s company story, four roles, purpose, mission/vision, From-Their-Eyes approach, five values, client profile, identity and contact; added scoped responsive styles in app/globals.css. Removed the unsupported founder biography and conflicting timeline from lib/content.ts and updated the unused app/page-v2.tsx consumer.
- Replaced the homepage How We Work section with Who We Are using the existing four-card section in components/Process.tsx; retained homepage section count/order. Existing audience cards, company-story section, hero proof and impact receipt now use deck-based copy and facts. Updated app/page.tsx, components/Hero.tsx, Founder.tsx and ImpactCounter.tsx.
- Aligned lib/content.ts and components/Services.tsx to five service groups and seventeen capabilities; updated service metadata, legacy contact preselection and next.config.mjs redirects for the three retired service URLs. Completed the source’s truncated Influencer & Community Market heading to Marketing for public copy.
- Updated visible email links and fallback copy in Footer, Navigation, ContactForm and contact/actions to onyeka@marktn.com; left the actual Resend recipient/sending domain unchanged. Updated root positioning/organization metadata and README. Existing portfolio, press and testimonial placeholders remain unverified and were not replaced with invented content.
- Verification: final TypeScript, ESLint and production build passed (27 generated pages). Browser checks passed for nine routes at 1440×1000, 375×812 and 812×375, with no page errors or horizontal overflow; confirmed five service cards, five values, unchanged 11-section homepage, legacy redirects and form preselection. About artwork/logo loading passed at desktop and mobile widths; desktop/mobile screenshots were visually reviewed. Initial build overlapped the dev server and failed during page-data collection; the subsequent build passed. Sandbox CMS access failed during local development, while the network-enabled build fetched Sanity posts successfully. No actual enquiry or newsletter submission was sent. Scripts/screenshots are under ignored tmp/company-update.

### 2026-10-15 - Restore homepage impact section

- Restored components/ImpactCounter.tsx to the original The impact / Good ideas. Real outcomes. copy and five impactStats values, matching the user’s screenshot. Removed the unused receipt-fact style from app/globals.css. Other deck-based content remains in place.
- Verification: confirmed the restored component matches its original implementation and retains the existing shared data source. Exact component comparison and git diff --check passed. Targeted ESLint timed out without output; browser/build checks were not rerun for this restoration.

### 2026-10-15 - Social profiles and contact routing

- Updated Footer social links and root Organization sameAs links to the supplied marktnagency Instagram URL and marktn-agency LinkedIn company URL.
- Updated lib/content.ts, Footer, Navigation, ContactForm, contact/actions and README so general enquiries and form delivery use Info@marktn.com. Preserved the Resend sender domain. Added a dedicated Reach Onyeka section on app/about/page.tsx using company.onyekaEmail (Onyeka@marktn.com); general About CTA continues to use company.email.
- Verification: TypeScript and git diff --check passed. Scanned application references to confirm the old social URLs and general personal-email usage were removed. Targeted ESLint timed out without output. No email was sent; browser and production build were not rerun for this contact update.

### 2026-10-15 - Expressive editorial cards

- Updated app/about/page.tsx and app/services/[slug]/page.tsx with shared expressive-card classes, small edition labels, official full-colour asterisk accents and a capability-count badge. Mission/vision cards use yellow/blue surfaces; service audience cards use dark ink and capability cards use white with a yellow edge and numbered badges. Added responsive styles in app/globals.css with asymmetric corners and a decorative ring motif. Logos retain their supplied proportions and colours; no new motion was introduced.
- Verification: formatter, final TypeScript and browser checks passed for About and Influencer & Community Marketing at 1440px and 375px, with both card pairs present, no page errors or horizontal overflow. Desktop/mobile screenshots were visually reviewed (ignored tmp/card-refresh). Initial typecheck raced .next/types regeneration, then passed after route compilation. Targeted ESLint passed. Production build was not rerun for this card styling change.

### 2026-10-15 - Simplify card accents (supersedes expressive card treatment)

- Reverted the previous yellow/blue/dark/white card redesign, edition labels, badges, heading overrides and ring motif in app/about/page.tsx, app/services/[slug]/page.tsx and app/globals.css. Original pale surfaces, typography and list styling are restored.
- Added the supplied full-colour asterisk as a large, partly cropped bottom-right decorative watermark on mission/vision and service detail cards. Opacity is 0.5; precise-pointer hover scales it to 1.3 over 450ms. Text remains above the decoration, the watermark cannot intercept clicks, and reduced motion disables scaling.
- Verification: formatting and git diff --check passed; confirmed the SVG exists, old expressive-card markup/styles are absent and the requested opacity/hover rules are present. Browser/build checks were not rerun for this targeted styling update.

### 2026-10-15 - Recover missing development homepage chunk

- Confirmed localhost:3000 returned homepage HTML with /_next/static/chunks/app/page.js, but that chunk URL returned 404. Prior dev/build verification had shared .next output with the user’s development server.
- Updated next.config.mjs to select .next-dev for PHASE_DEVELOPMENT_SERVER and .next for production build/start, preventing that output collision. Added .next-dev to .gitignore and its generated types to tsconfig.json; documented output directories in README. No source assets or existing build artifacts were deleted.
- Verification: development/build/start phase assertions, targeted ESLint, TypeScript and git diff --check passed. The running dev server restarted with .next-dev; homepage and app/page.js both returned 200. Browser regression passed two homepage loads, About navigation and featured-carousel interactions with zero page errors. Production build was not rerun; its .next output path is unchanged. Local regression script/results are under ignored tmp/chunk-recovery.

### 2026-10-17 - Hero signature asset

- Updated components/Hero.tsx to use the supplied public/images/hero/BeyoundTheBrief.svg with its native 405:111 aspect ratio and Beyond the brief alt text. Retained priority loading and the existing responsive hero-wordmark class.
- Verification: confirmed the SVG exists and inspected its width, height and viewBox; read back the updated source reference. Browser and production build checks were not run for this asset substitution.

### 2026-10-17 - Footer SVG logo

- Updated components/Footer.tsx to render public/images/hero/LOGO-WHITE.svg instead of the shared PNG logo, retaining the original 399:167 aspect ratio and existing footer-wordmark/brand-logo styles.
- Verification: confirmed the asset exists, inspected SVG dimensions, and read back the source reference. Browser/build checks were not run for this asset-only substitution.
