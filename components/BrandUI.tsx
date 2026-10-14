import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export function Arrow({
  direction = "up",
  className = "",
}: {
  direction?: "up" | "left" | "right";
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={"arrow-icon " + className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === "up" ? (
        <path d="M6 18 18 6M6 6h12v12" />
      ) : direction === "left" ? (
        <path d="m14 6-6 6 6 6" />
      ) : (
        <path d="m10 6 6 6-6 6" />
      )}
    </svg>
  );
}

export function BrandLogo({
  light = false,
  tagline = false,
  className = "",
  priority = false,
}: {
  light?: boolean;
  tagline?: boolean;
  className?: string;
  priority?: boolean;
}) {
  const asset = light
    ? tagline
      ? "logo_w1.png"
      : "logo_w.png"
    : tagline
      ? "logo_b1.png"
      : "logo_b.png";
  const dimensions = light
    ? tagline
      ? [808, 309]
      : [924, 270]
    : tagline
      ? [782, 319]
      : [764, 240];
  return (
    <Image
      src={"/images/hero/" + asset}
      alt={tagline ? "MARKTN — Beyond the brief" : "MARKTN"}
      width={dimensions[0]}
      height={dimensions[1]}
      className={"brand-logo " + className}
      priority={priority}
    />
  );
}

export function ButtonLink({
  href,
  children,
  variant = "dark",
  className = "",
  split = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "dark" | "red" | "light" | "outline" | "yellow";
  className?: string;
  split?: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        "button-link button-link--" +
        variant +
        (split ? " button-link--split" : "") +
        " " +
        className
      }
    >
      {split && (
        <span className="button-orb">
          <Arrow />
        </span>
      )}
      <span className="button-label">
        {children}
        {!split && <Arrow />}
      </span>
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  children,
  id,
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  children?: ReactNode;
  id?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 id={id} className="section-title">
          {title}
          {accent && (
            <>
              <br />
              <span className="accent-text">{accent}</span>
            </>
          )}
        </h2>
      </div>
      {children && <div className="section-heading-copy">{children}</div>}
    </div>
  );
}

export function PageIntro({
  eyebrow,
  title,
  accent,
  description,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
}) {
  return (
    <header className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>
        {title}
        {accent && (
          <>
            <br />
            <span className="accent-text">{accent}</span>
          </>
        )}
      </h1>
      {description && <p className="page-intro-description">{description}</p>}
    </header>
  );
}
