import { AppCard } from "@/components/AppCard";
import { AppsAnimatedItem } from "@/components/AppsAnimatedItem";
import { AppsHero } from "@/components/AppsHero";
import { Container } from "@/components/Container";
import { filterPublished, readAllApps, sortAppsByOrder } from "@/lib/apps";
import { getCurrentLocale, getMessages } from "@/lib/i18n";

export const metadata = { title: "Apps" };

export default async function AppsPage() {
  const locale = await getCurrentLocale();
  const t = getMessages(locale);
  const apps = sortAppsByOrder(filterPublished(await readAllApps()));

  return (
    <>
      <AppsHero />
      <section className="bg-[#fafaf9] pb-24 pt-6 text-stone-900 md:pb-36 md:pt-10 lg:pb-44 lg:pt-12">
        <Container>
          <header className="mb-16 md:mb-20 lg:mb-24">
            <h1 className="text-[11px] font-medium uppercase tracking-[0.28em] text-stone-400">
              {t.apps.title}
            </h1>
          </header>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-12 md:gap-y-16 lg:gap-x-16 lg:gap-y-20">
            {apps.map((app, index) => {
              const featured = index === 0;
              return (
                <AppsAnimatedItem
                  key={app.slug}
                  index={index}
                  className={featured ? "md:col-span-2" : undefined}
                >
                  <AppCard app={app} locale={locale} featured={featured} />
                </AppsAnimatedItem>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
