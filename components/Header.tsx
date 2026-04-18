import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Locale } from "@/lib/i18n-messages";
import { getMessages } from "@/lib/i18n-messages";
import type { PageRecord } from "@/lib/types";

export function Header({
  locale,
  menuPages,
}: {
  locale: Locale;
  menuPages: PageRecord[];
}) {
  const t = getMessages(locale);
  const links = [
    { href: "/", label: t.nav.home },
    { href: "/apps", label: t.nav.apps },
    ...menuPages.map((p) => ({
      href: `/${p.slug}`,
      label: p.title,
    })),
    { href: "/about", label: t.nav.about },
  ];

  return (
    <header className="sticky top-0 z-20 border-b border-black/10 bg-white/95 backdrop-blur-sm supports-[backdrop-filter]:bg-white/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-primary transition-colors duration-300 hover:text-primary/80"
        >
          Watanid
        </Link>
        <div className="flex items-center">
          <nav
            className="flex items-center gap-8 md:gap-10"
            aria-label="Main"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-black/70 transition-colors duration-300 hover:text-black"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher locale={locale} />
        </div>
      </div>
    </header>
  );
}
