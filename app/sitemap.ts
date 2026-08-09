import type { MetadataRoute } from "next";
import { campaigns, services } from "@/lib/content";

const staticRoutes = ["", "/about", "/services", "/work", "/press", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
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

  return [...staticEntries, ...campaignEntries, ...serviceEntries];
}
