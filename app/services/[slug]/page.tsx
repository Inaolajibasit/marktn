import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getServiceBySlug, services } from "@/lib/content";
import { ButtonLink, PageIntro } from "@/components/BrandUI";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.detail,
    alternates: { canonical: service.href },
  };
}
export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  const index = services.findIndex((item) => item.slug === slug);
  const visuals = [
    "image1.png",
    "image1.png",
    "hero2.png",
    "image2.png",
    "image3.png",
    "hero.png",
    "image3.png",
    "image2.png",
  ];
  return (
    <article>
      <div className="service-detail-intro">
        <PageIntro
          eyebrow={"Our capabilities / 0" + (index + 1)}
          title={service.name}
          description={service.detail}
        />
        <div className="service-detail-visual">
          <Image
            src={"/images/hero/" + visuals[index]}
            alt={service.name + " — MARKTN visual"}
            fill
            priority
            sizes="(max-width: 700px) 90vw, 34vw"
            className="object-cover"
          />
        </div>
      </div>
      <section className="content-section">
        <p className="eyebrow">A different angle</p>
        <p className="service-detail-description">{service.moreInfo}</p>
      </section>
      <section className="page-section">
        <div className="service-detail-grid">
          <div className="service-detail-block" data-reveal>
            <h2>Who it’s for.</h2>
            <ul>
              {service.audience.map((item, i) => (
                <li key={item}>
                  <span>0{i + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="service-detail-block" data-reveal>
            <h2>What we bring.</h2>
            <ul>
              {service.deliverables.map((item, i) => (
                <li key={item}>
                  <span>0{i + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="page-section">
        <div className="faq-grid">
          <div>
            <p className="eyebrow">A few useful answers</p>
            <h2 className="section-title">
              Good questions.
              <br />
              <span className="accent-text">Clear answers.</span>
            </h2>
          </div>
          <div>
            {service.faqs.map((faq) => (
              <details key={faq.question}>
                <summary>
                  <span>{faq.question}</span>
                  <span aria-hidden>+</span>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="page-section">
        <div className="service-cta">
          <h2>
            Let’s make your
            <br />
            next move matter.
          </h2>
          <ButtonLink href={"/contact?service=" + service.slug}>
            Start a conversation
          </ButtonLink>
        </div>
      </section>
    </article>
  );
}
