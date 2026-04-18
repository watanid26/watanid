# Watanid — About & App Detail 페이지 리디자인

## 0. 컨텍스트

**스택:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · framer-motion
**브랜드:** Watanid Studio (혼자 운영하는 작은 도구 메이커)
**디자인 컬러:** Olive `#6B705C` (=`var(--primary)` / Tailwind `bg-primary`), off-white `#fafaf9`, stone palette
**파일 구조:**
```
app/
  about/page.tsx              ← thin orchestration, 그대로 두기
  apps/[slug]/page.tsx        ← thin orchestration, 그대로 두기
components/
  AboutContent.tsx            ★ 풀 리라이트
  AppDetailShowcase.tsx       ★ 풀 리라이트
  Container.tsx               그대로 사용
  StoreBadgeLinks.tsx         스타일 업그레이드 (선택)
lib/a
  i18n-messages.ts            ★ 새 키 추가 (en/ko/ja)
  types.ts                    ★ AppRecord에 옵셔널 필드 3개 추가
data/
  apps.json                   ★ 옵셔널 필드 채우기 (있는 것만)
```

목표는 **Red Dot 디자인 어워드 수준의 에디토리얼 디테일**. 평범한 포트폴리오 사이트가 아니라, 큐레이션된 디자이너 모노그래프처럼 보여야 함.

---

## 1. 데이터 모델 확장 (선결 작업)

`lib/types.ts`의 `AppRecord`에 옵셔널 필드 3개 추가. **모두 옵셔널** (기존 데이터 호환).

```ts
export type AppRecord = {
  // ...기존 필드 그대로
  category?: string;          // 예: "Utility", "Health", "Productivity"
  version?: string;           // 예: "v1.2"
  year?: number;              // 예: 2025
};
```

`data/apps.json`의 TapAlarm에 채우기 (예시):
```json
{
  "category": "Utility",
  "version": "v1.2",
  "year": 2025
}
```

`lib/apps.ts`의 `getAppCopy()` 수정 불필요. 컴포넌트에서 `app.category ?? null` 식으로 옵셔널 처리.

---

## 2. About 페이지 — Editorial Monograph

### 컨셉 한 줄
디자이너의 책 첫 페이지처럼, **타이포그래피와 여백이 거의 전부인 에디토리얼 모노그래프**.

### 섹션 구조 (위→아래)

#### (a) 메타 스트립
hero 위에 가는 모노스페이스 라인 한 줄. 글자 사이 dot으로 구분.
```
MANIFESTO  •  WATANID STUDIO  •  EST. 2025
```
- `font-mono`, `text-[11px]`, `tracking-[0.18em]`, `uppercase`, `text-stone-400`
- dot은 `w-1 h-1 rounded-full bg-primary`
- gap-6
- 상단 `border-b border-stone-200`까지 거리 만들기 위해 `pt-7 pb-3` 정도

#### (b) Hero quote
큰 인용 부호로 시작하는 문장 hero.
```
"
I share things I build because I _actually_ need them.
```
- 큰 `"` 글리프: serif 폰트 (`font-serif` 또는 inline `font-family: 'Cormorant Garamond', Georgia, serif`), `font-size: 180px`, color `text-primary`, 약간 opacity (0.85), `line-height: 0.7`로 본문에 살짝 침범
- 본문: `text-[clamp(2.5rem,5.5vw,4.25rem)]` `font-semibold` `leading-[1.05]` `tracking-[-0.035em]` `max-w-[16ch]`
- "actually" 단어 하나만 italic + serif + `text-primary` + `tracking-[-0.02em]`로 강조 (한국어/일본어는 다른 강조어 골라서 동일 트리트먼트)
- 그 아래 `signature` 라인:
  ```
  MIN HO JIN ─── FOUNDER & MAKER
  ```
  - 모노 11px tracking-wide uppercase text-stone-400
  - 가운데 1px 라인 32px 너비

#### (c) Principles 섹션
상단 `border-t border-stone-200`로 구분.

헤더는 2컬럼 그리드: 왼쪽 작은 라벨 "PRINCIPLES" + 오른쪽 큰 sub-headline ("Three rules I keep coming back to when deciding what to ship.")
- `grid-cols-[1fr_2fr] gap-20`
- 왼쪽: `font-mono text-[11px] tracking-[0.22em] uppercase text-stone-400`
- 오른쪽: `text-4xl font-medium leading-[1.22] tracking-[-0.025em]` `max-w-[22ch]`

