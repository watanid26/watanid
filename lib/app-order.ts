import type { AppRecord } from "@/lib/types";

/** Coerce `order` after JSON parse (blob / legacy data may omit or corrupt it). */
export function ensureAppOrders(apps: AppRecord[]): AppRecord[] {
  return apps.map((a) => ({
    ...a,
    order:
      typeof a.order === "number" && Number.isFinite(a.order) ? a.order : 0,
  }));
}

/** Public /apps list order: ascending `order`, then slug */
export function sortAppsByOrder(apps: AppRecord[]): AppRecord[] {
  return [...apps].sort((a, b) => {
    const ao = Number.isFinite(a.order) ? a.order : 0;
    const bo = Number.isFinite(b.order) ? b.order : 0;
    if (ao !== bo) return ao - bo;
    return a.slug.localeCompare(b.slug);
  });
}
