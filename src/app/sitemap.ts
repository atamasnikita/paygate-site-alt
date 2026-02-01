import type { MetadataRoute } from "next";
import { config } from "@/config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = config.siteUrl.replace(/\/$/u, "");
  const now = new Date();

  return [
    { url: base, lastModified: now },
    { url: `${base}/oferta`, lastModified: now },
    { url: `${base}/privacy`, lastModified: now },
    { url: `${base}/refunds`, lastModified: now },
    { url: `${base}/contacts`, lastModified: now }
  ];
}

