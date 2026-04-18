"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { AboutContentFile, AboutLocaleBlock, SiteMeta } from "@/lib/types";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

const LOCALES = ["en", "ko", "ja"] as const;
type AdminLocale = (typeof LOCALES)[number];

function inputClass() {
  return "mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm";
}

export function AdminAboutPanel() {
  const [about, setAbout] = useState<AboutContentFile | null>(null);
  const [site, setSite] = useState<SiteMeta | null>(null);
  const [lang, setLang] = useState<AdminLocale>("en");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const [aboutRes, siteRes] = await Promise.all([
        fetch("/api/admin/about", { cache: "no-store", credentials: "same-origin" }),
        fetch("/api/admin/site", { cache: "no-store", credentials: "same-origin" }),
      ]);
      if (aboutRes.status === 401 || siteRes.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      if (!aboutRes.ok || !siteRes.ok) {
        setError("데이터를 불러오지 못했습니다.");
        return;
      }
      setAbout(await aboutRes.json());
      setSite(await siteRes.json());
    } catch {
      setError("네트워크 오류입니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    window.location.href = "/admin/login";
  }

  async function save() {
    if (!about || !site) {
      setError("저장할 데이터가 없습니다.");
      return;
    }
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const aboutPayload: AboutContentFile = {
        en: about.en,
        ko: about.ko,
        ja: about.ja,
      };
      const [aRes, sRes] = await Promise.all([
        fetch("/api/admin/about", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(aboutPayload),
        }),
        fetch("/api/admin/site", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(site),
        }),
      ]);
      if (aRes.status === 401 || sRes.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      if (!aRes.ok || !sRes.ok) {
        setError("저장에 실패했습니다.");
        return;
      }
      setMessage("저장되었습니다.");
      await load();
    } catch {
      setError("네트워크 오류입니다.");
    } finally {
      setSaving(false);
    }
  }

  function patchLocale(
    locale: AdminLocale,
    patch: Partial<AboutLocaleBlock>,
  ) {
    setAbout((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [locale]: { ...prev[locale], ...patch },
      };
    });
  }

  if (loading || !about || !site) {
    return (
      <Container className="py-10 md:py-14">
        <p className="text-sm text-black/60">
          {loading ? "불러오는 중…" : "데이터를 불러올 수 없습니다."}
        </p>
      </Container>
    );
  }

  const block = about[lang];

  return (
    <Container className="py-10 md:py-14">
      <div className="grid gap-8 md:grid-cols-[180px_1fr]">
        <aside className="space-y-2 border-r border-black/10 pr-4">
          <Link
            href="/admin"
            className="block w-full rounded px-3 py-2 text-left text-sm text-black/60 hover:bg-black/[0.04] hover:text-black"
          >
            ← Apps
          </Link>
          <Button type="button" variant="ghost" onClick={logout} className="w-full justify-start">
            Log out
          </Button>
        </aside>

        <section className="min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-black">
                About 페이지
              </h1>
              <p className="mt-1 max-w-xl text-sm text-black/60">
                공개 <code className="rounded bg-black/[0.04] px-1">/about</code>에 반영됩니다.
                마스코트 이미지는 왼쪽, 아래 문구는 그 오른쪽에 표시됩니다. 연락처 URL은{" "}
                <code className="rounded bg-black/[0.04] px-1">site.json</code>에 저장됩니다.
              </p>
            </div>
            <Button type="button" variant="primary" onClick={save} disabled={saving}>
              {saving ? "저장 중…" : "모두 저장"}
            </Button>
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

          <div className="mt-10 space-y-6 rounded-lg border border-black/10 p-6">
            <h2 className="text-sm font-semibold text-black/70">사이트 연락처</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-black/40">
                  Developer name
                </span>
                <input
                  className={inputClass()}
                  value={site.developerName}
                  onChange={(e) =>
                    setSite((s) => (s ? { ...s, developerName: e.target.value } : s))
                  }
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wide text-black/40">
                  Email
                </span>
                <input
                  className={inputClass()}
                  type="email"
                  value={site.email}
                  onChange={(e) =>
                    setSite((s) => (s ? { ...s, email: e.target.value } : s))
                  }
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wide text-black/40">
                  GitHub URL
                </span>
                <input
                  className={inputClass()}
                  value={site.githubUrl ?? ""}
                  onChange={(e) =>
                    setSite((s) =>
                      s ? { ...s, githubUrl: e.target.value || undefined } : s,
                    )
                  }
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wide text-black/40">
                  Instagram URL
                </span>
                <input
                  className={inputClass()}
                  value={site.instagramUrl ?? ""}
                  onChange={(e) =>
                    setSite((s) =>
                      s ? { ...s, instagramUrl: e.target.value || undefined } : s,
                    )
                  }
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wide text-black/40">
                  X URL
                </span>
                <input
                  className={inputClass()}
                  value={site.xUrl ?? ""}
                  onChange={(e) =>
                    setSite((s) =>
                      s ? { ...s, xUrl: e.target.value || undefined } : s,
                    )
                  }
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-black/40">
                  Threads URL
                </span>
                <input
                  className={inputClass()}
                  value={site.threadsUrl ?? ""}
                  onChange={(e) =>
                    setSite((s) =>
                      s ? { ...s, threadsUrl: e.target.value || undefined } : s,
                    )
                  }
                />
              </label>
            </div>
          </div>

          <div className="mt-10 space-y-6 rounded-lg border border-black/10 p-6">
            <h2 className="text-sm font-semibold text-black/70">언어별 본문</h2>
            <div className="flex flex-wrap gap-2">
              {LOCALES.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={`rounded px-3 py-1.5 text-xs font-medium ${
                    lang === l
                      ? "bg-primary text-white"
                      : "bg-black/[0.04] text-black/70 hover:bg-black/[0.08]"
                  }`}
                >
                  {l === "en" ? "English" : l === "ko" ? "한국어" : "日本語"}
                </button>
              ))}
            </div>

            <label className="block border-t border-black/10 pt-6">
              <span className="text-xs font-semibold uppercase tracking-wide text-black/40">
                마스코트 이미지 경로 (왼쪽 · public 기준)
              </span>
              <input
                className={`${inputClass()} font-mono text-xs`}
                value={block.mascotImageSrc ?? ""}
                placeholder="/images/Watanid_black_bg.png"
                onChange={(e) =>
                  patchLocale(lang, {
                    mascotImageSrc: e.target.value.trim() || undefined,
                  })
                }
              />
            </label>

            <div className="border-t border-black/10 pt-6">
              <h3 className="text-sm font-semibold text-black/80">
                이미지 오른쪽 문구 (Field notes)
              </h3>
              <p className="mt-1 text-xs text-black/45">
                /about 에서 마스코트 옆에 보이는 소제목·인용·출처입니다.
              </p>
              <div className="mt-4 grid gap-4">
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wide text-black/40">
                    소제목 (예: FIELD NOTES)
                  </span>
                  <input
                    className={inputClass()}
                    value={block.labels?.fieldNotes ?? ""}
                    placeholder="Field notes"
                    onChange={(e) =>
                      patchLocale(lang, {
                        labels: {
                          ...(block.labels ?? {}),
                          fieldNotes: e.target.value.trim() || undefined,
                        },
                      })
                    }
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wide text-black/40">
                    인용 본문
                  </span>
                  <textarea
                    className={`${inputClass()} min-h-[100px]`}
                    value={block.fieldNotesQuote ?? ""}
                    placeholder="The best tools disappear. You only notice them on the days they're missing."
                    onChange={(e) =>
                      patchLocale(lang, {
                        fieldNotesQuote: e.target.value || undefined,
                      })
                    }
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wide text-black/40">
                    출처 (한 줄)
                  </span>
                  <input
                    className={inputClass()}
                    value={block.fieldNotesAttribution ?? ""}
                    placeholder="— Watanid, on craft"
                    onChange={(e) =>
                      patchLocale(lang, {
                        fieldNotesAttribution: e.target.value || undefined,
                      })
                    }
                  />
                </label>
              </div>
            </div>

            <label className="block border-t border-black/10 pt-6">
              <span className="text-xs font-semibold uppercase tracking-wide text-black/40">
                아래 연락처 블록 제목 (예: Get in touch.)
              </span>
              <input
                className={inputClass()}
                value={block.labels?.contactHeading ?? ""}
                placeholder="Get in touch."
                onChange={(e) =>
                  patchLocale(lang, {
                    labels: {
                      ...(block.labels ?? {}),
                      contactHeading: e.target.value.trim() || undefined,
                    },
                  })
                }
              />
            </label>
          </div>
        </section>
      </div>
    </Container>
  );
}
