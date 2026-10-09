import { locales, type Locale } from "@/lib/i18n-messages";
import { SITE_URL } from "@/lib/site-url";

/**
 * English is served from the root and the other locales carry a prefix, so the
 * URLs that were already submitted to the app stores and linked externally keep
 * working unchanged.
 *
 *   /apps      → English   (also x-default)
 *   /ko/apps   → Korean
 *   /ja/apps   → Japanese
 */
export const DEFAULT_LOCALE: Locale = "en";

export const PREFIXED_LOCALES = locales.filter(
  (l): l is Exclude<Locale, typeof DEFAULT_LOCALE> => l !== DEFAULT_LOCALE,
);

/** Header the middleware sets so the root layout can read the URL's locale. */
export const LOCALE_HEADER = "x-watanid-locale";

/** `("ko", "/apps")` → `/ko/apps`; `("en", "/apps")` → `/apps`. */
export function localeHref(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path;
  if (locale === DEFAULT_LOCALE) return clean || "/";
  return `/${locale}${clean}`;
}

/** `/ko/apps` → `{ locale: "ko", path: "/apps" }`. Unprefixed paths are English. */
export function splitLocalePath(pathname: string): {
  locale: Locale;
  path: string;
} {
  for (const l of PREFIXED_LOCALES) {
    if (pathname === `/${l}`) return { locale: l, path: "/" };
    if (pathname.startsWith(`/${l}/`)) {
      return { locale: l, path: pathname.slice(l.length + 1) };
    }
  }
  return { locale: DEFAULT_LOCALE, path: pathname };
}

/**
 * `alternates` for a page's metadata. Every locale points at its own URL and the
 * canonical is self-referencing — a canonical aimed at the English version would
 * tell Google to ignore the translations, which is the problem this fixes.
 */
export function alternatesFor(locale: Locale, path: string) {
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${SITE_URL}${localeHref(l, path)}`;
  }
  languages["x-default"] = `${SITE_URL}${localeHref(DEFAULT_LOCALE, path)}`;
  return { canonical: `${SITE_URL}${localeHref(locale, path)}`, languages };
}
