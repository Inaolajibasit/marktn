import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/content";
import { Arrow, SectionHeading } from "./BrandUI";

const groups = [
  {
    title: "Strategy & positioning",
    copy: "Find your place in the culture. Then give people a reason to care.",
    slugs: ["brand-strategy", "consulting"],
    image: "/images/hero/image2.png",
    className: "yellow",
  },
  {
    title: "PR & communications",
    copy: "The right story, in the right rooms. Reputation built with intention.",
    slugs: ["public-relations", "media-relations"],
    image: "/images/hero/image1.png",
    className: "red",
  },
  {
    title: "Culture & campaigns",
    copy: "Ideas that earn attention. Partnerships that turn relevance into reach.",
    slugs: ["influencer-marketing", "integrated-campaigns"],
    image: "/images/hero/image3.png",
    className: "dark",
  },
  {
    title: "Experiences & production",
    copy: "From the first idea to the final detail. Make your brand something people feel.",
    slugs: ["experiential", "campaign-production"],
    image: "/images/hero/hero2.png",
    className: "blue",
  },
];

export function Services() {
  return (
    <section
      className="content-section services-section"
      id="services"
      aria-labelledby="services-title"
    >
      <SectionHeading
        eyebrow="What we do"
        id="services-title"
        title="Different angles."
        accent="One big picture."
      >
        <p>
          Strategy, stories, experiences and culture. Connected by one team and
          built around your next move.
        </p>
      </SectionHeading>
      <div className="service-stack">
        {groups.map((group, i) => (
          <article
            key={group.title}
            className={
              "service-stack-card service-stack-card--" + group.className
            }
          >
            <div className="service-stack-copy">
              <span className="service-number">
                0{i + 1} / Our capabilities
              </span>
              <h3>{group.title}</h3>
              <p>{group.copy}</p>
              <div className="service-links">
                {group.slugs.map((slug) => {
                  const service = services.find((s) => s.slug === slug)!;
                  return (
                    <Link key={slug} href={service.href}>
                      {service.name}
                      <Arrow />
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="service-stack-image">
              <Image
                src={group.image}
                alt={group.title + " — MARKTN brand visual"}
                fill
                sizes="(max-width: 700px) 86vw, 32vw"
                className="object-cover"
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
