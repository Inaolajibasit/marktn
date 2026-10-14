"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { SmoothScrollProvider } from "./SmoothScrollProvider";
import { RevealProvider } from "./Reveal";

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/studio"))
    return <main id="main-content">{children}</main>;
  return (
    <SmoothScrollProvider>
      <div className="site-shell">
        <Navigation />
        <main id="main-content">{children}</main>
        <Footer />
        <RevealProvider />
      </div>
    </SmoothScrollProvider>
  );
}
