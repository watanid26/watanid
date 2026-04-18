import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import type { SiteMeta } from "@/lib/types";
import { isAdminFromCookies } from "@/lib/admin-cookie";
import { getSiteMeta, saveSiteMeta } from "@/lib/storage";

export const dynamic = "force-dynamic";

function deny() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function validateSite(data: unknown): data is SiteMeta {
  if (typeof data !== "object" || data === null) return false;
  const d = data as Record<string, unknown>;
  if (typeof d.developerName !== "string" || typeof d.email !== "string") {
    return false;
  }
  const opt = [
    "githubUrl",
    "instagramUrl",
    "xUrl",
    "threadsUrl",
  ] as const;
  for (const k of opt) {
    if (k in d && d[k] !== undefined && typeof d[k] !== "string") {
      return false;
    }
  }
  return true;
}

export async function GET() {
  try {
    if (!isAdminFromCookies()) return deny();
    const site = await getSiteMeta();
    return NextResponse.json(site);
  } catch (err) {
    console.error("GET /api/admin/site", err);
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

  if (!validateSite(body)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  await saveSiteMeta(body);

  revalidatePath("/", "layout");
  revalidatePath("/about");

  return NextResponse.json({ ok: true });
}
