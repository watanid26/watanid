import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { readAllPages } from "@/lib/pages";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const pages = await readAllPages();
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const pages = await readAllPages();
  const page = pages.find((p) => p.slug === params.slug);
  return { title: page?.title ?? "Not found" };
}

export default async function CustomPage({ params }: Props) {
  const pages = await readAllPages();
  const page = pages.find((p) => p.slug === params.slug);
  if (!page) notFound();

  return (
    <section className="bg-white py-24 text-black md:py-32">
      <Container>
        <h1 className="text-5xl font-semibold tracking-tight text-black md:text-6xl">
          {page.title}
        </h1>
        <div className="mt-8 max-w-2xl whitespace-pre-wrap text-base leading-relaxed text-black/70 md:text-lg">
          {page.content}
        </div>
      </Container>
    </section>
  );
}
