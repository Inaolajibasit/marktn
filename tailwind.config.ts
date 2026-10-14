import type { Config } from "tailwindcss";

// MARKTN identity deck: Instrument Sans, Inter, burgundy, yellow and fresh blue.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#171512",
          80: "#25221E",
          60: "#514D47",
          40: "#6A655D",
          20: "#AAA49A",
        },
        paper: { DEFAULT: "#F5F7FA", dim: "#E9EDF3", line: "#D8DFE8" },
        brand: { red: "#8D1212", yellow: "#FFC904", blue: "#59D5FF" },
        // Compatibility aliases keep existing rich-text and Studio-adjacent UI coherent.
        rust: { DEFAULT: "#8D1212", soft: "#FFC904", deep: "#741010" },
        teal: {
          DEFAULT: "#8D1212",
          soft: "#A32020",
          deep: "#171512",
          line: "#D8DFE8",
        },
      },
      fontFamily: {
        display: ["var(--font-instrument)", "Arial", "sans-serif"],
        body: ["var(--font-inter)", "Arial", "sans-serif"],
        mono: ["var(--font-inter)", "Arial", "sans-serif"],
      },
      fontSize: {
        "display-1": [
          "clamp(3.5rem, 8.5vw, 9rem)",
          { lineHeight: "0.96", letterSpacing: "-0.065em" },
        ],
        "display-2": [
          "clamp(2.75rem, 6vw, 6.5rem)",
          { lineHeight: "0.98", letterSpacing: "-0.055em" },
        ],
        "display-3": [
          "clamp(2rem, 3.6vw, 3.75rem)",
          { lineHeight: "1.05", letterSpacing: "-0.04em" },
        ],
        eyebrow: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.08em" }],
        body: ["1.0625rem", { lineHeight: "1.65" }],
        caption: ["0.8125rem", { lineHeight: "1.5" }],
      },
      spacing: {
        gutter: "clamp(1.25rem, 3.5vw, 4rem)",
        section: "clamp(4.5rem, 9vw, 9rem)",
      },
      maxWidth: { content: "1600px" },
      transitionTimingFunction: { editorial: "cubic-bezier(0.22, 1, 0.36, 1)" },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: { marquee: "marquee 40s linear infinite" },
    },
  },
  plugins: [],
};
export default config;
