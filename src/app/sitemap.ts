import type { MetadataRoute } from "next";
import { productPages } from "@/data/product-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://school-ui.com";
  const lastModified = new Date("2026-07-15");
  const routes: Array<{ path: string; priority: number }> = [
    { path: "", priority: 1 },
    { path: "/product", priority: 0.9 },
    { path: "/architecture", priority: 0.9 },
    { path: "/security", priority: 0.9 },
    { path: "/security/encryption", priority: 0.85 },
    { path: "/infrastructure", priority: 0.9 },
    ...productPages.map((page) => ({
      path: `/product/${page.slug}`,
      priority: 0.8,
    })),
  ];

  return routes.map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
