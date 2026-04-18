import Image from "next/image";
import type { Locale } from "@/lib/i18n-messages";
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
  const showBadges = hasVisibleStoreLinks(app.playStoreUrl, app.appStoreUrl);

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

      <div
        className={[
          "flex flex-col px-6 pb-7 pt-7 md:px-8 md:pb-9 md:pt-9",
          featured ? "md:px-10 md:pb-10 md:pt-10" : "",
        ].join(" ")}
      >
        <div className="min-w-0">
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
        </div>
        {showBadges ? (
          <div className="mt-6 flex w-full shrink-0 justify-end">
            <StoreBadgeLinks
              variant="compact"
              playStoreUrl={app.playStoreUrl}
              appStoreUrl={app.appStoreUrl}
            />
          </div>
        ) : null}
      </div>
    </article>
  );
}
