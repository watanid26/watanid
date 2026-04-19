"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Locale } from "@/lib/i18n-messages";

type HeaderLink = {
  href: string;
  label: string;
};

export function HeaderMobileMenu({
  locale,
  links,
}: {
  locale: Locale;
  links: HeaderLink[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative md:hidden">
      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-black/70 transition-colors duration-200 hover:text-black"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
      </button>

      {isOpen ? (
        <div
          id={menuId}
          role="menu"
          aria-label="Mobile navigation"
          className="absolute right-0 top-[calc(100%+0.75rem)] w-[min(18rem,calc(100vw-2.5rem))] rounded-[1.25rem] border border-black/10 bg-white p-3 shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
        >
          <nav className="flex flex-col" aria-label="Main">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                role="menuitem"
                className="rounded-xl px-4 py-3 text-sm text-black/70 transition-colors duration-200 hover:bg-black/[0.03] hover:text-black"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 border-t border-black/10 px-1 pt-3">
            <LanguageSwitcher locale={locale} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
