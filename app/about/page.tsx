import { AboutContent } from "@/components/AboutContent";
import { getAboutContentProps } from "@/lib/get-about-content";
import { getCurrentLocale } from "@/lib/i18n";

export const metadata = { title: "About" };

export default async function AboutPage() {
  const locale = await getCurrentLocale();
  const props = await getAboutContentProps(locale);
  return <AboutContent {...props} />;
}
