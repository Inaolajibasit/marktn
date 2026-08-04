"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Signature interaction: a small aperture ring (a photographic iris)
 * follows the pointer, closing slightly on hover of interactive
 * elements and dilating open over media — literalising "perception"
 * as something that focuses and refocuses as you move through the site.
 * Disabled on touch devices via CSS (see globals.css).
 *
 * When the full-screen menu is open (body[data-menu-open="true"]) the
 * cursor inverts — paper dot + paper ring — so it stays visible on the
 * dark overlay.
 */
export function CursorAperture() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const ringPos = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      gsap.to(dot, { x: mouse.x, y: mouse.y, duration: 0.05, overwrite: true });

      // Detect what cursor zone the pointer is currently over. Founder
      // has data-cursor-zone="teal"; everything else stays default
      // (rust dot + ink ring). The body-level attribute is what globals.css
      // targets — the cursor is a fixed-position element so a CSS ancestor
      // selector would never match.
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const zone = el?.closest<HTMLElement>("[data-cursor-zone]")?.dataset.cursorZone;
      if (zone) {
        document.body.dataset.cursorZone = zone;
      } else if (document.body.dataset.cursorZone) {
        delete document.body.dataset.cursorZone;
      }
    };

    gsap.ticker.add(() => {
      ringPos.x += (mouse.x - ringPos.x) * 0.15;
      ringPos.y += (mouse.y - ringPos.y) * 0.15;
      gsap.set(ring, { x: ringPos.x, y: ringPos.y });
    });

    const openAperture = () =>
      gsap.to(ring, { scale: 1.8, opacity: 0.6, duration: 0.4, ease: "power3.out" });
    const closeAperture = () =>
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" });
    const shutAperture = () =>
      gsap.to(ring, { scale: 0.5, duration: 0.3, ease: "power3.out" });

    window.addEventListener("mousemove", onMove);

    const hoverables = document.querySelectorAll("[data-cursor='media']");
    const clickables = document.querySelectorAll("a, button, [data-cursor='click']");
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", openAperture);
      el.addEventListener("mouseleave", closeAperture);
    });
    clickables.forEach((el) => {
      el.addEventListener("mouseenter", shutAperture);
      el.addEventListener("mouseleave", closeAperture);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", openAperture);
        el.removeEventListener("mouseleave", closeAperture);
      });
      clickables.forEach((el) => {
        el.removeEventListener("mouseenter", shutAperture);
        el.removeEventListener("mouseleave", closeAperture);
      });
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] custom-cursor-layer"
      aria-hidden="true"
    >
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rust cursor-on-dark"
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/50 cursor-on-dark"
      />
    </div>
  );
}