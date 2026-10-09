import { HomeView } from "@/components/views/HomeView";
import { alternatesFor } from "@/lib/locale-routing";

export const metadata = { alternates: alternatesFor("ja", "/") };

export default function HomePage() {
  return <HomeView locale="ja" />;
}
