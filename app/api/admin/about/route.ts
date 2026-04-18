import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import type { AboutContentFile, AboutPrincipleRow } from "@/lib/types";
import { isAdminFromCookies } from "@/lib/admin-cookie";
import { getAbout, saveAbout } from "@/lib/storage";

export const dynamic = "force-dynamic";

function deny() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function validatePrinciples(arr: unknown): arr is AboutPrincipleRow[] {
  if (!Array.isArray(arr)) return false;
  for (const row of arr) {
    if (typeof row !== "object" || row === null) return false;
    const r = row as Record<string, unknown>;
    if (
      typeof r.title !== "string" ||
      typeof r.body !== "string" ||
      typeof r.tag !== "string"
    ) {
      return false;
    }
  }
  return true;
}

function validateLabels(v: unknown): boolean {
  if (typeof v !== "object" || v === null) return false;
  for (const val of Object.values(v as Record<string, unknown>)) {
    if (typeof val !== "string") return false;
  }
  return true;
}

/** Accepts legacy `intro`/`paragraphs` and new editorial fields; optional keys must match types when present. */
function validateAbout(data: unknown): data is AboutContentFile {
  if (typeof data !== "object" || data === null) return false;
  const d = data as Record<string, unknown>;
  for (const locale of ["en", "ko", "ja"] as const) {
    const block = d[locale];
    if (typeof block !== "object" || block === null) return false;
    const b = block as Record<string, unknown>;
    if ("intro" in b && b.intro !== undefined && typeof b.intro !== "string") {
      return false;
    }
    if ("paragraphs" in b && b.paragraphs !== undefined) {
      if (!Array.isArray(b.paragraphs)) return false;
      for (const p of b.paragraphs) {
        if (typeof p !== "string") return false;
      }
    }
    if ("principles" in b && b.principles !== undefined) {
      if (!validatePrinciples(b.principles)) return false;
    }
    if ("labels" in b && b.labels !== undefined) {
      if (!validateLabels(b.labels)) return false;
    }
    const stringKeys = [
      "metaManifesto",
      "metaStudio",
      "metaEst",
      "heroBefore",
      "heroEmphasis",
      "heroAfter",
      "signatureName",
      "signatureRole",
      "principlesIntro",
      "fieldNotesQuote",
      "fieldNotesAttribution",
      "replyValue",
      "mascotImageSrc",
    ] as const;
    for (const k of stringKeys) {
      if (k in b && b[k] !== undefined && typeof b[k] !== "string") {
        return false;
      }
    }
  }
  return true;
}

export async function GET() {
  try {
    if (!isAdminFromCookies()) return deny();
    const about = await getAbout();
    return NextResponse.json(about);
  } catch (err) {
    console.error("GET /api/admin/about", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!isAdminFromCookies()) return deny();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!validateAbout(body)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  await saveAbout(body);

  revalidatePath("/", "layout");
  revalidatePath("/about");

  return NextResponse.json({ ok: true });
}
