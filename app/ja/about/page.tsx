import { AboutView } from "@/components/views/AboutView";
import { alternatesFor } from "@/lib/locale-routing";

export const metadata = {
  title: "概要",
  description: "Watanid は一人のスタジオです。これらのアプリを作る理由と作り方、そして連絡先。",
  alternates: alternatesFor("ja", "/about"),
};

export default function AboutPage() {
  return <AboutView locale="ja" />;
}
