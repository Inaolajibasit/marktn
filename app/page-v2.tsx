"use client";

// v2 home — alternative composition for A/B comparison.
// Reuses the project's tokens (paper/ink/rust, font-display/body/mono,
// px-gutter, py-section) but flips the visual logic:
//
//   v1: full-bleed dark hero, GSAP pinned scrub, horizontal-scroll work reel
//   v2: editorial split-hero on paper, framer-motion reveals, oversized
//       numbered work index, dense data strip, founder letter pull-quote
//
// Safe to delete if you don't end up shipping it — app/page.tsx is untouched.

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  campaigns,
  featuredCampaigns,
  press,
  services,
  impactStats,
  founder,
} from "@/lib/content";

/* -----------------------------------------------------------------------
   Motion primitives — framer-motion variants tuned to the editorial easing
   defined in lib/motion.ts. We reuse the same cubic-bezier so the two
   pages feel like they belong to the same brand even though the motion
   grammar is different.
   ----------------------------------------------------------------------- */

const EASE = [0.65, 0, 0.15, 1] as const;

/** Reveal children of a container once it enters the viewport. */
function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 24 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* -----------------------------------------------------------------------
   Hero — editorial split, light on light. Massive Fraunces italic
   statement on the left, a numbered stat grid on the right. The headline
   uses lowercase italic to differentiate from v1's uppercase serif block.
   ----------------------------------------------------------------------- */

