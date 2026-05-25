import type { Locale } from "@/lib/i18n-messages";

export const PRIVACY_SLUGS = [
  "tapalarm",
  "colorzcam",
  "kanji2136",
  "lunamirror",
] as const;
export type PrivacySlug = (typeof PRIVACY_SLUGS)[number];

export type PrivacySection = {
  heading: string;
  body: string;
};

export type PrivacyLabels = {
  pageTitle: string;
  backToApps: string;
  effective: string;
  contactLine: string;
};

export type PrivacyContent = {
  appName: string;
  labels: PrivacyLabels;
  /** ISO date shown on the privacy page (e.g. 2026-05-25) */
  effectiveDate?: string;
  sections: PrivacySection[];
};

const LABELS: Record<Locale, PrivacyLabels> = {
  en: {
    pageTitle: "Privacy Policy",
    backToApps: "Back to apps",
    effective: "Effective",
    contactLine: "For questions about this policy, please use the email below.",
  },
  ko: {
    pageTitle: "개인정보처리방침",
    backToApps: "앱 목록으로",
    effective: "시행일",
    contactLine: "문의는 아래 이메일로 주세요.",
  },
  ja: {
    pageTitle: "プライバシーポリシー",
    backToApps: "アプリ一覧に戻る",
    effective: "施行日",
    contactLine: "本ポリシーに関するお問い合わせは、下記メールへご連絡ください。",
  },
};

/** Sections 3–7 (shared across apps, localized). */
const middleKo: PrivacySection[] = [
  {
    heading: "광고 (Google AdMob)",
    body: `본 앱은 Google LLC가 제공하는 Google AdMob을 통해 배너 광고를 표시합니다.
AdMob은 맞춤형 광고 제공과 광고 성과 측정을 위해 다음 정보를 수집·처리할 수 있습니다.

• 광고 식별자: iOS의 IDFA, Android의 광고 ID(AAID)
• 기기 정보: 모델명, OS 버전, 언어 설정, 화면 크기
• 대략적인 위치 정보: IP 주소 기반 국가/지역 수준
• 광고 상호작용: 노출, 클릭, 전환 데이터

수집된 정보는 Google의 서버(미국 등 해외)로 전송되어 처리됩니다.
Google의 개인정보처리방침: https://policies.google.com/privacy
Google의 광고 데이터 사용 안내: https://policies.google.com/technologies/ads

EEA / UK / 스위스 사용자에게는 GDPR 동의창을 통해 별도로 동의를 받습니다.`,
  },
  {
    heading: "제3자 서비스",
    body: `광고 표시와 관련해 Google AdMob 및 Google이 정한 방식으로 정보가 처리될 수 있습니다.
그 밖에 본 앱이 운영하는 계정 시스템이나 자체 분석 서버로 사용자 데이터를 보내지 않습니다.

제3자의 처리 방식은 각 사업자의 정책을 따릅니다. Google 관련 안내는 위 링크를 참고해 주세요.`,
  },
  {
    heading: "사용자 선택권 (iOS / Android)",
    body: `[iOS]
• 설정 > 개인정보 보호 및 보안 > 추적 에서 "앱이 추적을 요청하도록 허용" 옵션을 끄면
  IDFA 수집을 차단할 수 있습니다.
• 설정 > 개인정보 보호 및 보안 > Apple 광고 에서 개인 맞춤형 광고를 끌 수 있습니다.

[Android]
• 설정 > Google > 광고 에서 "광고 ID 삭제"를 선택하면 새로운 광고 ID가 발급됩니다.
• 같은 화면에서 "맞춤 광고 선택 해제"를 켜면 맞춤 광고 표시가 중단됩니다.

EEA / UK / 스위스 사용자는 앱 내에서 GDPR 동의를 언제든 철회할 수 있습니다.`,
  },
  {
    heading: "데이터 보관",
    body: `본 앱이 직접 운영하는 서버에 본 방침에서 설명한 학습·알람·촬영 데이터를 저장하지 않습니다. 기기에 남는 데이터는 앱을 삭제하거나 앱 데이터를 지우기 전까지 기기에 남을 수 있으며, 운영체제 정책에 따라 달라질 수 있습니다.
광고와 관련된 데이터는 Google의 정책에 따라 보관·삭제됩니다.`,
  },
  {
    heading: "아동 개인정보",
    body: `본 앱은 만 13세 미만(또는 거주 국가에서 요구하는 연령) 아동을 대상으로 하지 않습니다. 고의로 아동의 개인정보를 수집하지 않습니다. 그런 처리가 있었다고 판단되면 연락 주시면 적절히 조치하겠습니다.`,
  },
];

