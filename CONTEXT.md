# Codebase context

Last updated: 2026-10-19

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
- node --test tests/contact.test.cjs: contact-action regression tests with an isolated email transport; no real mail is sent.

## Structure

- app/: pages, layouts, API handlers, contact server action, sitemap, robots, and RSS.
- components/: shared homepage sections, navigation/footer, animation providers, and blog UI.
- lib/content.ts: typed static agency and portfolio data plus slug lookup helpers.
- lib/fonts.ts: next/font typography; lib/motion.ts: shared motion tokens and reduced-motion helper.
- lib/sectionRules.ts: scoped scroll-triggered hairline animation; lib/utils.ts: class merging.
- sanity/: environment defaults, client, cached fetch helper, GROQ queries, image URL builder, types, and schemas.
- sanity.config.ts: embedded Studio configuration and editing tools.
- public/images/: supplied identity artwork under images/hero and the approved owner portrait at images/founder/onyeka-nwonah-portrait.png; legacy founder/work stock images remain on disk but are unused.
- tailwind.config.ts and app/globals.css: design tokens and global styling.
- app/page-v2.tsx: alternate homepage implementation; no imports referencing it were found in the source review. The active homepage is app/page.tsx.

## Routes and user-facing behavior

| Route | Behavior |
| --- | --- |
| / | Atlas-inspired hero, partner strip, project grid, impact receipt, stacked services, Who We Are, client audiences, testimonials, company story, journal and contact |
| /about | Company story, owner profile and portrait, four roles, purpose, mission and vision, approach, five values, target clients, identity and contact |
| /services | Shared service overview component |
| /services/[slug] | Five deck-based service detail pages with audience, deliverables, FAQs, and enquiry link |
| /work | Client-side category filtering over five local campaigns, including Fashion / Femme Nature |
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

1. Agency content is imported from lib/content.ts. It includes five campaigns (four inherited entries and the sourced Femme Nature project), five deck-based services, press mentions, brand partners, testimonials, legacy impact statistics, company information, four company roles, and five values. Legacy projects use supplied MARKTN identity artwork through next/image; Femme Nature uses a supplied work11.jpg cover and six gallery photographs from public/images/work/femmenature. Existing campaign and press claims remain inherited. The unsupported founder biography/timeline was replaced by a sourced owner profile using MARKTN-Portfolio.pptx; the active company story retains the company deck’s 2026 founding date. The homepage impact receipt uses the original impactStats at the user’s request: ₦18.8M+ PR value, 10.9M+ impressions, 40+ campaigns, 30K+ community reached, and four countries. These inherited metrics are not substantiated by the company deck.
2. Blog content is fetched from Sanity on the server. Schemas cover posts, authors, categories, tags, and blockContent. Rich blocks include images, galleries, quotes, statistics, CTAs, and video links.
3. sanity/lib/fetch.ts applies a 60-second revalidation interval and the sanity-content tag. The client uses the Sanity CDN. HomeBlog requests the three latest eligible posts and shows a neutral empty state if unavailable. The journal index distinguishes fetch failures from an empty collection.
4. Work and service slugs are generated from static content. Blog slugs are generated from Sanity.
5. General contact links use Info@marktn.com; Onyeka@marktn.com appears in the owner profile on About. The contact action trims and validates form data, then sends a plain-text enquiry through Resend to Info@marktn.com with the visitor's email as replyTo. CONTACT_FROM_EMAIL configures the sender, defaulting to MARKTN <Info@marktn.com>. Only a successful provider response with an email ID returns success; provider failures are logged server-side without logging the submission. Newsletter signup creates a contact; newsletter campaign sending is not implemented here.

## Design and interaction

