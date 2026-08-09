// Single source of truth for the site's motion language.
// Every animated component imports from here rather than inventing its own
// timing — this is what keeps the "slow, intentional" direction consistent.

export const EASE_EDITORIAL = "cubic-bezier(0.65, 0, 0.15, 1)"; // CSS string
export const EASE_EDITORIAL_GSAP = "power4.inOut"; // closest GSAP equivalent
export const EASE_REVEAL_GSAP = "expo.out"; // snappier than power3.out — lands in 70% of the time

export const DURATION = {
  fast: 0.4,
  base: 0.6, // was 0.8 — reduced to feel like a settle, not a tween
  slow: 1.0, // was 1.4
  cinematic: 1.8, // was 2.2
} as const;

export const STAGGER = {
  words: 0.045,
  cards: 0.09,
} as const;

/**
 * Spring presets for framer-motion / GSAP-style code paths.
 * Skill §4 — start with critically damped (no overshoot) by default;
 * reserve bounce for momentum-driven, physical interactions.
 *
 * Usage with framer-motion:
 *   transition={{ type: "spring", bounce: 0, duration: SPRING.ui }}
 * Usage with GSAP (approximate — GSAP lacks first-class spring easing):
 *   ease: "expo.out" + duration ~ 0.4 (the default UI spring)
 */
export const SPRING = {
  ui: { type: "spring", bounce: 0, duration: 0.4 }, // critically damped default
  momentum: { type: "spring", bounce: 0.18, duration: 0.45 }, // 18 % overshoot, for flicks
  sheet: { type: "spring", bounce: 0.2, duration: 0.35 }, // drawer/sheet — skill §4
} as const;

/** Respect prefers-reduced-motion across every custom animation. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