function HeroV2() {
  return (
    <section className="relative bg-paper px-gutter pb-24 pt-32 text-ink md:pb-section md:pt-section">
      {/* Top eyebrow row — mimics a magazine masthead */}
      <Reveal className="mb-12 flex items-center justify-between border-b border-paper-line pb-4">
        <p className="font-mono text-caption uppercase tracking-[0.18em] text-ink-40">
          Vol. 07 — Lagos, Nigeria
        </p>
        <p className="font-mono text-caption uppercase tracking-[0.18em] text-ink-40">
          {new Date().getFullYear()} Edition
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-x-8">
        {/* Headline — spans 8 of 12 cols */}
        <div className="md:col-span-8">
          <Reveal delay={0.05}>
            <p className="font-mono text-caption uppercase tracking-[0.18em] text-rust-deep">
              ⏤ A Culturally Intelligent PR Agency
            </p>
          </Reveal>

          <h1 className="mt-8 font-display text-display-1">
            <span className="block">We move luxury</span>
            <span className="block italic text-ink-60">across a continent,</span>
            <span className="block">not around it.</span>
          </h1>

          <Reveal delay={0.35} className="mt-10 max-w-xl font-body text-body text-ink-60">
            marktn PR is a Lagos-based agency building culturally intelligent campaigns for global
            luxury and beauty houses across Africa. We work in markets, not at them.
          </Reveal>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/work"
              className="inline-flex min-h-[44px] items-center bg-ink px-6 py-3 font-mono text-caption uppercase tracking-[0.1em] text-paper transition-[background-color,transform] duration-150 ease-out hover:bg-ink-80 focus-visible:bg-ink-80 active:scale-[0.98]"
            >
              See the Work
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center border border-ink px-6 py-3 font-mono text-caption uppercase tracking-[0.1em] text-ink transition-[background-color,color,transform] duration-150 ease-out hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper active:scale-[0.98]"
            >
              Start a Conversation
            </Link>
          </div>
        </div>

        {/* Right rail — quick credentials */}
        <div className="md:col-span-4 md:border-l md:border-paper-line md:pl-8">
          <Reveal delay={0.2}>
            <p className="font-mono text-caption uppercase tracking-[0.18em] text-ink-40">
              At a Glance
            </p>
          </Reveal>

          <dl className="mt-6 grid grid-cols-2 gap-y-8">
            {impactStats.slice(0, 4).map((s, i) => (
              <Reveal key={s.label} delay={0.3 + i * 0.05}>
                <dt className="font-mono text-caption uppercase tracking-[0.08em] text-ink-40">
                  {s.label}
                </dt>
                <dd className="mt-1 font-display text-display-3 text-ink">
                  {s.prefix}
                  {s.value.toLocaleString()}
                  {s.decimals ? "" : ""}
                  <span className="text-rust-deep">{s.suffix ?? ""}</span>
                </dd>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={0.55} className="mt-10">
            <p className="font-mono text-caption uppercase tracking-[0.08em] text-ink-40">
              Recently in
            </p>
            <p className="mt-2 font-display text-body italic text-ink">
              {press[0].outlet} — “{press[0].headline}”
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------------------
   Featured Work — an editorial index (think a magazine table of contents
   with thumbnails). Oversized serif numerals + client name + category.
   Hover reveals a thumbnail on the right. Very different from v1's
   pinned horizontal reel.
   ----------------------------------------------------------------------- */

function FeaturedWorkV2() {
  return (
    <section className="border-t border-paper-line bg-paper px-gutter py-section text-ink">
      <div className="mx-auto max-w-content">
        <Reveal className="mb-16 flex items-baseline justify-between">
          <div>
            <p className="font-mono text-caption uppercase tracking-[0.18em] text-rust-deep">
              ⏤ Index 01
            </p>
            <h2 className="mt-3 font-display text-display-2">Selected Work</h2>
          </div>
          <Link
            href="/work"
            className="group relative font-mono text-caption uppercase tracking-[0.08em] hover:text-rust-deep"
          >
            All Campaigns ({campaigns.length}) →
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-rust-deep transition-transform duration-500 ease-editorial group-hover:scale-x-100"
            />
          </Link>
        </Reveal>

        <ul className="divide-y divide-paper-line border-y border-paper-line">
          {featuredCampaigns.map((c, i) => (
            <li key={c.slug}>
              <Link
                href={`/work/${c.slug}`}
                data-cursor="media"
                className="group grid grid-cols-12 items-center gap-4 py-6 transition-colors hover:bg-paper-dim md:py-8"
              >
                <span className="col-span-2 font-display text-display-3 italic text-ink-20 transition-colors group-hover:text-rust-deep md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="col-span-10 md:col-span-5">
                  <p className="font-mono text-caption uppercase tracking-[0.08em] text-ink-40">
                    {c.category} — {c.year}
                  </p>
                  <p className="mt-1 font-display text-display-3 text-ink">{c.client}</p>
                </div>
                <p className="col-span-12 font-body text-body text-ink-60 md:col-span-4">
                  {c.description}
                </p>
                <p className="col-span-12 font-mono text-caption uppercase tracking-[0.08em] text-ink md:text-right md:col-span-2">
                  {c.stat}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------------------
   In Numbers — a dense, near-black data strip. Five columns of impact
   stats with oversized numerals. Heavy visual contrast against the paper
   sections on either side.
   ----------------------------------------------------------------------- */

function InNumbersV2() {
  return (
    <section className="bg-ink px-gutter py-section text-paper">
      <div className="mx-auto max-w-content">
        <Reveal className="mb-12 flex items-baseline justify-between border-b border-paper/20 pb-4">
          <p className="font-mono text-caption uppercase tracking-[0.18em] text-paper/60">
            ⏤ Index 02 — In Numbers
          </p>
          <p className="font-mono text-caption uppercase tracking-[0.18em] text-paper/40">
            2022—2025
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-y-12 md:grid-cols-5">
          {impactStats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <p className="font-mono text-caption uppercase tracking-[0.08em] text-paper/50">
                {String(i + 1).padStart(2, "0")} / {s.label}
              </p>
              <p className="mt-3 font-display text-display-1 text-paper">
                {s.prefix}
                {s.decimals ? s.value.toFixed(s.decimals) : s.value.toString()}
                <span className="text-rust">{s.suffix ?? ""}</span>
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------------------
   Services — rendered as a numbered editorial menu (think a TOC), each
   row expandable in feel via hover line. Not a grid like v1.
   ----------------------------------------------------------------------- */

function ServicesV2() {
  return (
    <section className="border-t border-paper-line bg-paper px-gutter py-section text-ink">
      <div className="mx-auto max-w-content">
        <Reveal className="mb-12 flex items-baseline justify-between">
          <div>
            <p className="font-mono text-caption uppercase tracking-[0.18em] text-rust-deep">
              ⏤ Index 03
            </p>
            <h2 className="mt-3 font-display text-display-2">What We Do</h2>
          </div>
          <p className="hidden max-w-sm font-body italic text-ink-60 md:block">
            Eight disciplines. One point of view.
          </p>
        </Reveal>

        <ol className="grid grid-cols-1 gap-x-12 gap-y-1 md:grid-cols-2">
          {services.map((s, i) => (
            <li key={s.name}>
              <Reveal delay={i * 0.04}>
                <details className="group border-b border-paper-line py-5 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-baseline justify-between gap-4 list-none">
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-caption uppercase tracking-[0.08em] text-ink-40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-display-3 text-ink transition-colors group-hover:text-rust-deep">
                        {s.name}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="font-mono text-caption uppercase tracking-[0.08em] text-ink-40 transition-transform duration-500 ease-editorial group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-md pl-10 font-body text-body text-ink-60">{s.detail}</p>
                </details>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------------------
   Founder Letter — pull-quote treatment with portrait. The portrait sits
   in a deep teal panel (matching the existing design system's Founder
   section accent). Large italic quotation set in Fraunces.
   ----------------------------------------------------------------------- */

function FounderV2() {
  return (
    <section className="border-t border-paper-line bg-paper-dim px-gutter py-section text-ink">
      <div className="mx-auto grid max-w-content grid-cols-1 gap-12 md:grid-cols-12 md:gap-x-8">
        <Reveal className="md:col-span-7">
          <p className="font-mono text-caption uppercase tracking-[0.18em] text-rust-deep">
            ⏤ Index 04 — Letter from the Founder
          </p>

          <blockquote className="mt-8 font-display text-display-2 italic leading-[1.05] text-ink">
            <p>
              “African audiences deserve campaigns <span className="text-rust-deep">built for them</span>,
              not adapted for them. Our work sits at the intersection of Western luxury standards and
              the cultural fluency required to actually move people here.”
            </p>
          </blockquote>

          <p className="mt-10 font-mono text-caption uppercase tracking-[0.08em] text-ink-60">
            — {founder.name}, Founder &amp; Principal
          </p>

          <Link
            href="/about"
            className="group mt-12 inline-block font-mono text-caption uppercase tracking-[0.08em] hover:text-rust-deep"
          >
            Read the full story →
            <span
              aria-hidden
              className="ml-3 inline-block h-px w-12 origin-left scale-x-100 bg-current align-middle transition-transform duration-500 ease-editorial group-hover:scale-x-150"
            />
          </Link>
        </Reveal>

        <Reveal delay={0.15} className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden bg-teal">
            <Image
              src={founder.portrait}
              alt={`${founder.name}, founder of marktn PR`}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/60 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-4 font-mono text-caption uppercase tracking-[0.08em] text-paper/80">
              {founder.name}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------------------
   Press — minimal horizontal rule + outlet list. Quiet closer.
   ----------------------------------------------------------------------- */

function PressV2() {
  return (
    <section className="border-t border-paper-line bg-paper px-gutter py-section text-ink">
      <div className="mx-auto max-w-content">
        <Reveal className="mb-12 flex items-baseline justify-between">
          <div>
            <p className="font-mono text-caption uppercase tracking-[0.18em] text-rust-deep">
              ⏤ Index 05
            </p>
            <h2 className="mt-3 font-display text-display-2">In The Press</h2>
          </div>
          <Link
            href="/press"
            className="group relative font-mono text-caption uppercase tracking-[0.08em] hover:text-rust-deep"
          >
            All Coverage →
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-rust-deep transition-transform duration-500 ease-editorial group-hover:scale-x-100"
            />
          </Link>
        </Reveal>

        <ul className="divide-y divide-paper-line border-y border-paper-line">
          {press.slice(0, 5).map((p, i) => (
            <li key={p.headline}>
              <Link
                href="/press"
                className="group flex items-baseline justify-between gap-4 py-5 transition-colors hover:bg-paper-dim"
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-caption uppercase tracking-[0.08em] text-ink-40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-display-3 italic text-ink transition-colors group-hover:text-rust-deep">
                    {p.headline}
                  </span>
                </span>
                <span className="font-mono text-caption uppercase tracking-[0.08em] text-ink-40">
                  {p.outlet} — {p.year}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------------------
   Page
   ----------------------------------------------------------------------- */

export default function HomeV2() {
  return (
    <>
      <HeroV2 />
      <FeaturedWorkV2 />
      <InNumbersV2 />
      <ServicesV2 />
      <FounderV2 />
      <PressV2 />
    </>
  );
}