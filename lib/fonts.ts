import { Inter, Instrument_Sans } from "next/font/google";

export const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-instrument",
  display: "swap",
});

// Inter's variable optical sizing supplies the deck's Inter Display treatment.
export const inter = Inter({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-inter",
  display: "swap",
});
