import { Container } from "@/components/Container";
import { HomeHero } from "@/components/HomeHero";
import { getCurrentLocale, getMessages } from "@/lib/i18n";

export default async function HomePage() {
  const locale = await getCurrentLocale();
  const t = getMessages(locale);

  return (
    <section className="relative overflow-hidden bg-primary py-12 text-white md:py-16">
      <div
        className="absolute inset-y-0 -left-1/3 w-[160%] animate-subtle-light bg-gradient-to-r from-transparent via-white/20 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, rgba(255,255,255,0.08), transparent 55%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 -right-1/4 w-[120%] animate-subtle-light-reverse bg-gradient-to-l from-transparent via-white/10 to-transparent"
        aria-hidden="true"
      />
      <Container className="relative">
        <HomeHero viewAppsLabel={t.home.viewApps} />
      </Container>
    </section>
  );
}
