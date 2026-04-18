export type AppStatus = "published" | "draft";

/** Per-locale copy for an app (en / ko / ja) */
export type AppLocaleBlock = {
  title: string;
  description: string;
};

export type AppRecord = {
  slug: string;
  thumbnail: string;
  link: string;
  status: AppStatus;
  /** Sort key for /apps list and admin (lower first) */
  order: number;
  /** Home featured strip; falls back to first published if none */
  featured?: boolean;
  /** Google Play — detail page shows icon only when non-empty */
  playStoreUrl?: string;
  /** App Store — detail page shows icon only when non-empty */
  appStoreUrl?: string;
  /** Optional editorial metadata (detail page) */
  category?: string;
  version?: string;
  year?: number;
  en: AppLocaleBlock;
  ko: AppLocaleBlock;
  ja: AppLocaleBlock;
};

export type SiteMeta = {
  developerName: string;
  email: string;
  githubUrl?: string;
  instagramUrl?: string;
  xUrl?: string;
  threadsUrl?: string;
};

export type PageRecord = {
  title: string;
  slug: string;
  content: string;
  showInMenu: boolean;
  order: number;
};

/** One row in the Principles section */
export type AboutPrincipleRow = {
  title: string;
  body: string;
  tag: string;
};

/** Optional label overrides (merged with code defaults per locale) */
export type AboutLabelsPartial = {
  manifesto?: string;
  studio?: string;
  est?: string;
  principles?: string;
  principlesIntro?: string;
  fieldNotes?: string;
  contactHeading?: string;
  email?: string;
  github?: string;
  instagram?: string;
  x?: string;
  threads?: string;
  replyWithin?: string;
  replyValue?: string;
  footerLeft?: string;
  footerRight?: string;
};

/** Editable About copy per locale (`data/about.json`) */
export type AboutLocaleBlock = {
  /** Legacy — unused by current About layout; kept for migration */
  intro?: string;
  paragraphs?: string[];

  metaManifesto?: string;
  metaStudio?: string;
  metaEst?: string;

  heroBefore?: string;
  heroEmphasis?: string;
  heroAfter?: string;

  signatureName?: string;
  signatureRole?: string;

  principlesIntro?: string;
  principles?: AboutPrincipleRow[];

  fieldNotesQuote?: string;
  fieldNotesAttribution?: string;

  labels?: AboutLabelsPartial;

  /** Shown in the “Reply within” row */
  replyValue?: string;

  /** Mascot image under `public/` */
  mascotImageSrc?: string;
};

export type AboutContentFile = {
  en: AboutLocaleBlock;
  ko: AboutLocaleBlock;
  ja: AboutLocaleBlock;
};
