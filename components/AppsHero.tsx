"use client";

import { motion } from "framer-motion";
import { BrandHeroMedia } from "@/components/BrandHeroMedia";
import { Container } from "@/components/Container";

/** 상단 브랜드 영역 — 문구 없음, 콘텐츠는 이후 추가 */
export function AppsHero() {
  return (
    <motion.section
      initial={{ y: 8 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative overflow-hidden bg-primary py-5 text-white md:py-6"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 55%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-soft-light"
        style={{
          backgroundImage: "url('/noise.svg')",
          backgroundSize: "240px 240px",
        }}
        aria-hidden="true"
      />
      <Container className="relative">
        <BrandHeroMedia />
      </Container>
    </motion.section>
  );
}
