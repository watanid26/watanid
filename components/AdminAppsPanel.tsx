"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { AppLocaleBlock, AppRecord } from "@/lib/types";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { ensureAppOrders } from "@/lib/app-order";
import { StoreBadgeLinks } from "@/components/StoreBadgeLinks";
import { hasVisibleStoreLinks } from "@/lib/store-links";
import { makeRowId } from "@/lib/admin-ids";

type AppRow = AppRecord & { __id: string };

const emptyLocale = (): AppLocaleBlock => ({
  title: "",
  description: "",
});

function suggestSlug(): string {
  return `app-${Date.now().toString(36)}`;
}

function emptyAppRow(order: number): AppRow {
  return {
    __id: makeRowId(),
    slug: suggestSlug(),
    thumbnail: "/images/tapalarm.svg",
    link: "#",
    status: "draft",
    order,
    featured: false,
    playStoreUrl: "",
    appStoreUrl: "",
    en: emptyLocale(),
    ko: emptyLocale(),
    ja: emptyLocale(),
  };
}

function withRowId(rec: AppRecord): AppRow {
  return { ...rec, __id: makeRowId() };
}

function stripAppRowId(row: AppRow): AppRecord {
  const { __id, ...rest } = row;
  void __id;
  return rest;
}

function appListTitle(app: AppRecord): string {
  return app.en.title || app.ko.title || app.ja.title || "Untitled";
}

function sortAppRowsByOrder(rows: AppRow[]): AppRow[] {
  return [...rows].sort((a, b) => {
    const ao = Number.isFinite(a.order) ? a.order : 0;
    const bo = Number.isFinite(b.order) ? b.order : 0;
    if (ao !== bo) return ao - bo;
    return a.__id.localeCompare(b.__id);
  });
}

