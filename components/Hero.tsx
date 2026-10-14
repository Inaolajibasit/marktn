"use client";

import { useState } from "react";
import PatternWaves from "./patternWaves";
import Image from "next/image";
import Link from "next/link";
import { Arrow, ButtonLink } from "./BrandUI";
import { featuredCampaigns } from "@/lib/content";

export function Hero() {
  const [active, setActive] = useState(0);
  const campaign = featuredCampaigns[active];
  return (
    <section className="home-hero" aria-labelledby="hero-title">
      <div className="hero-background" aria-hidden="true">
        <PatternWaves
          preset="pond"
          pattern="line"
          color="#FFc904"
          backgroundColor="transparent"
          opacity={0.65}
          interactive={false}
          intro={false}
        />
      </div>
      <div className="hero-top">
        <div className="hero-introduction">
          {/* <p className="hero-eyebrow">
            <span className="status-dot" />
            Culturally fluent. Creatively fearless.
          </p> */}
          <h1 id="hero-title">
            Building brands through
            <br className="desktop-break" /> culture, strategy &amp; stories
            <br className="desktop-break" /> that go beyond the brief.
          </h1>
          <div className="hero-action-row">
            <ButtonLink href="/contact" variant="yellow" split>
              Let’s talk
            </ButtonLink>
            <div className="hero-proof">
              <strong>40+ campaigns</strong>
              <span>Across 4 African markets</span>
            </div>
          </div>
        </div>
        <div className="hero-feature">
          <Link
            href={"/work/" + campaign.slug}
            className="hero-feature-card"
            aria-label={"Explore " + campaign.client + " case study"}
          >
            <div className="hero-feature-image">
              <Image
                key={campaign.slug}
                src={
                  [
                    "/images/hero/hero.png",
                    "/images/hero/hero1.png",
                    "/images/hero/hero2.png",
                  ][active]
                }
                alt={"MARKTN brand artwork for " + campaign.client}
                fill
                sizes="(max-width: 600px) 90vw, (max-width: 1000px) 42vw, 360px"
                priority={active === 0}
                className="object-cover"
              />
              <span className="hero-feature-stat">
                <Arrow />
                {campaign.stat}
              </span>
            </div>
            <div className="hero-feature-caption">
              <div>
                <span>Selected project / 0{active + 1}</span>
                <h2>{campaign.client}</h2>
              </div>
              <Arrow />
            </div>
          </Link>
          <div className="hero-feature-controls">
            <span aria-live="polite">
              0{active + 1} / 0{featuredCampaigns.length}
            </span>
            <button
              type="button"
              aria-label="Previous featured project"
              onClick={() =>
                setActive(
                  (active - 1 + featuredCampaigns.length) %
                    featuredCampaigns.length,
                )
              }
            >
              <Arrow direction="left" />
            </button>
            <button
              type="button"
              aria-label="Next featured project"
              onClick={() => setActive((active + 1) % featuredCampaigns.length)}
            >
              <Arrow direction="right" />
            </button>
          </div>
        </div>
      </div>
      <div className="hero-signature">
        {/* <p className="hero-tagline">Beyond the brief.</p> */}
        <Image
          src="/images/hero/LOGO-WHITE.svg"
          alt="MARKTN"
          width={399}
          height={167}
          className="brand-logo hero-wordmark"
          priority
        />
      </div>
      <div className="hero-disciplines">
        <span>Public relations</span>
        <i aria-hidden /> <span>Brand strategy</span>
        <i aria-hidden />
        <span>Experiential</span>
        <i aria-hidden />
        <span>Culture &amp; campaigns</span>
      </div>
    </section>
  );
}
