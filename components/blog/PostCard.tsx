import Link from "next/link";
import type { PostCard as PostCardType } from "@/sanity/lib/types";
import { ArticleImage } from "./ArticleImage";

export function PostCard({
  post,
  large = false,
}: {
  post: PostCardType;
  large?: boolean;
}) {
  const date = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(post.publishedAt));
  const copy = (
    <div className="article-card-copy">
      <div className="article-card-meta">
        <span>{post.category?.title || "Perspective"}</span>
        <time dateTime={post.publishedAt}>{date}</time>
      </div>
      <h3>
        <Link href={"/blog/" + post.slug}>{post.title}</Link>
      </h3>
      {large && <p>{post.excerpt}</p>}
    </div>
  );
  return (
    <article
      className={"article-card" + (large ? " article-card--large" : "")}
      data-reveal
    >
      <Link href={"/blog/" + post.slug} aria-label={"Read " + post.title}>
        <ArticleImage
          image={post.featuredImage}
          title={post.title}
          className="article-card-image"
        />
      </Link>
      {copy}
    </article>
  );
}
