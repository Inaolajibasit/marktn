// Single source of truth for the site's motion language.
// Every animated component imports from here rather than inventing its own
// timing — this is what keeps the "slow, intentional" direction consistent.

export const EASE_EDITORIAL = "cubic-bezier(0.65, 0, 0.15, 1)"; // CSS string
export const EASE_EDITORIAL_GSAP = "power4.inOut"; // closest GSAP equivalent
export const EASE_REVEAL_GSAP = "power3.out";

export const DURATION = {
  fast: 0.4,
  base: 0.8,
  slow: 1.4,
  cinematic: 2.2,
} as const;

export const STAGGER = {
  words: 0.045,
  cards: 0.09,
} as const;

/** Respect prefers-reduced-motion across every custom animation. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
