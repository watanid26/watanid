import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n-messages";
import { DEFAULT_LOCALE, localeHref } from "@/lib/locale-routing";
import { PRIVACY_SLUGS } from "@/lib/privacy-content";
import { readAllPages } from "@/lib/pages";
import { SITE_URL } from "@/lib/site-url";

/**
 * Built from live content rather than a hand-kept list, so a new app or page
 * cannot be forgotten. `/k2136` and `/admin` are left out on purpose: the first
 * is a noindex ad redirect, the second is behind auth.
 *
 * Every path is emitted once per locale, each carrying the full `alternates`
 * set, which is how Google wants hreflang expressed in a sitemap.
 */
export const dynamic = "force-dynamic";

type Entry = { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number };

function expand(entries: Entry[], lastModified: Date): MetadataRoute.Sitemap {
  const languages = (path: string) => {
    const map: Record<string, string> = {};
    for (const l of locales) map[l] = `${SITE_URL}${localeHref(l, path)}`;
    map["x-default"] = `${SITE_URL}${localeHref(DEFAULT_LOCALE, path)}`;
    return map;
  };

  return entries.flatMap(({ path, changeFrequency, priority }) =>
    locales.map((locale) => ({
      url: `${SITE_URL}${localeHref(locale, path)}`,
      lastModified,
      changeFrequency,
      priority: locale === DEFAULT_LOCALE ? priority : priority * 0.9,
      alternates: { languages: languages(path) },
    })),
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const entries: Entry[] = [
    { path: "/", changeFrequency: "monthly", priority: 1 },
    { path: "/apps", changeFrequency: "weekly", priority: 0.9 },
    { path: "/about", changeFrequency: "monthly", priority: 0.6 },
    ...PRIVACY_SLUGS.map((slug) => ({
      path: `/privacy/${slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    })),
  ];

  // Custom pages are admin-authored and may be empty; readAllPages fails soft.
  const pages = await readAllPages();
  for (const p of pages) {
    entries.push({ path: `/${p.slug}`, changeFrequency: "monthly", priority: 0.5 });
  }

  return expand(entries, now);
}
