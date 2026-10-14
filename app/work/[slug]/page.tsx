import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { campaigns, getCampaignBySlug, getNextCampaign } from "@/lib/content";
import { Arrow, PageIntro } from "@/components/BrandUI";

export function generateStaticParams() {
  return campaigns.map((campaign) => ({ slug: campaign.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const campaign = getCampaignBySlug(slug);
  if (!campaign) return {};
  return {
    title: campaign.client + " — Case study",
    description: campaign.overview,
    alternates: { canonical: "/work/" + slug },
    openGraph: { images: [{ url: campaign.heroImage }] },
  };
}
export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const campaign = getCampaignBySlug(slug);
  if (!campaign) notFound();
  const next = getNextCampaign(slug);
  return (
    <article>
      <PageIntro
        eyebrow={campaign.category + " / " + campaign.year}
        title={campaign.client}
        description={campaign.description}
      />
      <div className="case-study-cover">
        <Image
          src={campaign.heroImage}
          alt={campaign.client + " campaign hero"}
          fill
          priority
          sizes="95vw"
          className="object-cover"
        />
      </div>
      <section className="content-section">
        <div className="case-study-content">
          {[
            { title: "The opportunity", copy: campaign.overview },
            { title: "The challenge", copy: campaign.challenge },
            { title: "The cultural insight", copy: campaign.insight },
            { title: "The strategy", copy: campaign.strategy },
          ].map((section) => (
            <article key={section.title} data-reveal>
              <h2>{section.title}</h2>
              <p>{section.copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="page-section">
        <p className="eyebrow">From idea to impact</p>
        <p className="service-detail-description">{campaign.execution}</p>
      </section>
      <section className="page-section">
        <div className="case-gallery">
          {campaign.gallery.map((src, i) => (
            <div key={src} data-reveal>
              <Image
                src={src}
                alt={campaign.client + " campaign detail " + (i + 1)}
                fill
                sizes="(max-width: 700px) 92vw, 31vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>
      <section className="page-section">
        <div className="results-panel">
          <p className="eyebrow">The results</p>
          <dl>
            {campaign.results.map((result) => (
              <div key={result.label}>
                <dd>{result.value}</dd>
                <dt>{result.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>
      {!!campaign.pressCoverage.length && (
        <section className="page-section">
          <p className="eyebrow">In the conversation</p>
          <ul className="press-list">
            {campaign.pressCoverage.map((item) => (
              <li key={item.headline}>
                <span>{item.outlet}</span>
                <h3>{item.headline}</h3>
              </li>
            ))}
          </ul>
        </section>
      )}
      <Link href={"/work/" + next.slug} className="next-project">
        <div>
          <p className="eyebrow">The next angle</p>
          <h2>{next.client}</h2>
        </div>
        <Arrow />
      </Link>
    </article>
  );
}
