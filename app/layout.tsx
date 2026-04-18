import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getCurrentLocale } from "@/lib/i18n";
import { getMenuPages } from "@/lib/pages";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Watanid", template: "%s · Watanid" },
  description: "What I need — a minimal brand hub.",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
  },
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
