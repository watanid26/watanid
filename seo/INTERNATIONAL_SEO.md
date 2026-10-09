# International SEO

## Current state **[verified]**

| Check | Result |
|---|---|
| Localized URLs | **None.** One URL serves en/ko/ja. |
| Locale signal | `watanid_locale` cookie only, read in `lib/i18n.ts`, default `en` |
| What Googlebot receives | `<html lang="en">` on every page, always — confirmed by fetching `/` and `/apps` with a Googlebot UA |
| hreflang | **Not implemented, and not implementable** on the current URL scheme |
| x-default | Not applicable yet |
| Canonical | Not implemented anywhere |
| Translation quality | Good. ko/ja copy is idiomatic and uses correct platform terminology — it is simply unreachable. |

## The core problem

Three languages of content exist and none of the non-English content can be crawled.

`hreflang` annotations require one URL per language version. Cookie-switched content on a single URL
gives search engines nothing to annotate, and Google's own guidance is explicit that
dynamically-swapped content on one URL is not a supported way to serve multiple languages — it
recommends a distinct URL per locale.

The brief prioritises Korea and Japan. Those are precisely the two markets currently receiving zero
crawlable content.

## Recommended structure

Subdirectory locales on the existing domain — the standard Next.js App Router pattern, no extra
hosting cost, and all authority stays on one domain.

```
/              → English (x-default)
/ko/...        → Korean
/ja/...        → Japanese
```

Implementation outline:

1. Add a `[locale]` segment, or keep `/` as English and add `/ko` + `/ja` route groups.
2. Replace `getCurrentLocale()`'s cookie read with the URL segment. **Keep the cookie** — but demote
   it to a redirect hint for first-time human visitors, never as the content source.
3. Emit `alternates.languages` from `generateMetadata` on every page, plus `x-default` → the English
   URL.
4. Ensure each localized URL self-canonicalises (`/ko/apps` canonical → `/ko/apps`, **not** `/apps`).
   A canonical pointing at the English version would undo the whole exercise.
5. List all locale variants in the sitemap.

### Critical pitfall to avoid

Do **not** auto-redirect by `Accept-Language` without an escape hatch. Googlebot crawls from US IPs
with `Accept-Language: en`; if a redirect forces it to `/` every time, `/ko` and `/ja` never get
indexed — the same failure as today in a new form. Serve each locale URL directly, always, to
everyone.

## Market notes

| Market | Priority | Rationale |
|---|---|---|
| Korea | **High** | Kanji 2136's natural audience; `일본 상용한자` phrasing is near-exact to the product name and the global competitors are optimising in English. Korean copy already written. |
| Japan | **High** | Both Kanji 2136 and Glassframe have plausible JP demand; `常用漢字 アプリ` is a real commercial term. Japanese copy already written. |
| English | Medium | Largest market, but the most contested for both products. Best entry is the long-tail problem queries (e.g. `chrome pip disappears in fullscreen`), not head terms. |

Note that Naver matters for Korean search alongside Google. The same fix — real URLs with real
server-rendered content — is what both need; no Naver-specific work is required first.

## Sequencing

Translating or writing new localized pages **before** the URL change wastes the work, because none
of it can be crawled. Order: locale URLs → hreflang → sitemap with alternates → then content.

## Scope warning

This is an architectural change touching routing, every `generateMetadata`, the language switcher
and all internal links. It is the highest-impact item in this audit and the only one I am **not**
implementing without explicit approval, per the brief's instruction to present major positioning
changes first.
