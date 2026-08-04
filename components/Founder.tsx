"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { founder } from "@/lib/content";
import { initSectionRules } from "@/lib/sectionRules";

// ScrollTrigger is registered once in SmoothScrollProvider.

/**
 * The Founder panel is the ONE full-bleed teal surface on the site. It
 * earns its place here because:
 *  - it sits between two dense paper sections (Services, Press), giving
 *    the eye a deliberate "breath" as it scrolls
 *  - portrait + paper-on-deep-teal is editorial-magazine standard
 *  - the existing rust accents (hover states on links) read well against teal
 *
 * Everywhere else on the site, teal is restricted to the cursor zone
 * indicator and a few small marks — same discipline as rust.
 */
export function Founder() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      initSectionRules(rootRef.current);
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      data-cursor-zone="teal"
      className="grid grid-cols-1 gap-12 border-t border-teal/40 bg-teal-deep px-gutter py-section text-paper md:grid-cols-12"
    >
      <div className="md:col-span-5">
        <div data-cursor="media" className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src={founder.portrait}
            alt={`Portrait of ${founder.name}, Founder of marktn PR`}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="md:col-span-7">
        <p className="eyebrow mb-2 text-paper/60">The Founder</p>
        <span
          aria-hidden
          data-rule
          className="mb-8 block h-px w-12 bg-rust"
        />
        <h2 className="font-display text-display-3 italic">{founder.name}</h2>
        <p className="mt-6 max-w-xl font-body text-body text-paper/70">{founder.bio}</p>

        <ol className="mt-10 space-y-6">
          {founder.timeline.map((item) => (
            <li
              key={item.year}
              className="grid grid-cols-[4rem,1fr] gap-4 border-t border-teal/30 pt-4 first:border-t-0 first:pt-0"
            >
              <span className="font-mono text-caption text-paper/60">{item.year}</span>
              <span className="font-body text-body">{item.event}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
