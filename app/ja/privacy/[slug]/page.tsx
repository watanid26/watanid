import type { Metadata } from "next";
import { PrivacyView } from "@/components/views/PrivacyView";
import { alternatesFor } from "@/lib/locale-routing";
import { getPrivacyContent, isPrivacySlug, PRIVACY_SLUGS } from "@/lib/privacy-content";

type Props = { params: { slug: string } };

const LOCALE = "ja" as const;

export async function generateStaticParams() {
  return PRIVACY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isPrivacySlug(params.slug)) return { title: "Not found" };
  const c = getPrivacyContent(params.slug, LOCALE);
  return {
    title: `${c.appName} — ${c.labels.pageTitle}`,
    description: `${c.appName} のデータの扱い方。アカウントもトラッキングもありません — Watanid の全文ポリシー。`,
    alternates: alternatesFor(LOCALE, `/privacy/${params.slug}`),
    robots: { index: true, follow: true },
  };
}

export default function PrivacyPage({ params }: Props) {
  return <PrivacyView params={params} locale={LOCALE} />;
}
