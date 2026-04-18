import type { Locale } from "@/lib/i18n-messages";
import type { AboutPrincipleRow } from "@/lib/types";

/** Fallback principles when `data/about.json` omits them for a locale. */
export const DEFAULT_PRINCIPLES: Record<Locale, AboutPrincipleRow[]> = {
  en: [
    {
      title: "Build what you'd reach for tomorrow morning.",
      body: "Every tool here started as a friction in my own day. If I wouldn't open it on a Tuesday at 7am, it doesn't ship.",
      tag: "Necessity",
    },
    {
      title: "Subtract until it can't be subtracted any more.",
      body: "Features that aren't earning their keep are deleted, not hidden. The shape of a finished thing is whatever's left when nothing more can leave.",
      tag: "Restraint",
    },
  ],
  ko: [
    {
      title: "내일 아침에도 손이 가게 만드는 것만 만듭니다.",
      body: "여기 있는 도구는 모두 제 하루의 마찰에서 출발했습니다. 화요일 아침 7시에 열지 않을 앱은 출시하지 않습니다.",
      tag: "필요",
    },
    {
      title: "더 줄일 수 없을 때까지 덜어냅니다.",
      body: "제 몫을 하지 못하는 기능은 숨기지 않고 삭제합니다. 완성된 형태는 더 이상 뺄 것이 없을 때 남는 것입니다.",
      tag: "절제",
    },
  ],
  ja: [
    {
      title: "明日の朝も手が伸びるものだけをつくる。",
      body: "ここにあるツールは、自分の一日の違和感から生まれています。火曜の朝7時に開かないアプリは出しません。",
      tag: "必然",
    },
    {
      title: "これ以上引けないところまで引く。",
      body: "役に立たない機能は隠さず削ります。仕上がりの形は、もう何も取り去れないときに残るものです。",
      tag: "抑制",
    },
  ],
};

export const DEFAULT_HERO: Record<
  Locale,
  { before: string; emphasis: string; after: string }
> = {
  en: {
    before: "I share things I build because I ",
    emphasis: "actually",
    after: " need them.",
  },
  ko: {
    before: "제가 ",
    emphasis: "정말",
    after: " 필요해서 만든 것들을 나눕니다.",
  },
  ja: {
    before: "自分が",
    emphasis: "本当に",
    after: "必要として作ったものを共有します。",
  },
};

export const DEFAULT_LABELS: Record<
  Locale,
  {
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
    footerLeft: string;
    footerRight: string;
  }
> = {
  en: {
    manifesto: "Manifesto",
    studio: "Watanid Studio",
    est: "Est. 2025",
    principles: "Principles",
    principlesIntro:
      "Two rules I keep coming back to when deciding what to ship.",
    fieldNotes: "Field notes",
    contactHeading: "Get in touch.",
    email: "Email",
    github: "GitHub",
    instagram: "Instagram",
    x: "X",
    threads: "Threads",
    replyWithin: "Reply within",
    replyValue: "Usually a few days. Always read.",
    footerLeft: "Watanid · Built quietly",
    footerRight: "v1 · 2025",
  },
  ko: {
    manifesto: "선언",
    studio: "와타니드 스튜디오",
    est: "Est. 2025",
    principles: "원칙",
    principlesIntro:
      "무엇을 내보낼지 고를 때마다 돌아보는 두 가지 규칙입니다.",
    fieldNotes: "필드 노트",
    contactHeading: "연락하세요.",
    email: "이메일",
    github: "GitHub",
    instagram: "Instagram",
    x: "X",
    threads: "Threads",
    replyWithin: "답장까지",
    replyValue: "보통 며칠 안. 항상 읽습니다.",
    footerLeft: "Watanid · 조용히 만듦",
    footerRight: "v1 · 2025",
  },
  ja: {
    manifesto: "宣言",
    studio: "ワタニド スタジオ",
    est: "Est. 2025",
    principles: "原則",
    principlesIntro: "何を出すか決めるたびに立ち返る、二つのルールです。",
    fieldNotes: "フィールドノート",
    contactHeading: "ご連絡はこちら。",
    email: "メール",
    github: "GitHub",
    instagram: "Instagram",
    x: "X",
    threads: "Threads",
    replyWithin: "返信まで",
    replyValue: "数日が目安。必ず読みます。",
    footerLeft: "Watanid · 静かに作る",
    footerRight: "v1 · 2025",
  },
};

export const DEFAULT_SIGNATURE: Record<
  Locale,
  { name: string; role: string }
> = {
  en: { name: "Min Ho Jin", role: "Founder & maker" },
  ko: { name: "진민호", role: "메이커" },
  ja: { name: "ジン・ミンホ", role: "メーカー" },
};

export const DEFAULT_FIELD_NOTES: Record<
  Locale,
  { quote: string; attribution: string }
> = {
  en: {
    quote:
      "The best tools disappear. You only notice them on the days they're missing.",
    attribution: "— Watanid, on craft",
  },
  ko: {
    quote:
      "가장 좋은 도구는 사라집니다. 없는 날에만 비로소 눈에 들어옵니다.",
    attribution: "— 와타니드, 크래프트에 대해",
  },
  ja: {
    quote: "最高の道具は消えていく。気づくのは、足りない日だけ。",
    attribution: "— ワタニド、ものづくりについて",
  },
};
