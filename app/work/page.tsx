"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { campaigns, CATEGORIES } from "@/lib/content";

export default function WorkPage() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");
  const filtered = filter === "All" ? campaigns : campaigns.filter((c) => c.category === filter);

  return (
    <div className="px-gutter pb-section pt-32">
      <h1 className="mb-10 font-display text-display-2">Selected Work</h1>

      <div className="mb-12 flex flex-wrap gap-3" role="group" aria-label="Filter campaigns by category">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            aria-pressed={filter === cat}
            className={`inline-flex min-h-[44px] items-center border px-5 py-3 font-mono text-caption uppercase tracking-[0.08em] transition-[background-color,color,border-color,transform] duration-150 ease-out active:scale-[0.98] ${
              filter === cat ? "border-ink bg-ink text-paper" : "border-paper-line text-ink-40 hover:border-ink"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <Link key={c.slug} href={`/work/${c.slug}`} data-cursor="media" className="group block">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={c.heroImage}
                alt={`${c.client} campaign still`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.02]"
              />
            </div>
            <p className="mt-4 font-mono text-caption uppercase tracking-[0.08em] text-ink-40">
              {c.category} — {c.year}
            </p>
            <p className="font-display text-display-3 italic">{c.client}</p>
            <p className="mt-1 font-body text-body text-ink-40">{c.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
