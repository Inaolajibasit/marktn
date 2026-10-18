import type { Metadata } from "next";
import { instrument, inter } from "@/lib/fonts";
import { SiteShell } from "@/components/SiteShell";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.marktnpr.com";
const SITE_TITLE = "MARKTN — Beyond the brief.";
const SITE_DESCRIPTION =
  "MARKTN is a next generation marketing and public relations company, founded in 2026 to connect African and global brands with Nigeria and the broader African market.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — MARKTN",
  },
  description: SITE_DESCRIPTION,
  icons: { icon: "/images/hero/KASTERISK-icon.png", apple: "/images/hero/KASTERISK-icon.png" },
  keywords: [
    "marktn PR",
    "marketing agency Africa",
    "African PR agency",
    "marketing and public relations Nigeria",
    "experiential marketing Africa",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: "MARKTN",
    images: [
      {
        url: "/images/hero/hero.png",
        width: 1200,
        height: 630,
        alt: "MARKTN — Beyond the brief",
      },
    ],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${instrument.variable} ${inter.variable}`}>
      <body>
        <Analytics />
        {/* Skip link — first focusable element, required for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-ink focus:text-paper focus:px-4 focus:py-2 focus:font-mono focus:text-caption"
        >
          Skip to content
        </a>

        <SiteShell>{children}</SiteShell>

        <script
          type="application/ld+json"
          // Organization schema — helps Google surface marktn PR as an entity, not just a page
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "MARKTN",
              alternateName: "marktn PR",
              url: SITE_URL,
              slogan: "Beyond the brief.",
              foundingDate: "2026",
              sameAs: [
                "https://instagram.com/marktnagency?rpxt=MTB0dXJ3dW94a2U0cA%3D%3D",
                "https://www.linkedin.com/company/marktn-agency/",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
