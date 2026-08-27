import type { Metadata } from "next";
import { Geologica, Oswald } from "next/font/google";
import { site } from "@/lib/site";
import { pageShareMetadata } from "@/lib/seo";
import { YandexMetrika } from "@/components/YandexMetrika";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

const geologica = Geologica({
  variable: "--font-geologica",
  subsets: ["cyrillic", "latin"],
  axes: ["SHRP"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const share = await pageShareMetadata({
    title: site.title,
    description: site.description,
    path: "/",
  });

  return {
    ...share,
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
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${geologica.variable} ${oswald.variable} h-full antialiased`} data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <meta name="yandex-verification" content="b4756c0294bb5702" />
      </head>
      <body className="min-h-full bg-background font-sans text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-none focus:bg-cta focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-[0.16em] focus:text-cta-fg"
        >
          К содержанию
        </a>
        {children}
        <YandexMetrika />
      </body>
    </html>
  );
}
