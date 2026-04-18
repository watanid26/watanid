import type { AboutContentProps } from "@/components/AboutContent";
import {
  DEFAULT_FIELD_NOTES,
  DEFAULT_HERO,
  DEFAULT_LABELS,
  DEFAULT_PRINCIPLES,
  DEFAULT_SIGNATURE,
} from "@/lib/about-defaults";
import type { Locale } from "@/lib/i18n-messages";
import { getAbout } from "@/lib/storage";
import { getSiteMeta } from "@/lib/site";

const MASCOT_DEFAULT = "/images/Watanid_black_bg.png";

/**
 * Server-only: merge `data/about.json`, `data/site.json`, and code defaults
 * into props for `<AboutContent />`.
 */
export async function getAboutContentProps(
  locale: Locale,
): Promise<AboutContentProps> {
  const [file, site] = await Promise.all([getAbout(), getSiteMeta()]);
  const block = file[locale] ?? {};
  const hero = DEFAULT_HERO[locale];
  const sig = DEFAULT_SIGNATURE[locale];
  const fn = DEFAULT_FIELD_NOTES[locale];
  const L = DEFAULT_LABELS[locale];

  const labelsFromFile = block.labels ?? {};
  const labelOverrides: AboutContentProps["labels"] = {
    manifesto: labelsFromFile.manifesto ?? block.metaManifesto ?? L.manifesto,
    studio: labelsFromFile.studio ?? block.metaStudio ?? L.studio,
    est: labelsFromFile.est ?? block.metaEst ?? L.est,
    principles: labelsFromFile.principles ?? L.principles,
    principlesIntro:
      block.principlesIntro ??
      labelsFromFile.principlesIntro ??
      L.principlesIntro,
    fieldNotes: labelsFromFile.fieldNotes ?? L.fieldNotes,
    contactHeading: labelsFromFile.contactHeading ?? L.contactHeading,
    email: labelsFromFile.email ?? L.email,
    github: labelsFromFile.github ?? L.github,
    instagram: labelsFromFile.instagram ?? L.instagram,
    x: labelsFromFile.x ?? L.x,
    threads: labelsFromFile.threads ?? L.threads,
  };

  const principles =
    block.principles && block.principles.length > 0
      ? block.principles.slice(0, 2)
      : DEFAULT_PRINCIPLES[locale];

  return {
    email: site.email,
    instagramUrl: site.instagramUrl,
    xUrl: site.xUrl,
    threadsUrl: site.threadsUrl,
    signatureName: block.signatureName ?? sig.name,
    signatureRole: block.signatureRole ?? sig.role,
    heroBefore: block.heroBefore ?? hero.before,
    heroEmphasis: block.heroEmphasis ?? hero.emphasis,
    heroAfter: block.heroAfter ?? hero.after,
    principles,
    fieldNotesQuote: block.fieldNotesQuote ?? fn.quote,
    fieldNotesAttribution: block.fieldNotesAttribution ?? fn.attribution,
    labels: labelOverrides,
    mascotSrc: block.mascotImageSrc?.trim() || MASCOT_DEFAULT,
  };
}
