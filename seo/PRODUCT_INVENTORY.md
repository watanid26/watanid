# Product Inventory

**Audited:** 2026-10-09 · **Site:** https://www.watanid.com · **Repo:** watanid26/watanid

## Architecture (verified from source + live responses)

| Aspect | Finding |
|---|---|
| Framework | Next.js 14.2.18, App Router |
| Hosting | Vercel (GitHub `main` → auto-deploy) |
| Rendering | Server-rendered on demand (`ƒ`) for `/`, `/apps`, `/about`; SSG for `/privacy/[slug]`, `/[slug]` |
| Content source | `data/apps.json` in the repo (Vercel Blob is configured but holds no app data — production reads the committed file) |
| Languages | en, ko, ja |
| Locale mechanism | **Cookie only** (`watanid_locale`), read server-side in `lib/i18n.ts`. No locale in the URL. |
| Canonical host | `www.watanid.com` (apex `watanid.com` → 307 → www) |
| Analytics | **None** |
| Search Console | **Not verified** (no verification meta tag or file in the repo) |
| Sitemap | **None** |
| Structured data | **None** |

## Inventory

| Product | URL | Lang | Indexable | SEO status | Conversion goal |
|---|---|---|---|---|---|
| Watanid (home) | `/` | en only to crawlers | Yes | Title `Watanid`, desc "a minimal brand hub" — no product terms | Route to `/apps` |
| App list | `/apps` | en only to crawlers | Yes | Title `Apps · Watanid`, no description | Store clicks |
| About | `/about` | en only to crawlers | Yes | Title `About · Watanid`, no description | Brand trust |
| **Kanji 2136** | *(no page)* → `/privacy/kanji2136` | en only | Yes | Only a privacy policy ranks for this product | iOS + Play installs |
| **Glassframe** | *(no page)* → `/privacy/glassframe` | en only | Yes | Same | Chrome Web Store + Mac installs |
| ColorzCam | *(no page)* → `/privacy/colorzcam` | en only | Yes | Same | iOS installs |
| GlanceMemo | *(no page)* → `/privacy/glancememo` | en only | Yes | Same | None configured |
| Luna Mirror | — | — | No (`status: draft`) | Hidden from `/apps` | — |
| Gandan Cam | `/privacy/gandancam` | en only | Yes | **Orphan** — removed from the app list, policy still live and crawlable | — |
| Smart link | `/k2136` | en | **No** (`noindex`, intentional) | Correct — ad landing, not organic | Store clicks |

## Store presence (verified live, HTTP 200)

| Product | Store | Linked from site? |
|---|---|---|
| Kanji 2136 | [App Store](https://apps.apple.com/app/id6762960703) · [Google Play](https://play.google.com/store/apps/details?id=com.kanji2136.app) | Yes |
| ColorzCam | [App Store](https://apps.apple.com/kr/app/colorzcam/id6755992162) | App Store only |
| **Glassframe** | [Chrome Web Store](https://chromewebstore.google.com/detail/dlbafepehoeneoocijhkogbkcdgmekpi) — **live** | **No — store fields are empty in `data/apps.json`, so the card shows no download button** |
| GlanceMemo | — | No |

## The structural problem

There is **no product page for any app**. `app/apps/[slug]/` exists as an empty directory, so every
`/apps/<slug>` URL returns 404 (verified). The app cards on `/apps` link to `/privacy/<slug>`.

The consequence: the only indexable page per product is its **privacy policy** — a page written for
legal review, with no feature description, no screenshots, no store buttons and no purchase intent.
Every product in the catalogue is competing in search with its own legal boilerplate.
