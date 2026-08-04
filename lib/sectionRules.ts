/**
 * Shared "draw-in hairline" helper.
 *
 * Any element with `data-rule` inside the supplied scope will scale from
 * 0 → 1 on the X axis the first time it enters the viewport. Used to
 * animate the rust underline below section eyebrows, the gridlines in
 * the Services 2-up, and the top rule of the Founder panel.
 *
 * Call this inside an existing `gsap.context()` block so the resulting
 * tweens and ScrollTriggers are properly scoped and reverted by the
 * outer cleanup.
 *
 * Respects `prefersReducedMotion` — reduced-motion users get an
 * immediate `scaleX: 1` with no tween.
 */

import gsap from "gsap";
import { prefersReducedMotion } from "./motion";

export function initSectionRules(scope: HTMLElement | null): void {
  if (!scope) return;

  const reduced = prefersReducedMotion();
  const rules = gsap.utils.toArray<HTMLElement>("[data-rule]", scope);

  rules.forEach((el) => {
    if (reduced) {
      gsap.set(el, { scaleX: 1 });
    } else {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        }
      );
    }
  });
}
