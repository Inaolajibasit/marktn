"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { prefersReducedMotion, DURATION } from "@/lib/motion";
import { services } from "@/lib/content";
import { initSectionRules } from "@/lib/sectionRules";

// ScrollTrigger is registered once in SmoothScrollProvider.

export function Services() {
  const rootRef = useRef<HTMLDivElement>(null);
  // Track which service is open by name. Default: none.
  const [openName, setOpenName] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-service-card]").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: prefersReducedMotion() ? 0 : 48, opacity: prefersReducedMotion() ? 1 : 0 },
          {
            y: 0,
            opacity: 1,
            duration: DURATION.base, // 0.6 — was 0.7
            ease: "expo.out", // snappier settle, mirrors the spring default
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

  // Animate one panel open while collapsing any other open one.
  const setPanelOpen = (name: string, panelKey: string, willOpen: boolean) => {
    const target = document.querySelector<HTMLElement>(`[data-service-panel="${panelKey}"]`);

    // Close any other open panel first (accordion behavior).
    if (openName && openName !== name) {
      const previousIndex = services.findIndex((service) => service.name === openName);
      const prevPanel = document.querySelector<HTMLElement>(`[data-service-panel="service-${previousIndex}"]`);
      animateHeight(prevPanel, false);
    }

    if (!willOpen) {
      animateHeight(target, false);
      setOpenName(null);
      return;
    }

    animateHeight(target, true);
    setOpenName(name);
  };

  // Animate height of a single panel. Handles prefers-reduced-motion.
  const animateHeight = (
    panel: HTMLElement | null,
    willOpen: boolean
  ) => {
    if (!panel) return;
    gsap.killTweensOf(panel);
    if (prefersReducedMotion()) {
      panel.style.height = willOpen ? "auto" : "0px";
      return;
    }
    if (willOpen) {
      panel.style.height = "auto";
      const target = panel.scrollHeight;
      panel.style.height = "0px";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      gsap.to(panel, { height: target, duration: DURATION.base, ease: "expo.out" });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      gsap.to(panel, {
        height: 0,
        duration: DURATION.base,
        ease: "expo.in",
      });
    }
  };

  return (
    <section ref={rootRef} className="px-gutter py-section">
      <p className="eyebrow mb-2">What We Do</p>
      <span
        aria-hidden
        data-rule
        className="mb-10 block h-px w-12 bg-rust"
      />
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-paper-line bg-paper-line md:grid-cols-2">
        {services.map((s, index) => {
          const isOpen = openName === s.name;
          const panelKey = `service-${index}`;
          return (
            <div
              key={s.name}
              data-service-card
              className="group bg-paper transition-colors duration-500 hover:bg-ink"
            >
              <button
                type="button"
                onClick={() => setPanelOpen(s.name, panelKey, !isOpen)}
                aria-expanded={isOpen}
                aria-controls={`${panelKey}-panel`}
                className="flex min-h-11 w-full items-start justify-between gap-6 p-8 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-rust"
              >
                <div>
                  <h3 className="font-display text-display-3 italic transition-colors group-hover:text-paper">
                    {s.name}
                  </h3>
                  <p className="mt-3 max-w-sm font-body text-body text-ink-40 transition-colors group-hover:text-paper/70">
                    {s.detail}
                  </p>
                </div>
                {/* The vertical bar retracts to turn the plus into a minus. */}
                <span
                  aria-hidden
                  className="relative mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/20 transition-colors duration-300 group-hover:border-paper/30"
                >
                  <span className="absolute h-px w-4 bg-ink transition-colors duration-300 group-hover:bg-paper" />
                  <span
                    className={`absolute h-4 w-px bg-ink transition-all duration-300 group-hover:bg-paper ${
                      isOpen ? "scale-y-0 opacity-0" : "scale-y-100 opacity-100"
                    }`}
                  />
                </span>
              </button>

              <div
                id={`${panelKey}-panel`}
                data-service-panel={panelKey}
                role="region"
                aria-hidden={!isOpen}
                className="overflow-hidden"
                style={{ height: 0 }}
              >
                <div className="px-8 pb-8 pt-0">
                  <p className="max-w-md font-body text-body text-ink-40 transition-colors group-hover:text-paper/70">
                    {s.moreInfo}
                  </p>
                  <Link
                    href={s.href}
                    className="mt-5 inline-flex items-center gap-2 font-mono text-mono uppercase tracking-mono text-rust transition-opacity hover:opacity-80"
                  >
                    Read more
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
