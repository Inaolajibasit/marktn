import { Fraunces, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";

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
