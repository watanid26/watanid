import { HomeView } from "@/components/views/HomeView";
import { alternatesFor } from "@/lib/locale-routing";

export const metadata = { alternates: alternatesFor("ko", "/") };

export default function HomePage() {
  return <HomeView locale="ko" />;
}
