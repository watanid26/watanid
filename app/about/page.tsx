import { AboutContent } from "@/components/AboutContent";
import { getAboutContentProps } from "@/lib/get-about-content";
import { getCurrentLocale } from "@/lib/i18n";

export const metadata = {
  title: "About",
  description:
    "Watanid is a one-person studio. Why these apps exist, how they are built, and how to get in touch.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const locale = await getCurrentLocale();
  const props = await getAboutContentProps(locale);
  return <AboutContent {...props} />;
}
