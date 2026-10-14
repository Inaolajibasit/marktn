import { press } from "@/lib/content";
import { SectionHeading } from "./BrandUI";

export function Press() {
  return (
    <section className="content-section press-section">
      <SectionHeading
        eyebrow="In the press"
        title="Stories that"
        accent="make their mark."
      />
      <ul className="press-list">
        {press.map((item) => (
          <li key={item.headline} data-reveal>
            <span>{item.outlet}</span>
            <h3>{item.headline}</h3>
            <time>{item.year}</time>
          </li>
        ))}
      </ul>
    </section>
  );
}
