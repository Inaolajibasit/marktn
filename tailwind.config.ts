import type { Config } from "tailwindcss";

/**
 * marktn PR — Design Tokens
 * -------------------------------------------------------------
 * Color:      Off-black ink, warm bone paper, terracotta rust
 *             used for the smallest marks, and a deep teal-navy
 *             that earns its place as ONE full-bleed panel
 *             (the Founder section) plus subtle companion marks.
 * Type:       Fraunces (display, editorial, high optical contrast)
 *             + Instrument Sans (body/UI, quiet and neutral)
 *             + IBM Plex Mono (eyebrows, captions, data, credits)
 * Grid:       12-col, asymmetrical bias toward a 7/5 split
 * Motion:     Slow, intentional. See lib/motion.ts for eases.
 * -------------------------------------------------------------
 */
const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0A0A", // primary — near-black, not pure black
          80: "#1C1B19",
          60: "#3C3A36",
          40: "#6B6862",
          20: "#A9A59C",
        },
        paper: {
          DEFAULT: "#F7F5F2", // secondary — warm bone, not stark white
          dim: "#EFEBE4",
          line: "#E2DCD1",
        },
        rust: {
          DEFAULT: "#C36A2D", // accent — used sparingly, never as a fill
          soft: "#D98A54",
          deep: "#A2551F",
        },
        teal: {
          DEFAULT: "#1F3A4D", // secondary accent — used for the Founder
          soft: "#2D4F66", //   panel and cursor-on-teal. Same discipline
          deep: "#13283A", //   as rust: smallest marks + one panel.
          line: "#3A5A70", //   Never as a fill outside the Founder section.
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-instrument)", "Helvetica Neue", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
        script: ["var(--font-meow-script)", "cursive"],
      },
      fontSize: {
        // Editorial scale — deliberately large at the top, tight at the bottom
        "display-1": ["clamp(3.5rem, 9vw, 9.5rem)", { lineHeight: "0.92", letterSpacing: "-0.02em" }],
        "display-2": ["clamp(2.75rem, 6vw, 6rem)", { lineHeight: "0.98", letterSpacing: "-0.015em" }],
        "display-3": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.02", letterSpacing: "-0.01em" }],
        eyebrow: ["0.75rem", { lineHeight: "1", letterSpacing: "0.18em" }],
        body: ["1.0625rem", { lineHeight: "1.6" }],
        caption: ["0.8125rem", { lineHeight: "1.4", letterSpacing: "0.01em" }],
      },
      spacing: {
        gutter: "clamp(1.25rem, 4vw, 3rem)",
        section: "clamp(6rem, 12vw, 12rem)",
      },
      maxWidth: {
        content: "1680px",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.65, 0, 0.15, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
