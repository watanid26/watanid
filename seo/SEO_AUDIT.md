# Technical SEO Audit

**Audited:** 2026-10-09 · Live production, not only source.

## Evidence tiers

Findings are labelled: **[V]** verified against production or source · **[O]** publicly observable,
not authoritative · **[E]** estimate · **[H]** hypothesis.

## Data I could not obtain

- **Google Search Console** — not connected; no verification token in the repo. No impressions,
  clicks, CTR, average position, query, country or device data is available. Nothing in this
  document should be read as a traffic measurement.
- **Analytics** — the site has none (no GA, GTM, Plausible, Umami or `@vercel/analytics`). There is
  no record of sessions, landing pages or outbound store clicks, historical or current.
- **Regional SERPs** — the search tooling available here is US-biased, so Korean and Japanese
  result pages could not be observed directly. All KR/JP keyword judgements below are qualitative.

I have not estimated search volume, keyword difficulty or traffic anywhere in these documents.

---

## Critical findings

### C1 — Unknown URLs return HTTP 500, not 404 **[V]**

```
https://www.watanid.com/sitemap.xml          → 500
https://www.watanid.com/nonexistent-page-xyz → 500
https://www.watanid.com/foo.xml              → 500
(same paths on local dev                     → 404)
```

The body is Next.js's built-in static *500: Internal Server Error* page.

`app/[slug]/page.tsx` catches every unmatched path. It calls `readAllPages()` → `getPages()` →
`lib/storage.ts`, which in production takes the Vercel Blob path. `readBlobJson` is documented to
throw on any network, HTTP or JSON failure with no fallback. There is **no `app/not-found.tsx`,
`app/error.tsx` or `app/global-error.tsx`** in the project, so nothing catches it and the request
ends as a 500.

Why it matters: a 500 tells Google "the server is broken, come back later." It retries, which burns
crawl budget, and sustained 5xx responses cause Google to slow crawling of the whole host. A 404
tells it to drop the URL. Pinning the exact throw needs the Vercel runtime logs, but the fix holds
either way.

### C2 — No sitemap **[V]**

No `app/sitemap.ts`, no `public/sitemap.xml`. `/sitemap.xml` 500s (see C1). `robots.txt` contains no
`Sitemap:` directive. Google has no list of the site's URLs and must discover everything by crawling.

### C3 — Korean and Japanese content is invisible to search engines **[V]**

`lib/i18n.ts`:

```ts
export async function getCurrentLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get("watanid_locale")?.value;
  return value && isLocale(value) ? value : "en";
}
```

Locale comes only from a cookie set client-side by `components/LanguageSwitcher.tsx`. One URL serves
three languages. Googlebot sends no cookie, so it always receives `<html lang="en">` — confirmed by
fetching `/` and `/apps` with a Googlebot user agent.

Consequences:
- Every Korean and Japanese translation on the site is **unreachable by any search engine**. The
  ko/ja privacy policies, app descriptions and about copy cannot rank for anything, in any market.
- `hreflang` is impossible to implement — it requires a distinct URL per language.
- This is the single largest organic limitation on the site, and it blocks the two markets the brief
  prioritises.

### C4 — No product pages **[V]**

`app/apps/[slug]/` is an empty directory. `/apps/kanji2136` and `/apps/glassframe` both return 404.
The `/apps` cards link to `/privacy/<slug>` instead.

So the only indexable page per product is its privacy policy. Those pages legitimately rank for
nothing commercial, and a visitor who lands on one sees legal text, not the product.

### C5 — No canonical, Open Graph or Twitter tags anywhere **[V]**

`grep` for `metadataBase`, `alternates`, `canonical` across `app/` and `lib/` returns nothing.
Fetching `/` as Googlebot returns no `og:` or `twitter:` meta tags at all.

- Without `metadataBase`, Next.js cannot resolve relative OG image paths, so social and chat
  previews for every page except `/k2136` are bare.
- Without canonicals, the apex→www redirect and any future query-string variants risk duplicate URLs.
- `/k2136` is the only page with OG tags, and it is deliberately `noindex`.

---

## Page-level findings

| Page | Status | Title | Description | H1 | Verdict |
|---|---|---|---|---|---|
| `/` | 200 **[V]** | `Watanid` | "What I need — a minimal brand hub." | `Watanid` | No product or category term anywhere. Cannot rank for intent. |
| `/apps` | 200 **[V]** | `Apps · Watanid` | *(none)* | `All Apps` | Generic. Product names render server-side, which is good. |
| `/about` | 200 **[V]** | `About · Watanid` | *(none)* | — | Thin for search; fine as a trust page. |
| `/privacy/<slug>` | 200 **[V]** | `<App> — Privacy Policy · Watanid` | *(none)* | App name | Correctly `index: true`, but doing the job a product page should do. |
| `/apps/<slug>` | **404** **[V]** | — | — | — | Route does not exist. |
| `/k2136` | 302/200 by UA **[V]** | `Kanji 2136` | present | — | Correct: `noindex`, `no-store`, `Vary: User-Agent`. No change needed. |

## What is already correct **[V]**

- Content is server-rendered. Product names and copy are in the initial HTML — no JS execution
  needed for Google to read them. Verified with a Googlebot user agent.
- TTFB ≈ 0.25 s and HTML payloads of 13–38 KB across all pages.
- `next/image` is used in `AppCard`, `AboutContent`, `BrandHeroMedia` and `StoreBadgeLinks`, so
  large source files (`Colorz.png` 1.1 MB, `logo2.png` 1.4 MB) are resized and served as WebP/AVIF
  rather than shipped raw.
- `robots.txt` allows crawling and does not block anything important.
- `/k2136` is correctly excluded from the index.
- Viewport and `theme-color` are set; `maximumScale: 5` does not block pinch-zoom.

## Lower-priority findings

| ID | Finding | Evidence |
|---|---|---|
| L1 | `/privacy/gandancam` is an orphan — the app was removed from the list but the policy is still live, crawlable and linked from nothing. | **[V]** |
| L2 | No structured data. `SoftwareApplication` is well supported by Google and matches the actual page content once product pages exist. | **[V]** |
| L3 | No `app-ads.txt` equivalent issue, but `public/app-ads.txt` is served and fine. | **[V]** |
| L4 | No default OG image for the site; only `/k2136` has one. | **[V]** |
| L5 | `data/apps.json` has empty store URLs for Glassframe and GlanceMemo, so their cards render no download button (`StoreBadgeLinks` returns `null` when both are empty). Glassframe's Chrome Web Store listing is live and returns 200. | **[V]** |
| L6 | Root `layout.tsx` calls `getMenuPages()` on every request, which hits Vercel Blob (`list()` — an Advanced Operation). The Hobby plan allows 2,000/month. Currently harmless because the blob holds no data, but it is on the path of every page render. | **[V]** |

## Indexing status **[O]**

`site:watanid.com` returned no watanid.com URLs through either the web search tool or Bing. Bing
reported a result count of ~2.09 M while displaying no pages from the domain, which is a well-known
artefact of `site:` queries and not a measurement.

**Interpretation [H]:** combined with C1 (5xx on unknown URLs), C2 (no sitemap) and the absence of
any Search Console property, the site is most likely barely indexed or not indexed at all. This
cannot be confirmed without Search Console access — that is the first thing to set up.
