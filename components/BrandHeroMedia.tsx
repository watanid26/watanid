import Image from "next/image";

/** About / Apps 상단 카키 섹션 — 올리브 톤 가로 로고 (`public/images`) */
export function BrandHeroMedia() {
  return (
    <div className="flex w-full justify-start">
      <Image
        src="/images/Watanid_horiz_olive_bg_transparent.png"
        alt=""
        width={1400}
        height={500}
        className="h-auto w-auto max-w-[180px] shrink-0 object-contain sm:max-w-[200px] md:max-w-[240px]"
        sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, 240px"
        priority
      />
    </div>
  );
}
