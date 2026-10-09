import { AboutView } from "@/components/views/AboutView";
import { alternatesFor } from "@/lib/locale-routing";

export const metadata = {
  title: "About",
  description:
    "Watanid is a one-person studio. Why these apps exist, how they are built, and how to get in touch.",
  alternates: alternatesFor("en", "/about"),
};

export default function AboutPage() {
  return <AboutView locale="en" />;
}
