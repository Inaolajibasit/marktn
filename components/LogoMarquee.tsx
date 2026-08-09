import { brandPartners } from "@/lib/content";

export function LogoMarquee() {
  return (
    <section
      className="border-b border-paper-line bg-paper-dim py-8 md:py-10"
      aria-labelledby="brand-partners-title"
    >
      <div className="mb-7 flex items-end justify-between gap-8 px-gutter md:mb-9">
        <div className="flex items-center gap-3">
          <span aria-hidden className="h-2 w-2 rounded-full bg-rust" />
          <h2 id="brand-partners-title" className="font-mono text-eyebrow uppercase tracking-[0.18em] text-ink-60">
            Selected collaborations
          </h2>
        </div>
        <p className="hidden max-w-xs text-right font-display text-xl italic leading-tight text-ink-40 md:block">
          Global brands. Local fluency.
        </p>
      </div>

      <div className="marquee-window border-y border-ink/10 py-5 md:py-7">
        <div className="marquee-track flex w-max animate-marquee will-change-transform">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex shrink-0 items-center"
              aria-hidden={copy === 1 ? true : undefined}
            >
              {brandPartners.map((brand, index) => (
                <div key={`${copy}-${brand}`} className="flex shrink-0 items-center">
                  <span className="whitespace-nowrap px-6 font-display text-[clamp(2rem,4.5vw,4.75rem)] leading-none tracking-[-0.025em] text-ink md:px-10">
                    {brand}
                  </span>
                  <span
                    aria-hidden
                    className={`block h-2.5 w-2.5 shrink-0 rotate-45 border border-rust ${
                      index % 2 === 0 ? "bg-rust" : "bg-transparent"
                    }`}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between px-gutter font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink-40">
        <span>Luxury · Beauty · Culture</span>
        <span aria-hidden>01 — 06</span>
      </div>
    </section>
  );
}
