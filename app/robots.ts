import type { MetadataRoute } from "next";
import { isPublicSiteUrl, site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${site.siteUrl}/sitemap.xml`,
    ...(isPublicSiteUrl() ? { host: new URL(site.siteUrl).host } : {}),
  };
}