const middleEn: PrivacySection[] = [
  {
    heading: "Advertising (Google AdMob)",
    body: `This app shows banner ads through Google AdMob, provided by Google LLC. AdMob may collect and process the following information to deliver relevant ads and measure performance:

• Advertising ID: IDFA on iOS, advertising ID (AAID) on Android
• Device information: model, OS version, language, display size
• Approximate location: country or region level from IP address
• Ad interactions: impressions, clicks, and conversion-related data

This information may be sent to and processed on Google’s servers, including in the United States and other countries.

Google Privacy Policy: https://policies.google.com/privacy
How Google uses information for ads: https://policies.google.com/technologies/ads

For users in the EEA, UK, and Switzerland, we obtain separate consent through the GDPR consent flow in the app.`,
  },
  {
    heading: "Third-Party Services",
    body: `Ad delivery may involve processing by Google AdMob and Google according to their terms. This app does not send your app-specific data to account systems or analytics servers we operate.

How third parties handle data is governed by their own policies. For Google, please refer to the links above.`,
  },
  {
    heading: "Your Choices (iOS / Android)",
    body: `[iOS]
• Settings > Privacy & Security > Tracking: turn off “Allow Apps to Request to Track” to limit IDFA-related collection.
• Settings > Privacy & Security > Apple Advertising: you can turn off personalized ads.

[Android]
• Settings > Google > Ads: “Delete advertising ID” issues a new advertising ID.
• On the same screen, “Opt out of Ads Personalization” limits personalized ads.

Users in the EEA, UK, and Switzerland can withdraw GDPR consent in the app at any time.`,
  },
  {
    heading: "Data Retention",
    body: `We do not store the app-specific data described in this policy on servers we operate. Data kept on your device remains until you uninstall the app or clear app data, unless the OS removes it sooner. Ad-related data is retained according to Google’s policies.`,
  },
  {
    heading: "Children’s Privacy",
    body: `This app is not directed to children under 13 (or the age required in your country). We do not knowingly collect personal information from children. If you believe such data was processed in error, contact us and we will take appropriate steps.`,
  },
];

const middleJa: PrivacySection[] = [
  {
    heading: "広告（Google AdMob）",
    body: `本アプリは、Google LLC が提供する Google AdMob を通じてバナー広告を表示します。AdMob は、関連性の高い広告の配信や広告効果の測定のために、次のような情報を収集・処理する場合があります。

• 広告識別子：iOS の IDFA、Android の広告 ID（AAID）
• 端末情報：機種名、OS バージョン、言語設定、画面サイズ
• おおよその位置情報：IP アドレスに基づく国／地域レベル
• 広告の相互作用：表示、クリック、コンバージョンに関するデータ

収集された情報は、米国などの Google のサーバーに送信され、処理されることがあります。

Google のプライバシーポリシー：https://policies.google.com/privacy
広告におけるデータの使用：https://policies.google.com/technologies/ads

EEA／英国／スイスにお住まいの方には、アプリ内の GDPR 同意フローで別途同意を取得します。`,
  },
  {
    heading: "第三者サービス",
    body: `広告表示にあたり、Google AdMob および Google の定める方法により情報が処理されることがあります。本アプリが運用するアカウント基盤や、当方独自の解析サーバーへ利用者データを送ることはありません。

第三者の取り扱いは、各事業者のポリシーに従います。Google については上記リンクをご参照ください。`,
  },
  {
    heading: "ユーザーの選択（iOS / Android）",
    body: `[iOS]
• 設定 > プライバシーとセキュリティ > トラッキング で「アプリからのトラッキング許可を求めることを許可」をオフにすると、IDFA に関する収集を制限できます。
• 設定 > プライバシーとセキュリティ > Apple の広告 でパーソナライズされた広告をオフにできます。

[Android]
• 設定 > Google > 広告 で「広告 ID を削除」を選ぶと、新しい広告 ID が発行されます。
• 同じ画面で「パーソナライズされた広告をオプトアウトする」をオンにすると、パーソナライズされた広告表示を停止できます。

EEA／英国／スイスのユーザーは、アプリ内で GDPR の同意をいつでも撤回できます。`,
  },
  {
    heading: "データの保管",
    body: `本ポリシーで説明する学習・撮影・通知に関するデータを、当方が運用するサーバーに保存することはありません。端末内に残るデータは、アプリを削除するかアプリデータを消去するまで端末に残る場合があり、OS の方針により異なることがあります。広告関連のデータは、Google のポリシーに従って保管・削除されます。`,
  },
  {
    heading: "児童のプライバシー",
    body: `本アプリは、13 歳未満（またはお住まいの国で求められる年齢）の児童を対象としていません。児童から故意に個人情報を収集することはありません。誤ってそのような処理があったと思われる場合はご連絡ください。適切な対応を行います。`,
  },
];

const s8Ko: PrivacySection = {
  heading: "변경 및 문의",
  body: `본 방침은 법령 또는 서비스 변경에 따라 개정될 수 있으며,
중요한 변경이 있을 경우 본 페이지를 통해 사전에 안내합니다.

문의: watanid26@gmail.com
운영자: Watanid Studio`,
};

const s8En: PrivacySection = {
  heading: "Changes & Contact",
  body: `We may update this policy when laws or our services change. If changes are important, we will provide notice on this page when reasonable.

Contact: watanid26@gmail.com
Operator: Watanid Studio`,
};

const s8Ja: PrivacySection = {
  heading: "変更とお問い合わせ",
  body: `法令またはサービスの変更に伴い、本ポリシーを改定することがあります。重要な変更がある場合は、合理的な範囲で本ページを通じて事前にお知らせします。

お問い合わせ：watanid26@gmail.com
運営：Watanid Studio`,
};

const tapS1En: PrivacySection = {
  heading: "Information We Collect",
  body: `TapAlarm keeps your alarm times and settings only on your device. We do not operate servers that receive this data from the app. Google AdMob, which shows banner ads, may collect an advertising identifier and typical device information as described in the Advertising section.`,
};

