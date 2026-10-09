# SEO Implementation Plan

Scored with the brief's heuristic:

```
Priority = (Organic Impact × Conversion Impact × Confidence) ÷ (Effort × Maintenance)
```

Each factor is 1–5. **This is a sequencing heuristic, not a prediction.** Note where it misleads:
items 8 and 9 have the highest ceiling of anything here but score low because they are expensive.
Do not read the ordering as "do 1–7 and stop."

| # | Action | Org | Conv | Conf | Eff | Maint | Score | Status |
|---|---|---|---|---|---|---|---|---|
| 1 | Link Glassframe's live Chrome Web Store listing from the site | 1 | 5 | 5 | 1 | 1 | **25.0** | Needs approval (see below) |
| 2 | Real titles + meta descriptions on `/`, `/apps`, `/about`, privacy pages | 4 | 3 | 4 | 2 | 1 | **24.0** | ✅ Implemented |
| 3 | `metadataBase` + canonical + Open Graph / Twitter + default OG image | 3 | 3 | 5 | 2 | 1 | **22.5** | ✅ Implemented |
| 4 | Stop returning 500 for unknown URLs | 4 | 1 | 5 | 1 | 1 | **20.0** | ✅ Implemented |
| 5 | `sitemap.ts` + `Sitemap:` directive in robots.txt | 4 | 1 | 5 | 1 | 1 | **20.0** | ✅ Implemented |
| 6 | Search Console + Bing Webmaster + privacy-friendly analytics | 3 | 2 | 5 | 2 | 1 | **15.0** | Needs your action |
| 7 | Product pages at `/apps/[slug]` | 5 | 5 | 4 | 4 | 2 | **12.5** | Needs approval |
| 8 | `SoftwareApplication` structured data on product pages | 2 | 2 | 4 | 2 | 1 | **8.0** | Blocked by #7 |
| 9 | Locale URLs (`/ko`, `/ja`) + hreflang | 5 | 4 | 4 | 5 | 3 | **5.3** | **Needs approval — highest ceiling** |
| 10 | Two content pages targeting validated problem queries | 4 | 4 | 3 | 4 | 3 | **4.0** | After #6 validates demand |
| 11 | Resolve the orphan `/privacy/gandancam` | 1 | 1 | 4 | 1 | 1 | **4.0** | Needs your decision |

---

## Implemented now (no deployment)

All changes are local, type-checked and production-built. **Nothing has been deployed.**

### Fix: unknown URLs returned 500 → now 404

**Root cause (confirmed, not inferred).** Reproduced on a local production build; the server logged
`digest: 'DYNAMIC_SERVER_USAGE'`.

`app/[slug]/page.tsx` has `generateStaticParams`, so Next.js treats it as a statically generated
route. The root layout calls `getCurrentLocale()` → `cookies()`, which a static render may not do.
Any slug outside `generateStaticParams` — that is, every unknown URL on the site — threw during
render and ended as a 500. `/privacy/[slug]` was unaffected only because it already declares
`export const dynamic = "force-dynamic"`.

My first guess in the audit was Vercel Blob throwing. That was wrong; the build log settled it.

Fixes applied:
- `export const dynamic = "force-dynamic"` on `app/[slug]/page.tsx`, matching `/privacy/[slug]` and
  for the same stated reason — the locale cookie has to apply per request.
- Added `app/not-found.tsx`. The project had no 404, error or global-error boundary at all, so there
  was nothing to render even once the throw was gone.
- Made the public page-list reads fail soft in `lib/pages.ts`: a nav menu or custom-page lookup that
  cannot reach storage should degrade to "no pages" rather than take the response to 500. Errors are
  logged so the failure stays visible. Admin writes keep their strict behaviour.

**Verified on a local production build:** `/nonexistent-page-xyz`, `/foo.xml`, `/apps/kanji2136` and
`/privacy/notanapp` all return 404; `/`, `/apps`, `/about`, both privacy pages, `/sitemap.xml` and
`/robots.txt` all return 200; zero server errors in the log.

