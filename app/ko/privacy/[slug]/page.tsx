import type { Metadata } from "next";
import { PrivacyView } from "@/components/views/PrivacyView";
import { alternatesFor } from "@/lib/locale-routing";
import { getPrivacyContent, isPrivacySlug, PRIVACY_SLUGS } from "@/lib/privacy-content";

type Props = { params: { slug: string } };

const LOCALE = "ko" as const;

export async function generateStaticParams() {
  return PRIVACY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isPrivacySlug(params.slug)) return { title: "Not found" };
  const c = getPrivacyContent(params.slug, LOCALE);
  return {
    title: `${c.appName} — ${c.labels.pageTitle}`,
    description: `${c.appName}이(가) 데이터를 다루는 방식. 계정도 추적도 없습니다 — Watanid의 전문 방침.`,
    alternates: alternatesFor(LOCALE, `/privacy/${params.slug}`),
    robots: { index: true, follow: true },
  };
}

export default function PrivacyPage({ params }: Props) {
  return <PrivacyView params={params} locale={LOCALE} />;
}
