"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Content stays visible before hydration and if JavaScript is unavailable.
export function RevealProvider() {
  const pathname = usePathname();
  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    if (motionPreference.matches) return;
    const animations = new Map<Element, Animation>();
    const registered = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animations.get(entry.target)?.play();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    const register = (element: HTMLElement) => {
      if (registered.has(element)) return;
      registered.add(element);
      if (element.getBoundingClientRect().top <= window.innerHeight) return;
      // Animation effects do not mutate React-owned class/style attributes.
      // A parent effect can run before a streamed Suspense boundary hydrates.
      const animation = element.animate(
        [
          { opacity: 0, translate: "0 22px" },
          { opacity: 1, translate: "0 0" },
        ],
        {
          duration: 600,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "both",
        },
      );
      animation.pause();
      animations.set(element, animation);
      animation.onfinish = () => {
        animation.cancel();
        animations.delete(element);
      };
      observer.observe(element);
    };
    const registerWithin = (container: ParentNode) => {
      container
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach(register);
    };
    registerWithin(document);
    const mutations = new MutationObserver((records) => {
      records.forEach((record) =>
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches("[data-reveal]")) register(node);
          registerWithin(node);
        }),
      );
      animations.forEach((animation, element) => {
        if (!element.isConnected) {
          observer.unobserve(element);
          animation.cancel();
          animations.delete(element);
        }
      });
    });
    mutations.observe(document.body, { childList: true, subtree: true });
    const cleanup = () => {
      observer.disconnect();
      mutations.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    };
    const onMotionChange = () => {
      if (motionPreference.matches) cleanup();
    };
    motionPreference.addEventListener("change", onMotionChange);
    return () => {
      cleanup();
      motionPreference.removeEventListener("change", onMotionChange);
    };
  }, [pathname]);
  return null;
}