- Complete redesign follows the Knack Marketing Framer reference for cream editorial sections, rounded project cards, receipt-style statistics, sticky coloured service panels, process/engagement cards, dark testimonials, contact form and oversized footer branding.
- The homepage hero uses components/patternWaves.tsx (OGL/WebGL) as a decorative yellow pond-wave line background over the existing gradient, with pointer interaction disabled and built-in reduced-motion support. The gradient remains visible before canvas initialization.
- The homepage hero follows the supplied Atlas Studio screenshot: black/burgundy grain background, compact navigation, left introduction and split CTA, right featured-project carousel, and an oversized official MARKTN wordmark.
- Instrument Sans headlines and Inter body text; burgundy #8D1212, yellow #FFC904, blue #59D5FF, cool white #F5F7FA, black and white. Light surfaces use #E9EDF3 and borders #D8DFE8, synchronized between CSS variables and Tailwind colours. The hero signature uses public/images/hero/BeyoundTheBrief.svg at its native 405:111 aspect ratio; the footer uses public/images/hero/LOGO-WHITE.svg at 399:167, and other shared logos use supplied PNGs without distortion or recolouring. Favicon uses the supplied K/asterisk mark.
- SiteShell provides public navigation, main, footer, smooth scrolling and RevealProvider. Studio gets a separate main without marketing chrome. CursorAperture remains unused; native cursors are used.
- Lenis still integrates with the GSAP ticker; reduced-motion users receive native scrolling. RevealProvider uses IntersectionObserver and the Web Animations API, without mutating React-owned class/style attributes. A MutationObserver registers streamed and newly inserted reveal targets; animations and observers are cleaned up on navigation, unmount or a switch to reduced motion. Content remains visible without JavaScript or with reduced motion.
- Featured projects use a two-column grid, category filtering and a manually controlled hero carousel. Service cards stack with sticky positioning on desktop and normal flow on mobile. The five groups are Public & Media Relations, Influencer & Community Marketing (editorial completion of the deck’s truncated heading), Experiential Marketing, Campaign Production, and Integrated Campaign. Old media-relations redirects to public-relations; brand-strategy and consulting redirect to integrated-campaigns. Legacy contact query slugs map to the new categories.
- Femme Nature's case-study results use optional numeric count metadata from lib/content.ts and components/CountUpValue.tsx. Each figure counts up once when at least half its own element enters view, over the shared 1.8-second cinematic duration. Reduced-motion users, screen readers and no-JavaScript visitors receive the final figures directly; an active animation finishes immediately if reduced motion is enabled. Other campaign results remain static.
- Shared UI lives in BrandUI, ContactForm, Process, Reveal and SiteShell. ContactForm works with React 18; service links preselect an enquiry category. Server actions check Resend errors before reporting success.
- Mobile navigation slides in/out from the right with a no-bounce Framer Motion spring. Links reveal sequentially from blur to clarity; reduced-motion users receive short fades without slide, blur or stagger. The close button uses public/images/hero/ASTERISK-FULLCOLOR.svg. Focus trapping and background scroll locking remain active through exit, then focus returns to the trigger. Escape and route/link navigation close the menu. Forms provide labels, error focus and live status. Responsive and reduced-motion checks passed; this is not a full accessibility audit.
- Inline outbound arrows in case-study media headlines, footer links and the journal share button use the shared Arrow SVG with the inline-arrow class, rather than a Unicode glyph that iOS can display as an emoji.

## Integrations and environment

Variable names are listed in .env.example:

- RESEND_API_KEY: contact email and newsletter integration.
- CONTACT_FROM_EMAIL: optional server-side contact sender, default MARKTN <Info@marktn.com>; its domain must be verified in the same Resend account. CONTACT_EMAIL_SETUP.md contains this domain's public DNS records and activation instructions.
- NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET: CMS project/dataset; sanity/env.ts contains fallback values.
- SANITY_API_READ_TOKEN: documented variable, but not connected to the current Sanity client.
- SANITY_REVALIDATE_SECRET: bearer secret for cache invalidation.
- NEXT_PUBLIC_GA_MEASUREMENT_ID: optional Google Analytics 4 scripts.
- NEXT_PUBLIC_SITE_URL: used by Studio preview, RSS, and some blog URLs. Root metadata uses this variable with the production-domain fallback; sitemap still uses the production domain.

