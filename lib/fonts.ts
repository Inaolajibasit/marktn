import { Fraunces, Instrument_Sans, IBM_Plex_Mono, Meow_Script } from "next/font/google";

export const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  weight: "variable",
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

export const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-instrument",
  display: "swap",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

/**
 * Meow Script — installed but NOT wired into the layout or tailwind config.
 * Single-weight (400), normal style only. Handwritten/display script.
 * Available subsets: latin, latin-ext, vietnamese.
 *
 * To activate, add the CSS variable class on <html> in app/layout.tsx
 * (alongside `${fraunces.variable}` etc.) and then either:
 *   1. Add a token in tailwind.config.ts under `theme.extend.fontFamily`:
 *        script: ["var(--font-meow-script)", "cursive"]
 *      and use it via `font-script` on any element, OR
 *   2. Apply it directly: `style={{ fontFamily: "var(--font-meow-script)" }}`.
 */
export const meowScript = Meow_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-meow-script",
  display: "swap",
});
