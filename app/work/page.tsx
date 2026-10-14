"use client";

import { useState } from "react";
import { campaigns, CATEGORIES } from "@/lib/content";
import { ProjectCard } from "@/components/FeaturedWork";
import { PageIntro } from "@/components/BrandUI";

export default function WorkPage() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");
  const filtered =
    filter === "All"
      ? campaigns
      : campaigns.filter((campaign) => campaign.category === filter);
  return (
    <>
      <PageIntro
        eyebrow="Our work"
        title="Made of culture."
        accent="Built to make a mark."
        description="Launches, stories and experiences for brands with somewhere to go. Explore a few of the projects that brought our perspective to life."
      />
      <section className="page-section">
        <div
          className="filters"
          role="group"
          aria-label="Filter projects by category"
        >
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="projects-grid">
          {filtered.map((campaign, i) => (
            <ProjectCard key={campaign.slug} campaign={campaign} index={i} />
          ))}
        </div>
        {!filtered.length && (
          <p className="filter-empty" role="status">
            No projects in this category yet. Explore another angle.
          </p>
        )}
      </section>
    </>
  );
}
