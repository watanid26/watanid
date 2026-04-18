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
): boolean {
  const play = playStoreUrl?.trim() ?? "";
  const app = appStoreUrl?.trim() ?? "";
  return (
    (!!play && isSafeExternalUrl(play)) || (!!app && isSafeExternalUrl(app))
  );
}
