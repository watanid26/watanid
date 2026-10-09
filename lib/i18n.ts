import { headers } from "next/headers";
import { isLocale, type Locale } from "@/lib/i18n-messages";
import { DEFAULT_LOCALE, LOCALE_HEADER } from "@/lib/locale-routing";
export { locales, messages, getMessages, isLocale } from "@/lib/i18n-messages";
export type { Locale } from "@/lib/i18n-messages";

/**
 * The locale comes from the URL, surfaced by the middleware as a header because
 * the root layout cannot read route params. It used to come from a cookie,
 * which meant one URL served three languages and crawlers — which send no
 * cookie — only ever saw English.
 */
export async function getCurrentLocale(): Promise<Locale> {
  const store = await headers();
  const value = store.get(LOCALE_HEADER);
  return value && isLocale(value) ? value : DEFAULT_LOCALE;
}
