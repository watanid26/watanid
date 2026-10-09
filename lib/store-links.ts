/** Shared by server components and client components — keep out of `"use client"` files. */

export function isSafeExternalUrl(href: string): boolean {
  const t = href.trim();
  if (!t) return false;
  try {
    const u = new URL(t);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

export function hasVisibleStoreLinks(
  playStoreUrl?: string,
  appStoreUrl?: string,
  chromeStoreUrl?: string,
): boolean {
  return [playStoreUrl, appStoreUrl, chromeStoreUrl].some((url) => {
    const t = url?.trim() ?? "";
    return !!t && isSafeExternalUrl(t);
  });
}
