import type { MetadataRoute } from "next";

import { site, updates } from "@/lib/content";

/** Indexable routes only. /donate/thanks is deliberately absent — it is noindex. */
const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "daily" },
  { path: "/donate", priority: 0.9, changeFrequency: "weekly" },
  { path: "/transparency", priority: 0.9, changeFrequency: "daily" },
  { path: "/impact", priority: 0.8, changeFrequency: "weekly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/leadership", priority: 0.7, changeFrequency: "monthly" },
  { path: "/partners", priority: 0.6, changeFrequency: "weekly" },
  { path: "/partner", priority: 0.6, changeFrequency: "monthly" },
  { path: "/volunteer", priority: 0.6, changeFrequency: "monthly" },
  { path: "/in-kind", priority: 0.5, changeFrequency: "monthly" },
  { path: "/updates", priority: 0.7, changeFrequency: "weekly" },
  { path: "/reports", priority: 0.5, changeFrequency: "yearly" },
  { path: "/media", priority: 0.5, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...ROUTES.map((r) => ({
      url: `${site.url}${r.path}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...updates.map((u) => ({
      url: `${site.url}/updates/${u.slug}`,
      lastModified: new Date(u.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
