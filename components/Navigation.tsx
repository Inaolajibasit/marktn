"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SPRING, STAGGER } from "@/lib/motion";
import { usePathname } from "next/navigation";
import { BrandLogo, ButtonLink, Arrow } from "./BrandUI";

const MotionLink = motion.create(Link);

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Journal" },
];

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [present, setPresent] = useState(false);
  const reducedMotion = useReducedMotion();
  const itemVariants = {
    hidden: { opacity: 0, x: reducedMotion ? 0 : 18, filter: reducedMotion ? "blur(0px)" : "blur(8px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: reducedMotion ? 0.1 : 0.35 } },
  };
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const dark = pathname === "/" && !scrolled;

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 64);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!present) return;
    const trigger = toggleRef.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable =
      menuRef.current?.querySelectorAll<HTMLElement>("a, button");
    focusable?.[0]?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "Tab" && focusable?.length) {
        const first = focusable[0],
          last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [present]);

  return (
    <>
      <header
        className={
          "site-header" +
          (dark ? " site-header--dark" : "") +
          (scrolled ? " site-header--scrolled" : "")
        }
      >
        <div className="site-header-inner">
          <Link href="/" aria-label="MARKTN home" className="nav-logo">
            <BrandLogo light={dark} priority />
          </Link>
          <nav className="desktop-navigation" aria-label="Main navigation">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="nav-actions">
            <ButtonLink href="/contact" variant={dark ? "light" : "dark"} split>
              Contact us
            </ButtonLink>
            <button
              ref={toggleRef}
              type="button"
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => {
                setPresent(true);
                setOpen(true);
              }}
            >
              Menu<span aria-hidden>+</span>
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence onExitComplete={() => setPresent(false)}>
      {open && (
        <motion.div
          key="mobile-menu"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={{
            hidden: { x: reducedMotion ? 0 : "100%", opacity: reducedMotion ? 0 : 1, transition: reducedMotion ? { duration: 0.1 } : { ...SPRING.ui, type: "spring" as const } },
            visible: { x: 0, opacity: 1, transition: { ...(reducedMotion ? { duration: 0.1 } : { ...SPRING.ui, type: "spring" as const }), delayChildren: reducedMotion ? 0 : 0.12, staggerChildren: reducedMotion ? 0 : STAGGER.cards } },
          }}
          ref={menuRef}
          id="mobile-menu"
          data-lenis-prevent
          className="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          <div className="mobile-menu-top">
            <BrandLogo light />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <Image
                src="/images/hero/ASTERISK-FULLCOLOR.svg"
                alt=""
                width={32}
                height={32}
                className="mobile-menu-close-icon"
              />
            </button>
          </div>
          <nav aria-label="Mobile navigation">
            {links.map((link, i) => (
              <MotionLink variants={itemVariants}
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                <span>0{i + 1}</span>
                {link.label}
                <Arrow />
              </MotionLink>
            ))}
            <MotionLink variants={itemVariants} href="/contact" onClick={() => setOpen(false)}>
              <span>06</span>Contact
              <Arrow />
            </MotionLink>
          </nav>
          <a className="mobile-menu-email" href="mailto:hello@marktnpr.com">
            hello@marktnpr.com
          </a>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}