**Verify:** `curl -o /dev/null -w '%{http_code}' https://www.watanid.com/does-not-exist` → expect 404.

### Add: sitemap

- `app/sitemap.ts` generates `/sitemap.xml` from the live app list and privacy slugs.
- Excludes `/k2136` (intentionally `noindex`) and `/admin`.
- `public/robots.txt` now carries a `Sitemap:` directive. Existing directives kept as-is.

**Verify:** `curl https://www.watanid.com/sitemap.xml` → 200, valid XML, no `/k2136` or `/admin`.

### Add: metadata foundation

- `metadataBase: https://www.watanid.com` in the root layout — without it Next.js cannot resolve
  relative OG image paths, which is why no page except `/k2136` had a usable preview.
- Default Open Graph + Twitter card for the whole site, with a generated 1200×630 image.
- Self-referencing canonicals on `/`, `/apps`, `/about` and every privacy page.
- Titles and descriptions rewritten to name the actual products instead of "a minimal brand hub".

**Verify:** fetch any page and confirm `<link rel="canonical">` and `og:image` with an absolute URL.

---

## Needs your approval before I proceed

### #1 — Glassframe store link (small, but not purely technical)

Glassframe's Chrome Web Store listing is **live and returns 200**, but `data/apps.json` has empty
store fields, so `StoreBadgeLinks` returns `null` and the card shows **no download button at all**.
Visitors who reach the card cannot install it.

This is not a one-line content fix: `StoreBadgeLinks` only understands Play and App Store badges.
Supporting Chrome needs a `chromeStoreUrl` field on `AppRecord`, a badge asset, and a matching field
in the admin form. Small, but it changes a data shape and the admin UI — your call.

### #7 — Product pages

The highest-value structural gap. Today each product's only indexable page is its privacy policy.
A real page per app (what it does, who for, screenshots, store buttons, honest feature list) is what
would actually rank and convert. `app/apps/[slug]/` already exists as an empty directory, and the
cards already link to `/privacy/<slug>` — so this also fixes the 404s.

This is a positioning change as much as an SEO one, so per your brief I am presenting rather than
building it.

### #9 — Locale URLs

See `INTERNATIONAL_SEO.md`. Korean and Japanese copy is already written and is currently unreachable
by any crawler. This has the largest ceiling of anything in this audit and the largest blast radius:
routing, every `generateMetadata`, the language switcher, and all internal links.

### #11 — Orphan page

`/privacy/gandancam` is live and crawlable but the app was removed from the list. Options: keep it
(policies often must outlive the product), `noindex` it, or 410 it. I have left it untouched — a
privacy policy is a legal document and removing one is your decision, not mine.

---

## Explicitly not done

- No FAQ schema. The pages have no FAQ content; adding it to chase rich results is exactly what the
  brief rules out.
- No new dependencies.
- No paid services.
- No generated keyword pages.
- No changes to `/k2136` — it is already correct.
- No deployment.

## Changed files

| File | Change |
|---|---|
| `app/not-found.tsx` | **new** — 404 boundary |
| `app/sitemap.ts` | **new** — generated sitemap |
| `app/layout.tsx` | `metadataBase`, default title/description, OG + Twitter defaults |
| `app/page.tsx` | metadata + canonical |
| `app/apps/page.tsx` | title, description, canonical |
| `app/about/page.tsx` | title, description, canonical |
| `app/privacy/[slug]/page.tsx` | description + canonical |
| `lib/pages.ts` | fail-soft public reads |
| `app/[slug]/page.tsx` | `force-dynamic` — the actual 500 fix |
| `lib/site-url.ts` | **new** — single canonical origin constant |
| `public/robots.txt` | `Sitemap:` directive |
| `public/og/default.png` | **new** — 1200×630 site OG image |
| `scripts/make-og-default.py` | **new** — regenerates the above |
| `seo/*.md` | **new** — these seven documents |
