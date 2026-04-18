import { promises as fs } from "fs";
import path from "path";
import { list, put } from "@vercel/blob";
import type {
  AboutContentFile,
  AppRecord,
  PageRecord,
  SiteMeta,
} from "@/lib/types";
import { ABOUT_FILE, APPS_FILE, PAGES_FILE, SITE_FILE } from "@/lib/paths";

const APPS_BLOB_PATH = "watanid/apps.json";
const PAGES_BLOB_PATH = "watanid/pages.json";
const ABOUT_BLOB_PATH = "watanid/about.json";
const SITE_BLOB_PATH = "watanid/site.json";

function isProductionBlob() {
  return (
    process.env.NODE_ENV === "production" &&
    Boolean(process.env.BLOB_READ_WRITE_TOKEN)
  );
}

/**
 * Returns parsed JSON. `null` only if the blob object does not exist yet (first deploy).
 * Network / HTTP / JSON failures throw (no silent fallback to seed).
 */
async function readBlobJson<T>(pathname: string): Promise<T | null> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    throw new Error("BLOB_READ_WRITE_TOKEN is required");
  }

  const { blobs } = await list({ prefix: "watanid/", token });
  const target = blobs.find((b) => b.pathname === pathname);
  if (!target) return null;

  const res = await fetch(target.url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(
      `Blob fetch failed for ${pathname}: ${res.status} ${res.statusText}`,
    );
  }
  return (await res.json()) as T;
}

async function writeBlobJson(pathname: string, payload: unknown) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    throw new Error("BLOB_READ_WRITE_TOKEN is required");
  }
  await put(pathname, JSON.stringify(payload, null, 2), {
    token,
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
  });
}

async function readFsJson<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return fallback;
    throw err;
  }
}

async function writeFsJson(filePath: string, payload: unknown) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(payload, null, 2), "utf-8");
}

// ---------- Apps ----------
export async function getApps(): Promise<AppRecord[]> {
  if (isProductionBlob()) {
    const fromBlob = await readBlobJson<AppRecord[]>(APPS_BLOB_PATH);
    if (fromBlob !== null) return fromBlob;
    return readFsJson<AppRecord[]>(APPS_FILE, []);
  }
  return readFsJson<AppRecord[]>(APPS_FILE, []);
}

export async function saveApps(apps: AppRecord[]): Promise<void> {
  if (isProductionBlob()) {
    await writeBlobJson(APPS_BLOB_PATH, apps);
    return;
  }
  await writeFsJson(APPS_FILE, apps);
}

// ---------- Pages ----------
export async function getPages(): Promise<PageRecord[]> {
  if (isProductionBlob()) {
    const fromBlob = await readBlobJson<PageRecord[]>(PAGES_BLOB_PATH);
    if (fromBlob !== null) return fromBlob;
    return readFsJson<PageRecord[]>(PAGES_FILE, []);
  }
  return readFsJson<PageRecord[]>(PAGES_FILE, []);
}

export async function savePages(pages: PageRecord[]): Promise<void> {
  if (isProductionBlob()) {
    await writeBlobJson(PAGES_BLOB_PATH, pages);
    return;
  }
  await writeFsJson(PAGES_FILE, pages);
}

// ---------- About ----------
const ABOUT_DEFAULT: AboutContentFile = {
  en: {},
  ko: {},
  ja: {},
};

export async function getAbout(): Promise<AboutContentFile> {
  if (isProductionBlob()) {
    const fromBlob = await readBlobJson<AboutContentFile>(ABOUT_BLOB_PATH);
    if (fromBlob !== null) return fromBlob;
    return readFsJson<AboutContentFile>(ABOUT_FILE, ABOUT_DEFAULT);
  }
  return readFsJson<AboutContentFile>(ABOUT_FILE, ABOUT_DEFAULT);
}

export async function saveAbout(data: AboutContentFile): Promise<void> {
  if (isProductionBlob()) {
    await writeBlobJson(ABOUT_BLOB_PATH, data);
    return;
  }
  await writeFsJson(ABOUT_FILE, data);
}

// ---------- Site ----------
const SITE_DEFAULT: SiteMeta = {
  developerName: "Watanid",
  email: "",
};

export async function getSiteMeta(): Promise<SiteMeta> {
  if (isProductionBlob()) {
    const fromBlob = await readBlobJson<SiteMeta>(SITE_BLOB_PATH);
    if (fromBlob !== null) return fromBlob;
    return readFsJson<SiteMeta>(SITE_FILE, SITE_DEFAULT);
  }
  return readFsJson<SiteMeta>(SITE_FILE, SITE_DEFAULT);
}

export async function saveSiteMeta(meta: SiteMeta): Promise<void> {
  if (isProductionBlob()) {
    await writeBlobJson(SITE_BLOB_PATH, meta);
    return;
  }
  await writeFsJson(SITE_FILE, meta);
}
