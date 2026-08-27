import type { MetadataRoute } from "next";
import { absoluteOn, resolveMetadataBase } from "@/lib/seo";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const base = await resolveMetadataBase();
  const publicHost =
    base.hostname !== "localhost" &&
    base.hostname !== "127.0.0.1" &&
    base.hostname !== "::1";

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: absoluteOn(base, "/sitemap.xml"),
    ...(publicHost ? { host: base.host } : {}),
  };
}
