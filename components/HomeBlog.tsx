import { ButtonLink, SectionHeading } from "./BrandUI";
import { PostCard } from "./blog/PostCard";
import { sanityFetch } from "@/sanity/lib/fetch";
import { homePostsQuery } from "@/sanity/lib/queries";
import type { PostCard as Post } from "@/sanity/lib/types";

export async function HomeBlog() {
  // A temporary CMS outage must not take the agency homepage offline.
  const posts = await sanityFetch<Post[]>({ query: homePostsQuery }).catch(
    () => [],
  );
  return (
    <section
      className="content-section journal-section"
      aria-labelledby="home-blog-title"
    >
      <SectionHeading
        eyebrow="Ideas & field notes"
        id="home-blog-title"
        title="Another angle."
        accent="Something to think about."
      >
        <ButtonLink href="/blog" variant="outline">
          Read the journal
        </ButtonLink>
      </SectionHeading>
      {posts.length ? (
        <div className="journal-grid">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="journal-empty">
          <p>
            Perspectives on culture, reputation and the ideas that move brands
            forward.
          </p>
          <ButtonLink href="/blog" variant="outline">
            Explore the journal
          </ButtonLink>
        </div>
      )}
    </section>
  );
}
