"use client";

import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n-messages";
import { LOCALE_COOKIE, locales } from "@/lib/i18n-messages";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter();

  function setLocale(nextLocale: Locale) {
    document.cookie = `${LOCALE_COOKIE}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  }

  return (
    <div
      className="ml-0 flex items-center gap-1 rounded-full border border-black/10 bg-black/[0.03] p-1 md:ml-6"
      aria-label="Language switcher"
    >
      {locales.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={`rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-widest transition-colors duration-300 ${
            locale === code
              ? "bg-primary text-white"
              : "text-black/60 hover:text-black"
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
