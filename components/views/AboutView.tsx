import { AboutContent } from "@/components/AboutContent";
import { getAboutContentProps } from "@/lib/get-about-content";
import type { Locale } from "@/lib/i18n-messages";

export async function AboutView({ locale }: { locale: Locale }) {
  const props = await getAboutContentProps(locale);
  return <AboutContent {...props} />;
}
