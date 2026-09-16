import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const statics = ["", "/services", "/work", "/about", "/contact"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.8,
  }));
  const svc = services.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...statics, ...svc];
}