Sanity images are allowed through next.config.mjs. Organization and article structured data, Open Graph metadata, canonical URLs, sitemap, robots, and RSS are implemented. The live marktn.com/www.marktn.com site is Vercel project marktn (prj_i4bceutjHxWbMvHn4qb76Z5BzKnC) in inaolajibasits-projects, linked to Inaolajibasit/marktn on main. Production RESEND_API_KEY and CONTACT_FROM_EMAIL were configured on 2026-10-18; the API key is encrypted and its value is never recorded here. Deployment dpl_AJ3YaB5vJWPjtk4yYfm3MVsu3HqZ is READY and aliased to the live domains, rebuilding the same commit 55206b8.

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

CompanyDeck.pdf (MARKTN Company Deck v1., October 2026, 13 pages) was fully extracted and visually reviewed on 2026-10-15. COMPANY_DECK.md records its substantive content with page references, all five service groups and seventeen capabilities, source wording issues, visual observations, and website alignment notes. The deck describes a marketing and PR company founded in 2026 serving African businesses across industries and global entrants, and gives onyeka@marktn.com as its contact. It supersedes the previous luxury-only positioning and eight-service structure. Site copy now follows the deck: About is expanded, five service groups replace eight entries, public contact links use the user-confirmed general address Info@marktn.com, and the homepage process section is replaced in place by Who We Are. Enquiry delivery goes to Info@marktn.com. The contact sender now defaults to MARKTN <Info@marktn.com> and can be configured through CONTACT_FROM_EMAIL; site origin is unchanged. Personal contact is separated into the About page’s owner profile. The deck contains no named client work, performance metrics, founder biography or testimonial evidence.

## Owner portfolio reference

MARKTN-Portfolio.pptx (15 slides, portfolio labelled 2025–2026) was fully text-extracted on 2026-10-18. Slides 1–2 support Onyeka Nwonah’s name, Founder & CEO title, 5+ years, 40+ career campaigns, education and specialisms. Slides 4–11 and 13 describe Beguile by Omaa, Beauty Hut Africa and Redrick PR roles and selected brand work. Slide 15 provides her personal LinkedIn URL. The current portrait was supplied by the user on 2026-10-19 and copied without alteration to public/images/founder/onyeka-nwonah-portrait.png. The earlier onyeka-nwonah.png portrait remains on disk but is unused. components/OwnerProfile.tsx is About-only and replaces the old Reach Onyeka block; it appears after the company story. lib/content.ts exports owner data separately from company data. Portfolio employment dates conflict with some campaign dates, so the published profile lists role/organization and work without reproducing a dated timeline. Portfolio claims are supplied-source statements, not independent verification. Earlier campaign work is explicitly attributed to her career, including previous roles. General email remains Info@marktn.com and direct owner email remains Onyeka@marktn.com, overriding the portfolio’s Gmail contact.

## Known gaps and resolved findings