const tapS2En: PrivacySection = {
  heading: "How We Use Information",
  body: `Information on your device is used only to run alarms and other app features locally. We do not use it for accounts, marketing emails, or our own server-side analytics. Ad-related processing is handled by Google as described below.`,
};

const tapS1Ko: PrivacySection = {
  heading: "수집하는 정보",
  body: `탭알람은 알람 시간과 설정값을 기기 안에만 저장합니다. 본 앱이 운영하는 서버로 해당 데이터를 보내지 않습니다. 배너 광고를 위해 Google AdMob이 광고 식별자와 일반적인 기기 정보를 수집할 수 있으며, 자세한 내용은 아래 광고 섹션을 참고해 주세요.`,
};

const tapS2Ko: PrivacySection = {
  heading: "정보 이용 목적",
  body: `기기에 저장된 정보는 알람과 앱 기능을 기기에서만 제공하는 데 사용합니다. 계정 생성, 마케팅 메일, 당사 자체 분석 서버로의 전송에는 사용하지 않습니다. 광고와 관련된 처리는 아래에 설명된 대로 Google이 담당합니다.`,
};

const tapS1Ja: PrivacySection = {
  heading: "収集する情報",
  body: `タップアラームは、アラームの時刻や設定を端末内にのみ保存します。当方が運用するサーバーへ当該データを送信することはありません。バナー広告の表示のため、Google AdMob が広告識別子や一般的な端末情報を収集する場合があり、詳細は下記の広告の項をご覧ください。`,
};

const tapS2Ja: PrivacySection = {
  heading: "情報の利用目的",
  body: `端末に保存された情報は、アラームやその他の機能を端末上で提供するためにのみ用います。アカウント作成、マーケティングメール、当方独自のサーバー側解析には使用しません。広告に関する処理は、下記のとおり Google が行います。`,
};

const camS1En: PrivacySection = {
  heading: "Information We Collect",
  body: `ColorzCam needs camera access to capture colors from your scene. Photos and extracted color values stay on your device; we do not upload them to servers we operate. Google AdMob may collect an advertising identifier and typical device information for ads, as described below.`,
};

const camS2En: PrivacySection = {
  heading: "How We Use Information",
  body: `Camera-derived data is used only on your device to show palettes and related features. We do not use it for remote profiles or marketing on our servers. Ad-related processing is handled by Google as described below.`,
};

const camS1Ko: PrivacySection = {
  heading: "수집하는 정보",
  body: `ColorzCam은 색을 추출하기 위해 카메라 접근이 필요합니다. 촬영된 이미지와 추출된 색상값은 기기 내부에만 저장되며, 당사가 운영하는 서버로 전송되지 않습니다. Google AdMob이 광고 식별자와 일반적인 기기 정보를 수집할 수 있으며, 자세한 내용은 아래 광고 섹션을 참고해 주세요.`,
};

const camS2Ko: PrivacySection = {
  heading: "정보 이용 목적",
  body: `카메라로 얻은 데이터는 기기에서 팔레트 등 기능을 제공하는 데만 사용합니다. 원격 프로필이나 당사 서버 기반 마케팅에는 사용하지 않습니다. 광고 관련 처리는 아래에 설명된 대로 Google이 담당합니다.`,
};

const camS1Ja: PrivacySection = {
  heading: "収集する情報",
  body: `ColorzCam は色を抽出するためにカメラへのアクセスが必要です。撮影画像と抽出した色の値は端末内にのみ保存し、当方が運用するサーバーへアップロードしません。Google AdMob が広告識別子や一般的な端末情報を収集する場合があり、詳細は下記の広告の項をご覧ください。`,
};

const camS2Ja: PrivacySection = {
  heading: "情報の利用目的",
  body: `カメラから得たデータは、端末上でパレットなどの機能を提供するためにのみ用います。遠隔プロフィールや当方サーバー上のマーケティングには使用しません。広告に関する処理は、下記のとおり Google が行います。`,
};

const kanjiS1En: PrivacySection = {
  heading: "Information We Collect",
  body: `Study progress, favorites, and related learning data are stored only on your device. We do not send this learning data to servers we operate. Google AdMob may collect an advertising identifier and typical device information for ads, as described below.`,
};

const kanjiS2En: PrivacySection = {
  heading: "How We Use Information",
  body: `This information powers study features locally on your device. We do not use it for accounts or analytics on our own servers. Ad-related processing is handled by Google as described below.`,
};

const kanjiS1Ko: PrivacySection = {
  heading: "수집하는 정보",
  body: `학습 진행도와 즐겨찾기 등 학습 관련 데이터는 기기 내부에만 저장합니다. 당사가 운영하는 서버로 학습 데이터를 보내지 않습니다. Google AdMob이 광고 식별자와 일반적인 기기 정보를 수집할 수 있으며, 자세한 내용은 아래 광고 섹션을 참고해 주세요.`,
};

const kanjiS2Ko: PrivacySection = {
  heading: "정보 이용 목적",
  body: `해당 정보는 기기에서 학습 기능을 제공하는 데만 사용합니다. 계정이나 당사 자체 서버 분석에는 사용하지 않습니다. 광고 관련 처리는 아래에 설명된 대로 Google이 담당합니다.`,
};