export function AdminAppsPanel() {
  const [apps, setApps] = useState<AppRow[]>([]);
  const [appLang, setAppLang] = useState<"en" | "ko" | "ja">("en");
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);

  const baselineRef = useRef("[]");

  const load = useCallback(async () => {
    setError(null);
    try {
      const appsRes = await fetch("/api/admin/apps", {
        cache: "no-store",
        credentials: "same-origin",
      });
      if (appsRes.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      if (!appsRes.ok) {
        setError("Could not load apps.");
        return;
      }
      const appsJson = (await appsRes.json()) as AppRecord[];

      const appRows = ensureAppOrders(appsJson).map((a) => withRowId(a));

      setApps(appRows);
      baselineRef.current = JSON.stringify(appRows.map(stripAppRowId));
      setDirty(false);
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const current = JSON.stringify(apps.map(stripAppRowId));
    setDirty(current !== baselineRef.current);
  }, [apps]);

  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  async function save() {
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const res = await fetch("/api/admin/apps", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apps.map(stripAppRowId)),
      });
      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError((body as { error?: string }).error ?? "Save failed.");
        return;
      }
      setMessage("Saved.");
      await load();
    } catch {
      setError("Network error.");
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    if (dirty && !window.confirm("저장하지 않은 변경은 사라집니다. 로그아웃할까요?")) {
      return;
    }
    await fetch("/api/admin/session", { method: "DELETE" });
    window.location.href = "/admin/login";
  }

  function updateApp(id: string, patch: Partial<AppRecord>) {
    setApps((rows) =>
      rows.map((r) => (r.__id === id ? { ...r, ...patch } : r)),
    );
  }

  function updateAppLocale(
    id: string,
    loc: "en" | "ko" | "ja",
    patch: Partial<AppLocaleBlock>,
  ) {
    setApps((rows) =>
      rows.map((r) =>
        r.__id === id ? { ...r, [loc]: { ...r[loc], ...patch } } : r,
      ),
    );
  }

  function deleteApp(id: string) {
    const target = apps.find((a) => a.__id === id);
    const label = target ? appListTitle(target) : "this app";
    if (!window.confirm(`Delete "${label}"?`)) return;
    setApps((rows) => rows.filter((r) => r.__id !== id));
    if (selectedAppId === id) setSelectedAppId(null);
  }

  function moveApp(id: string, dir: -1 | 1) {
    setApps((rows) => {
      const sorted = sortAppRowsByOrder(rows);
      const idx = sorted.findIndex((r) => r.__id === id);
      if (idx < 0) return rows;
      const swapIdx = idx + dir;
      if (swapIdx < 0 || swapIdx >= sorted.length) return rows;
      const cur = sorted[idx];
      const other = sorted[swapIdx];
      const oCur = cur.order;
      const oOther = other.order;
      return rows.map((row) => {
        if (row.__id === cur.__id) return { ...row, order: oOther };
        if (row.__id === other.__id) return { ...row, order: oCur };
        return row;
      });
    });
  }

  function addApp() {
    const nextOrder =
      apps.length === 0
        ? 0
        : Math.max(
            0,
            ...apps.map((x) =>
              typeof x.order === "number" && Number.isFinite(x.order) ? x.order : 0,
            ),
          ) + 1;
    const row = emptyAppRow(nextOrder);
    setApps((r) => [...r, row]);
    setSelectedAppId(row.__id);
  }

  if (loading) {
    return <p className="text-sm text-black/60">Loading…</p>;
  }

  const currentApp =
    selectedAppId !== null
      ? apps.find((a) => a.__id === selectedAppId) ?? null
      : null;

  return (
    <Container className="py-10 md:py-14">
      <div className="grid gap-8 md:grid-cols-[180px_1fr]">
        <aside className="space-y-2 border-r border-black/10 pr-4">
          <p className="rounded px-3 py-2 text-left text-sm font-medium text-black">
            Apps
          </p>
          <Link
            href="/admin/about"
            className="block w-full rounded px-3 py-2 text-left text-sm text-black/60 hover:bg-black/[0.04] hover:text-black"
          >
            About page
          </Link>
          <Button type="button" variant="ghost" onClick={logout} className="w-full justify-start">
            Log out
          </Button>
        </aside>
        <section>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-black">Apps</h1>
              <p className="mt-1 text-sm text-black/60">
                Slug은 소문자·숫자·하이픈만 (kebab-case). 중복 불가. 저장 전에 반드시 유효한 slug를
                입력하세요.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="ghost" onClick={addApp}>
                Add app
              </Button>
              <Button type="button" variant="primary" onClick={save} disabled={saving}>
                {saving ? "Saving…" : dirty ? "Save*" : "Save"}
              </Button>
            </div>
          </div>

          {message ? (
            <p className="mt-6 text-sm text-primary" role="status">
              {message}
            </p>
          ) : null}
          {error ? (
            <p className="mt-6 text-sm text-red-800/90" role="alert">
              {error}
            </p>
          ) : null}

          <ul className="mt-10 divide-y divide-black/10 border-t border-black/10">
            {sortAppRowsByOrder(apps).map((row) => {
              const sorted = sortAppRowsByOrder(apps);
              const pos = sorted.findIndex((r) => r.__id === row.__id);
              const canUp = pos > 0;
              const canDown = pos < sorted.length - 1;
              return (
                <li key={row.__id} className="flex items-center gap-2 py-3 sm:gap-3">
                  <div className="flex shrink-0 flex-col gap-0.5">
                    <button
                      type="button"
                      title="Move up"
                      disabled={!canUp}
                      className="rounded border border-black/10 px-1.5 py-0.5 text-[10px] leading-none text-black/60 hover:bg-black/[0.04] disabled:cursor-not-allowed disabled:opacity-30"
                      onClick={() => moveApp(row.__id, -1)}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      title="Move down"
                      disabled={!canDown}
                      className="rounded border border-black/10 px-1.5 py-0.5 text-[10px] leading-none text-black/60 hover:bg-black/[0.04] disabled:cursor-not-allowed disabled:opacity-30"
                      onClick={() => moveApp(row.__id, 1)}
                    >
                      ↓
                    </button>
                  </div>
                  <button
                    type="button"
                    className="min-w-0 flex-1 text-left text-sm hover:text-primary"
                    onClick={() => setSelectedAppId(row.__id)}
                  >
                    <span className="font-medium text-black">{appListTitle(row)}</span>
                    <span className="ml-2 text-black/40">/{row.slug}</span>
                    <span className="ml-2 text-xs tabular-nums text-black/35">· {row.order}</span>
                    <span className="ml-2 text-xs uppercase text-black/40">{row.status}</span>
                  </button>
                  <button
                    type="button"
                    className="text-xs text-black/40 hover:text-red-800"
                    onClick={() => deleteApp(row.__id)}
                  >
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>

          {currentApp ? (
            <div className="mt-10 space-y-6 rounded-lg border border-black/10 p-6">
              <h2 className="text-sm font-semibold text-black/70">Edit app</h2>
              <p className="text-xs leading-relaxed text-black/50">
                게시(Published)된 앱은 공개{" "}
                <code className="rounded bg-black/[0.06] px-1">/apps</code> 페이지에
                아이콘·짧은 설명·스토어 버튼으로만 표시됩니다.
              </p>
              <div className="rounded-lg border border-dashed border-black/15 bg-black/[0.02] p-4">
                <p className="text-[11px] font-medium uppercase tracking-wide text-black/45">
                  Public /apps 미리보기 ({appLang})
                </p>
                <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-stone-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={currentApp.thumbnail || "/images/tapalarm.svg"}
                      alt=""
                      className="h-full w-full object-contain p-1"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-black">
                      {currentApp[appLang].title?.trim() ||
                        currentApp.en.title?.trim() ||
                        "—"}
                    </p>
                    <p className="mt-1 text-sm text-black/65">
                      {currentApp[appLang].description?.trim() ||
                        currentApp.en.description?.trim() ||
                        "—"}
                    </p>
                    {hasVisibleStoreLinks(
                      currentApp.playStoreUrl,
                      currentApp.appStoreUrl,
                    ) ? (
                      <div className="mt-3">
                        <StoreBadgeLinks
                          playStoreUrl={currentApp.playStoreUrl}
                          appStoreUrl={currentApp.appStoreUrl}
                        />
                      </div>
                    ) : (
                      <p className="mt-2 text-xs text-black/40">
                        스토어 URL이 비어 있으면 버튼이 숨겨집니다.
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-black/40">
                    Slug (kebab-case, required)
                  </span>
                  <input
                    className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 font-mono text-sm"
                    value={currentApp.slug}
                    onChange={(e) =>
                      updateApp(currentApp.__id, {
                        slug: e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9-]/g, "")
                          .replace(/--+/g, "-"),
                      })
                    }
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wide text-black/40">
                    Order
                  </span>
                  <span className="mt-1 block text-xs font-normal normal-case text-black/45">
                    Lower numbers appear first on the public Apps page.
                  </span>
                  <input
                    type="number"
                    className="mt-2 w-full rounded-md border border-black/10 px-3 py-2 text-sm tabular-nums"
                    value={Number.isFinite(currentApp.order) ? currentApp.order : 0}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      updateApp(currentApp.__id, {
                        order: Number.isFinite(v) ? v : 0,
                      });
                    }}
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-black/40">
                    App image (URL path)
                  </span>
                  <span className="mt-1 block text-xs font-normal normal-case text-black/45">
                    File must live under{" "}
                    <code className="rounded bg-black/[0.04] px-1">public/</code>.
                  </span>
                  <input
                    className="mt-2 w-full rounded-md border border-black/10 px-3 py-2 text-sm"
                    value={currentApp.thumbnail}
                    onChange={(e) =>
                      updateApp(currentApp.__id, { thumbnail: e.target.value })
                    }
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-black/40">
                    Link
                  </span>
                  <input
                    className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm"
                    value={currentApp.link}
                    onChange={(e) =>
                      updateApp(currentApp.__id, { link: e.target.value })
                    }
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-black/40">
                    Google Play
                  </span>
                  <input
                    className="mt-2 w-full rounded-md border border-black/10 px-3 py-2 text-sm"
                    placeholder="https://play.google.com/..."
                    value={currentApp.playStoreUrl ?? ""}
                    onChange={(e) =>
                      updateApp(currentApp.__id, { playStoreUrl: e.target.value })
                    }
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-black/40">
                    App Store
                  </span>
                  <input
                    className="mt-2 w-full rounded-md border border-black/10 px-3 py-2 text-sm"
                    placeholder="https://apps.apple.com/..."
                    value={currentApp.appStoreUrl ?? ""}
                    onChange={(e) =>
                      updateApp(currentApp.__id, { appStoreUrl: e.target.value })
                    }
                  />
                </label>
                <label className="flex items-center gap-2 sm:col-span-2">
                  <input
                    type="checkbox"
                    checked={currentApp.status === "published"}
                    onChange={(e) =>
                      updateApp(currentApp.__id, {
                        status: e.target.checked ? "published" : "draft",
                      })
                    }
                  />
                  <span className="text-sm text-black/70">Published</span>
                </label>
                <label className="flex items-center gap-2 sm:col-span-2">
                  <input
                    type="checkbox"
                    checked={Boolean(currentApp.featured)}
                    onChange={(e) =>
                      updateApp(currentApp.__id, { featured: e.target.checked })
                    }
                  />
                  <span className="text-sm text-black/70">Featured on home</span>
                </label>
              </div>

              <div className="border-t border-black/10 pt-6">
                <h3 className="text-sm font-semibold text-black/70">Localized copy</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(["en", "ko", "ja"] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setAppLang(l)}
                      className={`rounded px-3 py-1.5 text-xs font-medium ${
                        appLang === l
                          ? "bg-primary text-white"
                          : "bg-black/[0.04] text-black/70 hover:bg-black/[0.08]"
                      }`}
                    >
                      {l === "en" ? "English" : l === "ko" ? "한국어" : "日本語"}
                    </button>
                  ))}
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <label className="block sm:col-span-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-black/40">
                      Title
                    </span>
                    <input
                      className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm"
                      value={currentApp[appLang].title}
                      onChange={(e) =>
                        updateAppLocale(currentApp.__id, appLang, {
                          title: e.target.value,
                        })
                      }
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-black/40">
                      Short description
                    </span>
                    <textarea
                      className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm"
                      rows={2}
                      value={currentApp[appLang].description}
                      onChange={(e) =>
                        updateAppLocale(currentApp.__id, appLang, {
                          description: e.target.value,
                        })
                      }
                    />
                  </label>
                </div>
              </div>
            </div>
          ) : null}
        </section>
      </div>
    </Container>
  );
}
