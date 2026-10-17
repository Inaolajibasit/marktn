import { ButtonLink, SectionHeading } from "./BrandUI";
import { company, companyRoles } from "@/lib/content";

export function WhoWeAre() {
  return (
    <section
      className="content-section process-section"
      aria-labelledby="who-we-are-title"
    >
      <SectionHeading
        eyebrow="Who we are"
        id="who-we-are-title"
        title="The new standard"
        accent="for African marketing."
      >
        <p>{company.description}</p>
      </SectionHeading>
      <div className="process-grid">
        {companyRoles.map((role, i) => (
          <article key={role.name} data-reveal>
            <div className="process-step">
              <span>0{i + 1}</span>
              {/* <span>MARKTN</span> */}
            </div>
            <h3>{role.name}</h3>
            <p>{role.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Engagements() {
  const plans = [
    {
      title: "Ambitious African brands.",
      label: "Build stronger connections",
      copy: "Across industries, we work with African businesses ready to build stronger brands and grow their market presence.",
      items: [
        "A clear identity and positioning",
        "Authentic audience engagement",
        "Distinctive, high-impact marketing",
        "Meaningful engagement over vanity metrics",
      ],
      className: "",
    },
    {
      title: "Ready for what’s next.",
      label: "Beyond conventional marketing",
      copy: "From emerging businesses to established companies, we partner with brands willing to explore a different way forward.",
      items: [
        "Campaigns rooted in cultural truth",
        "Immersive brand experiences",
        "Long-term narratives",
        "Fresh, intentional thinking",
      ],
      className: "engagement-card--featured",
    },
    {
      title: "Global ambition. African relevance.",
      label: "Enter with understanding",
      copy: "We help global brands approach African audiences with cultural understanding, clarity and confidence.",
      items: [
        "Culturally accurate market entry strategies",
        "Africa as a primary market",
        "Local relevance and global standards",
        "Narratives built alongside your brand",
      ],
      className: "",
    },
  ];
  return (
    <section className="content-section engagements-section">
      <SectionHeading
        eyebrow="Who we work with"
        title="Your ambition."
        accent="Our starting point."
      />
      <p className="section-centered-copy">
        African businesses and international brands. Shared ambition, fresh
        thinking and a commitment to meaningful connections.
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
