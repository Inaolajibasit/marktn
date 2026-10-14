import type { Metadata } from "next";
import { PageIntro } from "@/components/BrandUI";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { Newsletter } from "@/components/blog/Newsletter";
import { PostCard } from "@/components/blog/PostCard";
import { sanityFetch } from "@/sanity/lib/fetch";
import { categoriesQuery, postsQuery } from "@/sanity/lib/queries";
import type { Category, PostCard as Post } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Another angle on culture, reputation and communications. Ideas and field notes from MARKTN.",
  alternates: { canonical: "/blog" },
};
export default async function BlogPage() {
  const [postResult, categoryResult] = await Promise.allSettled([
    sanityFetch<Post[]>({ query: postsQuery }),
    sanityFetch<Category[]>({ query: categoriesQuery }),
  ]);
  const posts = postResult.status === "fulfilled" ? postResult.value : [];
  const categories =
    categoryResult.status === "fulfilled" ? categoryResult.value : [];
  const unavailable = postResult.status === "rejected";
  const featured = posts.find((post) => post.featured) || posts[0];
  const recent = featured
    ? posts.filter((post) => post._id !== featured._id)
    : posts;
  return (
    <>
      <PageIntro
        eyebrow="The MARKTN journal"
        title="Good questions."
        accent="Fresh perspectives."
        description="Ideas and field notes on culture, reputation and the way brands move through the world."
      />
      <section className="page-section">
        {featured ? (
          <>
            <p className="eyebrow">In focus</p>
            <PostCard post={featured} large />
            <BlogIndex posts={recent} categories={categories} />
          </>
        ) : (
          <div className="filter-empty">
            <h2 className="font-display text-3xl mb-4">
              {unavailable
                ? "A little pause in the conversation."
                : "The next perspective is taking shape."}
            </h2>
            <p>
              {unavailable
                ? "Our journal is temporarily unavailable. Please check back soon."
                : "New ideas and field notes will appear here soon."}
            </p>
          </div>
        )}
      </section>
      <Newsletter />
    </>
  );
}