const kanjiS1Ja: PrivacySection = {
  heading: "収集する情報",
  body: `学習の進捗、お気に入り、関連する学習データは端末内にのみ保存します。当方が運用するサーバーへ学習データを送信しません。Google AdMob が広告識別子や一般的な端末情報を収集する場合があり、詳細は下記の広告の項をご覧ください。`,
};

const kanjiS2Ja: PrivacySection = {
  heading: "情報の利用目的",
  body: `これらの情報は、端末上で学習機能を提供するためにのみ用います。アカウントや当方独自のサーバー解析には使用しません。広告に関する処理は、下記のとおり Google が行います。`,
};

/** Kanji 2136 – additional sections (Subscriptions, Notifications) and updated middle sections */
const kanjiMiddleEn: PrivacySection[] = [
  {
    heading: "Advertising (Google AdMob)",
    body: `This app shows banner ads through Google AdMob, provided by Google LLC. AdMob may collect and process the following information to deliver relevant ads and measure performance:

• Advertising ID: IDFA on iOS, advertising ID (AAID) on Android
• Device information: model, OS version, language, display size
• Approximate location: country or region level from IP address
• Ad interactions: impressions, clicks, and conversion-related data

This information may be sent to and processed on Google's servers, including in the United States and other countries.

Google Privacy Policy: https://policies.google.com/privacy
How Google uses information for ads: https://policies.google.com/technologies/ads

For users in the EEA, UK, and Switzerland, we obtain separate consent through the GDPR consent flow in the app.`,
  },
  {
    heading: "Subscriptions & In-App Purchases",
    body: `This app offers optional auto-renewable subscriptions. Purchases on iOS are processed by Apple Inc. through the App Store. Purchases on Android are processed by Google LLC through Google Play. We do not collect, store, or have access to your payment card information or billing details. All payment data is handled entirely by Apple or Google according to their respective policies.

Apple Privacy Policy: https://www.apple.com/legal/privacy/
Google Play Terms of Service: https://play.google.com/about/play-terms/`,
  },
  {
    heading: "Notifications",
    body: `This app may request permission to send local notifications for review reminders. Notification scheduling and delivery are handled entirely on your device. No notification content or timing data is transmitted to any server we operate.`,
  },
  {
    heading: "Third-Party Services",
    body: `Ad delivery may involve processing by Google AdMob and Google according to their terms. This app does not send your app-specific data to account systems or analytics servers we operate.

How third parties handle data is governed by their own policies. For Google, please refer to the links above.`,
  },
  {
    heading: "Your Choices (iOS / Android)",
    body: `[iOS]
• Settings > Privacy & Security > Tracking: turn off "Allow Apps to Request to Track" to limit IDFA-related collection.
• Settings > Privacy & Security > Apple Advertising: you can turn off personalized ads.
• Settings > Notifications: you can disable review reminder notifications at any time.

[Android]
• Settings > Google > Ads: "Delete advertising ID" issues a new advertising ID.
• On the same screen, "Opt out of Ads Personalization" limits personalized ads.
• Settings > Apps > Kanji 2136 > Notifications: you can disable notifications at any time.

Users in the EEA, UK, and Switzerland can withdraw GDPR consent in the app at any time.`,
  },
  {
    heading: "Data Retention",
    body: `We do not store the app-specific data described in this policy on servers we operate. Data kept on your device remains until you uninstall the app or clear app data, unless the OS removes it sooner. Ad-related data is retained according to Google's policies. Subscription status is managed by Apple or Google and retained according to their policies.`,
  },
  {
    heading: "Children's Privacy",
    body: `This app is not directed to children under 13 (or the age required in your country). We do not knowingly collect personal information from children. If you believe such data was processed in error, contact us and we will take appropriate steps.`,
  },
];

