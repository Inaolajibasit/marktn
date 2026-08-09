"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { EASE_REVEAL_GSAP, STAGGER, prefersReducedMotion } from "@/lib/motion";

// ScrollTrigger is registered once in SmoothScrollProvider — no need
// to re-register here. Multiple module-level registrations across
// components can race on the first navigation and trip a DOM
// removeChild error.

const HEADLINE_LINES = ["Perception", "Is Different."];

/**
 * Signature moment: the hero image loads fully desaturated and slightly
 * misaligned (a "misperception"), and resolves to full colour and correct
 * registration as the visitor scrolls — the one idea the whole site is
 * named after, made literal in the first five seconds.
 */
export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!prefersReducedMotion()) {
        gsap.to(".reveal-word > span", {
          y: "0%",
          duration: 1,
          ease: EASE_REVEAL_GSAP, // expo.out — snappier settle than power3.out
          stagger: STAGGER.words,
          delay: 0.3,
        });

        // Subtle parallax: the hero image lags behind the foreground text
        // as the section scrolls past. Translates -80px over the section's
        // full height so the photo settles higher than the headline by
        // the time the next section enters.
        gsap.fromTo(
          imageRef.current,
          { y: 0 },
          {
            y: 180,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      } else {
        gsap.set(".reveal-word > span", { y: "0%" });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Same defensive pattern as FeaturedWork: kill this section's
  // ScrollTriggers synchronously on unmount (layout effect runs before
  // React's commit-phase DOM mutation) so navigation can't race with
  // GSAP's own trigger teardown.
  useLayoutEffect(() => {
    const trigger = rootRef.current;
    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === trigger) t.kill();
      });
    };
  }, []);

  return (
    <section ref={rootRef} className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink px-gutter pb-16 pt-32 text-paper">
      <div ref={imageRef} data-cursor="media" className="absolute inset-0 z-0 opacity-70">
        <Image
          src="/images/hero/campaign.jpg"
          alt="Still from a marktn PR campaign film"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-ink via-ink/40 to-transparent" />

      <p className=" mb-6 z-40 text-eyebrow uppercase tracking-[0.18em] text-paper/60">A Culturally Intelligent PR &amp; Marketing Agency</p>

      <h1 className="max-w-5xl z-40 font-display text-display-1">
        {HEADLINE_LINES.map((line) => (
          <span key={line} className="reveal-word block">
            <span>{line}</span>
          </span>
        ))}
      </h1>

      <div className="mt-10 flex z-40 flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <p className="max-w-md text-body text-paper/80">
          A next-generation PR and marketing agency creating culturally intelligent
          campaigns across Africa, for brands who refuse to be seen the ordinary way.
        </p>

        <div className="flex z-40 gap-4">
          <a
            href="/work"
            className="inline-flex min-h-[44px] items-center bg-paper px-6 py-3  text-caption uppercase tracking-[0.1em] text-ink transition-[background-color,transform,box-shadow] duration-150 ease-out hover:bg-paper-dim focus-visible:bg-paper-dim active:scale-[0.98] active:bg-paper-dim"
          >
            View Work
          </a>
          <a
            href="/contact"
            className="inline-flex min-h-[44px] items-center bg-rust-deep px-6 py-3 text-caption uppercase tracking-[0.1em] text-paper transition-[background-color,transform,box-shadow] duration-150 ease-out hover:bg-ink-80 focus-visible:bg-ink-80 active:scale-[0.98] active:bg-ink-80"
          >
            Book Discovery Call
          </a>
        </div>
      </div>
    </section>
  );
}
