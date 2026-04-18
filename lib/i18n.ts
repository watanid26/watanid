import { cookies } from "next/headers";
import { isLocale, type Locale } from "@/lib/i18n-messages";
export { LOCALE_COOKIE, locales, messages, getMessages, isLocale } from "@/lib/i18n-messages";
export type { Locale } from "@/lib/i18n-messages";

export async function getCurrentLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get("watanid_locale")?.value;
  return value && isLocale(value) ? value : "en";
}