const kanjiMiddleKo: PrivacySection[] = [
  {
    heading: "광고 (Google AdMob)",
    body: `본 앱은 Google LLC가 제공하는 Google AdMob을 통해 배너 광고를 표시합니다.
AdMob은 맞춤형 광고 제공과 광고 성과 측정을 위해 다음 정보를 수집·처리할 수 있습니다.

• 광고 식별자: iOS의 IDFA, Android의 광고 ID(AAID)
• 기기 정보: 모델명, OS 버전, 언어 설정, 화면 크기
• 대략적인 위치 정보: IP 주소 기반 국가/지역 수준
• 광고 상호작용: 노출, 클릭, 전환 데이터

수집된 정보는 Google의 서버(미국 등 해외)로 전송되어 처리됩니다.
Google의 개인정보처리방침: https://policies.google.com/privacy
Google의 광고 데이터 사용 안내: https://policies.google.com/technologies/ads

EEA / UK / 스위스 사용자에게는 GDPR 동의창을 통해 별도로 동의를 받습니다.`,
  },
  {
    heading: "구독 및 인앱 구매",
    body: `본 앱은 선택적 자동 갱신 구독을 제공합니다. iOS의 결제는 App Store를 통해 Apple Inc.가, Android의 결제는 Google Play를 통해 Google LLC가 처리합니다. 당사는 결제 카드 정보나 청구 정보를 수집·저장하거나 접근하지 않습니다. 모든 결제 데이터는 Apple 또는 Google이 각자의 정책에 따라 전적으로 처리합니다.

Apple 개인정보처리방침: https://www.apple.com/legal/privacy/
Google Play 서비스 약관: https://play.google.com/about/play-terms/`,
  },
  {
    heading: "알림",
    body: `본 앱은 복습 알림을 위해 로컬 알림 권한을 요청할 수 있습니다. 알림 예약 및 전송은 기기에서만 처리됩니다. 알림 내용이나 시간 데이터는 당사가 운영하는 서버로 전송되지 않습니다.`,
  },
  {
    heading: "제3자 서비스",
    body: `광고 표시와 관련해 Google AdMob 및 Google이 정한 방식으로 정보가 처리될 수 있습니다.
그 밖에 본 앱이 운영하는 계정 시스템이나 자체 분석 서버로 사용자 데이터를 보내지 않습니다.

제3자의 처리 방식은 각 사업자의 정책을 따릅니다. Google 관련 안내는 위 링크를 참고해 주세요.`,
  },
  {
    heading: "사용자 선택권 (iOS / Android)",
    body: `[iOS]
• 설정 > 개인정보 보호 및 보안 > 추적 에서 "앱이 추적을 요청하도록 허용" 옵션을 끄면
  IDFA 수집을 차단할 수 있습니다.
• 설정 > 개인정보 보호 및 보안 > Apple 광고 에서 개인 맞춤형 광고를 끌 수 있습니다.
• 설정 > 알림 에서 복습 알림을 언제든지 끌 수 있습니다.

[Android]
• 설정 > Google > 광고 에서 "광고 ID 삭제"를 선택하면 새로운 광고 ID가 발급됩니다.
• 같은 화면에서 "맞춤 광고 선택 해제"를 켜면 맞춤 광고 표시가 중단됩니다.
• 설정 > 앱 > Kanji 2136 > 알림 에서 알림을 언제든지 끌 수 있습니다.

EEA / UK / 스위스 사용자는 앱 내에서 GDPR 동의를 언제든 철회할 수 있습니다.`,
  },
  {
    heading: "데이터 보관",
    body: `본 앱이 직접 운영하는 서버에 본 방침에서 설명한 학습·알림 데이터를 저장하지 않습니다. 기기에 남는 데이터는 앱을 삭제하거나 앱 데이터를 지우기 전까지 기기에 남을 수 있으며, 운영체제 정책에 따라 달라질 수 있습니다.
광고와 관련된 데이터는 Google의 정책에 따라 보관·삭제됩니다. 구독 상태는 Apple 또는 Google이 관리하며 각 사의 정책에 따라 보관됩니다.`,
  },
  {
    heading: "아동 개인정보",
    body: `본 앱은 만 13세 미만(또는 거주 국가에서 요구하는 연령) 아동을 대상으로 하지 않습니다. 고의로 아동의 개인정보를 수집하지 않습니다. 그런 처리가 있었다고 판단되면 연락 주시면 적절히 조치하겠습니다.`,
  },
];

const kanjiMiddleJa: PrivacySection[] = [
  {
    heading: "広告（Google AdMob）",
    body: `本アプリは、Google LLC が提供する Google AdMob を通じてバナー広告を表示します。AdMob は、関連性の高い広告の配信や広告効果の測定のために、次のような情報を収集・処理する場合があります。

• 広告識別子：iOS の IDFA、Android の広告 ID（AAID）
• 端末情報：機種名、OS バージョン、言語設定、画面サイズ
• おおよその位置情報：IP アドレスに基づく国／地域レベル
• 広告の相互作用：表示、クリック、コンバージョンに関するデータ

収集された情報は、米国などの Google のサーバーに送信され、処理されることがあります。

Google のプライバシーポリシー：https://policies.google.com/privacy
広告におけるデータの使用：https://policies.google.com/technologies/ads

EEA／英国／スイスにお住まいの方には、アプリ内の GDPR 同意フローで別途同意を取得します。`,
  },
  {
    heading: "サブスクリプションとアプリ内購入",
    body: `本アプリはオプションの自動更新サブスクリプションを提供しています。iOS での購入は App Store を通じて Apple Inc. が、Android での購入は Google Play を通じて Google LLC が処理します。当方は、お客様のお支払いカード情報や請求の詳細を収集・保存したり、アクセスしたりすることはありません。すべての決済データは、Apple または Google がそれぞれのポリシーに従い全面的に処理します。

Apple プライバシーポリシー：https://www.apple.com/legal/privacy/
Google Play 利用規約：https://play.google.com/about/play-terms/`,
  },
  {
    heading: "通知",
    body: `本アプリは、復習リマインダーのためにローカル通知の許可をリクエストすることがあります。通知のスケジューリングと配信はすべて端末上で処理されます。通知の内容やタイミングのデータが当方の運用するサーバーに送信されることはありません。`,
  },
  {
    heading: "第三者サービス",
    body: `広告表示にあたり、Google AdMob および Google の定める方法により情報が処理されることがあります。本アプリが運用するアカウント基盤や、当方独自の解析サーバーへ利用者データを送ることはありません。

第三者の取り扱いは、各事業者のポリシーに従います。Google については上記リンクをご参照ください。`,
  },
  {
    heading: "ユーザーの選択（iOS / Android）",
    body: `[iOS]
• 設定 > プライバシーとセキュリティ > トラッキング で「アプリからのトラッキング許可を求めることを許可」をオフにすると、IDFA に関する収集を制限できます。
• 設定 > プライバシーとセキュリティ > Apple の広告 でパーソナライズされた広告をオフにできます。
• 設定 > 通知 で復習リマインダー通知をいつでも無効にできます。

[Android]
• 設定 > Google > 広告 で「広告 ID を削除」を選ぶと、新しい広告 ID が発行されます。
• 同じ画面で「パーソナライズされた広告をオプトアウトする」をオンにすると、パーソナライズされた広告表示を停止できます。
• 設定 > アプリ > Kanji 2136 > 通知 で通知をいつでも無効にできます。

EEA／英国／スイスのユーザーは、アプリ内で GDPR の同意をいつでも撤回できます。`,
  },
  {
    heading: "データの保管",
    body: `本ポリシーで説明する学習・通知に関するデータを、当方が運用するサーバーに保存することはありません。端末内に残るデータは、アプリを削除するかアプリデータを消去するまで端末に残る場合があり、OS の方針により異なることがあります。広告関連のデータは、Google のポリシーに従って保管・削除されます。サブスクリプションの状態は Apple または Google が管理し、それぞれのポリシーに従って保管されます。`,
  },
  {
    heading: "児童のプライバシー",
    body: `本アプリは、13 歳未満（またはお住まいの国で求められる年齢）の児童を対象としていません。児童から故意に個人情報を収集することはありません。誤ってそのような処理があったと思われる場合はご連絡ください。適切な対応を行います。`,
  },
];

