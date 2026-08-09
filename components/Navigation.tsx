"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/press", label: "Press" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the menu is open so the page underneath
  // doesn't scroll/transform under the user's finger on touch devices.
  // Also flag the body so the cursor aperture can recolor itself for
  // legibility against the dark overlay (rust dot on ink is essentially
  // invisible — we invert it to paper while the menu is up).
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      document.body.dataset.menuOpen = "true";
      return () => {
        document.body.style.overflow = prev;
        delete document.body.dataset.menuOpen;
      };
    }
  }, [open]);

  // Esc closes the menu — standard expectation, also matches the
  // "Close / Esc" hint rendered in the overlay.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[80] bg-ink/30 backdrop-blur-md supports-[backdrop-filter]:bg-ink/20">
        <div
          className={`flex items-center justify-between px-gutter py-6 text-paper transition-opacity duration-200 ${
            open ? "pointer-events-none opacity-0" : ""
          }`}
        >
          <Link
            href="/"
            className="font-display text-lg tracking-tight text-paper"
            aria-label="marktn PR — home"
          >
            marktn<span className="text-rust">.</span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            className="inline-flex min-h-[44px] items-center font-mono text-eyebrow uppercase tracking-[0.18em] text-paper transition-[color,transform] duration-150 ease-out hover:text-rust focus-visible:text-rust active:scale-[0.97]"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      {/* Menu overlay lives OUTSIDE the <header> on purpose. The header has
          `backdrop-filter`, which establishes a containing block for fixed-
          positioned descendants — nesting the overlay inside the header would
          make `fixed inset-0` resolve to the header's tiny box, clipping the
          overlay. Keeping it as a sibling restores viewport-sized `inset-0`. */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="site-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-[90] flex flex-col justify-center bg-ink/70 px-gutter text-paper backdrop-blur-xl"
            aria-label="Site menu"
          >
            {/* Dedicated close affordance. Lives inside the overlay so it
                stays visible while the header bar fades out, and so the
                trigger and the close action are co-located. */}
            <div className="absolute right-gutter top-6 flex items-center gap-3 font-mono text-eyebrow uppercase tracking-[0.18em]">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="text-paper transition-colors hover:text-rust focus-visible:text-rust"
              >
                Close
              </button>
              <span aria-hidden className="text-paper/40">
                /
              </span>
              <span aria-hidden className="text-paper/40">
                Esc
              </span>
            </div>

            <ol className="space-y-2">
              {LINKS.map((link, i) => (
                <li key={link.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.06 * i,
                      ease: [0.65, 0, 0.15, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-4 font-display text-display-3 italic"
                    >
                      <span className="font-mono text-caption not-italic text-paper/40">
                        0{i + 1}
                      </span>
                      <span className="transition-colors group-hover:text-rust">
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ol>

            <div className="absolute bottom-10 left-gutter right-gutter flex justify-between font-mono text-caption text-paper/60">
              <span>Lagos, Nigeria</span>
              <span>hello@marktnpr.com</span>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
