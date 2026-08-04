"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";
import { services } from "@/lib/content";
import { initSectionRules } from "@/lib/sectionRules";

// ScrollTrigger is registered once in SmoothScrollProvider.

export function Services() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-service-card]").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: prefersReducedMotion() ? 0 : 48, opacity: prefersReducedMotion() ? 1 : 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: (i % 2) * 0.08,
            scrollTrigger: { trigger: card, start: "top 90%", once: true },
          }
        );
      });

      // Draw-in for the rust eyebrow underline. Per-cell gridline
      // draw-ins were considered but conflict with the existing
      // gap-px mechanism — kept the eyebrow only.
      initSectionRules(rootRef.current);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="px-gutter py-section">
      <p className="eyebrow mb-2">What We Do</p>
      <span
        aria-hidden
        data-rule
        className="mb-10 block h-px w-12 bg-rust"
      />
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-paper-line bg-paper-line md:grid-cols-2">
        {services.map((s) => (
          <div
            key={s.name}
            data-service-card
            className="group bg-paper p-8 transition-colors duration-500 hover:bg-ink"
          >
            <h3 className="font-display text-display-3 italic transition-colors group-hover:text-paper">
              {s.name}
            </h3>
            <p className="mt-3 max-w-sm font-body text-body text-ink-40 transition-colors group-hover:text-paper/70">
              {s.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
