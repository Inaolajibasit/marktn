import type { Metadata } from "next";
import { Founder } from "@/components/Founder";
import { values } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "The story, mission and values behind marktn PR.",
};

export default function AboutPage() {
  return (
    <div className="pt-32">
      <section className="px-gutter pb-section">
        <p className="eyebrow mb-6">Our Story</p>
        <h1 className="max-w-4xl font-display text-display-2">
          Built on the belief that African audiences deserve campaigns made for them.
        </h1>
        <p className="mt-8 max-w-2xl font-body text-body text-ink-40">
          marktn PR was founded to close a gap: global brands entering Africa were
          launching with strategies designed elsewhere. We build from the ground up —
          understanding how a market actually talks, gathers and decides what to trust
          — and use that understanding to produce campaigns with measurable, lasting
          impact.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-12 border-t border-paper-line px-gutter py-section md:grid-cols-3">
        <div>
          <p className="eyebrow mb-4">Mission</p>
          <p className="font-display text-display-3 italic">
            Deliver culturally intelligent campaigns that redefine how brands connect
            with African audiences.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-4">Vision</p>
          <p className="font-body text-body text-ink-40">
            A continent where the campaigns representing global brands are built by
            the people who understand it best.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-4">Philosophy</p>
          <p className="font-body text-body text-ink-40">
            Perception is not fixed — it is designed. Every campaign is an exercise in
            deciding, deliberately, how a brand should be seen.
          </p>
        </div>
      </section>

      <section className="border-t border-paper-line px-gutter py-section">
        <p className="eyebrow mb-10">Values</p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {values.map((v) => (
            <div key={v.name} className="border-t border-paper-line pt-6">
              <h3 className="font-display text-display-3 italic">{v.name}</h3>
              <p className="mt-2 font-body text-body text-ink-40">{v.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <Founder />
    </div>
  );
}