function middleSections(locale: Locale): PrivacySection[] {
  switch (locale) {
    case "en":
      return middleEn;
    case "ko":
      return middleKo;
    default:
      return middleJa;
  }
}

function section8(locale: Locale): PrivacySection {
  switch (locale) {
    case "en":
      return s8En;
    case "ko":
      return s8Ko;
    default:
      return s8Ja;
  }
}

const lunaS1En: PrivacySection = {
  heading: "Information We Collect",
  body: `App settings (color temperature, brightness, flip, and zoom) are stored only on your device. The camera feed is processed in real-time locally and is never saved or transmitted. We do not send this data to servers we operate. Google AdMob may collect an advertising identifier and typical device information for ads, as described below.`,
};

const lunaS2En: PrivacySection = {
  heading: "How We Use Information",
  body: `Settings power the mirror features locally on your device. We do not use any data for accounts and analytics on our own servers. Ad-related processing is handled by Google as described below.`,
};

const lunaS1Ko: PrivacySection = {
  heading: "수집하는 정보",
  body: `색온도, 밝기, 좌우반전, 확대/축소 등 앱 설정값은 기기에만 저장됩니다. 카메라 영상은 실시간으로 기기 내에서만 처리되며, 저장되거나 외부로 전송되지 않습니다. 당사가 운영하는 서버로 이 데이터를 전송하지 않습니다. Google AdMob은 아래에 설명된 바와 같이 광고 식별자 및 기기 정보를 수집할 수 있습니다.`,
};

const lunaS2Ko: PrivacySection = {
  heading: "정보 이용 방법",
  body: `설정값은 기기에서 거울 기능을 구동하는 데만 사용됩니다. 당사 서버에서 계정이나 분석 목적으로 데이터를 사용하지 않습니다. 광고 관련 처리는 아래에 설명된 Google에 의해 이루어집니다.`,
};

const lunaS1Ja: PrivacySection = {
  heading: "収集する情報",
  body: `色温度、明るさ、左右反転、ズームなどのアプリ設定は、お使いのデバイスにのみ保存されます。カメラ映像はリアルタイムでデバイス内のみで処理され、保存または外部に送信されることはありません。当社が運営するサーバーにこのデータを送信することはありません。Google AdMobは、以下に説明するとおり、広告識別子および標準的なデバイス情報を収集する場合があります。`,
};

const lunaS2Ja: PrivacySection = {
  heading: "情報の利用方法",
  body: `設定は、デバイス上でミラー機能を動作させるためにのみ使用されます。当社のサーバーでアカウントや分析目的でデータを使用することはありません。広告関連の処理は、以下に説明するGoogleによって行われます。`,
};

