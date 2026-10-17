import type { Metadata } from "next";
import Image from "next/image";
import {
  PageIntro,
  SectionHeading,
  ButtonLink,
  BrandLogo,
} from "@/components/BrandUI";
import { company, companyRoles, values } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Founded in 2026, MARKTN is a marketing and public relations company re-imagining how brands connect with Nigeria and the broader African market.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="Who we are / Since 2026"
        title="The new standard"
        accent="for African marketing."
        description={company.description}
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
      <section className="content-section" aria-labelledby="about-story-title">
        <SectionHeading
          eyebrow="Marketing, re-imagined"
          id="about-story-title"
          title="A deliberate difference."
          accent="A wider perspective."
        >
          <p>{company.philosophy}</p>
        </SectionHeading>
        <p className="about-lead">{company.partnership}</p>
        <div className="process-grid about-roles">
          {companyRoles.map((role, i) => (
            <article key={role.name} data-reveal>
              <div className="process-step">
                <span>0{i + 1}</span>
                <span>Who we are</span>
              </div>
              <h3>{role.name}</h3>
              <p>{role.detail}</p>
            </article>
          ))}
        </div>
      </section>
      <section
        className="content-section about-purpose"
        aria-labelledby="about-purpose-title"
      >
        <p className="eyebrow">Why we exist</p>
        <h2 id="about-purpose-title">
          African audiences deserve more than recycled marketing ideas.
        </h2>
        <p>
          We believe brands should understand the people, culture and stories
          behind the markets they want to reach.
        </p>
      </section>
      <section
        className="content-section"
        aria-labelledby="about-direction-title"
      >
        <SectionHeading
          eyebrow="Mission & vision"
          id="about-direction-title"
          title="What drives us."
          accent="Where we’re going."
        />
        <div className="about-direction-grid">
          <article data-reveal>
            <p className="eyebrow">Our mission</p>
            <h3>Redefine the connection.</h3>
            <p>{company.mission}</p>
          </article>
          <article data-reveal>
            <p className="eyebrow">Our vision</p>
            <h3>Put Africa at the centre.</h3>
            <p>{company.vision}</p>
          </article>
        </div>
      </section>
      <section
        className="content-section about-approach"
        aria-labelledby="about-approach-title"
      >
        <SectionHeading
          eyebrow="Our solution"
          id="about-approach-title"
          title="From-Their-Eyes"
          accent="Led Marketing."
        >
          <p>
            Real understanding of people shapes the work. We start with African
            audiences and the cultures, stories and experiences that matter to
            them.
          </p>
        </SectionHeading>
        <ul className="about-principle-list">
          {company.principles.map((principle, i) => (
            <li key={principle} data-reveal>
              <span>0{i + 1}</span>
              {principle}
            </li>
          ))}
        </ul>
      </section>
      <section className="page-section" aria-labelledby="about-values-title">
        <SectionHeading
          eyebrow="Our core values"
          id="about-values-title"
          title="Fresh thinking."
          accent="Steadfast principles."
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
      <section
        className="content-section"
        aria-labelledby="about-clients-title"
      >
        <SectionHeading
          eyebrow="Our market"
          id="about-clients-title"
          title="Ambitious brands."
          accent="Shared possibilities."
        >
          <p>{company.clients}</p>
        </SectionHeading>
        <p className="about-lead">
          From emerging businesses to established companies, we work with brands
          ready to go beyond conventional marketing.
        </p>
        <ul className="about-principle-list">
          {company.idealClients.map((client, i) => (
            <li key={client} data-reveal>
              <span>0{i + 1}</span>
              {client}
            </li>
          ))}
        </ul>
        <div className="about-link">
          <ButtonLink href="/services" variant="outline">
            Explore our services
          </ButtonLink>
        </div>
      </section>
      <section
        className="content-section about-identity"
        aria-labelledby="about-identity-title"
      >
        <div className="about-identity-art" data-reveal>
          <BrandLogo tagline />
          <p>Marketing, just not as you know it.</p>
        </div>
        <div data-reveal>
          <p className="eyebrow">Our brand identity</p>
          <h2 id="about-identity-title">
            The brief is where we start.
            <br />
            <span className="accent-text">Not where we stop.</span>
          </h2>
          <p>{company.identity}</p>
        </div>
      </section>
      <section
        className="content-section"
        aria-labelledby="onyeka-contact-title"
      >
        <SectionHeading
          eyebrow="A personal conversation"
          id="onyeka-contact-title"
          title="Reach Onyeka."
          accent="Directly."
        >
          <p>To speak with Onyeka personally, get in touch directly.</p>
          <a
            className="about-contact-email"
            href={"mailto:" + company.onyekaEmail}
          >
            {company.onyekaEmail}
          </a>
        </SectionHeading>
      </section>
      <section className="page-section" aria-labelledby="about-contact-title">
        <div className="service-cta">
          <div>
            <p className="eyebrow">Crazy ideas? Pitches? Collaborations?</p>
            <h2 id="about-contact-title">
              Let’s go beyond
              <br />
              the brief.
            </h2>
            <a className="about-contact-email" href={"mailto:" + company.email}>
              {company.email}
            </a>
          </div>
          <ButtonLink href="/contact">Start a conversation</ButtonLink>
        </div>
      </section>
    </>
  );
}
