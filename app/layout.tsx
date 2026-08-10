import type { Metadata } from "next";
import { fraunces, instrument, plexMono, meowScript } from "@/lib/fonts";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { CursorAperture } from "@/components/CursorAperture";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

const SITE_URL = "https://www.marktnpr.com";
const SITE_TITLE = "marktn PR — Perception Is Different.";
const SITE_DESCRIPTION =
  "marktn PR is Africa's culturally intelligent luxury PR and marketing agency, building campaigns for global and African brands across fashion, beauty, hospitality and entertainment.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — marktn PR",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "marktn PR",
    "luxury PR agency Africa",
    "African PR agency",
    "brand strategy Lagos",
    "experiential marketing Africa",
    "Onyeka Nwonah",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: "marktn PR",
    images: [{ url: "/og/marktn-pr-og.jpg", width: 1200, height: 630, alt: "marktn PR" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og/marktn-pr-og.jpg"],
  },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${instrument.variable} ${plexMono.variable} ${meowScript.variable}`}>
      <body>
        <Analytics />
        {/* Skip link — first focusable element, required for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-ink focus:text-paper focus:px-4 focus:py-2 focus:font-mono focus:text-caption"
        >
          Skip to content
        </a>

        <SmoothScrollProvider>
          <CursorAperture />
          <Navigation />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScrollProvider>

        <script
          type="application/ld+json"
          // Organization schema — helps Google surface marktn PR as an entity, not just a page
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "marktn PR",
              url: SITE_URL,
              slogan: "Perception is Different.",
              founder: { "@type": "Person", name: "Onyeka Nwonah" },
              sameAs: [
                "https://www.instagram.com/marktnpr",
                "https://www.linkedin.com/company/marktnpr",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
