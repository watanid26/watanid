import type { Locale } from "@/lib/i18n-messages";
import { sortAppsByOrder } from "@/lib/app-order";
import type { AppLocaleBlock, AppRecord } from "@/lib/types";
import { getApps, saveApps } from "@/lib/storage";

export { sortAppsByOrder } from "@/lib/app-order";

const LOCALES: Locale[] = ["en", "ko", "ja"];

function localeOrder(locale: Locale): Locale[] {
  const rest = LOCALES.filter((l) => l !== locale);
  return [locale, ...rest];
}

/** Resolved copy for the current UI language, with sensible fallbacks across locales */
export function getAppCopy(app: AppRecord, locale: Locale): AppLocaleBlock {
  const order = localeOrder(locale);
  const pickStr = (
    key: keyof Pick<AppLocaleBlock, "title" | "description">,
  ): string => {
    for (const loc of order) {
      const v = app[loc][key];
      if (typeof v === "string" && v.trim() !== "") return v;
    }
    return "";
  };
  return {
    title: pickStr("title"),
    description: pickStr("description"),
  };
}

function emptyBlock(): AppLocaleBlock {
  return {
    title: "",
    description: "",
  };
}

function normalizeLocaleBlock(raw: unknown): AppLocaleBlock {
  if (typeof raw !== "object" || raw === null) return emptyBlock();
  const b = raw as Record<string, unknown>;
  return {
    title: typeof b.title === "string" ? b.title : "",
    description: typeof b.description === "string" ? b.description : "",
  };
}

/** Legacy flat app shape (pre i18n blocks) */
type LegacyApp = {
  title?: string;
  slug?: string;
  description?: string;
  thumbnail?: string;
  link?: string;
  status?: string;
  order?: number;
  featured?: boolean;
  playStoreUrl?: string;
  appStoreUrl?: string;
};

function migrateLegacyApp(raw: LegacyApp): AppRecord {
  const block: AppLocaleBlock = {
    title: typeof raw.title === "string" ? raw.title : "",
    description: typeof raw.description === "string" ? raw.description : "",
  };
  const n = Number(raw.order);
  const ord = Number.isFinite(n) ? n : 0;
  return {
    slug: typeof raw.slug === "string" ? raw.slug : "",
    thumbnail: typeof raw.thumbnail === "string" ? raw.thumbnail : "",
    link: typeof raw.link === "string" ? raw.link : "#",
    status: raw.status === "draft" ? "draft" : "published",
    order: ord,
    featured: Boolean(raw.featured),
    ...(typeof raw.playStoreUrl === "string"
      ? { playStoreUrl: raw.playStoreUrl }
      : {}),
    ...(typeof raw.appStoreUrl === "string"
      ? { appStoreUrl: raw.appStoreUrl }
      : {}),
    en: { ...block },
    ko: { ...block },
    ja: { ...block },
  };
}

function isNewAppShape(a: Record<string, unknown>): boolean {
  return (
    typeof a.en === "object" &&
    a.en !== null &&
    typeof a.ko === "object" &&
    a.ko !== null &&
    typeof a.ja === "object" &&
    a.ja !== null
  );
}

export function normalizeAppRecord(input: unknown): AppRecord | null {
  if (typeof input !== "object" || input === null) return null;
  const a = input as Record<string, unknown>;
  if (isNewAppShape(a)) {
    const n = Number(a.order);
    const ord = Number.isFinite(n) ? n : 0;
    const yearRaw = a.year;
    const year =
      typeof yearRaw === "number" && Number.isFinite(yearRaw)
        ? yearRaw
        : undefined;
    return {
      slug:
        typeof a.slug === "string"
          ? a.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "").replace(/--+/g, "-")
          : "",
      thumbnail: typeof a.thumbnail === "string" ? a.thumbnail : "",
      link: typeof a.link === "string" ? a.link : "#",
      status: a.status === "draft" ? "draft" : "published",
      order: ord,
      featured: Boolean(a.featured),
      ...(typeof a.playStoreUrl === "string"
        ? { playStoreUrl: a.playStoreUrl }
        : {}),
      ...(typeof a.appStoreUrl === "string"
        ? { appStoreUrl: a.appStoreUrl }
        : {}),
      ...(typeof a.category === "string" && a.category.trim()
        ? { category: a.category.trim() }
        : {}),
      ...(typeof a.version === "string" && a.version.trim()
        ? { version: a.version.trim() }
        : {}),
      ...(year !== undefined ? { year } : {}),
      en: normalizeLocaleBlock(a.en),
      ko: normalizeLocaleBlock(a.ko),
      ja: normalizeLocaleBlock(a.ja),
    };
  }
  return migrateLegacyApp(a as LegacyApp);
}

export async function readAllApps(): Promise<AppRecord[]> {
  const raw = await getApps();
  if (!Array.isArray(raw)) return [];
  return raw
    .map(normalizeAppRecord)
    .filter((x): x is AppRecord => x !== null);
}

export async function writeAllApps(apps: AppRecord[]): Promise<void> {
  await saveApps(apps);
}

export function filterPublished(apps: AppRecord[]): AppRecord[] {
  return apps.filter((a) => a.status === "published");
}

export function featuredPublished(apps: AppRecord[]): AppRecord[] {
  const pub = sortAppsByOrder(filterPublished(apps));
  const marked = pub.filter((a) => a.featured);
  if (marked.length > 0) return marked.slice(0, 2);
  return pub.slice(0, 2);
}

export async function getPublishedAppBySlug(
  slug: string,
): Promise<AppRecord | undefined> {
  const apps = await readAllApps();
  return filterPublished(apps).find((a) => a.slug === slug);
}
