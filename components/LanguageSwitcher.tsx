"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n-messages";
import { locales } from "@/lib/i18n-messages";
import { localeHref, splitLocalePath } from "@/lib/locale-routing";

/**
 * Real links to the equivalent URL in each locale, not a cookie write. The
 * cookie approach served three languages from one URL, which left the Korean
 * and Japanese pages invisible to search engines.
 */
export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? "/";
  const { path } = splitLocalePath(pathname);

  return (
    <div
      className="ml-0 flex items-center gap-1 rounded-full border border-black/10 bg-black/[0.03] p-1 md:ml-6"
      aria-label="Language switcher"
    >
      {locales.map((code) => (
        <Link
          key={code}
          href={localeHref(code, path)}
          hrefLang={code}
          aria-current={locale === code ? "true" : undefined}
          className={`rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-widest transition-colors duration-300 ${
            locale === code
              ? "bg-primary text-white"
              : "text-black/60 hover:text-black"
          }`}
        >
          {code}
        </Link>
      ))}
    </div>
  );
}
