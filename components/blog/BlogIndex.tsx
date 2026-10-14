"use client";

import { useState } from "react";
import type { Category, PostCard as Post } from "@/sanity/lib/types";
import { PostCard } from "./PostCard";

const PAGE = 6;
export function BlogIndex({
  posts,
  categories,
}: {
  posts: Post[];
  categories: Category[];
}) {
  const [category, setCategory] = useState("all");
  const [shown, setShown] = useState(PAGE);
  const filtered =
    category === "all"
      ? posts
      : posts.filter((post) => post.category?.slug === category);
  function select(value: string) {
    setCategory(value);
    setShown(PAGE);
  }
  return (
    <>
      <div
        className="filters"
        role="group"
        aria-label="Filter articles by category"
      >
        <button
          type="button"
          onClick={() => select("all")}
          aria-pressed={category === "all"}
        >
          All perspectives
        </button>
        {categories.map((item) => (
          <button
            type="button"
            key={item.slug}
            onClick={() => select(item.slug)}
            aria-pressed={category === item.slug}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div className="journal-grid">
        {filtered.slice(0, shown).map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
      {filtered.length > shown && (
        <button
          type="button"
          className="load-more"
          onClick={() => setShown((value) => value + PAGE)}
        >
          A little more thinking ↓
        </button>
      )}
      {!filtered.length && (
        <p className="filter-empty" role="status">
          No articles in this category yet. Explore another perspective.
        </p>
      )}
    </>
  );
}