const lunaMiddleEn: PrivacySection[] = [
  {
    heading: "Advertising (Google AdMob)",
    body: `This app shows banner ads through Google AdMob, provided by Google LLC. AdMob may collect and process the following information to deliver relevant ads and measure performance:

• Advertising ID: IDFA on iOS, advertising ID (AAID) on Android
• Device information: model, OS version, language, display size
• Approximate location: country or region level from IP address
• Ad interactions: impressions, clicks, and conversion-related data

This information may be sent to and processed on Google's servers, including in the United States and other countries.

Google Privacy Policy: https://policies.google.com/privacy
How Google uses information for ads: https://policies.google.com/technologies/ads

For users in the EEA, UK, and Switzerland, we obtain separate consent through the GDPR consent flow in the app.`,
  },
  {
    heading: "Camera",
    body: `This app uses the front camera solely to display a real-time mirror preview on your screen. Camera images are processed entirely on your device and are never recorded, stored, or transmitted.`,
  },
  {
    heading: "Third-Party Services",
    body: `Ad delivery may involve processing by Google AdMob and Google according to their terms. This app does not send your app-specific data to account systems or analytics servers we operate.

How third parties handle data is governed by their own policies. For Google, please refer to the links above.`,
  },
  {
    heading: "Your Choices (iOS / Android)",
    body: `[iOS]
• Settings > Privacy & Security > Tracking: turn off "Allow Apps to Request to Track" to limit IDFA-related collection.
• Settings > Privacy & Security > Apple Advertising: you can turn off personalized ads.

[Android]
• Settings > Google > Ads: "Delete advertising ID" issues a new advertising ID.
• On the same screen, "Opt out of Ads Personalization" limits personalized ads.

Users in the EEA, UK, and Switzerland can withdraw GDPR consent in the app at any time.`,
  },
  {
    heading: "Data Retention",
    body: `We do not store the app-specific data described in this policy on servers we operate. Data kept on your device remains until you uninstall the app or clear app data, unless the OS removes it sooner. Ad-related data is retained according to Google's policies.`,
  },
  {
    heading: "Children's Privacy",
    body: `This app is not directed to children under 13 (or the age required in your country). We do not knowingly collect personal information from children. If you believe such data was processed in error, contact us and we will take appropriate steps.`,
  },
];

const lunaMiddleKo: PrivacySection[] = [
  {
    heading: "광고 (Google AdMob)",
    body: `이 앱은 Google LLC에서 제공하는 Google AdMob을 통해 배너 광고를 표시합니다. AdMob은 관련 광고 게재 및 성과 측정을 위해 다음 정보를 수집·처리할 수 있습니다:

• 광고 ID: iOS의 IDFA, Android의 광고 ID(AAID)
• 기기 정보: 모델, OS 버전, 언어, 화면 크기
• 대략적인 위치: IP 주소를 통한 국가 또는 지역 수준
• 광고 상호작용: 노출, 클릭 및 전환 관련 데이터

이 정보는 미국을 포함한 여러 국가에 있는 Google 서버로 전송되어 처리될 수 있습니다.

Google 개인정보처리방침: https://policies.google.com/privacy
Google의 광고 정보 활용 방식: https://policies.google.com/technologies/ads

EEA, 영국, 스위스 이용자의 경우 앱 내 GDPR 동의 절차를 통해 별도의 동의를 받습니다.`,
  },
  {
    heading: "카메라",
    body: `이 앱은 화면에 실시간 거울 미리보기를 표시하기 위한 목적으로만 전면 카메라를 사용합니다. 카메라 영상은 기기 내에서만 처리되며, 녹화·저장·전송되지 않습니다.`,
  },
  {
    heading: "제3자 서비스",
    body: `광고 게재에는 Google AdMob 및 Google의 약관에 따른 처리가 포함될 수 있습니다. 이 앱은 당사가 운영하는 계정 시스템이나 분석 서버로 앱 고유 데이터를 전송하지 않습니다.

제3자의 데이터 처리 방식은 해당 업체의 정책에 따릅니다. Google의 경우 위의 링크를 참고하시기 바랍니다.`,
  },
  {
    heading: "이용자 선택 (iOS / Android)",
    body: `[iOS]
• 설정 > 개인정보 보호 및 보안 > 추적: '앱이 추적을 요청하도록 허용'을 끄면 IDFA 관련 수집을 제한할 수 있습니다.
• 설정 > 개인정보 보호 및 보안 > Apple 광고: 개인화 광고를 끌 수 있습니다.

[Android]
• 설정 > Google > 광고: '광고 ID 삭제'를 선택하면 새 광고 ID가 발급됩니다.
• 같은 화면에서 '광고 개인 최적화 사용 중지'를 선택하면 맞춤 광고를 제한할 수 있습니다.

EEA, 영국, 스위스 이용자는 앱 내에서 언제든지 GDPR 동의를 철회할 수 있습니다.`,
  },
  {
    heading: "데이터 보유",
    body: `이 정책에 설명된 앱 고유 데이터는 당사가 운영하는 서버에 저장되지 않습니다. 기기에 저장된 데이터는 앱을 삭제하거나 앱 데이터를 초기화할 때까지 유지됩니다(OS에 의해 더 빨리 삭제될 수 있음). 광고 관련 데이터는 Google의 정책에 따라 보유됩니다.`,
  },
  {
    heading: "아동 개인정보",
    body: `이 앱은 13세 미만(또는 해당 국가에서 요구하는 연령 미만)의 아동을 대상으로 하지 않습니다. 아동의 개인정보를 의도적으로 수집하지 않습니다. 해당 데이터가 잘못 처리되었다고 생각되면 문의해 주시면 적절한 조치를 취하겠습니다.`,
  },
];

