/**
 * Stable client-only id for admin list rows. Used as React key and for
 * unambiguous row identity when slug is empty or duplicated during editing.
 * Never serialized to storage.
 */
export function makeRowId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `row-${Math.random().toString(36).slice(2)}-${Date.now()}`;
}
