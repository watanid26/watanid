import { AppsView } from "@/components/views/AppsView";
import { alternatesFor } from "@/lib/locale-routing";

export const metadata = {
  title: "アプリ",
  description: "Watanid のアプリ一覧 — 常用漢字2,136字のための漢字 2136、macOS で動画を透かして表示する Glassframe、ColorzCam、ぱっと見メモ。",
  alternates: alternatesFor("ja", "/apps"),
};

export default function AppsPage() {
  return <AppsView locale="ja" />;
}
