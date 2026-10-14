import type { Metadata } from "next";
import Image from "next/image";
import { Founder } from "@/components/Founder";
import { PageIntro, SectionHeading } from "@/components/BrandUI";
import { values, founder } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "The people, culture and perspective behind MARKTN.",
  alternates: { canonical: "/about" },
};
export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="Meet MARKTN"
        title="A different perspective."
        accent="A bigger possibility."
        description="We’re a culturally intelligent PR and marketing agency building for the audiences, opportunities and realities of Africa."
      />
      <div className="about-banner">
        <Image
          src="/images/hero/hero.png"
          alt="MARKTN’s glossy burgundy and gold asterisk"
          fill
          priority
          sizes="95vw"
          className="object-cover"
        />
      </div>
      <section className="content-section">
        <div className="about-principles">
          <article data-reveal>
            <h2>Our starting point.</h2>
            <p>
              Global brands entering Africa deserve strategies built for the
              people here. We understand how a market talks, gathers and decides
              what to trust, then use that insight to build meaningful
              campaigns.
            </p>
          </article>
          <article data-reveal>
            <h2>Our ambition.</h2>
            <p>
              Deliver culturally intelligent campaigns that redefine how brands
              connect with African audiences. Global standards, informed by the
              people who understand these markets best.
            </p>
          </article>
          <article data-reveal>
            <h2>Beyond the brief.</h2>
            <p>
              There’s always another angle to explore, an assumption to
              challenge, and an opportunity to do things differently. The brief
              is where we start, not where we stop.
            </p>
          </article>
        </div>
      </section>
      <section className="page-section">
        <SectionHeading
          eyebrow="What drives us"
          title="A clear point"
          accent="of view."
        />
        <div className="values-grid">
          {values.map((value, i) => (
            <article key={value.name} className="value-card" data-reveal>
              <span>0{i + 1}</span>
              <h3>{value.name}</h3>
              <p>{value.detail}</p>
            </article>
          ))}
        </div>
      </section>
      <Founder />
      <section className="page-section">
        <SectionHeading
          eyebrow="The journey"
          title="Always moving"
          accent="forward."
        />
        <div className="process-grid">
          {founder.timeline.map((item, i) => (
            <article key={item.year} data-reveal>
              <div className="process-step">
                <span>0{i + 1}</span>
                <span>{item.year}</span>
              </div>
              <p>{item.event}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
