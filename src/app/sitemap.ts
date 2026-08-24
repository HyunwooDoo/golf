import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

const routes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/regular-lessons", changeFrequency: "monthly", priority: 0.9 },
  { path: "/private-lessons", changeFrequency: "monthly", priority: 0.9 },
  { path: "/reviews", changeFrequency: "weekly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, changeFrequency, priority }) => ({
    url: absoluteUrl(path),
    lastModified: new Date("2026-08-25"),
    changeFrequency,
    priority,
    ...(path === "/"
      ? { images: [absoluteUrl("/photos/pro-1.png")] }
      : undefined),
  }));
}
