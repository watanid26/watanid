"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  AtSign,
  Instagram,
  Mail,
  X,
} from "lucide-react";
import { Container } from "@/components/Container";

/* ──────────────────────────────────────────────────────────────────────
 * About — Editorial Monograph
 *
 * Sections (top → bottom):
 *   1. mascot moment       brand + field notes
 *   2. contact             two-column key/value rows
 *
 * Meta / hero / principles blocks are omitted (see data + admin for legacy fields).
 * Pass "" for any social URL to hide that row.
 * ────────────────────────────────────────────────────────────────────── */

const EASE = [0.16, 1, 0.3, 1] as const;

/** 12열 그리드: 라벨·본문 x축을 페이지 전역에서 통일 (md+: 4 + 8) */
const MAIN_GRID =
  "grid grid-cols-12 gap-x-6 gap-y-8 md:gap-x-10 md:gap-y-10 md:items-start lg:gap-x-10";

const LABEL_COL = "col-span-12 md:col-span-4";
const BODY_COL = "col-span-12 md:col-span-8";

const CAPTION =
  "font-mono text-[11px] uppercase tracking-[0.14em] text-black/50";

const ICON_BOX =
  "inline-flex h-5 w-5 shrink-0 items-center justify-center text-black transition-colors duration-200 group-hover:text-black [&_svg]:h-full [&_svg]:w-full";

