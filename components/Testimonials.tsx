"use client";

import { useRef, useState } from "react";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = (index: number) => {
    const nextIndex = Math.max(0, Math.min(index, testimonials.length - 1));
    const card = trackRef.current?.children[nextIndex] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    setActiveIndex(nextIndex);
  };

  const updateActiveCard = () => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    const closest = cards.reduce((best, card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - trackCenter);
      return distance < best.distance ? { index, distance } : best;
    }, { index: 0, distance: Number.POSITIVE_INFINITY });
    setActiveIndex(closest.index);
  };

  return (
    <section className="border-t border-paper-line bg-paper px-gutter py-section" aria-labelledby="testimonials-title">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="eyebrow mb-5">Client perspective</p>
          <h2 id="testimonials-title" className="max-w-3xl font-display text-display-2">
            What our partners say.
          </h2>
        </div>

        <div className="flex items-center gap-3" aria-label="Testimonial carousel controls">
          <span className="mr-2 font-mono text-caption text-ink-40" aria-live="polite">
            0{activeIndex + 1} / 0{testimonials.length}
          </span>
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Previous testimonial"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink transition-colors duration-200 hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:border-ink/20 disabled:text-ink-20 disabled:hover:bg-transparent"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            disabled={activeIndex === testimonials.length - 1}
            aria-label="Next testimonial"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink transition-colors duration-200 hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:border-ink/20 disabled:text-ink-20 disabled:hover:bg-transparent"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="m9 6 6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={updateActiveCard}
        className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Client testimonials"
      >
        {testimonials.map((testimonial, index) => (
          <figure
            key={testimonial.quote}
            className="flex min-h-[25rem] w-[88vw] max-w-[42rem] shrink-0 snap-start flex-col justify-between border border-paper-line bg-paper-dim p-7 md:w-[48vw] md:p-10"
          >
            <div>
              <div className="flex items-center justify-between font-mono text-caption uppercase tracking-[0.08em]">
                <span className="text-rust">0{index + 1}</span>
                <span className="text-ink-40">{testimonial.context}</span>
              </div>
              <blockquote className="mt-10 font-display text-[clamp(1.75rem,3vw,3.25rem)] italic leading-[1.12] tracking-[-0.015em] text-ink">
                “{testimonial.quote}”
              </blockquote>
            </div>
            <figcaption className="mt-10 border-t border-paper-line pt-5 font-mono text-caption uppercase tracking-[0.08em] text-ink-40">
              <span className="text-ink">{testimonial.name}</span>
              <span aria-hidden className="mx-2 text-rust">—</span>
              {testimonial.role}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
