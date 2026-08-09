"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { prefersReducedMotion, DURATION } from "@/lib/motion";
import { impactStats } from "@/lib/content";
import { initSectionRules } from "@/lib/sectionRules";

// ScrollTrigger is registered once in SmoothScrollProvider.

export function ImpactCounter() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const nodes = gsap.utils.toArray<HTMLElement>("[data-counter]");
      nodes.forEach((node) => {
        const target = parseFloat(node.dataset.counter ?? "0");
        const decimals = Number(node.dataset.decimals ?? 0);
        const counter = { val: 0 };

        gsap.to(counter, {
          val: target,
          duration: prefersReducedMotion() ? 0 : DURATION.slow, // 1.0 — was 1.6
          ease: "expo.out", // snappier settle, spring-adjacent
          scrollTrigger: { trigger: node, start: "top 85%", once: true },
          onUpdate: () => {
            node.textContent = counter.val.toFixed(decimals);
          },
        });
      });

      // Draw-in for the rust underline beneath the eyebrow. Called
      // inside the same `gsap.context()` so the tweens and ScrollTriggers
      // it creates are reverted by the outer ctx.revert() on cleanup.
      initSectionRules(rootRef.current);
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="border-y border-paper-line bg-paper px-gutter py-section">
<p className="eyebrow mb-2">Measured Impact, Not Vanity Metrics</p>
      <span
        aria-hidden
        data-rule
        className="mb-10 block h-px w-12 bg-rust"
      />
      <dl className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-5">
        {impactStats.map((stat) => (
          <div key={stat.label}>
            <dt className="sr-only ">{stat.label}</dt>
            <dd className="font-display  text-display-3 tabular-nums">
              {stat.prefix}
              <span data-counter={stat.value} data-decimals={stat.decimals ?? 0}>
                0
              </span>
              <p className="text-rust inline" >{stat.suffix}</p> 
            </dd>
            <p className="mt-2 font-mono text-caption uppercase tracking-[0.08em] text-ink-40">
              {stat.label}
            </p>
          </div>
        ))}
      </dl>
    </section>
  );
}
