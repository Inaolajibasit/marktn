"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { press } from "@/lib/content";
import { initSectionRules } from "@/lib/sectionRules";
import { DURATION, prefersReducedMotion } from "@/lib/motion";

// ScrollTrigger is registered once in SmoothScrollProvider.

export function Press() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      initSectionRules(rootRef.current);

      const reduceMotion = prefersReducedMotion();
      gsap.utils.toArray<HTMLElement>("[data-press-item]").forEach((item, index) => {
        gsap.fromTo(
          item,
          { x: reduceMotion ? 0 : -56, opacity: reduceMotion ? 1 : 0 },
          {
            x: 0,
            opacity: 1,
            duration: reduceMotion ? 0 : DURATION.base,
            delay: reduceMotion ? 0 : Math.min(index * 0.04, 0.16),
            ease: "expo.out",
            scrollTrigger: reduceMotion
              ? undefined
              : { trigger: item, start: "top 88%", once: true },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="border-t border-paper-line px-gutter py-section">
      <p className="eyebrow mb-2">In the Press</p>
      <span aria-hidden data-rule className="mb-10 block h-px w-12 bg-rust" />
      <ul className="divide-y divide-paper-line border-t border-paper-line">
        {press.map((item) => (
          <li key={item.headline} data-press-item>
            <a
              href="/press"
              className="group flex flex-col gap-2 py-6 transition-colors hover:text-rust md:flex-row md:items-baseline md:justify-between"
            >
              <span className="font-mono text-caption uppercase tracking-[0.08em] text-ink-40 group-hover:text-rust md:w-40">
                {item.outlet}
              </span>
              <span className="font-display text-display-3 italic md:flex-1">{item.headline}</span>
              <span className="font-mono text-caption text-ink-40">{item.year}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
