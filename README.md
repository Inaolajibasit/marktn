# MARKTN — Beyond the brief

A culturally intelligent PR and marketing agency website built with Next.js 15, TypeScript, Tailwind CSS, Sanity and Resend.

## Design

The October 2026 IdentityDeck.pdf is the brand source. The UI follows the supplied Atlas hero screenshot and the Knack Framer reference: a dark burgundy hero, oversized official wordmark, rounded project cards, receipt-style results, overlapping service panels, and a large dark footer.

Instrument Sans is used for headlines; Inter supplies body text and optical sizing. Brand colours are burgundy #8D1212, yellow #FFC904, and fresh blue #59D5FF. Official logo artwork is used without recolouring or distortion.

## Development

Run npm install, then npm run dev. Production checks are npm run typecheck, npm run lint, and npm run build. Use npm start after a successful build.

## Content

- lib/content.ts holds agency copy, campaigns, services, founder details, statistics and testimonials.
- Sanity manages journal posts, authors, categories, tags and Portable Text at /studio.
- public/images/hero contains the supplied official logos, favicon, glossy artwork and campaign visuals.
- public/images/work contains campaign galleries; public/images/founder contains the founder portrait.
- app holds routes and metadata; components contains shared sections and controls.

## Integrations

Copy .env.example to .env.local and supply the relevant credentials. RESEND_API_KEY enables enquiries and newsletter signup. NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET select the CMS; SANITY_REVALIDATE_SECRET protects the cache-invalidation endpoint. NEXT_PUBLIC_GA_MEASUREMENT_ID enables optional GA4; NEXT_PUBLIC_SITE_URL sets the public origin in the root metadata and several integrations.

Sanity content uses a 60-second cache with a sanity-content tag. POST /api/revalidate accepts a bearer secret to invalidate it. Studio preview is still incomplete; see CONTEXT.md. Contact sends enquiries to hello@marktnpr.com and reports email-service errors. Newsletter signup stores Resend contacts; this repository does not send newsletter campaigns.

## Project context

Read CONTEXT.md for architecture, routes, known limitations and verification history. AGENTS.md requires keeping it updated after every codebase change. Some campaign copy and testimonials need final client approval before publication.
