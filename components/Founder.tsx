import Image from "next/image";
import { company } from "@/lib/content";
import { ButtonLink, SectionHeading } from "./BrandUI";

export function Founder() {
  return (
    <section
      className="content-section founder-section"
      aria-labelledby="founder-title"
    >
      <SectionHeading
        eyebrow="The people behind the perspective"
        id="founder-title"
        title="Rooted in culture."
        accent="Built for what’s next."
      >
        <p>
          Deep local understanding. Global creative ambition. A team that gets
          close to your brand and goes further with it.
        </p>
      </SectionHeading>
      <div className="founder-grid">
        <div className="founder-image" data-reveal>
          <Image
            src="/images/hero/hero1.png"
            alt="MARKTN red and gold brand artwork"
            fill
            sizes="(max-width: 700px) 90vw, 40vw"
            className="object-cover"
          />
          <div className="founder-image-label">
            <strong>Culture moves markets.</strong>
            <span>Beyond the brief.</span>
          </div>
        </div>
        <div className="founder-copy" data-reveal>
          <p className="eyebrow">Founded in {company.founded}</p>
          <h3>
            The brief is where
            <br />
            we start.
            <br />
            <span className="accent-text">Not where we stop.</span>
          </h3>
          <p>{company.partnership}</p>
          <ButtonLink href="/about" variant="outline">
            Meet MARKTN
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
