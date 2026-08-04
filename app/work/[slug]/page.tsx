import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { campaigns, getCampaignBySlug, getNextCampaign } from "@/lib/content";

export function generateStaticParams() {
  return campaigns.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const campaign = getCampaignBySlug(params.slug);
  if (!campaign) return {};
  return {
    title: `${campaign.client} — Case Study`,
    description: campaign.overview,
    openGraph: { images: [{ url: campaign.heroImage }] },
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const campaign = getCampaignBySlug(params.slug);
  if (!campaign) notFound();
  const next = getNextCampaign(params.slug);

  return (
    <article>
      <section className="relative flex h-[80svh] flex-col justify-end px-gutter pb-14 pt-32 text-paper">
        <div data-cursor="media" className="absolute inset-0 -z-10">
          <Image
            src={campaign.heroImage}
            alt={`${campaign.client} campaign hero`}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-70"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
        <p className="eyebrow mb-4 text-paper/60">{campaign.category} — {campaign.year}</p>
        <h1 className="font-display text-display-1">{campaign.client}</h1>
      </section>

      <section className="grid grid-cols-1 gap-12 px-gutter py-section md:grid-cols-2">
        <div>
          <p className="eyebrow mb-4">Overview</p>
          <p className="font-body text-body text-ink-40">{campaign.overview}</p>
        </div>
        <div>
          <p className="eyebrow mb-4">Insight</p>
          <p className="font-body text-body text-ink-40">{campaign.insight}</p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-12 border-t border-paper-line px-gutter py-section md:grid-cols-2">
        <div>
          <p className="eyebrow mb-4">Challenge</p>
          <p className="font-body text-body text-ink-40">{campaign.challenge}</p>
        </div>
        <div>
          <p className="eyebrow mb-4">Strategy</p>
          <p className="font-body text-body text-ink-40">{campaign.strategy}</p>
        </div>
      </section>

      <section className="border-t border-paper-line px-gutter py-section">
        <p className="eyebrow mb-4">Execution</p>
        <p className="max-w-2xl font-body text-body text-ink-40">{campaign.execution}</p>
      </section>

      <section className="grid grid-cols-1 gap-4 px-gutter pb-section md:grid-cols-3">
        {campaign.gallery.map((src) => (
          <div key={src} data-cursor="media" className="relative aspect-[4/5]">
            <Image src={src} alt={`${campaign.client} campaign gallery image`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
          </div>
        ))}
      </section>

      <section className="border-t border-paper-line bg-ink px-gutter py-section text-paper">
        <p className="eyebrow mb-10 text-paper/60">Results</p>
        <dl className="grid grid-cols-3 gap-6">
          {campaign.results.map((r) => (
            <div key={r.label}>
              <dd className="font-display text-display-3">{r.value}</dd>
              <dt className="mt-2 font-mono text-caption uppercase tracking-[0.08em] text-paper/50">{r.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {campaign.pressCoverage.length > 0 && (
        <section className="border-t border-paper-line px-gutter py-section">
          <p className="eyebrow mb-6">Media Coverage</p>
          <ul className="divide-y divide-paper-line border-t border-paper-line">
            {campaign.pressCoverage.map((p) => (
              <li key={p.headline} className="flex justify-between py-4">
                <span className="font-mono text-caption uppercase text-ink-40">{p.outlet}</span>
                <span className="font-display italic">{p.headline}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <Link href={`/work/${next.slug}`} className="group block border-t border-paper-line px-gutter py-section">
        <p className="eyebrow mb-4">Next Project</p>
        <p className="font-display text-display-2 italic transition-colors group-hover:text-rust">
          {next.client} →
        </p>
      </Link>
    </article>
  );
}