- Resolved contact DNS and production-key blockers: marktn.com and all four DNS records are verified in Resend. The deployed site's exact missing-key fallback was traced to absent Vercel production settings. After the user completed Vercel sign-in, RESEND_API_KEY (encrypted) and CONTACT_FROM_EMAIL were set for Production, and the existing production commit was rebuilt successfully and promoted to marktn.com/www.marktn.com on 2026-10-18. Sender and recipient are Info@marktn.com, with visitor Reply-To preserved. The user explicitly approved one real test enquiry; the live form returned success, reset its fields, and Resend confirmed delivered status for that exact message. CONTACT_EMAIL_SETUP.md retains the verified setup and troubleshooting instructions. Inbox-folder placement was not inspected.
- Femme Nature describes MARKTN's casting, community storytelling and PR approach following the user's confirmation of its involvement. Public sources support 50+ casting entries and coverage in Pulse Nigeria, Marie Claire Nigeria, Deeds Magazine and Grix Magazine. On 2026-10-19 the client revised campaign figures to 5M social media reach, 500K+ social media interactions, 500K likes and 10M PR value, displayed as ₦10M consistently with existing PR values. The final Likes - 500k instruction was used in preference to the preceding 100K+ likes line. The earlier client totals of 46 social mentions, 35 positive mentions and zero negative mentions remain unchanged. Identical reach/mention totals are displayed once each, not added together. Figures are client-supplied and not independently audited; the other 11 mentions have no supplied sentiment classification. Separate comment/share totals, PR valuation methodology and reporting period remain unspecified. All five Instagram media account names and titles are user-supplied and displayed separately from the three campaign posts.
- Sanity Studio preview references /api/draft-mode/enable, but that route remains absent.
- Blog detail, slug and related-post queries do not consistently exclude future-dated posts.
- Existing testimonials are explicitly placeholder quotes awaiting approved attribution. Campaign metrics and press claims remain inherited content, not independently verified facts; the company deck does not substantiate these. Owner biography and selected career credits now come from the supplied MARKTN-Portfolio.pptx; these are personal career credits, not claims that MARKTN delivered all the work.
- Legacy work images repeat stock photography, and the legacy founder image is a fashion advertisement. These remain on disk but are unused. The About owner profile now uses the user-supplied public/images/founder/onyeka-nwonah-portrait.png portrait; genuine photography is still needed for the legacy projects. Femme Nature now uses the supplied campaign photos.
- Public contact/newsletter handlers have no explicit rate limiting or bot protection.
- CursorAperture still contains a ticker cleanup issue, but it is no longer mounted. app/page-v2.tsx is also unused.
- Resolved in the redesign: React 18 contact form compatibility, Resend error checking, missing sharing image, placeholder WhatsApp link, mobile focus trapping/restoration, outdated README and Next build root inference.

## Validation status

Production build, ESLint and TypeScript checks passed during the redesign. Automated browser checks passed on desktop (1440 × 1000), mobile (375 × 812), and landscape (812 × 375): public pages returned 200, images loaded, no horizontal overflow or browser errors were found, filters and carousels worked, mobile Escape closed navigation, and invalid contact submissions displayed errors. Reduced-motion content remained visible. Contact validation was tested without sending an actual enquiry during the redesign. On 2026-10-18, the production deployment was verified and one explicitly approved live contact-form test was confirmed delivered by Resend. Newsletter subscription delivery and analytics remain unverified.

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

### 2026-10-18 - Owner profile from supplied portfolio

- Added components/OwnerProfile.tsx, separate owner data in lib/content.ts, and responsive owner-section styles in app/globals.css. Updated app/about/page.tsx to show the owner profile after the company story and remove the old duplicate personal-contact section.
- Used the supplied portrait as public/images/founder/onyeka-nwonah.png. Bio, career totals, three experience entries, education, twelve selected brand names and personal LinkedIn come from MARKTN-Portfolio.pptx; retained the user-confirmed Onyeka@marktn.com direct address. Homepage unchanged.
- Verification: formatter, standalone TypeScript, production build (including lint/type checks and all 27 generated pages), and git diff --check passed. Browser checks passed at 1440×1000, 375×812 and 812×375: About returned 200, portrait loaded, twelve brand credits and three role entries rendered, direct email was correct, and no page errors or horizontal overflow occurred. Desktop/mobile screenshots and portrait crops were visually reviewed. Two standalone targeted lint attempts timed out, but the production build’s lint stage completed successfully. Source extraction and QA files are under ignored tmp/owner-profile.

### 2026-10-18 - Femme Nature project

