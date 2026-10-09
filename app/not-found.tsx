import Link from "next/link";
import { Container } from "@/components/Container";

/**
 * The project had no 404 boundary, so an unmatched path fell through to the
 * framework's error page and production answered 500 — which tells crawlers to
 * retry rather than to drop the URL.
 */
export default function NotFound() {
  return (
    <section className="bg-[#fafaf9] py-24 text-stone-900 md:py-32">
      <Container>
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-stone-400">
          404
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
          This page doesn&rsquo;t exist.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-stone-600">
          The link may be out of date, or the page may have moved.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/"
            className="text-base font-medium text-stone-900 underline-offset-4 hover:underline"
          >
            Home
          </Link>
          <Link
            href="/apps"
            className="text-base font-medium text-stone-900 underline-offset-4 hover:underline"
          >
            Apps
          </Link>
        </div>
      </Container>
    </section>
  );
}
