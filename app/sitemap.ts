import type { MetadataRoute } from "next";
import { campaigns, services } from "@/lib/content";
import { sanityFetch } from "@/sanity/lib/fetch";
import { postsQuery } from "@/sanity/lib/queries";
import type { PostCard } from "@/sanity/lib/types";

const staticRoutes = ["", "/about", "/services", "/work", "/press", "/contact", "/blog"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://www.marktnpr.com";

  const staticEntries = staticRoutes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const campaignEntries = campaigns.map((c) => ({
    url: `${base}/work/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const serviceEntries = services.map((service) => ({
    url: `${base}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const posts = await sanityFetch<PostCard[]>({ query: postsQuery });
  const postEntries = posts.map((post: PostCard) => ({ url: `${base}/blog/${post.slug}`, lastModified: new Date(post.publishedAt), changeFrequency: "monthly" as const, priority: 0.7 }));
  return [...staticEntries, ...campaignEntries, ...serviceEntries, ...postEntries];
}
