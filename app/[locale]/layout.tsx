import type { Metadata } from "next";
import {
  Bodoni_Moda,
  Manrope,
  Amiri,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import "@/app/globals.css";
import { StickyOrderBar } from "@/components/StickyOrderBar";

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  adjustFontFallback: false,
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const amiri = Amiri({
  subsets: ["arabic"],
  variable: "--font-display-ar",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-body-ar",
  weight: ["400", "500", "600"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "meta",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!["ar", "en"].includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  const dir = locale === "ar" ? "rtl" : "ltr";
  const bodyFontClass = locale === "ar" ? "font-body-ar" : "font-body";

  return (
    <html lang={locale} dir={dir}>
      <body
        className={`${bodoniModa.variable} ${manrope.variable} ${amiri.variable} ${plexArabic.variable} bg-bg ${bodyFontClass} text-ink antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
          <StickyOrderBar />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
