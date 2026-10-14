import { ButtonLink, SectionHeading } from "./BrandUI";

const steps = [
  {
    title: "Look closer.",
    label: "Discover",
    copy: "We get into your world: your audience, your ambition, and the opportunity hiding in plain sight.",
  },
  {
    title: "Find the angle.",
    label: "Define",
    copy: "Cultural insight meets a clear strategy. One strong idea to give every part of the campaign direction.",
  },
  {
    title: "Make it matter.",
    label: "Create",
    copy: "Stories, partnerships and experiences come together, with a team that sees the whole picture.",
  },
  {
    title: "Keep moving.",
    label: "Measure",
    copy: "We track the impact, learn from the response, and use what works to shape your next move.",
  },
];

export function Process() {
  return (
    <section className="content-section process-section">
      <SectionHeading
        eyebrow="How we work"
        title="Beyond the obvious."
        accent="From day one."
      />
      <div className="process-grid">
        {steps.map((step, i) => (
          <article key={step.title} data-reveal>
            <div className="process-step">
              <span>0{i + 1}</span>
              <span>{step.label}</span>
            </div>
            <h3>{step.title}</h3>
            <p>{step.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Engagements() {
  const plans = [
    {
      title: "A focused project.",
      label: "Make your next move",
      copy: "A clear brief. A specific opportunity. The right team to bring it to life.",
      items: [
        "Strategy and brand positioning",
        "A launch, activation or production",
        "Defined scope and deliverables",
        "One accountable team",
      ],
      className: "",
    },
    {
      title: "A bigger launch.",
      label: "Bring it all together",
      copy: "One idea across every touchpoint. An integrated campaign built to land.",
      items: [
        "PR and communications strategy",
        "Talent, content and experiences",
        "Coordinated campaign delivery",
        "Shared measurement and reporting",
      ],
      className: "engagement-card--featured",
    },
    {
      title: "An ongoing partner.",
      label: "Build lasting momentum",
      copy: "A team that knows your brand. Senior counsel and consistent execution.",
      items: [
        "Ongoing press office support",
        "Campaign and reputation counsel",
        "Long-term cultural relevance",
        "Regular reporting and insight",
      ],
      className: "",
    },
  ];
  return (
    <section className="content-section engagements-section">
      <SectionHeading
        eyebrow="Ways to work together"
        title="Your ambition."
        accent="Our starting point."
      />
      <p className="section-centered-copy">
        Every engagement starts with a conversation. We shape the scope around
        what your brand needs.
      </p>
      <div className="engagements-grid">
        {plans.map((plan) => (
          <article
            key={plan.title}
            className={"engagement-card " + plan.className}
            data-reveal
          >
            <p className="eyebrow">{plan.label}</p>
            <h3>{plan.title}</h3>
            <p>{plan.copy}</p>
            <ul>
              {plan.items.map((item) => (
                <li key={item}>
                  <span aria-hidden>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <ButtonLink
              href="/contact"
              variant={plan.className ? "light" : "outline"}
            >
              Let’s talk
            </ButtonLink>
          </article>
        ))}
      </div>
    </section>
  );
}