- Added the Femme Nature / Heat Check case study at /work/femme-nature in lib/content.ts, based on femmenature.md and the user-supplied Pulse Nigeria feature (Who gets to be a Femme Nature Girl? The women decided, 2 October 2026). Added Fashion category/filter, all ten supplied WebP images (one cover and nine gallery photos, with no duplicate) and a custom image focal position. New entry appears first in existing homepage/Projects grids; existing three-item hero carousel stays unchanged.
- Added optional campaign press URLs, socialCoverage, resultsHeading and imagePosition support in the data model and app/work/[slug]/page.tsx; linked Pulse and all five supplied Instagram URLs, with responsive link styling in app/globals.css. components/FeaturedWork.tsx respects the photo focal position. Sitemap/static route generation already derives from campaigns.
- Instagram captions could not be fetched, so posts use neutral numbered labels. Pulse supports the 2026 campaign date and casting figures (50+ entries, ten finalists, three campaign places). No unprovided agency role, sales/reach metrics, or completed London/Brazil expansion was claimed; the latter remains planned. The user’s 2025 brand-launch date is distinct from the 2026 campaign coverage.
- Verification: TypeScript, targeted ESLint, production build (28 generated pages including /work/femme-nature) and git diff --check passed. Desktop/mobile browser checks at 1440×1000 and 375×812 passed: case study returned 200, all ten photos loaded (cover + nine gallery images), five Instagram links and Pulse link rendered, Fashion filtering and all five project cards worked, and the existing hero carousel remained functional with zero page errors or horizontal overflow. Desktop/mobile screenshots were visually reviewed. Verification files are under ignored tmp/femme-nature.

### 2026-10-18 - Femme Nature cover replacement

- Updated the Femme Nature heroImage in lib/content.ts to /images/work/femmenature/work11.jpg. Set its focal position to center 25% to keep both subjects visible in wide cover/card crops. The nine-image gallery remains unchanged. The shared source updates the homepage card, Projects card, case-study cover and sharing metadata.
- Verification: confirmed the new asset exists, visually inspected it and read back the updated source path. Browser/build checks were not rerun for this image substitution.

### 2026-10-18 - Shorter Femme Nature gallery

- Reduced the Femme Nature gallery in lib/content.ts from nine to six photos, keeping its first six images (work1, work2, work3, work5, work6 and work7). The separate work11.jpg cover remains unchanged.
- Verification: read the gallery array, confirmed six selected assets exist, and verified the cover source is unchanged. Browser/build checks were not rerun for this content-only reduction.

### 2026-10-18 - KASTERISK favicon

- Updated app/layout.tsx to use public/images/hero/KASTERISK.png for the site favicon and Apple touch icon. Corrected the current Femme Nature gallery summary in this context.
- Verification: confirmed the supplied PNG exists and is nonempty, read back both metadata references, and ran git diff --check for app/layout.tsx and CONTEXT.md. Browser/build checks were not rerun for this asset-reference change.

### 2026-10-18 - Preserve favicon proportions

- Added public/images/hero/KASTERISK-icon.png, a 512 by 512 transparent square containing the original 258 by 178 KASTERISK.png at its original aspect ratio. Updated app/layout.tsx favicon and Apple icon references to the square asset; the supplied original is unchanged.
- Verification: confirmed generated PNG dimensions and alpha channel. Browser/build checks were not rerun for this asset formatting fix.

### 2026-10-18 - Femme Nature solution and campaign evidence