const lunaMiddleJa: PrivacySection[] = [
  {
    heading: "広告（Google AdMob）",
    body: `このアプリは、Google LLCが提供するGoogle AdMobを通じてバナー広告を表示します。AdMobは、関連性の高い広告の配信や効果測定のために、以下の情報を収集・処理する場合があります：

• 広告ID：iOSのIDFA、AndroidのAdvertising ID（AAID）
• デバイス情報：機種名、OSバージョン、言語、画面サイズ
• おおよその位置情報：IPアドレスから判定される国または地域レベル
• 広告インタラクション：インプレッション、クリック、コンバージョン関連データ

この情報は、米国を含む複数の国のGoogleのサーバーに送信され処理される場合があります。

Googleプライバシーポリシー: https://policies.google.com/privacy
Googleの広告への情報活用方法: https://policies.google.com/technologies/ads

EEA、英国、スイスのユーザーには、アプリ内のGDPR同意フローを通じて別途同意を取得します。`,
  },
  {
    heading: "カメラ",
    body: `このアプリは、画面にリアルタイムのミラープレビューを表示する目的のみで前面カメラを使用します。カメラ映像はデバイス内のみで処理され、録画・保存・送信されることはありません。`,
  },
  {
    heading: "第三者サービス",
    body: `広告配信には、Google AdMobおよびGoogleの利用規約に従った処理が含まれる場合があります。このアプリは、当社が運営するアカウントシステムや分析サーバーにアプリ固有のデータを送信しません。

第三者によるデータ処理は、各社のポリシーに基づきます。Googleについては、上記のリンクをご参照ください。`,
  },
  {
    heading: "お客様の選択（iOS / Android）",
    body: `[iOS]
• 設定 > プライバシーとセキュリティ > トラッキング：「アプリにトラッキングの許可を求めることを許可」をオフにすると、IDFA関連の収集を制限できます。
• 設定 > プライバシーとセキュリティ > Appleの広告：パーソナライズ広告をオフにできます。

[Android]
• 設定 > Google > 広告：「広告IDを削除」で新しい広告IDが発行されます。
• 同じ画面で「広告のパーソナライズをオプトアウト」を選択すると、パーソナライズ広告を制限できます。

EEA、英国、スイスのユーザーは、アプリ内でいつでもGDPRの同意を撤回できます。`,
  },
  {
    heading: "データの保持",
    body: `このポリシーに記載されたアプリ固有のデータは、当社が運営するサーバーには保存されません。デバイスに保存されたデータは、アプリをアンインストールするかアプリデータを消去するまで保持されます（OSによってより早く削除される場合があります）。広告関連データはGoogleのポリシーに従い保持されます。`,
  },
  {
    heading: "子どものプライバシー",
    body: `このアプリは、13歳未満（またはお住まいの国で定められた年齢未満）の子どもを対象としていません。子どもの個人情報を意図的に収集することはありません。誤ってデータが処理されたと思われる場合は、ご連絡いただければ適切な措置を講じます。`,
  },
];

function buildContent(
  locale: Locale,
  appName: string,
  s1: PrivacySection,
  s2: PrivacySection,
): PrivacyContent {
  return {
    appName,
    labels: LABELS[locale],
    sections: [s1, s2, ...middleSections(locale), section8(locale)],
  };
}

const privacyBySlug: Record<PrivacySlug, Record<Locale, PrivacyContent>> = {
  tapalarm: {
    en: buildContent("en", "TapAlarm", tapS1En, tapS2En),
    ko: buildContent("ko", "탭알람", tapS1Ko, tapS2Ko),
    ja: buildContent("ja", "タップアラーム", tapS1Ja, tapS2Ja),
  },
  colorzcam: {
    en: buildContent("en", "ColorzCam", camS1En, camS2En),
    ko: buildContent("ko", "ColorzCam", camS1Ko, camS2Ko),
    ja: buildContent("ja", "ColorzCam", camS1Ja, camS2Ja),
  },
  kanji2136: {
    en: {
      appName: "Kanji 2136",
      labels: LABELS["en"],
      sections: [kanjiS1En, kanjiS2En, ...kanjiMiddleEn, s8En],
    },
    ko: {
      appName: "Kanji 2136",
      labels: LABELS["ko"],
      sections: [kanjiS1Ko, kanjiS2Ko, ...kanjiMiddleKo, s8Ko],
    },
    ja: {
      appName: "Kanji 2136",
      labels: LABELS["ja"],
      sections: [kanjiS1Ja, kanjiS2Ja, ...kanjiMiddleJa, s8Ja],
    },
  },
  lunamirror: {
    en: {
      appName: "Luna Mirror",
      labels: LABELS["en"],
      effectiveDate: "2026-05-25",
      sections: [lunaS1En, lunaS2En, ...lunaMiddleEn, s8En],
    },
    ko: {
      appName: "루나 미러",
      labels: LABELS["ko"],
      effectiveDate: "2026-05-25",
      sections: [lunaS1Ko, lunaS2Ko, ...lunaMiddleKo, s8Ko],
    },
    ja: {
      appName: "ルナミラー",
      labels: LABELS["ja"],
      effectiveDate: "2026-05-25",
      sections: [lunaS1Ja, lunaS2Ja, ...lunaMiddleJa, s8Ja],
    },
  },
};

export function isPrivacySlug(value: string): value is PrivacySlug {
  return (PRIVACY_SLUGS as readonly string[]).includes(value);
}

export function getPrivacyContent(slug: PrivacySlug, locale: Locale): PrivacyContent {
  const row = privacyBySlug[slug];
  const order: Locale[] = [locale, "ko", "en", "ja"];
  const seen = new Set<Locale>();
  for (const l of order) {
    if (seen.has(l)) continue;
    seen.add(l);
    const block = row[l];
    if (block) return block;
  }
  return row.en;
}
