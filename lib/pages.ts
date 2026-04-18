import type { PageRecord } from "@/lib/types";
import { getPages, savePages } from "@/lib/storage";

export async function readAllPages(): Promise<PageRecord[]> {
  return getPages();
}

export async function writeAllPages(pages: PageRecord[]) {
  await savePages(pages);
}

export async function getMenuPages(): Promise<PageRecord[]> {
  const pages = await getPages();
  return pages
    .filter((p) => p.showInMenu)
    .sort((a, b) => a.order - b.order);
}
