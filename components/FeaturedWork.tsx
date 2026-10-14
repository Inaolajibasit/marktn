import Link from "next/link";
import Image from "next/image";
import { campaigns, type Campaign } from "@/lib/content";
import { Arrow, ButtonLink, SectionHeading } from "./BrandUI";

export function ProjectCard({
  campaign,
  index = 0,
}: {
  campaign: Campaign;
  index?: number;
}) {
  return (
    <article
      className={"project-card project-card--" + (index % 2)}
      data-reveal
    >
      <Link
        href={"/work/" + campaign.slug}
        className="project-image-link"
        aria-label={"View " + campaign.client + " case study"}
      >
        <div className="project-image">
          <Image
            src={campaign.heroImage}
            alt={campaign.client + " campaign"}
            fill
            sizes="(max-width: 700px) 92vw, 46vw"
            className="object-cover"
          />
          <span className="project-stat">
            <Arrow />
            {campaign.stat}
          </span>
          <span className="project-open">
            <Arrow />
          </span>
        </div>
      </Link>
      <div className="project-caption">
        <div>
          <h3>
            <Link href={"/work/" + campaign.slug}>{campaign.client}</Link>
          </h3>
          <p>{campaign.description}</p>
        </div>
        <div className="project-tags">
          <span>{campaign.category}</span>
          <span>{campaign.year}</span>
        </div>
      </div>
    </article>
  );
}

export function FeaturedWork() {
  return (
    <section
      className="content-section work-section"
      id="work"
      aria-labelledby="featured-work-title"
    >
      <SectionHeading
        eyebrow="Selected work"
        id="featured-work-title"
        title="Ideas that travel."
        accent="Work that matters."
      >
        <p>
          Global ambition. Local understanding. A few of the brands and moments
          we’ve helped move forward.
        </p>
        <ButtonLink href="/work" variant="outline">
          All projects
        </ButtonLink>
      </SectionHeading>
      <div className="projects-grid">
        {campaigns.map((campaign, i) => (
          <ProjectCard campaign={campaign} index={i} key={campaign.slug} />
        ))}
      </div>
    </section>
  );
}
