import { ButtonLink } from "@/components/Button";

export function HomeHero({ viewAppsLabel }: { viewAppsLabel: string }) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
      <div
        className="relative flex w-full max-w-[340px] flex-col items-center text-center"
        aria-label="Watanid brand"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo/watanid_logo.apng"
          alt=""
          decoding="async"
          fetchPriority="high"
          className="relative z-0 block h-auto w-full max-w-[280px] object-contain md:max-w-[340px]"
        />

        <h1 className="relative z-10 -mt-10 text-[3.25rem] font-semibold leading-none tracking-tight !text-white sm:-mt-12 sm:text-[4.25rem] md:-mt-16">
          Watanid
        </h1>
        <p
          lang="en"
          className="relative z-10 mt-1 text-[0.95rem] font-normal leading-none !text-white sm:text-[1.05rem] md:mt-1.5"
        >
          I build what I need.
        </p>
      </div>

      <div className="mt-6 md:mt-8">
        <ButtonLink href="/apps" variant="primary" surface="dark">
          {viewAppsLabel}
        </ButtonLink>
      </div>
    </div>
  );
}
