import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { StoreBadgeLinks } from "@/components/StoreBadgeLinks";
import { getAppCopy } from "@/lib/apps";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n-messages";
import { localeHref } from "@/lib/locale-routing";
import { SITE_URL } from "@/lib/site-url";
import { hasVisibleStoreLinks } from "@/lib/store-links";
import type { AppRecord } from "@/lib/types";

/**
 * Describes the app with `SoftwareApplication`. No `offers` or
 * `aggregateRating`: prices and ratings are not recorded anywhere in this
 * project, and inventing them to win a rich result would be a lie to Google.
 */
function structuredData(app: AppRecord, locale: Locale, name: string, description: string) {
  const platforms = [
    app.appStoreUrl ? "iOS" : null,
    app.playStoreUrl ? "Android" : null,
    app.chromeStoreUrl ? "Chrome" : null,
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url: `${SITE_URL}${localeHref(locale, `/apps/${app.slug}`)}`,
    image: `${SITE_URL}${app.thumbnail}`,
    applicationCategory: "UtilitiesApplication",
    ...(platforms.length > 0 ? { operatingSystem: platforms.join(", ") } : {}),
    author: { "@type": "Organization", name: "Watanid", url: SITE_URL },
  };
}

export function AppDetailView({
  app,
  locale,
}: {
  app: AppRecord | undefined;
  locale: Locale;
}) {
  if (!app || app.status !== "published") notFound();

  const t = getMessages(locale);
  const copy = getAppCopy(app, locale);
  const features = app[locale]?.features ?? [];
  const showStores = hasVisibleStoreLinks(
    app.playStoreUrl,
    app.appStoreUrl,
    app.chromeStoreUrl,
  );

  return (
    <section className="bg-[#fafaf9] py-20 text-stone-900 md:py-28">
      <Container>
        <Link
          href={localeHref(locale, "/apps")}
          className="text-sm text-stone-500 transition-colors hover:text-stone-900"
        >
          {t.appsDetail.backToAll}
        </Link>

        <header className="mt-10 flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-[1.5rem] md:h-36 md:w-36">
            <Image
              src={app.thumbnail}
              alt=""
              fill
              className="object-contain object-center"
              sizes="144px"
            />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-stone-400">
              {app.category ?? t.appsDetail.defaultCategory}
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              {copy.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-stone-600 md:text-lg">
              {copy.description}
            </p>
          </div>
        </header>

        {features.length > 0 ? (
          <div className="mt-16 max-w-2xl">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.28em] text-stone-400">
              {t.appsDetail.aboutThisProject}
            </h2>
            <ul className="mt-6 space-y-3">
              {features.map((f) => (
                <li
                  key={f}
                  className="flex gap-3 text-base leading-relaxed text-stone-700"
                >
                  <span aria-hidden="true" className="text-stone-300">
                    —
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {showStores ? (
          <div className="mt-16">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.28em] text-stone-400">
              {t.appsDetail.availableOn}
            </h2>
            <div className="mt-6 flex justify-start">
              <StoreBadgeLinks
                playStoreUrl={app.playStoreUrl}
                appStoreUrl={app.appStoreUrl}
                chromeStoreUrl={app.chromeStoreUrl}
              />
            </div>
          </div>
        ) : null}

        <div className="mt-16 border-t border-stone-200 pt-8">
          <Link
            href={localeHref(locale, `/privacy/${app.slug}`)}
            className="text-xs uppercase tracking-[0.2em] text-stone-400 transition-colors hover:text-stone-700"
          >
            {t.apps.privacyLink} →
          </Link>
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            structuredData(app, locale, copy.title, copy.description),
          ),
        }}
      />
    </section>
  );
}
