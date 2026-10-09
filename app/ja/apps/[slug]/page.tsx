import type { Metadata } from "next";
import { AppDetailView } from "@/components/views/AppDetailView";
import { filterPublished, getAppCopy, readAllApps } from "@/lib/apps";
import { alternatesFor } from "@/lib/locale-routing";

type Props = { params: { slug: string } };

const LOCALE = "ja" as const;

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const apps = filterPublished(await readAllApps());
  return apps.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const app = filterPublished(await readAllApps()).find(
    (a) => a.slug === params.slug,
  );
  if (!app) return { title: "Not found" };
  const copy = getAppCopy(app, LOCALE);
  return {
    title: copy.title,
    description: copy.description,
    alternates: alternatesFor(LOCALE, `/apps/${params.slug}`),
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: `/apps/${params.slug}`,
      images: [{ url: app.thumbnail }],
    },
  };
}

export default async function AppDetailPage({ params }: Props) {
  const app = (await readAllApps()).find((a) => a.slug === params.slug);
  return <AppDetailView app={app} locale={LOCALE} />;
}
