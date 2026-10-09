# Competitor Analysis

Competitors were identified through live search on 2026-10-09. **No traffic, revenue or conversion
figures are estimated for any competitor** — only what is publicly visible on their pages.

---

## Glassframe — macOS floating / overlay video

| Competitor | What it is | Positioning | Organic strategy |
|---|---|---|---|
| [FullFloatPiP](https://github.com/anlvdt/full-float-pip) | Chrome extension + native macOS app | "The only PiP that works in fullscreen. Perfect for vibe coding." | GitHub repo + a long-form explainer on sigma.me. Developer audience. |
| [Floating: Picture in Picture](https://apps.apple.com/us/app/floating-picture-in-picture/id1508833245?mt=12) | Mac App Store app | Breadth — YouTube, Twitch, Vimeo, PDFs, local files, playlists | App Store search. No content marketing found. |
| [Float](https://www.float.codes/) | Standalone Mac app | Floats a *full browser window*, survives fullscreen and Spaces; opacity, ad blocker, shortcuts | Dedicated marketing site |
| [Floaty](https://www.floatytool.com/) | Mac always-on-top utility | Generic "keep any window on top" | **Strongest content programme** — tutorial posts such as "How to Watch YouTube While Working on Mac" |
| [Picture-in-Picture Extension (Google)](https://chromewebstore.google.com/detail/picture-in-picture-extens/hkgfoiooedgoejojocmhlaklaeopbecg) | Chrome extension | Free, first-party, enormous install base | Chrome Web Store ranking |

### Architecturally closest: FullFloatPiP
Same hybrid design as Glassframe — a Chrome extension for video detection plus a native Swift/AppKit
app for the system-level window. It is open-source and aimed squarely at developers.

### Where Glassframe is genuinely different
1. **Transparency.** Competitors float an *opaque* window. Glassframe's 10–100% opacity overlay lets
   you read through the video. No competitor found leads with this.
2. **Non-Chrome sources.** "Show a Video App…" mirrors QuickTime, IINA, VLC and mpv windows; most
   rivals are browser-only.
3. **Privacy posture.** No accounts, no analytics, no servers, local-only over `127.0.0.1` — and
   this is already documented in detail. Float and Floaty make no comparable claim.

### Where Glassframe is behind
- **No landing page.** Every competitor has one; Glassframe has a privacy policy.
- **Free first-party Chrome PiP** sets the price floor for the basic case. Glassframe must lead with
  what PiP cannot do: survive fullscreen, and be see-through.
- **Mac App Store build is weaker than the direct build** (sandboxing blocks controlling other apps).
  The store page should not promise the direct build's shortcuts.

### Narrower audience worth owning
Developers and writers who work fullscreen in one app and want a *readable-through* video — not
"everyone who wants PiP". That is a smaller claim and a true one.

---

## Kanji 2136 — jōyō kanji learning

| Competitor | Positioning | Notes |
|---|---|---|
| [Kanji360: 2136+ JLPT Kanji](https://apps.apple.com/us/app/kanji360-2136-jlpt-kanji/id1462048926) | Context over drilling — 250+ graded stories, SRS | Closest competitor on the exact "2136" term |
| [Kanji Book](https://apps.apple.com/us/app/kanji-book/id1532844605) | Build your own workbook, visual progress | Free |
| [Asahi Kanji](https://www.japanese-kanji.com/) | All jōyō + 5 JLPT levels, flashcards | Own multilingual site (EN/FR/…) — a working organic playbook |
| [Kanji of the Day](https://play.google.com/store/apps/details?id=com.radiantkit.kanjiotd) | One kanji per day, grade order | Android, habit-forming angle |
| [kanji-pad.app](https://www.kanji-pad.app/kanji) | Free web kanji list with meanings and stroke order | **Ranks on content, not an app** — a reference page competing for app queries |

### Reading of the landscape
The English-language "2136 / jōyō kanji app" space is mature and well-optimised. Asahi Kanji and
kanji-pad show the route in: **a crawlable reference page that is useful on its own** and converts
to an install, rather than a thin app-marketing page.

Kanji 2136's own positioning — "tap a kanji to explore words, example sentences, and connected
kanji" — is a graph/exploration model, which is different from flashcard drilling and from
story-based learning. That difference is not stated anywhere on the website today.

### Narrower audience worth owning
**Korean and Japanese-speaking learners**, where the site has translated copy already written and
competitors are optimising in English. This is unreachable until locale URLs exist (audit C3).

---

## ColorzCam

Competes with a wide field of palette-extraction apps (Adobe Capture and many small iOS utilities).
No defensible organic position is visible without a clearer niche. Recommendation: one honest
product page; do not fund a content programme.
