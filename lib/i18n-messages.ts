export const LOCALE_COOKIE = "watanid_locale";
export const locales = ["en", "ko", "ja"] as const;

export type Locale = (typeof locales)[number];

export const messages = {
  en: {
    nav: { home: "Home", apps: "Apps", about: "About" },
    language: "Language",
    home: {
      viewApps: "View Apps",
    },
    apps: {
      title: "All Apps",
      intro:
        "Small tools built for real routines. Read the story, then open what you need.",
      viewApp: "View app →",
    },
    about: {
      title: "About",
      intro:
        "Watanid is a place where I share things I build because I actually need them.",
      paragraphs: [
        "I create small, simple tools that solve real problems without unnecessary features.",
        "I focus on making products that are simple, reliable, and ready to be used in everyday life.",
      ],
      contact: "Contact",
      manifestoLabel: "Manifesto",
      studioLabel: "Watanid Studio",
      estLabel: "Est. 2025",
      heroQuotePrefix: "I share things I build because I ",
      heroQuoteEmphasis: "actually",
      heroQuoteSuffix: " need them.",
      signatureName: "Min Ho Jin",
      signatureRole: "Founder & maker",
      principlesLabel: "Principles",
      principlesIntro:
        "Two rules I keep coming back to when deciding what to ship.",
      principleTags: ["Necessity", "Restraint"] as const,
      fieldNotesLabel: "Field notes",
      fieldNotesQuote:
        "The best tools disappear. You only notice them on the days they're missing.",
      fieldNotesAttribution: "— Watanid, on craft",
      contactHeading: "Get in touch.",
      contactKeys: {
        email: "Email",
        github: "GitHub",
        replyWithin: "Reply within",
      },
      contactReplyValue: "Usually a few days. Always read.",
      footerSig: "Watanid · Built quietly",
      footerVersion: "V1 · 2025",
    },
    appsDetail: {
      backToAll: "← Back to all apps",
      pillNoPrefix: "No.",
      defaultCategory: "Tool",
      pillStatus: {
        live: "Live",
        beta: "Beta",
        coming: "Coming soon",
      },
      aboutThisProject: "About this project",
      availableOn: "Available on",
      ctaHeadline: "Get it. Set it. Trust it tomorrow morning.",
      ctaComingSoon: "Coming soon",
      storePlaySub: "Get it on",
      storePlayTitle: "Google Play",
      storeAppSub: "Download on the",
      storeAppTitle: "App Store",
    },
  },
  ko: {
    nav: { home: "홈", apps: "앱", about: "소개" },
    language: "언어",
    home: {
      viewApps: "앱 보기",
    },
    apps: {
      title: "모든 앱",
      intro:
        "실제 일상에서 나온 작은 도구들입니다. 이야기를 읽고, 필요한 것을 열어보세요.",
      viewApp: "앱 보기 →",
    },
    about: {
      title: "소개",
      intro:
        "Watanid는 제가 실제로 필요해서 만든 것들을 공유하는 공간입니다.",
      paragraphs: [
        "불필요한 기능 없이 현실적인 문제를 해결하기 위한 작고 단순한 도구들을 만듭니다.",
        "저는 일상에서 믿고 쓸 수 있는, 단순하고 안정적인 제품을 만드는 데 집중합니다.",
      ],
      contact: "연락처",
      manifestoLabel: "선언",
      studioLabel: "와타니드 스튜디오",
      estLabel: "Est. 2025",
      heroQuotePrefix: "제가 ",
      heroQuoteEmphasis: "정말",
      heroQuoteSuffix: " 필요해서 만든 것들을 나눕니다.",
      signatureName: "진민호",
      signatureRole: "메이커",
      principlesLabel: "원칙",
      principlesIntro:
        "무엇을 내보낼지 고를 때마다 돌아보는 두 가지 규칙입니다.",
      principleTags: ["필요", "절제"] as const,
      fieldNotesLabel: "필드 노트",
      fieldNotesQuote:
        "가장 좋은 도구는 사라집니다. 없는 날에만 비로소 눈에 들어옵니다.",
      fieldNotesAttribution: "— 와타니드, 크래프트에 대해",
      contactHeading: "연락하세요.",
      contactKeys: {
        email: "이메일",
        github: "GitHub",
        replyWithin: "답장까지",
      },
      contactReplyValue: "보통 며칠 안. 항상 읽습니다.",
      footerSig: "Watanid · 조용히 만듦",
      footerVersion: "V1 · 2025",
    },
    appsDetail: {
      backToAll: "← 모든 앱",
      pillNoPrefix: "No.",
      defaultCategory: "도구",
      pillStatus: {
        live: "라이브",
        beta: "베타",
        coming: "출시 예정",
      },
      aboutThisProject: "프로젝트 소개",
      availableOn: "다운로드",
      ctaHeadline: "받고. 맞추고. 내일 아침 믿고 쓰세요.",
      ctaComingSoon: "곧 출시",
      storePlaySub: "다운로드",
      storePlayTitle: "Google Play",
      storeAppSub: "다운로드",
      storeAppTitle: "App Store",
    },
  },
  ja: {
    nav: { home: "ホーム", apps: "アプリ", about: "紹介" },
    language: "言語",
    home: {
      viewApps: "アプリを見る",
    },
    apps: {
      title: "すべてのアプリ",
      intro:
        "日々の習慣から生まれた小さなツールです。背景を読み、必要なものを開いてください。",
      viewApp: "アプリを見る →",
    },
    about: {
      title: "紹介",
      intro:
        "ワタニドは、自分が実際に必要として作ったものを共有する場所です。",
      paragraphs: [
        "不要な機能を省き、現実的な問題を解決するための小さくシンプルなツールを作っています。",
        "日常で安心して使える、シンプルで信頼できる製品づくりに集中しています。",
      ],
      contact: "連絡先",
      manifestoLabel: "宣言",
      studioLabel: "ワタニド スタジオ",
      estLabel: "Est. 2025",
      heroQuotePrefix: "自分が",
      heroQuoteEmphasis: "本当に",
      heroQuoteSuffix: "必要として作ったものを共有します。",
      signatureName: "ジン・ミンホ",
      signatureRole: "メーカー",
      principlesLabel: "原則",
      principlesIntro:
        "何を出すか決めるたびに立ち返る、二つのルールです。",
      principleTags: ["必然", "抑制"] as const,
      fieldNotesLabel: "フィールドノート",
      fieldNotesQuote:
        "最高の道具は消えていく。気づくのは、足りない日だけ。",
      fieldNotesAttribution: "— ワタニド、ものづくりについて",
      contactHeading: "ご連絡はこちら。",
      contactKeys: {
        email: "メール",
        github: "GitHub",
        replyWithin: "返信まで",
      },
      contactReplyValue: "数日が目安。必ず読みます。",
      footerSig: "Watanid · 静かに作る",
      footerVersion: "V1 · 2025",
    },
    appsDetail: {
      backToAll: "← すべてのアプリ",
      pillNoPrefix: "No.",
      defaultCategory: "ツール",
      pillStatus: {
        live: "公開中",
        beta: "ベータ",
        coming: "近日公開",
      },
      aboutThisProject: "プロジェクトについて",
      availableOn: "ダウンロード",
      ctaHeadline: "手に入れて。設定して。明日の朝も信じて。",
      ctaComingSoon: "近日公開",
      storePlaySub: "入手は",
      storePlayTitle: "Google Play",
      storeAppSub: "ダウンロード",
      storeAppTitle: "App Store",
    },
  },
} as const;

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getMessages(locale: Locale) {
  return messages[locale];
}
