import { AppsView } from "@/components/views/AppsView";
import { alternatesFor } from "@/lib/locale-routing";

export const metadata = {
  title: "앱",
  description: "Watanid의 모든 앱 — 일본 상용한자 2,136자를 위한 일본상용한자 2136, macOS에서 영상을 비춰 보는 Glassframe, ColorzCam, 잠금메모.",
  alternates: alternatesFor("ko", "/apps"),
};

export default function AppsPage() {
  return <AppsView locale="ko" />;
}
