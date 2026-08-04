import { brandPartners } from "@/lib/content";

export function LogoMarquee() {
  const track = [...brandPartners, ...brandPartners]; // duplicated for a seamless loop

  return (
    <div className="overflow-hidden border-b border-paper-line bg-paper py-10" aria-label="Selected brand partners">
      <div className="marquee-track flex w-max gap-16">
        {track.map((brand, i) => (
          <span
            key={`${brand}-${i}`}
            className="font-display text-display-3 italic text-ink-20"
            aria-hidden={i >= brandPartners.length}
          >
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
}
