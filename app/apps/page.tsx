import { AppsView } from "@/components/views/AppsView";
import { alternatesFor } from "@/lib/locale-routing";

export const metadata = {
  title: "Apps",
  description:
    "Every app from Watanid: Kanji 2136 for the 2,136 jōyō kanji, Glassframe for see-through video on macOS, ColorzCam, and GlanceMemo.",
  alternates: alternatesFor("en", "/apps"),
};

export default function AppsPage() {
  return <AppsView locale="en" />;
}
