import type { Locale } from "@/lib/i18n-messages";
import { getMessages } from "@/lib/i18n-messages";
import { getAbout } from "@/lib/storage";
import type { AboutContentFile } from "@/lib/types";

export async function getAboutMerged(locale: Locale): Promise<{
  intro: string;
  paragraphs: string[];
}> {
  const defaults = getMessages(locale).about;
  let file: AboutContentFile;
  try {
    file = await getAbout();
  } catch {
    return {
      intro: defaults.intro,
      paragraphs: [...defaults.paragraphs],
    };
  }
  const block = file[locale];
  if (!block) {
    return {
      intro: defaults.intro,
      paragraphs: [...defaults.paragraphs],
    };
  }
  return {
    intro: typeof block.intro === "string" ? block.intro : defaults.intro,
    paragraphs: Array.isArray(block.paragraphs)
      ? [...block.paragraphs]
      : [...defaults.paragraphs],
  };
}
