import type { MetadataRoute } from "next";
import { PRIVACY_SLUGS } from "@/lib/privacy-content";
import { readAllPages } from "@/lib/pages";
import { SITE_URL } from "@/lib/site-url";

/**
 * Built from live content rather than a hand-kept list, so a new app or page
 * cannot be forgotten. `/k2136` and `/admin` are left out on purpose: the first
 * is a noindex ad redirect, the second is behind auth.
 */
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const fixed: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/apps`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const privacy: MetadataRoute.Sitemap = PRIVACY_SLUGS.map((slug) => ({
    url: `${SITE_URL}/privacy/${slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.4,
  }));

  // Custom pages are admin-authored and may be empty; readAllPages fails soft.
  const pages = await readAllPages();
  const custom: MetadataRoute.Sitemap = pages.map((p) => ({
    url: `${SITE_URL}/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  // Published apps have no page of their own yet, so there is nothing to list
  // for them here; /apps/<slug> entries belong in this file once those exist.
  return [...fixed, ...privacy, ...custom];
}
