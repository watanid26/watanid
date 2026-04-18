"use client";

import Image from "next/image";
import { isSafeExternalUrl } from "@/lib/store-links";

export { hasVisibleStoreLinks, isSafeExternalUrl } from "@/lib/store-links";

const BADGE_GOOGLE_PLAY = "/images/badge-google-play.png";
const BADGE_APP_STORE = "/images/badge-app-store.png";

export function StoreBadgeLinks({
  playStoreUrl,
  appStoreUrl,
  className = "",
  variant = "default",
}: {
  playStoreUrl?: string;
  appStoreUrl?: string;
  className?: string;
  /** `compact` — smaller badges for app cards (bottom-right) */
  variant?: "default" | "compact";
}) {
  const play = playStoreUrl?.trim() ?? "";
  const app = appStoreUrl?.trim() ?? "";
  const showPlay = play && isSafeExternalUrl(play);
  const showApp = app && isSafeExternalUrl(app);
  if (!showPlay && !showApp) return null;

  const compact = variant === "compact";
  const linkClass = compact
    ? "inline-flex items-center justify-center rounded-xl border border-stone-200/90 bg-white px-2 py-1.5 shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-all duration-300 ease-out hover:border-stone-300 hover:shadow-[0_8px_28px_-12px_rgba(0,0,0,0.12)] active:scale-[0.98]"
    : "inline-flex items-center justify-center rounded-2xl border border-stone-200/90 bg-white px-3 py-2 shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-all duration-300 ease-out hover:border-stone-300 hover:shadow-[0_8px_28px_-12px_rgba(0,0,0,0.12)] active:scale-[0.98] md:px-3.5 md:py-2.5";

  const imgPlay = compact
    ? "h-7 w-auto max-h-7 sm:h-8 sm:max-h-8"
    : "h-9 w-auto max-h-9 md:h-10 md:max-h-10";
  const imgApp = compact
    ? "h-7 w-auto max-h-7 sm:h-8 sm:max-h-8"
    : "h-9 w-auto max-h-9 md:h-10 md:max-h-10";

  return (
    <div
      className={[
        compact
          ? "flex flex-wrap items-center justify-end gap-2 sm:gap-2.5"
          : "flex flex-wrap items-center justify-center gap-4 md:gap-6",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {showPlay ? (
        <a
          href={play}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
          aria-label="Google Play에서 다운로드"
        >
          <Image
            src={BADGE_GOOGLE_PLAY}
            alt=""
            width={135}
            height={40}
            className={`${imgPlay} w-auto object-contain object-center`}
          />
        </a>
      ) : null}
      {showApp ? (
        <a
          href={app}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
          aria-label="App Store에서 다운로드"
        >
          <Image
            src={BADGE_APP_STORE}
            alt=""
            width={120}
            height={40}
            className={`${imgApp} w-auto object-contain object-center`}
          />
        </a>
      ) : null}
    </div>
  );
}
