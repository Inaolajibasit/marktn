import { brandPartners } from "@/lib/content";

export function LogoMarquee() {
  return (
    <section className="partners-section" aria-labelledby="partners-title">
      <p id="partners-title">In good company.</p>
      <div className="partners-list">
        {brandPartners.map((brand) => (
          <span key={brand}>{brand}</span>
        ))}
      </div>
    </section>
  );
}
