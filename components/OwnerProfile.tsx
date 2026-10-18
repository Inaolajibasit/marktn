import Image from "next/image";
import { company, owner } from "@/lib/content";
import { Arrow } from "./BrandUI";

export function OwnerProfile() {
  return (
    <section
      className="content-section owner-section"
      id="meet-onyeka"
      aria-labelledby="owner-title"
    >
      <div className="owner-profile-grid">
        <div className="owner-portrait-column" data-reveal>
          <div className="owner-portrait">
            <Image
              src={owner.portrait}
              alt="Onyeka Nwonah, Founder and CEO of MARKTN"
              fill
              sizes="(max-width: 800px) 90vw, 40vw"
              className="object-cover"
            />
          </div>
          <p className="owner-portrait-caption">
            {owner.name}
            <span>{owner.title}</span>
          </p>
        </div>
        <div className="owner-profile-copy" data-reveal>
          <p className="eyebrow">Meet the founder</p>
          <h2 id="owner-title">
            Onyeka
            <br />
            <span className="accent-text">Nwonah.</span>
          </h2>
          <p className="owner-introduction">{owner.introduction}</p>
          <p>{owner.perspective}</p>
          <dl className="owner-statistics">
            {owner.statistics.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
          <div className="owner-experience">
            <h3>Experience behind the perspective.</h3>
            <ul>
              {owner.experience.map((item) => (
                <li key={item.company}>
                  <div>
                    <h4>{item.company}</h4>
                    <span>{item.role}</span>
                  </div>
                  <p>{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>
          <p className="owner-education">{owner.education}</p>
          <div className="owner-contact-links">
            <a href={"mailto:" + company.onyekaEmail}>
              Email Onyeka <Arrow />
            </a>
            <a href={owner.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <Arrow />
            </a>
          </div>
        </div>
      </div>
      <div className="owner-brand-experience" data-reveal>
        <div>
          <p className="eyebrow">Selected brand experience</p>
          <p>Across Onyeka’s career, including her roles before MARKTN.</p>
        </div>
        <ul aria-label="Brands in Onyeka’s portfolio">
          {owner.brands.map((brand) => (
            <li key={brand}>{brand}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