const ICON_STROKE = 2;
const ARROW_STROKE = 2;

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2, margin: "0px 0px -8% 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
      transition={{ duration: 0.45, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Strip protocol + trailing slash, return last URL segment as a `@handle`. */
function handleFromUrl(url: string | undefined): string {
  if (!url) return "";
  const cleaned = url.trim().replace(/^https?:\/\//, "").replace(/\/$/, "");
  const segs = cleaned.split("/");
  const last = segs[segs.length - 1] || cleaned;
  return last.startsWith("@") ? last : `@${last}`;
}

export type AboutContentProps = {
  email?: string;
  instagramUrl?: string;
  xUrl?: string;
  threadsUrl?: string;

  /** Legacy — ignored by layout (kept for `getAboutContentProps` / admin JSON) */
  signatureName?: string;
  signatureRole?: string;
  heroBefore?: string;
  heroEmphasis?: string;
  heroAfter?: string;
  heroHeadline?: ReactNode;
  /** Mascot image under `public/` */
  mascotSrc?: string;
  /** Legacy — ignored by layout */
  principles?: Array<{ title: string; body: string; tag: string }>;
  fieldNotesQuote?: string;
  fieldNotesAttribution?: string;

  /** Override section labels (e.g. for i18n). */
  labels?: Partial<{
    manifesto: string;
    studio: string;
    est: string;
    principles: string;
    principlesIntro: string;
    fieldNotes: string;
    contactHeading: string;
    email: string;
    github: string;
    instagram: string;
    x: string;
    threads: string;
    replyWithin: string;
    replyValue: string;
  }>;
};

const DEFAULT_LABELS = {
  fieldNotes: "Field notes",
  contactHeading: "Get in touch.",
  email: "Email",
  github: "GitHub",
  instagram: "Instagram",
  x: "X",
  threads: "Threads",
};

const DEFAULT_MASCOT = "/images/Watanid_black_bg.png";

export function AboutContent({
  email = "watanid26@gmail.com",
  instagramUrl = "https://instagram.com/watanid",
  xUrl = "https://x.com/watanid",
  threadsUrl = "https://threads.net/@watanid",
  mascotSrc = DEFAULT_MASCOT,
  fieldNotesQuote = "The best tools disappear. You only notice them on the days they're missing.",
  fieldNotesAttribution = "— Watanid, on craft",
  labels: labelOverrides,
}: AboutContentProps = {}) {
  const labels = { ...DEFAULT_LABELS, ...labelOverrides };

  type ContactDef = {
    key: string;
    label: string;
    value: string;
    href?: string;
    icon: ReactNode;
    /** mailto 등 — ArrowRight 사용 */
    internal?: boolean;
  };

  const contacts: ContactDef[] = [];

  contacts.push({
    key: "email",
    label: labels.email,
    value: email,
    href: email ? `mailto:${email}` : undefined,
    internal: true,
    icon: <Mail strokeWidth={ICON_STROKE} aria-hidden />,
  });

  if (instagramUrl) {
    contacts.push({
      key: "instagram",
      label: labels.instagram,
      value: handleFromUrl(instagramUrl),
      href: instagramUrl,
      icon: <Instagram strokeWidth={ICON_STROKE} aria-hidden />,
    });
  }
  if (xUrl) {
    contacts.push({
      key: "x",
      label: labels.x,
      value: handleFromUrl(xUrl),
      href: xUrl,
      icon: <X strokeWidth={ICON_STROKE} aria-hidden />,
    });
  }
  if (threadsUrl) {
    contacts.push({
      key: "threads",
      label: labels.threads,
      value: handleFromUrl(threadsUrl),
      href: threadsUrl,
      icon: <AtSign strokeWidth={ICON_STROKE} aria-hidden />,
    });
  }

  return (
    <div className="min-h-screen border-t border-black/15 bg-[#fafaf9] text-stone-900">
      <h1 className="sr-only">About</h1>

      <Container className="py-16 md:py-20 md:pb-12 lg:py-24 lg:pb-16">
        {/* 1 — MASCOT + FIELD NOTES */}
        <section className={MAIN_GRID} aria-labelledby="about-field-notes-label">
          <Reveal className={LABEL_COL}>
            <div className="flex aspect-square w-full max-w-[420px] items-center justify-center rounded-[6px] bg-[#f1efea] p-8 sm:p-12 md:max-w-none md:p-16">
              <div className="relative h-full w-full min-h-[200px]">
                <Image
                  src={mascotSrc}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 80vw, min(420px, 42vw)"
                  className="object-contain object-center"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1} className={BODY_COL}>
            <div className="font-sans md:pt-1">
              <p id="about-field-notes-label" className={CAPTION}>
                {labels.fieldNotes}
              </p>
              <p className="mt-5 max-w-[40ch] text-[17px] font-normal leading-[1.55] tracking-[-0.01em] text-stone-800 md:max-w-none md:text-[18px]">
                {fieldNotesQuote}
              </p>
              <p className="mt-4 text-[14px] font-normal leading-relaxed text-stone-500 md:text-[15px]">
                {fieldNotesAttribution}
              </p>
            </div>
          </Reveal>
        </section>

        <hr className="my-12 border-0 border-t border-black/15 md:my-16" />

        {/* 2 — CONTACT */}
        <section className={MAIN_GRID} aria-labelledby="about-contact-heading">
          <Reveal className={LABEL_COL}>
            <h2
              id="about-contact-heading"
              className="max-w-[14ch] text-[28px] font-medium leading-[1.22] tracking-[-0.025em] text-stone-800 md:text-[34px]"
            >
              {labels.contactHeading}
            </h2>
          </Reveal>
          <div className={BODY_COL}>
            <div className="border-t border-black/15">
              {contacts.map((row, i) => (
                <Reveal key={row.key} delay={0.05 + i * 0.04}>
                  <ContactRow
                    label={row.label}
                    value={row.value}
                    href={row.href}
                    icon={row.icon}
                    internal={row.internal}
                    isLast={i === contacts.length - 1}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}

function ContactRow({
  label,
  value,
  href,
  icon,
  internal = false,
  isLast,
}: {
  label: string;
  value: string;
  href?: string;
  icon: ReactNode;
  internal?: boolean;
  isLast: boolean;
}) {
  const external = href ? !internal : false;
  const ArrowIcon = internal ? ArrowRight : ArrowUpRight;

  const rowGrid = (
    <div className="grid grid-cols-12 items-center gap-x-3 gap-y-3 px-3 py-5 md:gap-x-6 md:px-4">
      <div className="col-span-12 md:col-span-3">
        <p className={CAPTION}>{label}</p>
      </div>
      <div className="col-span-10 flex min-w-0 items-center gap-3 md:col-span-8">
        <span className={ICON_BOX} aria-hidden>
          {icon}
        </span>
        <span
          className={[
            "min-w-0 truncate text-[15px] tracking-[-0.015em] text-black",
            "underline decoration-black/25 decoration-1 underline-offset-4",
            "transition-colors duration-200 group-hover:decoration-black",
          ].join(" ")}
        >
          {value}
        </span>
      </div>
      <div className="col-span-2 flex items-center justify-end md:col-span-1">
        <ArrowIcon
          className="h-4 w-4 shrink-0 text-black/50 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-black"
          strokeWidth={ARROW_STROKE}
          aria-hidden
        />
      </div>
    </div>
  );

  const linkClass = [
    "group block transition-colors duration-200",
    isLast ? "" : "border-b border-black/15",
    "hover:bg-black/[0.05] focus-visible:bg-black/[0.05]",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black/30",
  ]
    .filter(Boolean)
    .join(" ");

  if (!href) {
    return (
      <div className={isLast ? "" : "border-b border-black/15"}>{rowGrid}</div>
    );
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={linkClass}
      aria-label={`${label} — opens ${external ? "external site" : "app"}`}
    >
      {rowGrid}
    </a>
  );
}
