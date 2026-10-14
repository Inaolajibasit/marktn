import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink, SectionHeading } from "@/components/BrandUI";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { ArticleImage } from "@/components/blog/ArticleImage";
import { PostCard } from "@/components/blog/PostCard";
import { ReadingTools } from "@/components/blog/ReadingTools";
import { sanityFetch } from "@/sanity/lib/fetch";
import { postQuery, postSlugsQuery } from "@/sanity/lib/queries";
import type { Post, PostCard as RelatedPost } from "@/sanity/lib/types";
import { urlFor } from "@/sanity/lib/image";

const site = process.env.NEXT_PUBLIC_SITE_URL || "https://marktnpr.com";
export async function generateStaticParams() {
  return sanityFetch<{ slug: string }[]>({ query: postSlugsQuery });
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<Post | null>({
    query: postQuery,
    params: { slug },
  });
  if (!post) return {};
  const image = post.seoImage || post.featuredImage;
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      publishedTime: post.publishedAt,
      images: image?.asset
        ? [urlFor(image).width(1200).height(630).fit("crop").url()]
        : [],
    },
  };
}
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await sanityFetch<Post | null>({
    query: postQuery,
    params: { slug },
  });
  if (!post) notFound();
  const text = (post.body || [])
    .filter((block: any) => block._type === "block")
    .map((block: any) =>
      (block.children || []).map((child: any) => child.text || "").join(" "),
    )
    .join(" ");
  const minutes =
    post.readingTime ||
    Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200));
  const headings = (post.body || [])
    .filter((block: any) => block._type === "block" && block.style === "h2")
    .map((block: any) => ({
      id: block._key,
      label: (block.children || []).map((child: any) => child.text).join(""),
    }));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.publishedAt,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author?.name || "MARKTN" },
    mainEntityOfPage: site + "/blog/" + slug,
  };
  return (
    <>
      <ReadingTools title={post.title} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <header className="article-hero">
        <div>
          <nav aria-label="Breadcrumb" className="article-breadcrumbs">
            <Link href="/">Home</Link> / <Link href="/blog">Journal</Link> /{" "}
            {post.category?.title || "Perspective"}
          </nav>
          <p className="eyebrow accent-text">
            {post.category?.title || "Perspective"}
          </p>
          <h1>{post.title}</h1>
          <p className="excerpt">{post.excerpt}</p>
          <div className="article-byline">
            <span>By {post.author?.name || "MARKTN"}</span>
            <time dateTime={post.publishedAt}>
              {new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(
                new Date(post.publishedAt),
              )}
            </time>
            <span>{minutes} min read</span>
          </div>
        </div>
      </header>
      <div className="article-cover">
        <ArticleImage
          image={post.featuredImage}
          title={post.title}
          className="aspect-[16/8]"
        />
      </div>
      <article data-article className="article-body-wrap">
        {headings.length >= 3 && (
          <nav aria-label="Table of contents" className="article-toc">
            <p className="eyebrow">In this perspective</p>
            <ol>
              {headings.map(
                (heading: { id: string; label: string }, i: number) => (
                  <li key={heading.id}>
                    <a href={"#" + heading.id}>
                      {String(i + 1).padStart(2, "0")} / {heading.label}
                    </a>
                  </li>
                ),
              )}
            </ol>
          </nav>
        )}
        <ArticleBody value={post.body || []} />
        {post.author && (
          <aside className="article-author">
            <p className="eyebrow">The person behind the perspective</p>
            <h2>{post.author.name}</h2>
            {post.author.bio && <p>{post.author.bio}</p>}
          </aside>
        )}
        {post.cta?.heading && (
          <aside className="article-cta">
            <h2>{post.cta.heading}</h2>
            {post.cta.copy && <p>{post.cta.copy}</p>}
            <ButtonLink href={post.cta.href || "/contact"} variant="light">
              {post.cta.label || "Start a conversation"}
            </ButtonLink>
          </aside>
        )}
      </article>
      {!!post.related?.length && (
        <section className="page-section">
          <SectionHeading
            title="Keep exploring."
            accent="Another angle awaits."
          />
          <div className="journal-grid">
            {post.related.map((related: RelatedPost) => (
              <PostCard key={related._id} post={related} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
