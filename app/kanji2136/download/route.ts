/**
 * QR code landing page: https://www.watanid.com/kanji2136/download/
 *
 * The printed QR points here, so this URL must keep working. Plain HTML with
 * both store buttons; Next's default trailing-slash redirect handles the `/`.
 */
export const dynamic = "force-static";

const HTML = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#f8f7f3"><title>Kanji 2136 — Download</title><style>body{font-family:system-ui,-apple-system,sans-serif;background:#f8f7f3;color:#222;margin:0;display:grid;min-height:100vh;place-items:center}.card{max-width:430px;padding:38px 26px;text-align:center}h1{font-size:38px;letter-spacing:-1.5px;margin:0 0 12px}.kanji{font-size:72px;margin:0;color:#ab8d4b}.sub{color:#666;line-height:1.6}.btn{display:block;margin:14px auto;padding:18px 20px;background:#202020;color:white;border-radius:15px;text-decoration:none;font-weight:650}.btn.alt{background:white;color:#202020;border:1px solid #d9d9d9}.foot{font-size:12px;color:#888;margin-top:30px}</style></head><body><main class="card"><div class="kanji">漢</div><h1>Kanji 2136</h1><p class="sub">Learn 2,136 Japanese kanji, vocabulary and example sentences. Free to download.</p><a class="btn" href="https://play.google.com/store/apps/details?id=com.kanji2136.app">Get it on Google Play</a><a class="btn alt" href="https://apps.apple.com/us/app/kanji-2136-learn-japanese/id6762960703">Download on the App Store</a><p class="foot">Free basic features · Ads and optional purchases · © Watanid</p></main></body></html>`;

export function GET(): Response {
  return new Response(HTML, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
