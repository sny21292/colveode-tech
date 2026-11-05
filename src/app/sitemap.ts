import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { projects } from "@/content/projects";
import { posts } from "@/content/blog";
import { isoDate } from "@/lib/seo";

// Only blog posts carry a real date. Stamping other pages with the build time
// would tell Google everything changed on every deploy, so it learns to ignore it.
export default function sitemap(): MetadataRoute.Sitemap {
  const statics = ["", "/services", "/work", "/about", "/contact", "/blog"].map((p) => ({
    url: `${site.url}${p}`,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.8,
  }));
  const svc = services.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const work = projects.map((p) => ({
    url: `${site.url}/work/${p.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));
  const blogPosts = posts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: isoDate(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));
  return [...statics, ...svc, ...work, ...blogPosts];
}
