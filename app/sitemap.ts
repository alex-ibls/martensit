import type { MetadataRoute } from "next";
import { sitemapPages } from "@/lib/sitemap";
import { absoluteOn, resolveMetadataBase } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const base = await resolveMetadataBase();

  return sitemapPages.map((page) => ({
    url: absoluteOn(base, page.path),
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
    ...(page.images
      ? { images: page.images.map((src) => absoluteOn(base, src)) }
      : {}),
  }));
}
