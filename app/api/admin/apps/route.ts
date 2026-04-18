import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import type { AppRecord } from "@/lib/types";
import { isAdminFromCookies } from "@/lib/admin-cookie";
import { readAllApps, writeAllApps } from "@/lib/apps";

export const dynamic = "force-dynamic";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function deny() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function bad(msg: string) {
  return NextResponse.json({ error: msg }, { status: 400 });
}

function validateLocaleBlock(x: unknown): boolean {
  if (typeof x !== "object" || x === null) return false;
  const b = x as Record<string, unknown>;
  return typeof b.title === "string" && typeof b.description === "string";
}

type ValidationResult =
  | { ok: true; data: AppRecord[] }
  | { ok: false; error: string };

function validateApps(data: unknown): ValidationResult {
  if (!Array.isArray(data)) {
    return { ok: false, error: "Payload must be an array" };
  }

  const seenSlugs = new Set<string>();

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (typeof item !== "object" || item === null) {
      return { ok: false, error: `Row ${i}: not an object` };
    }
    const a = item as Record<string, unknown>;

    if (typeof a.slug !== "string") {
      return { ok: false, error: `Row ${i}: slug must be a string` };
    }
    const slug = a.slug.trim();
    if (!slug) {
      return { ok: false, error: `Row ${i}: slug is required (kebab-case, e.g. tap-alarm)` };
    }
    if (!SLUG_RE.test(slug)) {
      return {
        ok: false,
        error: `Row ${i} (${slug}): slug may only contain lowercase letters, numbers, and hyphens`,
      };
    }
    if (seenSlugs.has(slug)) {
      return { ok: false, error: `Duplicate slug: ${slug}` };
    }
    seenSlugs.add(slug);

    if (typeof a.thumbnail !== "string") {
      return { ok: false, error: `Row ${slug}: thumbnail must be a string` };
    }
    if (typeof a.link !== "string") {
      return { ok: false, error: `Row ${slug}: link must be a string` };
    }
    if (typeof a.order !== "number" || !Number.isFinite(a.order)) {
      return { ok: false, error: `Row ${slug}: order must be a finite number` };
    }
    if (a.status !== "published" && a.status !== "draft") {
      return {
        ok: false,
        error: `Row ${slug}: status must be 'published' or 'draft'`,
      };
    }
    if (typeof a.featured !== "boolean") {
      return { ok: false, error: `Row ${slug}: featured must be a boolean` };
    }
    if (!validateLocaleBlock(a.en)) {
      return { ok: false, error: `Row ${slug}: en block invalid` };
    }
    if (!validateLocaleBlock(a.ko)) {
      return { ok: false, error: `Row ${slug}: ko block invalid` };
    }
    if (!validateLocaleBlock(a.ja)) {
      return { ok: false, error: `Row ${slug}: ja block invalid` };
    }

    for (const k of ["playStoreUrl", "appStoreUrl", "category", "version"] as const) {
      if (a[k] !== undefined && typeof a[k] !== "string") {
        return { ok: false, error: `Row ${slug}: ${k} must be a string when present` };
      }
    }
    if (a.year !== undefined && (typeof a.year !== "number" || !Number.isFinite(a.year))) {
      return { ok: false, error: `Row ${slug}: year must be a number when present` };
    }
  }

  return { ok: true, data: data as AppRecord[] };
}

export async function GET() {
  try {
    if (!isAdminFromCookies()) return deny();
    const apps = await readAllApps();
    return NextResponse.json(apps);
  } catch (err) {
    console.error("GET /api/admin/apps", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  if (!isAdminFromCookies()) return deny();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return bad("Invalid JSON");
  }

  const result = validateApps(body);
  if (!result.ok) return bad(result.error);

  try {
    await writeAllApps(result.data);
  } catch (err) {
    console.error("PUT /api/admin/apps — write failed", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? `Save failed: ${err.message}`
            : "Save failed",
      },
      { status: 500 },
    );
  }

  revalidatePath("/", "layout");
  revalidatePath("/apps");
  for (const app of result.data) {
    revalidatePath(`/apps/${app.slug}`);
  }

  return NextResponse.json({ ok: true });
}
