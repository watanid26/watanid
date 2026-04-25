import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/Container";
import { getCurrentLocale } from "@/lib/i18n";
import {
  getPrivacyContent,
  isPrivacySlug,
  PRIVACY_SLUGS,
} from "@/lib/privacy-content";

type Props = { params: { slug: string } };

/** Locale cookie must apply on each request (ko / en / ja). */
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return PRIVACY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  if (!isPrivacySlug(params.slug)) return { title: "Not found" };
  const locale = await getCurrentLocale();
  const c = getPrivacyContent(params.slug, locale);
  return {
    title: `${c.appName} — ${c.labels.pageTitle}`,
    robots: { index: true, follow: true },
  };
}

export default async function PrivacyPage({ params }: Props) {
  if (!isPrivacySlug(params.slug)) notFound();
  const locale = await getCurrentLocale();
  const c = getPrivacyContent(params.slug, locale);

  return (
    <section className="bg-[#fafaf9] py-20 text-stone-900 md:py-28 lg:py-32">
      <Container>
        <Link
          href="/apps"
          className="text-sm text-stone-500 transition-colors hover:text-stone-900"
        >
          ← {c.labels.backToApps}
        </Link>

        <header className="mt-10 max-w-3xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-stone-400">
            {c.labels.pageTitle}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
            {c.appName}
          </h1>
          <p className="mt-6 text-sm text-stone-500">
            {c.labels.effective}: 2026-04-25
          </p>
        </header>

        <div className="my-12 h-px w-full bg-stone-200" />

        <div className="max-w-2xl space-y-12">
          {c.sections.map((s, i) => (
            <section key={i}>
              <h2 className="text-xl font-semibold tracking-tight text-stone-900 md:text-2xl">
                {i + 1}. {s.heading}
              </h2>
              <div className="mt-4 space-y-3 whitespace-pre-wrap text-base leading-relaxed text-stone-700">
                {s.body}
              </div>
            </section>
          ))}
        </div>

        <div className="my-12 h-px w-full bg-stone-200" />

        <footer className="max-w-2xl text-sm text-stone-600">
          <p>{c.labels.contactLine}</p>
          <a
            href="mailto:watanid26@gmail.com"
            className="mt-2 inline-block text-base font-medium text-stone-900 underline-offset-4 hover:underline"
          >
            watanid26@gmail.com
          </a>
        </footer>
      </Container>
    </section>
  );
}
