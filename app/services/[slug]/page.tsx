import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug, services } from "@/lib/content";

type ServicePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.name,
    description: service.detail,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const serviceNumber = String(services.findIndex((item) => item.slug === slug) + 1).padStart(2, "0");

  return (
    <article>
      <section className="relative isolate min-h-[72svh] overflow-hidden bg-ink px-gutter pb-12 pt-36 text-paper md:pb-16">
        <div aria-hidden className="absolute inset-0 -z-10 opacity-80">
          <div className="service-orbit service-orbit--outer absolute -right-[8vw] -top-[18vw] h-[52vw] w-[52vw] rounded-full border border-rust/40" />
          <div className="service-orbit service-orbit--inner absolute -right-[2vw] -top-[12vw] h-[40vw] w-[40vw] rounded-full border border-paper/10" />
          <div className="service-banner-rule service-banner-rule--one absolute bottom-0 left-[42%] h-full w-px rotate-[24deg] bg-paper/10" />
          <div className="service-banner-rule service-banner-rule--two absolute bottom-0 left-[58%] h-full w-px rotate-[24deg] bg-rust/35" />
        </div>

        <div className="flex h-full min-h-[calc(72svh-12rem)] flex-col justify-between">
          <div className="flex items-center justify-between border-b border-paper/15 pb-5 font-mono text-caption uppercase tracking-[0.12em] text-paper/60">
            <Link href="/services" className="transition-colors hover:text-rust">← All services</Link>
            {/* <span>Capability {serviceNumber} / {String(services.length).padStart(2, "0")}</span> */}
          </div>

          <div className="mt-20 grid items-end gap-10 md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.42fr)]">
            <div>
              <p className="mb-5 font-mono text-eyebrow uppercase tracking-[0.18em] text-rust-soft">What we do</p>
              <h1 className="max-w-5xl font-display text-display-1 leading-[0.9]">{service.name}</h1>
            </div>
            <p className="max-w-md border-l border-rust pl-6 font-body text-body text-paper/75">
              {service.detail}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-12 px-gutter py-section md:grid-cols-[0.38fr_0.62fr]">
        <div>
          <p className="eyebrow sticky top-28">The service</p>
        </div>
        <div>
          <p className="max-w-5xl font-display text-[clamp(2rem,4vw,4.25rem)] leading-[1.08] tracking-[-0.02em]">
            {service.moreInfo}
          </p>
          <p className="mt-10 max-w-2xl font-body text-body text-ink-40">
            Every engagement is shaped around the market, moment and audience in front of us. You get senior strategic attention, culturally fluent execution and a clear line from the brief to the result.
          </p>
        </div>
      </section>

      <section className="grid border-y border-paper-line md:grid-cols-2">
        <div className="border-b border-paper-line px-gutter py-16 md:border-b-0 md:border-r md:py-24">
          <p className="eyebrow mb-10">Who it&rsquo;s for</p>
          <ul className="space-y-0">
            {service.audience.map((item, index) => (
              <li key={item} className="grid grid-cols-[2rem_1fr] gap-4 border-t border-paper-line py-5 first:border-t-0">
                <span className="font-mono text-caption text-rust">0{index + 1}</span>
                <span className="font-display text-2xl leading-tight md:text-3xl">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-paper-dim px-gutter py-16 md:py-24">
          <p className="eyebrow mb-10">Typical deliverables</p>
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {service.deliverables.map((item) => (
              <li key={item} className="flex items-center gap-4 py-5 font-body text-body">
                <span aria-hidden className="h-2 w-2 shrink-0 rotate-45 bg-rust" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-gutter py-section">
        <div className="grid gap-12 md:grid-cols-[0.38fr_0.62fr]">
          <div>
            <p className="eyebrow mb-5">Frequently asked</p>
            <h2 className="max-w-sm font-display text-display-3 italic">A few useful answers.</h2>
          </div>
          <div className="border-t border-paper-line">
            {service.faqs.map((faq, index) => (
              <details key={faq.question} className="group border-b border-paper-line">
                <summary className="flex min-h-[72px] cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-xl marker:content-none md:text-2xl">
                  <span><span className="mr-4 font-mono text-caption text-rust">0{index + 1}</span>{faq.question}</span>
                  <span aria-hidden className="relative h-6 w-6 shrink-0">
                    <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 bg-ink" />
                    <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-ink transition-transform duration-200 group-open:rotate-90" />
                  </span>
                </summary>
                <p className="max-w-2xl pb-7 pl-10 font-body text-body text-ink-40">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-rust px-gutter py-section text-paper">
        <div className="grid items-end gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <p className="mb-6 font-mono text-eyebrow uppercase tracking-[0.18em] text-paper/70">Ready when you are</p>
            <h2 className="max-w-4xl font-display text-display-2">Let&rsquo;s make your next move matter.</h2>
          </div>
          <Link
            href={`/contact?service=${service.slug}`}
            className="inline-flex min-h-[52px] items-center justify-center bg-ink px-8 py-4 font-mono text-caption uppercase tracking-[0.1em] text-paper transition-[background-color,transform] duration-150 hover:bg-paper hover:text-ink active:scale-[0.98]"
          >
            Start a conversation →
          </Link>
        </div>
      </section>
    </article>
  );
}
