# Measurement Plan

## Starting position: nothing is measured

The site has **no analytics and no Search Console property** (verified — no GA/GTM/Plausible/Umami/
`@vercel/analytics` in the source, and no verification token). There is no historical baseline for
traffic, rankings or store clicks, and none can be reconstructed.

**Everything below starts from zero on the day it is installed.** Set this up before writing content,
or you will be guessing about which of the keyword hypotheses were right.

## Step 1 — Search Console and Bing (free, ~20 minutes)

1. Add `https://www.watanid.com` to [Google Search Console](https://search.google.com/search-console).
   Prefer DNS verification on the domain property so apex and www are covered together.
2. Submit `https://www.watanid.com/sitemap.xml` (exists once the implemented changes deploy).
3. Repeat in [Bing Webmaster Tools](https://www.bing.com/webmasters) — it can import from GSC.
4. Use the URL Inspection tool on `/` and one privacy page to confirm what Google actually renders.

Search Console backfills nothing, so the clock starts at verification. This is the single highest
-value unblocking step in the whole audit: without it, the keyword research stays a hypothesis.

## Step 2 — Privacy-conscious analytics

Recommended: **Vercel Web Analytics** — already on the hosting plan, no cookies, no personal data,
one component, included on Hobby with no new vendor. The alternative is self-hosted Plausible or
Umami, which costs money or a server for no benefit at this scale.

Avoid Google Analytics here. It needs a consent banner in the EU and collects far more than this
site needs, which also conflicts with the privacy posture the apps are marketed on.

## Step 3 — Outbound store clicks

This is the conversion event that matters, and nothing records it today. Track clicks on the
App Store, Google Play and Chrome Web Store links as custom events. Record only: product slug,
destination store, page the click came from. No user identifiers.

For installs, the attribution already exists and is unused:
- **Google Play** — `/k2136` sends `utm_source=instagram&utm_medium=paid&utm_campaign=<code>` via the
  install referrer. Read it in Play Console → Acquisition reports.
- **App Store** — `/k2136` sends `?ct=<code>`. Read it in App Store Connect → App Analytics → Campaigns.
- **Organic store pages** — use a distinct campaign token on store links from the website so website
  referrals are separable from paid Instagram traffic. Not currently done.

## Metrics to watch

| Metric | Source | Why |
|---|---|---|
| Indexed pages | GSC Coverage | Direct read on whether the sitemap and 404 fixes worked |
| 5xx crawl errors | GSC Crawl Stats | Should drop to zero after the 500→404 fix |
| Organic impressions | GSC | Earliest signal of visibility |
| **Non-branded clicks** | GSC, excluding `watanid` | The real number. Branded clicks mostly mean people who already knew you. |
| Query list by country | GSC | Validates or kills the KR/JP keyword hypotheses |
| Average position per query | GSC | Shows movement before clicks appear |
| Organic landing-page sessions | Vercel Analytics | Which pages actually earn entries |
| Store outbound clicks per product | Custom event | Conversion |
| Installs by campaign | Play Console / ASC | End of the funnel |

## Review cadence

| When | What |
|---|---|
| Week 1 | Verify indexing recovered: sitemap accepted, 0 server errors, pages indexed rising |
| Week 4 | First real query data. Compare against `KEYWORD_RESEARCH.md` — **delete the hypotheses that produced no impressions** |
| Week 8 | Decide on locale URLs and product pages using evidence rather than this audit's assumptions |
| Quarterly | Re-check competitor positioning |

## Honest expectations

A new or barely-indexed site does not rank quickly. Indexing improves in days to weeks; meaningful
non-branded clicks take months, and only for queries where the content genuinely deserves to win.

The fastest measurable win here is not a ranking at all — it is **adding the missing Glassframe
download button**, which converts traffic the site already receives.
