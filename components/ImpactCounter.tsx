import { impactStats } from "@/lib/content";
import { SectionHeading } from "./BrandUI";

export function ImpactCounter() {
  return (
    <section
      className="content-section impact-section"
      aria-labelledby="impact-title"
    >
      <div className="impact-intro" data-reveal>
        <SectionHeading
          eyebrow="The impact"
          id="impact-title"
          title="Good ideas."
          accent="Real outcomes."
        />
        <p>
          The story is only the beginning. We connect cultural insight to
          campaigns with a measurable impact.
        </p>
      </div>
      <div className="impact-receipt" data-reveal>
        <div className="receipt-heading">
          <strong>MARKTN</strong>
          <span>Beyond the brief / Africa</span>
        </div>
        <dl>
          {impactStats.slice(0, 4).map((stat) => (
            <div key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>
                {stat.prefix}
                {stat.value.toFixed(stat.decimals ?? 0)}
                {stat.suffix}
              </dd>
            </div>
          ))}
        </dl>
        <div className="receipt-total">
          <span>Countries. One perspective.</span>
          <strong>{impactStats[4].value}</strong>
        </div>
        <div className="receipt-barcode" aria-hidden="true" />
        <p>Made of culture. Measured in impact.</p>
      </div>
    </section>
  );
}
