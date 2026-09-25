import type { NextRequest } from "next/server";

/**
 * Smart link for Instagram ads: /k2136?c=<campaign>
 *
 * Android  -> Play Store (302, with install referrer)
 * iOS      -> App Store  (302, with ?ct=<campaign>)
 * Anything else, incl. Meta crawlers -> 200 landing page with both buttons.
 *
 * Edge runtime keeps the redirect hop cheap and close to the user (ads run in
 * KR / VN / ID / TH). Nothing here touches Vercel Blob, so it costs no Blob ops.
 */
export const runtime = "edge";
export const dynamic = "force-dynamic";

const APP_NAME = "Kanji 2136";
const APP_TAGLINE = "Learn all 2,136 Jōyō kanji — readings, meanings, and stroke order.";

const ANDROID_PACKAGE = "com.kanji2136.app";
const APP_STORE_ID = "6762960703";

const PLAY_BASE = `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}`;
const APP_STORE_BASE = `https://apps.apple.com/app/id${APP_STORE_ID}`;

/** Lowercase letters, digits and hyphens only; anything else is dropped. */
function sanitizeCampaign(raw: string | null): string {
  if (!raw) return "direct";
  const cleaned = raw.toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 64);
  return cleaned || "direct";
}

/** Play install referrer — the whole value is URL-encoded as one parameter. */
function playUrl(campaign: string): string {
  const referrer = `utm_source=instagram&utm_medium=paid&utm_campaign=${campaign}`;
  return `${PLAY_BASE}&referrer=${encodeURIComponent(referrer)}`;
}

function appStoreUrl(campaign: string): string {
  return `${APP_STORE_BASE}?ct=${encodeURIComponent(campaign)}`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Absolute URL of this request, preferring the proxy headers Vercel sets. */
function canonicalUrl(request: NextRequest, campaign: string): string {
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") ?? "https";
  const base = host ? `${proto}://${host}` : new URL(request.url).origin;
  return `${base}/k2136?c=${campaign}`;
}

function landingPage(campaign: string, url: string): string {
  const play = escapeHtml(playUrl(campaign));
  const app = escapeHtml(appStoreUrl(campaign));
  const ogUrl = escapeHtml(url);

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${APP_NAME}</title>
<meta name="description" content="${APP_TAGLINE}">
<meta property="og:type" content="website">
<meta property="og:title" content="${APP_NAME}">
<meta property="og:description" content="${APP_TAGLINE}">
<meta property="og:url" content="${ogUrl}">
<style>
  *, *::before, *::after { box-sizing: border-box; }
  body {
    margin: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: #fff;
    color: #000;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  main { width: 100%; max-width: 420px; text-align: center; }
  h1 { margin: 0; font-size: 34px; line-height: 1.15; font-weight: 600; letter-spacing: -0.02em; }
  p { margin: 12px 0 0; font-size: 16px; line-height: 1.5; color: rgba(0, 0, 0, 0.6); }
  .buttons { margin-top: 32px; display: flex; flex-direction: column; gap: 12px; }
  a.btn {
    display: block;
    padding: 16px 20px;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    text-decoration: none;
    border: 1px solid #000;
  }
  a.play { background: #000; color: #fff; }
  a.ios { background: #fff; color: #000; }
  @media (min-width: 420px) {
    .buttons { flex-direction: row; }
    a.btn { flex: 1; }
  }
</style>
</head>
<body>
<main>
  <h1>${APP_NAME}</h1>
  <p>${APP_TAGLINE}</p>
  <div class="buttons">
    <a class="btn play" href="${play}">Google Play</a>
    <a class="btn ios" href="${app}">App Store</a>
  </div>
</main>
</body>
</html>`;
}

/** Responses vary by User-Agent, so they must never be cached or indexed. */
const BASE_HEADERS = {
  "Cache-Control": "no-store, max-age=0",
  Vary: "User-Agent",
  "X-Robots-Tag": "noindex, nofollow",
};

export async function GET(request: NextRequest) {
  const campaign = sanitizeCampaign(request.nextUrl.searchParams.get("c"));
  const ua = request.headers.get("user-agent") ?? "";

  // Meta's ad-review crawler must see the landing page, never a redirect.
  const isMetaCrawler = /facebookexternalhit|Facebot/i.test(ua);

  // Instagram / Facebook in-app browsers keep the platform token in the UA
  // ("... Android ... Instagram", "... iPhone ... [FBAN/FBIOS]"), so these
  // plain checks cover the in-app cases too.
  const isAndroid = !isMetaCrawler && /Android/i.test(ua);

  // iPadOS 13+ Safari reports itself as Macintosh; that falls through to the
  // landing page on purpose rather than guessing.
  const isIOS = !isMetaCrawler && /iPhone|iPod|iPad/i.test(ua);

  if (isAndroid) {
    return new Response(null, {
      status: 302,
      headers: { ...BASE_HEADERS, Location: playUrl(campaign) },
    });
  }

  if (isIOS) {
    return new Response(null, {
      status: 302,
      headers: { ...BASE_HEADERS, Location: appStoreUrl(campaign) },
    });
  }

  return new Response(landingPage(campaign, canonicalUrl(request, campaign)), {
    status: 200,
    headers: { ...BASE_HEADERS, "Content-Type": "text/html; charset=utf-8" },
  });
}
