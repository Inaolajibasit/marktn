"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo, ButtonLink, Arrow } from "./BrandUI";

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
    if (!open) return;
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
  }, [open]);

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
              onClick={() => setOpen(!open)}
            >
              Menu<span aria-hidden>+</span>
            </button>
          </div>
        </div>
      </header>
      {open && (
        <div
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
              Close ×
            </button>
          </div>
          <nav aria-label="Mobile navigation">
            {links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                <span>0{i + 1}</span>
                {link.label}
                <Arrow />
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)}>
              <span>06</span>Contact
              <Arrow />
            </Link>
          </nav>
          <a className="mobile-menu-email" href="mailto:hello@marktnpr.com">
            hello@marktnpr.com
          </a>
        </div>
      )}
    </>
  );
}
