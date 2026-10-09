import type { PageRecord } from "@/lib/types";
import { getPages, savePages } from "@/lib/storage";

/**
 * Public read. Storage failures degrade to "no pages" instead of propagating:
 * the custom-page list drives the nav menu and the /[slug] route, and neither
 * is worth answering a request with a 500 over. Admin writes still throw.
 */
export async function readAllPages(): Promise<PageRecord[]> {
  try {
    return await getPages();
  } catch (err) {
    console.error("readAllPages failed; treating as empty", err);
    return [];
  }
}

export async function writeAllPages(pages: PageRecord[]) {
  await savePages(pages);
}

export async function getMenuPages(): Promise<PageRecord[]> {
  const pages = await readAllPages();
  return pages
    .filter((p) => p.showInMenu)
    .sort((a, b) => a.order - b.order);
}
