# MARKTN — Beyond the brief

A culturally intelligent PR and marketing agency website built with Next.js 15, TypeScript, Tailwind CSS, Sanity and Resend.

## Design

The October 2026 IdentityDeck.pdf is the brand source. The UI follows the supplied Atlas hero screenshot and the Knack Framer reference: a dark burgundy hero, oversized official wordmark, rounded project cards, receipt-style results, overlapping service panels, and a large dark footer.

Instrument Sans is used for headlines; Inter supplies body text and optical sizing. Brand colours are burgundy #8D1212, yellow #FFC904, and fresh blue #59D5FF. Official logo artwork is used without recolouring or distortion.

## Development

Run npm install, then npm run dev. Production checks are npm run typecheck, npm run lint, and npm run build. Use npm start after a successful build. Development uses .next-dev while production build/start use .next, so build checks do not overwrite a running development server’s chunks.

## Content

- lib/content.ts holds deck-based company copy, four company roles, five values and five service groups, alongside inherited campaigns, statistics and testimonial placeholders. COMPANY_DECK.md records the source extraction.
- Sanity manages journal posts, authors, categories, tags and Portable Text at /studio.
- public/images/hero contains the supplied official logos, favicon, glossy artwork and campaign visuals.
- public/images/work/femmenature contains the supplied Femme Nature campaign photos; other legacy stock work/founder assets remain unused. About uses the approved owner portrait, and legacy project pages use supplied brand artwork.
- app holds routes and metadata; components contains shared sections and controls.

## Integrations

Copy .env.example to .env.local and supply the relevant credentials. RESEND_API_KEY enables enquiries and newsletter signup. NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET select the CMS; SANITY_REVALIDATE_SECRET protects the cache-invalidation endpoint. NEXT_PUBLIC_GA_MEASUREMENT_ID enables optional GA4; NEXT_PUBLIC_SITE_URL sets the public origin in the root metadata and several integrations.

Sanity content uses a 60-second cache with a sanity-content tag. POST /api/revalidate accepts a bearer secret to invalidate it. Studio preview is still incomplete; see CONTEXT.md. General contact links and form enquiries use Info@marktn.com. Onyeka@marktn.com is reserved for the dedicated personal-contact section on About. The contact form sends enquiries to Info@marktn.com and reports email-service errors. Newsletter signup stores Resend contacts; this repository does not send newsletter campaigns.

### Contact email setup

1. Add and verify marktn.com in the Resend account used by RESEND_API_KEY. Publish the exact DNS records Resend supplies; see CONTACT_EMAIL_SETUP.md for this project's records. Keep the domain's existing mailbox MX records in place.
2. Set CONTACT_FROM_EMAIL="MARKTN <Info@marktn.com>" in .env.local and in the hosting provider's environment variables, along with RESEND_API_KEY. This is also the default sender. The recipient remains Info@marktn.com and Reply-To is the visitor's email.
3. Restart development after environment changes; redeploy for hosting environment changes. Production delivery requires the sending domain to be verified in that same Resend account.

The server returns success only when Resend accepts the email and returns an email ID. Provider errors are logged server-side without logging the form submission; the form retains the visitor's input on failure and offers the general email address as a fallback.

Run node --test tests/contact.test.cjs for the contact-action regression checks. They use an isolated email transport and never send actual emails.

## Project context

Read CONTEXT.md for architecture, routes, known limitations and verification history. AGENTS.md requires keeping it updated after every codebase change. Some campaign copy and testimonials need final client approval before publication.
