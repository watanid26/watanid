import Image from "next/image";
import Link from "next/link";
import { getMessages, type Locale } from "@/lib/i18n-messages";
import { getAppCopy } from "@/lib/apps";
import type { AppRecord } from "@/lib/types";
import { StoreBadgeLinks } from "@/components/StoreBadgeLinks";
import { hasVisibleStoreLinks } from "@/lib/store-links";

export function AppCard({
  app,
  locale,
  featured = false,
}: {
  app: AppRecord;
  locale: Locale;
  featured?: boolean;
}) {
  const copy = getAppCopy(app, locale);
  const t = getMessages(locale);
  const showBadges = hasVisibleStoreLinks(app.playStoreUrl, app.appStoreUrl);
  const privacyHref = `/privacy/${app.slug}`;

  return (
    <article
      className={[
        "group relative overflow-hidden rounded-[1.75rem] bg-white",
        "shadow-[0_2px_32px_-8px_rgba(0,0,0,0.08)]",
        "transition-[transform,box-shadow] duration-300 ease-out will-change-transform",
        "hover:-translate-y-1 hover:shadow-[0_14px_44px_-14px_rgba(0,0,0,0.14)]",
        "md:rounded-[2rem]",
      ].join(" ")}
    >
      <Link
        href={privacyHref}
        aria-label={`${copy.title} — ${t.apps.privacyAria}`}
        className="block cursor-pointer"
      >
        <div
          className={[
            "relative w-full overflow-hidden bg-stone-100/90",
            featured ? "aspect-[21/10] md:aspect-[24/10]" : "aspect-[3/4] md:aspect-[4/5]",
          ].join(" ")}
        >
          <div
            className={[
              "absolute inset-0 transition-transform duration-500 ease-out will-change-transform",
              "group-hover:scale-[1.03] motion-reduce:transform-none",
            ].join(" ")}
          >
            <div
              className={[
                "absolute inset-0",
                featured ? "p-4 md:p-8 lg:p-10" : "p-5 md:p-7",
              ].join(" ")}
            >
              <div className="relative h-full w-full min-h-0">
                <Image
                  src={app.thumbnail}
                  alt=""
                  fill
                  className="object-contain object-center drop-shadow-sm"
                  sizes={
                    featured
                      ? "(max-width:768px) 100vw, min(1200px, 90vw)"
                      : "(max-width:768px) 100vw, 42rem"
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </Link>

      <div
        className={[
          "flex flex-col px-6 pb-7 pt-7 md:px-8 md:pb-9 md:pt-9",
          featured ? "md:px-10 md:pb-10 md:pt-10" : "",
        ].join(" ")}
      >
        <Link href={privacyHref} className="group/text block min-w-0 cursor-pointer">
          <h3
            className={[
              "font-semibold tracking-tight text-stone-900",
              featured
                ? "text-3xl md:text-4xl lg:text-[2.5rem] leading-[1.1]"
                : "text-2xl md:text-3xl leading-tight",
            ].join(" ")}
          >
            {copy.title}
          </h3>
          <p
            className={[
              "mt-3 text-[15px] leading-relaxed text-stone-600 md:text-base",
              featured ? "mt-4 max-w-2xl" : "mt-3",
            ].join(" ")}
          >
            {copy.description}
          </p>
        </Link>
        {showBadges ? (
          <div className="relative z-10 mt-6 flex w-full shrink-0 justify-end">
            <StoreBadgeLinks
              variant="compact"
              playStoreUrl={app.playStoreUrl}
              appStoreUrl={app.appStoreUrl}
            />
          </div>
        ) : null}
        <Link
          href={privacyHref}
          className="mt-4 cursor-pointer text-xs uppercase tracking-[0.2em] text-stone-400 transition-colors hover:text-stone-700"
        >
          {t.apps.privacyLink} →
        </Link>
      </div>
    </article>
  );
}
