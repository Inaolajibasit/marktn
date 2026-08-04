"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";
import { featuredCampaigns } from "@/lib/content";

// ScrollTrigger is registered once in SmoothScrollProvider.

/**
 * Desktop: pins the section and translates the track horizontally as the
 * user scrolls vertically (classic "pinned storytelling" pattern).
 * Mobile / reduced motion: falls back to a plain horizontally-scrollable
 * flex row with native momentum scroll — no pin, no JS transform.
 */
export function FeaturedWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;
      const distance = track.scrollWidth - window.innerWidth + 96;

      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${distance}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    // useLayoutEffect-equivalent cleanup: unmount the RootEffects BEFORE
    // React runs the regular unmount, so ScrollTrigger's pin-spacer DOM
    // is gone before React tries to removeChild. Without this, navigating
    // away from the home page can throw `NotFoundError: removeChild` on
    // the first link click.
    return () => {
      ctx.revert();
    };
  }, []);

  // Belt-and-braces: kill this section's ScrollTriggers synchronously
  // on unmount (layout effect runs before React's commit-phase DOM
  // mutation, before any `removeChild` is issued). The pin=true wrappers
  // inserted by ScrollTrigger are the source of the removeChild race;
  // killing first lets GSAP remove its own wrappers before React walks
  // the tree. Scoped to this section's trigger so we don't kill other
  // components' triggers unexpectedly.
  useLayoutEffect(() => {
    const trigger = sectionRef.current;
    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === trigger) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="overflow-hidden bg-paper py-section">
      <div className="mb-10 flex items-baseline justify-between px-gutter">
        <h2 className="font-display text-display-3">Featured Campaigns</h2>
        <Link
          href="/work"
          className="group relative font-mono text-caption uppercase tracking-[0.08em] hover:text-rust"
        >
          All Work →
          <span
            aria-hidden
            className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-rust transition-transform duration-500 ease-editorial group-hover:scale-x-100"
          />
        </Link>
      </div>

      <div ref={trackRef} className="flex gap-8 overflow-x-auto px-gutter md:overflow-visible">
        {featuredCampaigns.map((c) => (
          <Link
            key={c.slug}
            href={`/work/${c.slug}`}
            data-cursor="media"
            className="group relative h-[70vh] w-[80vw] flex-shrink-0 overflow-hidden bg-ink-80 md:w-[42vw]"
          >
            <Image
              src={c.heroImage}
              alt={`${c.client} campaign still`}
              fill
              sizes="(min-width: 768px) 42vw, 80vw"
              className="object-cover opacity-80 transition-transform duration-700 ease-editorial group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-paper">
              <div>
                <p className="font-mono text-caption uppercase tracking-[0.08em] text-paper/60">
                  {c.category} — {c.year}
                </p>
                <p className="font-display text-display-3">{c.client}</p>
              </div>
              <p className="translate-y-4 font-mono text-caption uppercase tracking-[0.08em] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {c.stat}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
