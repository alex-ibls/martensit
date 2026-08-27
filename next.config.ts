import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  experimental: {
    proxyClientMaxBodySize: "12mb",
  },
  async headers() {
    return [
      {
        source: "/.well-known/acme-challenge/:file",
        headers: [
          { key: "Content-Type", value: "text/plain" },
          { key: "Cache-Control", value: "no-store" },
        ],
      },
      {
        source: "/og/:file*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, immutable" },
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
    ];
  },
};

export default nextConfig;
