"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Wraps the app in Lenis for inertial scrolling and syncs it to GSAP's
 * ScrollTrigger ticker so pinned/horizontal sections stay in lockstep
 * with the smoothed scroll position. Falls back to native scroll
 * entirely when the user has reduced motion enabled.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    // GSAP wraps the function passed to `ticker.add`, so passing the
    // bare `lenis.raf` to `ticker.remove` later is a no-op and leaves the
    // callback firing on a destroyed Lenis instance. Capture the wrapper
    // GSAP returns and remove that exact reference on cleanup.
    const tickerFn = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerFn);
    };
  }, []);

  return <>{children}</>;
}