원칙 리스트는 3-컬럼 그리드 `grid-cols-[0.6fr_2.4fr_1fr] gap-15`:
- 컬럼 1: 번호 (`01`, `02`, `03`) — serif italic 28px text-primary
- 컬럼 2: 제목 + 본문
  - 제목: `text-[22px] font-medium leading-[1.3] tracking-[-0.018em]`
  - 본문: `text-[15px] font-light leading-[1.65] text-stone-500 max-w-[50ch]`
- 컬럼 3: 짧은 태그 (예: NECESSITY, RESTRAINT, TRUST)
  - 모노 10px tracking-[0.22em] uppercase text-stone-400 right-aligned

각 원칙 사이 `border-t border-stone-200`. 첫 원칙은 `border-t border-stone-800` (살짝 진한 라인으로 시작점 표시).

각 원칙 padding: `py-12`.

#### (d) Mascot moment
2컬럼 grid `grid-cols-2 gap-20`, `py-32`, 양쪽 keyline border-t/-b.
- 왼쪽: aspect-square cream 박스 (`bg-[#f1efea]`), 마스코트를 `padding: 64px`로 배치, max-w 420px 가운데 정렬. **마스코트 색상은 olive (#6B705C) ink 버전 사용** (cream 배경에 잘 보이도록)
- 오른쪽:
  - 작은 라벨 "FIELD NOTES" (mono 11px tracking)
  - serif italic 인용구: `text-[36px] leading-[1.3] font-medium tracking-[-0.015em] text-stone-800` (28자 max-w)
  - 작은 attribution "— Watanid, on craft" (text-stone-400, 12px)

문구 예시: *"The best tools disappear. You only notice them on the days they're missing."*

#### (e) Contact
`border-t border-stone-200`로 구분. 2컬럼 `grid-cols-[1fr_2fr] gap-20`.
- 왼쪽: 큰 sub-headline "Get in touch." `text-4xl font-medium tracking-[-0.025em] max-w-[14ch]`
- 오른쪽: 키-밸류 행들. 각 행은 `grid-cols-[100px_1fr] gap-6 items-baseline border-b border-stone-200 pb-7`
  - 키: 모노 11px tracking-[0.18em] uppercase text-stone-400
  - 값: `text-[22px] font-normal tracking-[-0.015em]`
  - 행: Email · GitHub · "Reply within" (마지막 행 값은 muted: `text-stone-500 font-light`)
- 마지막 행은 border-bottom 없음

#### (f) Footer signature
좌우 분할 모노 라인:
- 왼쪽: `WATANID · BUILT QUIETLY`
- 오른쪽: `V1 · 2025`
- 모노 10px tracking-[0.22em] uppercase text-stone-400, `pt-12 pb-16`

### 애니메이션
기존 `Reveal` 컴포넌트 패턴 유지 (`framer-motion`, ease `[0.16, 1, 0.3, 1]`). 각 섹션 진입 시 `opacity 0 → 1`, `y 22 → 0`, duration 0.4–0.5s, principles는 stagger 0.07s.

### 데이터 매핑
기존 `intro` / `paragraphs` props 유지하되, **principles 섹션의 3개 원칙은 `paragraphs` 배열을 사용**. 각 paragraph에서 첫 문장을 제목, 나머지를 본문으로 분리 (`splitSentences()` 헬퍼 재사용). 태그(NECESSITY/RESTRAINT/TRUST)는 i18n에서 인덱스별로 가져옴.

---

## 3. App Detail 페이지 — Studio Showcase

### 컨셉 한 줄
**거대 타이포 + 풀-블리드 컬러 블록**으로 프로덕트를 연극적으로 발표하는 케이스 스터디.

### 섹션 구조 (위→아래)

#### (a) Crumb bar (상단 cream 띠)
sticky 헤더 바로 아래 `bg-[#f6f4ed]` 띠, `py-4 border-b border-stone-200`.
- 왼쪽: `← Back to all apps` (text-primary, 13px, 호버 시 underline)
- 오른쪽: pill 그룹 `gap-2.5`. 각 pill: `text-[11px] px-3 py-1.5 rounded-full bg-white text-primary border border-stone-200 font-mono tracking-[0.18em] uppercase`
  - pill 내용: `No. {order+1}` · `{category ?? "Tool"}` · 상태(`Live` / `Beta` / `Coming soon`)

#### (b) Title hero (중앙 정렬, py-24)
- 메타 라인 (gap-3.5, justify-center): `{title} · {version ?? ""} · {year ?? ""}` 사이를 `w-1 h-1 bg-primary rounded-full` dot으로 구분
  - 모노 12px tracking-[0.22em] uppercase text-primary
- 거대 타이틀: `text-[clamp(4.5rem,12vw,8.25rem)]` `font-semibold` `leading-[0.95]` `tracking-[-0.045em] text-stone-900`
  - 끝에 마침표 한 글자만 따로 `<span class="text-primary">.</span>`
- ornament: `─── ○ ───` 형태. 각 line 60px 1px bg-stone-400, circle 8px border border-primary rounded-full
- lead 문장: `text-[22px] font-light leading-[1.5] text-stone-500 max-w-[28ch] mx-auto tracking-[-0.012em] mt-9`

#### (c) Image zone (떠있는 olive 프레임)
`max-w-[720px] mx-auto aspect-square bg-primary rounded-[32px] p-[90px]`, **드롭 섀도우** `box-shadow: 0 60px 120px -40px rgba(76,80,63,0.45)`.
- 이미지: 마스코트 (또는 `app.thumbnail`)를 흰색으로 보이게 `filter: brightness(0) invert(1) opacity-95`
- 코너 라벨 2개:
  - 왼쪽 위: `Project No. {order+1}` (모노 10px tracking, white/60)
  - 오른쪽 위: `Fig. A — Preview` (모노 10px, white/60)

#### (d) 설명 섹션 (중앙 정렬, max-w-[680px], py-20)
- 작은 라벨 "ABOUT THIS PROJECT" (mono 11px tracking-[0.22em] uppercase text-primary, mb-5)
- lead 문장: `text-[28px] font-medium leading-[1.4] tracking-[-0.022em] text-stone-900 mb-8`
- 본문 단락들: `text-[17px] leading-[1.75] text-stone-500 mb-4`

`description`이 짧으면 lead만 있고 본문 단락은 생략. `description`을 `splitSentences()`로 쪼개서 첫 문장을 lead, 나머지를 본문으로.

#### (e) CTA banner — 풀-블리드 olive
**section을 화면 폭 풀-블리드** `bg-primary text-white py-20`. 안쪽은 `Container` 사용.
- 작은 라벨 "AVAILABLE ON" (mono 12px tracking-[0.22em] uppercase, white/70, text-center, mb-4)
- 큰 헤드라인: `text-[clamp(2.25rem,4.5vw,3.5rem)]` `font-medium` `leading-[1.05]` `tracking-[-0.03em] text-center max-w-[18ch] mx-auto mb-12`
  - 예: "Get it. Set it. Trust it tomorrow morning."
- store 버튼들 `flex justify-center gap-4.5`:
  - 각 버튼: `bg-white text-stone-900 rounded-full px-7 py-4.5 flex items-center gap-3.5 min-w-[220px]`
  - 안쪽: 24px 아이콘 + 텍스트 (small "Download on" + big "App Store")

`hasVisibleStoreLinks` 체크 후 store 링크가 하나도 없으면 banner 자체를 숨기지 말고, 헤드라인은 띄우되 store 버튼 자리는 비워둠 (또는 텍스트 CTA `Coming soon`).

### 애니메이션
- 타이틀: opacity + y 16 → 0, duration 0.55, ease `[0.16, 1, 0.3, 1]`
- 이미지 프레임: 0.15s delay 후 같은 motion
- CTA banner: scroll-triggered Reveal

---

## 4. i18n 키 추가 (`lib/i18n-messages.ts`)

3개 locale (en/ko/ja) 모두 추가:

```ts
about: {
  // 기존 그대로
  manifestoLabel: "Manifesto" / "선언" / "宣言",
  studioLabel: "Watanid Studio" / "와타니드 스튜디오" / "ワタニド スタジオ",
  estLabel: "Est. 2025" / "Est. 2025" / "Est. 2025",
  signatureName: "Min Ho Jin" / "진민호" / "ジン・ミンホ",
  signatureRole: "Founder & maker" / "메이커" / "メーカー",
  principlesLabel: "Principles" / "원칙" / "原則",
  principlesIntro: "Three rules I keep coming back to when deciding what to ship." / "...",
  principleTags: ["Necessity", "Restraint", "Trust"], // 동수의 한국어/일본어
  fieldNotesLabel: "Field notes" / "...",
  fieldNotesQuote: "The best tools disappear. You only notice them on the days they're missing." / "...",
  fieldNotesAttribution: "— Watanid, on craft" / "— 와타니드, 크래프트에 대해" / "...",
  contactHeading: "Get in touch." / "연락하세요." / "...",
  contactKeys: {
    email: "Email" / "이메일" / "メール",
    github: "GitHub" / "GitHub" / "GitHub",
    replyWithin: "Reply within" / "답장 시간" / "返信まで"
  },
  contactReplyValue: "Usually a few days. Always read." / "...",
  footerSig: "Watanid · Built quietly" / "...",
  footerVersion: "v1 · 2025"
},
appsDetail: {
  backToAll: "← Back to all apps" / "← 모든 앱" / "← すべてのアプリ",
  pillStatus: { live: "Live", beta: "Beta", coming: "Coming soon" },
  pillNoPrefix: "No.",
  ornamentMissing: false, // 스타일만 영향
  aboutThisProject: "About this project" / "프로젝트 소개" / "プロジェクトについて",
  availableOn: "Available on" / "다운로드" / "ダウンロード",
  ctaHeadline: "Get it. Set it. Trust it tomorrow morning." / "...",
  ctaComingSoon: "Coming soon" / "곧 출시" / "近日公開"
}
```

기존 `apps.viewApp`, `about.contact` 등의 키는 그대로 유지 (다른 곳에서 사용 중일 수 있음).

---

## 5. 디자인 토큰 가이드

### 폰트
- 본문: 기존 `var(--font-sans)` (Inter / system)
- 모노: 기본 `ui-monospace`
- **에디토리얼 serif** (인용부호, italic 강조어, 마스코트 인용구):
  - `font-family: "Cormorant Garamond", "Iowan Old Style", "EB Garamond", Georgia, serif`
  - `next/font` 추가하지 말고 시스템 폰트 fallback으로만 — 새 의존성 만들지 말 것

### 컬러
| 용도 | Tailwind / CSS |
|---|---|
| 페이지 배경 | `bg-[#fafaf9]` |
| 강조 액센트 (olive) | `text-primary` / `bg-primary` (=`#6B705C`) |
| Cream 박스 | `bg-[#f1efea]` 또는 `bg-[#f6f4ed]` |
| 헤드라인 | `text-stone-900` |
| 본문 | `text-stone-600` 또는 `text-stone-500` |
| 라벨/캡션 | `text-stone-400` |
| Hairline | `border-stone-200` |

### 타이포 스케일
- 메타/캡션: 10–11px mono uppercase tracking-[0.18–0.22em]
- 본문: 15–17px line-height 1.65–1.75 font-light/normal
- Sub-headline: 22–32px font-medium tracking-[-0.018 to -0.025em]
- 큰 헤드라인 (about hero, detail title): clamp 기반 반응형 — `clamp(2.5rem, 5.5vw, 4.25rem)` (about) / `clamp(4.5rem, 12vw, 8.25rem)` (detail)

### 애니메이션
모든 motion은 `ease: [0.16, 1, 0.3, 1]`, duration 0.4–0.55s. 절대 bounce/spring 쓰지 말 것.

---

## 6. 보존해야 할 코드 패턴

```tsx
// Container 사용 (max-width + padding)
<Container className="max-w-3xl">...</Container>

// Reveal 패턴 (스크롤 진입 애니메이션)
<Reveal delay={0.07}>...</Reveal>

// i18n 사용
const t = getMessages(locale);
{t.about.manifestoLabel}

// 마스코트 임포트 (root에 있는 PNG)
import mascotInk from "../Watanid_icon_olive_ink.png"; // 새 파일 추가 필요할 수 있음
import mascotWhite from "../Watanid_icon_white_transparent.png";
```

---

## 7. 마스코트 색상 변형 추가

About 페이지 (a) cream 배경 위에는 olive 컬러 마스코트, App Detail 페이지 (c) olive 박스 안에는 white 마스코트가 필요함.

**파일 추가 위치:** 프로젝트 루트 `/Watanid_icon_olive_ink.png` (olive #6B705C 색상의 마스코트)

이미 흰 색상의 transparent 마스코트가 있으면 (`Watanid_icon_white.png` 등), CSS `filter` 사용해서:
- White → Olive: 사용 불가능 (filter로 정확한 컬러 매핑 어려움) → **별도 PNG 파일 사용**
- Black → White (olive 배경에): `filter: brightness(0) invert(1)` OK

만약 olive 마스코트 PNG가 없다면 사용자에게 요청.

---

## 8. 절대 건드리지 말 것

- `app/admin/**` — admin 페이지/API 전부
- `app/api/**` — 모든 API 라우트
- `lib/storage.ts`, `lib/apps.ts` (`getAppCopy` 등) — 데이터 레이어
- `app/page.tsx` (홈), `app/layout.tsx` — 다른 페이지
- `components/Header.tsx`, `components/Footer.tsx` — 글로벌 셰어드 (기존대로 hookup만 유지)
- `data/about.json`, `data/site.json` — 데이터 파일 (단, `data/apps.json`만 옵셔널 필드 추가 OK)
- 기존 i18n 키 — 새로 추가만 하고 기존 키 절대 삭제/변경 금지

---

## 9. Acceptance Criteria

리디자인 완료 시 아래 모두 충족:

**About 페이지:**
- [ ] Hero에 큰 serif 인용부호 + "actually" italic 강조
- [ ] 메타 스트립 (Manifesto · Watanid Studio · Est. 2025)
- [ ] 3개 원칙이 번호 + 제목 + 본문 + 태그로 정렬된 그리드
- [ ] cream 박스 안 마스코트 + serif italic 인용구 모먼트
- [ ] Email / GitHub / Reply within 3행 contact
- [ ] 모든 텍스트가 3개 locale에서 정상 출력
- [ ] 빈 `intro` 또는 `paragraphs` 배열 케이스 graceful 처리

**App Detail 페이지:**
- [ ] 상단 cream crumb bar에 `← Back to all apps` + 우측 pill 그룹
- [ ] 거대 중앙 타이틀 + 끝 마침표만 olive
- [ ] ─ ○ ─ ornament
- [ ] 떠있는 olive 박스 안에 흰 마스코트, 드롭쉐도우 적용
- [ ] About this project 섹션 (lead + 본문)
- [ ] 풀-블리드 olive CTA banner with store 버튼
- [ ] `playStoreUrl` 또는 `appStoreUrl`이 비어있을 때 graceful 처리
- [ ] 옵셔널 필드 (category/version/year) 없을 때 graceful 처리

**공통:**
- [ ] `npm run build` 통과 (TypeScript 에러 없음)
- [ ] 모바일 반응형 (375px 기준 깨지지 않음)
- [ ] 모든 motion이 기존 ease 곡선 사용
- [ ] Lighthouse 모바일 점수 떨어지지 않음

---

## 10. 참고 자료

레퍼런스 시안 PNG와 이를 만든 HTML 소스를 함께 첨부합니다 (`reference/` 폴더):
- `about_A.png` / `about_A.html` — About 페이지 시안 (이걸 그대로 React/Tailwind로 옮길 것)
- `detail_B.png` / `detail_B.html` — App Detail 페이지 시안

HTML 소스의 색상값 / 폰트 사이즈 / spacing은 **정확히** 따를 것. Tailwind로 옮길 때 임의의 값 추가 (`text-[28px]` 등) 자유롭게 사용해도 됨 — Tailwind config 수정 없이.

**시작 순서 추천:**
1. `lib/types.ts` 옵셔널 필드 추가
2. `lib/i18n-messages.ts` 새 키 추가 (3개 locale)
3. `data/apps.json` 옵셔널 필드 채우기 (있는 항목만)
4. 마스코트 olive PNG 파일 위치 확인 / 없으면 요청
5. `components/AboutContent.tsx` 풀 리라이트
6. `components/AppDetailShowcase.tsx` 풀 리라이트
7. `npm run dev`로 시각 검증
8. `npm run build`로 타입 체크
