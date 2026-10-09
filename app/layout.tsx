import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getCurrentLocale } from "@/lib/i18n";
import { getMenuPages } from "@/lib/pages";
import { SITE_URL } from "@/lib/site-url";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const DESCRIPTION =
  "Watanid builds small, focused Mac and mobile apps — Kanji 2136 for learning Japanese, Glassframe for see-through video on macOS, and more.";

export const metadata: Metadata = {
  // Required for Next.js to resolve relative OG image paths to absolute URLs.
  metadataBase: new URL(SITE_URL),
  title: { default: "Watanid — small apps for real routines", template: "%s · Watanid" },
  description: DESCRIPTION,
  applicationName: "Watanid",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Watanid",
    title: "Watanid — small apps for real routines",
    description: DESCRIPTION,
    url: "/",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "Watanid" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Watanid — small apps for real routines",
    description: DESCRIPTION,
    images: ["/og/default.png"],
  },
  icons: {
    icon: [{ url: "/logo/main.png", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getCurrentLocale();
  const menuPages = await getMenuPages();

  return (
    <html lang={locale} className={`${inter.variable} ${inter.className}`}>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <Header locale={locale} menuPages={menuPages} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
