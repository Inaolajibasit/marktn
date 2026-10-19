"use client";

import { useEffect, useRef, useState } from "react";
import { DURATION } from "@/lib/motion";

const compactNumber = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export function CountUpValue({
  value,
  to,
  prefix = "",
  suffix = "",
}: {
  value: string;
  to: number;
  prefix?: string;
  suffix?: string;
}) {
  const element = useRef<HTMLSpanElement>(null);
  // Keep the final figure available during SSR and without JavaScript.
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = element.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!node || reducedMotion.matches || to <= 0 || !("IntersectionObserver" in window)) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    let started = false;
    let startTime: number | undefined;
    setDisplay(prefix + "0" + suffix);

    const tick = (now: number) => {
      startTime ??= now;
      const progress = Math.min((now - startTime) / (DURATION.cinematic * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(progress === 1 ? value : prefix + compactNumber.format(Math.round(to * eased)) + suffix);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver((entries) => {
      if (!started && entries.some((entry) => entry.isIntersecting)) {
        started = true;
        observer.disconnect();
        frame = requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });

    const finishForReducedMotion = () => {
      if (!reducedMotion.matches) return;
      cancelAnimationFrame(frame);
      observer.disconnect();
      setDisplay(value);
    };
    reducedMotion.addEventListener("change", finishForReducedMotion);
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      reducedMotion.removeEventListener("change", finishForReducedMotion);
    };
  }, [value, to, prefix, suffix]);

  return (
    <span ref={element} className="inline-block tabular-nums">
      <span className="sr-only">{value}</span>
      <span className="count-up-number" aria-hidden="true">{display}</span>
    </span>
  );
}
