import type { Metadata } from "next";
import { headers } from "next/headers";
import { isPublicSiteUrl, site } from "@/lib/site";

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

function parseForwardedHost(hostHeader: string) {
  try {
    return new URL(`http://${hostHeader}`);
  } catch {
    return null;
  }
}

function isLocalHostName(hostname: string) {
  return LOCAL_HOSTS.has(hostname.toLowerCase());
}

function inferProtocol(hostHeader: string, forwardedProto: string | null) {
  const proto = forwardedProto?.split(",")[0]?.trim();
  if (proto === "http" || proto === "https") return proto;

  const parsed = parseForwardedHost(hostHeader);
  const port = parsed?.port;
  if (port === "443") return "https";
  if (port === "80" || port === "3000" || port === "3002") return "http";
  if (parsed && isLocalHostName(parsed.hostname)) return "http";
  return "https";
}

export async function resolveMetadataBase(): Promise<URL> {
  if (isPublicSiteUrl()) {
    return new URL(site.siteUrl);
  }

  try {
    const requestHeaders = await headers();
    const host = (requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "")
      .split(",")[0]
      ?.trim();
    if (!host) return new URL(site.siteUrl);

    const parsed = parseForwardedHost(host);
    if (!parsed || isLocalHostName(parsed.hostname)) {
      return new URL(site.siteUrl);
    }

    const protocol = inferProtocol(host, requestHeaders.get("x-forwarded-proto"));
    return new URL(`${protocol}://${host}`);
  } catch {
    return new URL(site.siteUrl);
  }
}

export function absoluteOn(base: URL, path = "/") {
  if (path === "/" || path === "") return base.origin;
  return new URL(path, base).href;
}

export function ogShareImage(base: URL) {
  const url = absoluteOn(base, site.ogImage);
  return {
    url,
    ...(url.startsWith("https:") ? { secureUrl: url } : {}),
    type: "image/jpeg",
    width: 1200,
    height: 630,
    alt: site.h1,
  };
}

export async function pageShareMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Promise<Pick<Metadata, "metadataBase" | "openGraph" | "twitter" | "other">> {
  const metadataBase = await resolveMetadataBase();
  const image = ogShareImage(metadataBase);
  const url = absoluteOn(metadataBase, path);

  return {
    metadataBase,
    openGraph: {
      title,
      description,
      url,
      siteName: site.orgName,
      locale: "ru_RU",
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
    other: {
      "vk:image": image.url,
    },
  };
}
