import type { Metadata } from "next";
import { Geologica } from "next/font/google";
import { site } from "@/lib/site";
import { YandexMetrika } from "@/components/YandexMetrika";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

const geologica = Geologica({
  variable: "--font-geologica",
  subsets: ["cyrillic", "latin"],
  axes: ["SHRP"],
  display: "swap",
});

const ogImage = {
  url: site.ogImage,
  width: 1200,
  height: 630,
  alt: site.h1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: site.title,
    template: `%s — завод ${site.brand}, ${site.city}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  applicationName: site.orgName,
  publisher: site.legalName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: site.title,
    description: site.description,
    url: "/",
    siteName: site.orgName,
    locale: "ru_RU",
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: site.logoMark,
    apple: "/brand/icon-180.png",
  },
  ...(site.googleVerification || site.yandexVerification
    ? {
        verification: {
          ...(site.googleVerification ? { google: site.googleVerification } : {}),
          ...(site.yandexVerification ? { yandex: site.yandexVerification } : {}),
        },
      }
    : {}),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${geologica.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <meta name="yandex-verification" content="b4756c0294bb5702" />
      </head>
      <body className="min-h-full bg-background font-sans text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-cta focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-cta-fg"
        >
          К содержанию
        </a>
        {children}
        <YandexMetrika />
      </body>
    </html>
  );
}
