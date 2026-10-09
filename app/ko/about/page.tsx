import { AboutView } from "@/components/views/AboutView";
import { alternatesFor } from "@/lib/locale-routing";

export const metadata = {
  title: "소개",
  description: "Watanid는 1인 스튜디오입니다. 이 앱들을 만든 이유와 만드는 방식, 그리고 연락처.",
  alternates: alternatesFor("ko", "/about"),
};

export default function AboutPage() {
  return <AboutView locale="ko" />;
}