- Rewrote the Femme Nature entry in lib/content.ts around the client's confirmation of MARKTN involvement: open casting with Tara Gold, community voting, Lagos campaign storytelling and PR. Added optional executionHeading, executionSteps, resultsSummary and pressHeading fields and rendering in app/work/[slug]/page.tsx; other case studies retain their existing sections.
- Results now highlight 50+ casting entries, hundreds participating in the casting conversation (Pulse Nigeria's qualitative description, not a measured engagement total), and four confirmed linked publications. Marie Claire Nigeria and Deeds Magazine describe the later six-woman cast, so the earlier three available casting places are no longer presented as the final cast size. Existing work11.jpg cover and six-photo gallery remain unchanged.
- Renamed Femme Nature's media section to Where our work was featured, moved all five original Instagram media links there, and added verified Marie Claire Nigeria, Deeds Magazine and Grix Magazine stories alongside Pulse. Campaign posts now contains only the three user-provided URLs ending Dc1hROztN7h, DdRnld2NGrD and DeULiYrt9Uy.
- Sources reviewed: femmenature.md; https://www.pulse.ng/story/femme-nature-heat-check-lagos-casting-2026100214521533646; https://marieclaire.ng/femme-nature-turns-up-the-heat-with-its-new-collection-heat-check/; https://www.deedsmag.com/stories/femme-nature-turns-up-the-heat-with-its-new-heat-check-collection; https://grixmag.com/featured/who-gets-to-be-a-femme-nature-girl-the-women-decided/. Instagram pages, embeds and exact-shortcode searches could not confirm account names or post metrics; those five media links use neutral feature labels pending the user's response. No PR monetary value or exact platform metrics were invented or borrowed from other projects.
- Verification: standalone TypeScript, targeted ESLint and git diff --check passed. Desktop/mobile browser checks at 1440x1000 and 375x812 passed for four solution steps, six gallery images (decoded successfully), nine media links, the three exact campaign URLs, reported results, no horizontal overflow or page errors, and unchanged legacy case-study headings. QA script/results/screenshots: ignored tmp/femme-nature/revision-qa.cjs and revision-results.json. Production build was not rerun for this content/template update.

### 2026-10-18 - Client-supplied Femme Nature campaign results

- Updated lib/content.ts with the client's reported results: 883.3K social media reach, 10.7K interactions, 46 social mentions, 3.9K likes, 35 positive mentions and zero negative mentions. Reach and social reach describe the same supplied total, as do mentions and social mentions; neither is added twice. The results summary attributes figures to the client and retains the sourced 50+ casting entries. The project-card stat now highlights 883.3K social media reach.
- Replaced all five neutral Instagram media labels with supplied handles and titles: @go_liestylemag, @natif.shack, @theroseng_, @grixmagazine and @marieclairenigeria. Preserved the corresponding original URLs and three separate campaign posts. Updated the known-gaps entry to resolve missing metrics/account attribution; monetary PR value remains unprovided.
- Verification: targeted ESLint and git diff --check passed. Browser inspection at 1440x1000 and 375x812 returned 200, showed all six supplied metrics and all five attributed features, retained three campaign posts, and reported no page errors or horizontal overflow. Desktop results-panel screenshot was visually reviewed. Inspection script and screenshots are under ignored tmp/femme-nature/results-preview.cjs and results-*.png. Production build and standalone TypeScript were not rerun for this content-only update.

### 2026-10-18 - Severe Nature post labels

- Renamed Femme Nature's Campaign posts heading to Severe Nature posts in app/work/[slug]/page.tsx and its three link labels to Severe Nature post 01–03 in lib/content.ts. Preserved all URLs and the generic heading for other case studies.
- Verification: read back the changed labels and ran git diff --check. Browser/build checks were not rerun for this text-only change.

### 2026-10-18 - Link Severe Nature mentions

- Added an inline brand-link renderer in app/work/[slug]/page.tsx so all six visible Severe Nature mentions link to https://www.severenature.com/, including narrative copy, the media headline, the social-section heading and three post labels. Normalized the media headline's Severnature spelling in lib/content.ts. Existing article and Instagram destinations remain available on the surrounding headline text, post numbers and dedicated Instagram buttons; links are never nested.
- Updated app/globals.css to lay out brand and Instagram links separately in each campaign-social row. Only the brand-name text points to the website; the three specific campaign posts retain their original URLs.
- Verification: TypeScript, targeted ESLint and git diff --check passed. Mobile browser inspection returned 200, found six brand links to the supplied URL, preserved all three Instagram post destinations, and found no nested anchors, page errors or horizontal overflow. Read-only inspection script: ignored tmp/femme-nature/brand-links-preview.cjs. Production build was not rerun for this link update.

### 2026-10-18 - Contact form delivery setup and submission fixes

- Diagnosed the existing valid Resend key: its account had no verified MARKTN sending domain, while app/contact/actions.ts used the unverified enquiries@marktnpr.com sender. The user chose to use the current account. Added marktn.com there, generated four DNS records and started verification; latest status is pending. Existing domains were unchanged. GoDaddy nameservers and Zoho MX were checked through public DNS. No real email was sent and no DNS records were modified.
- Updated app/contact/actions.ts to trim submitted strings, accept absent optional company/budget fields, use CONTACT_FROM_EMAIL with MARKTN <Info@marktn.com> as the default sender, retain Info@marktn.com as recipient and the visitor as Reply-To, log provider failures without logging submissions, and require a returned email ID before success. Added the sender variable to .env.example; real API keys and local environment contents were not changed or recorded.
- Fixed components/ContactForm.tsx validation focus: the old handler tried focusing fields while they were disabled. Focus now runs after the pending state clears, either on the first invalid field or the submission status. Failure retains inputs and successful submission resets them.
- Added CONTACT_EMAIL_SETUP.md with the exact public Resend DNS records and GoDaddy activation steps, plus README setup/test instructions. DNS publication, domain verification and deployed environment settings remain external prerequisites; the form is not yet confirmed to deliver to the inbox.
- Verification: all seven tests in tests/contact.test.cjs passed with an isolated transport, covering successful payloads, sender override, trimmed input, missing credentials, provider rejection, missing email ID and network failure. TypeScript, targeted ESLint and git diff --check passed. Mobile browser checks passed real invalid submission plus intercepted success/failure responses: invalid-field focus, retained inputs on failure, reset inputs on success, status focus, no page errors or horizontal overflow. Browser email-success responses were simulated, not live delivery. Initial browser capture attempts failed due unavailable development response bodies; a captured validation-response envelope was used for the simulated success/failure checks. QA artifacts are under ignored tmp/contact-setup. Production build, deployment and real inbox delivery were not verified.

### 2026-10-18 - Confirm contact sending-domain verification

- After the user configured GoDaddy DNS, queried the configured Resend account and confirmed marktn.com is verified, including DKIM TXT, send MX/TXT and rsend CNAME records. Confirmed the current local sender is MARKTN <Info@marktn.com> and recipient is Info@marktn.com.
- Updated CONTACT_EMAIL_SETUP.md and this context to mark the DNS prerequisite complete. Application source and secrets were unchanged.
- Verification: live read-only Resend domain lookup and git diff --check passed. No email was sent. Production deployment/environment and actual inbox delivery remain unverified; application tests were not rerun for this documentation-only status update.

### 2026-10-18 - Diagnose deployed contact form missing key

- The user confirmed the failing form is on deployed marktn.com. The screenshot's exact fallback message maps to the missing RESEND_API_KEY branch in app/contact/actions.ts; local key presence was confirmed without displaying the secret. Public HTTP returned 200 from www.marktn.com with Vercel hosting headers. Repository remote is Inaolajibasit/marktn; the current commit is 55206b8 (feat: email working).
- Updated CONTACT_EMAIL_SETUP.md with the exact missing-key symptom and Vercel Production environment/redeployment steps, and updated the current known issue above. Vercel CLI confirmed logged-out status; sign-in was started to enable applying the production setting. No production configuration has yet been changed and no email was sent.
- Verification: source branch inspection, local key-presence check, public hosting-header check and git diff --check passed. Vercel authentication and the production setting/redeployment are still pending. No application source changed; tests were not rerun for this documentation update.

### 2026-10-18 - Fix production contact delivery and verify live email

- The user completed Vercel device sign-in. Verified the project serving www.marktn.com is marktn (prj_i4bceutjHxWbMvHn4qb76Z5BzKnC) in inaolajibasits-projects and confirmed that no contact variables were configured. Set RESEND_API_KEY as an encrypted Production variable from the existing local key, and CONTACT_FROM_EMAIL as MARKTN <Info@marktn.com>. Values of API keys and authentication credentials were never printed or stored in repository files.
- Rebuilt the existing production deployment from main commit 55206b80c5ffbb4c072e13a632e3e396be8eafb9, without deploying local documentation changes. New deployment dpl_AJ3YaB5vJWPjtk4yYfm3MVsu3HqZ reached READY with aliases assigned to marktn.com and www.marktn.com. Vercel build logs reported completion; the live contact page returned 200 with its form present.
- After explicit user approval, submitted exactly one live enquiry labelled MARKTN contact form test through the production browser form. The form showed success, reset its inputs and reported no page errors. The matched Resend message (01a15043-8e49-7f20-9ac8-b3854e6c133d, subject New enquiry — MARKTN contact form test (MARKTN)) was sent from MARKTN <Info@marktn.com> to Info@marktn.com and reported last_event delivered. No additional test emails were sent and inbox-folder placement was not inspected.
- Updated CONTACT_EMAIL_SETUP.md and this context to mark production configuration and contact delivery resolved. Verification: Vercel environment metadata, READY deployment/custom-domain assignment, successful production build, live HTTP/browser submission, Resend delivered event and git diff --check passed. QA metadata/screenshots/scripts are under ignored tmp/contact-setup; there were no application source changes in this task.

### 2026-10-19 - Revised Femme Nature figures and count-up animation

- Updated the Femme Nature entry in lib/content.ts to 5M social media reach, 500K+ interactions, 500K likes and ₦10M PR value, including its project-card stat and narrative summary. Used the final 500K likes instruction over the earlier 100K+ line; interpreted PR currency as naira consistently with the site's existing PR figures. Retained the prior 46 social mentions, 35 positive mentions and zero negative mentions.
- Added optional numeric count metadata to campaign results, components/CountUpValue.tsx and its rendering in app/work/[slug]/page.tsx. Values ease upward once on individual viewport entry over the shared cinematic duration, retaining currency and plus markers. Reduced motion skips the animation (and finishes it immediately if enabled mid-count); screen readers and no-JavaScript visitors receive the final values. Animation frames, observers and listeners are cleaned up. Legacy campaigns remain static.
- Verification: TypeScript, targeted ESLint and git diff --check passed. Desktop/mobile browser checks at 1440x1000 and 375x812 passed: counters stayed at zero while offscreen, showed intermediate values on entry, reached all seven final figures, did not restart on reentry, and produced no page errors or horizontal overflow. Reduced-motion, live preference-change, no-JavaScript and legacy-case checks passed. The mobile results screenshot was visually reviewed. QA scripts/results/screenshots are under ignored tmp/femme-nature/count-up-qa.cjs, count-up-results.json and animated-results-*.png. Production build and deployment were not run for this change.

### 2026-10-19 - Consistent mobile outbound arrows

- Replaced the Unicode diagonal-arrow glyph in app/work/[slug]/page.tsx, components/Footer.tsx and components/blog/ReadingTools.tsx with the shared decorative Arrow SVG. Added an inline-arrow modifier in app/globals.css to size icons relative to their text and align them to the baseline, preventing iPhone emoji presentation. Existing link destinations remain unchanged.
- Verification: targeted ESLint and scoped git diff --check passed for this task's files. Mobile Chromium inspection at 375x812 returned 200, found nine media SVG arrows and four footer inline SVGs, confirmed nonzero dimensions and inherited text-colour strokes, and found no diagonal text-arrow glyphs, page errors or horizontal overflow. The mobile media-list screenshot was visually reviewed. Native iOS rendering, journal share-button interaction and production build/deployment were not rerun. Inspection script/screenshot: ignored tmp/femme-nature/arrow-preview.cjs and svg-arrows-mobile.png. Preserved the user's unrelated lib/content.ts edits, including an existing trailing-whitespace line outside this change.

### 2026-10-19 - Updated founder portrait

- Copied the newly supplied blue-background professional portrait unchanged to public/images/founder/onyeka-nwonah-portrait.png and updated owner.portrait in lib/content.ts for the About founder section. Used a new asset path to avoid reusing cached versions of the previous photo; the earlier portrait remains on disk. Existing 4:5 framing and object position are unchanged.
- Verification: source/destination SHA-256 hashes matched and the PNG dimensions are 960x1280. Mobile browser inspection at 375x812 returned 200, confirmed the new image loaded and found no horizontal overflow; the portrait crop was visually reviewed. Production build/deployment and application test suites were not rerun for this asset substitution. Preview script/screenshot: ignored tmp/owner-profile/portrait-preview.cjs and new-portrait-mobile.png.
