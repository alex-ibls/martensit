import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export type SitemapPage = {
  path: string;
  title: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
  images?: readonly string[];
};

export const sitemapPages: SitemapPage[] = [
  {
    path: "/",
    title: "Главная",
    changeFrequency: "weekly",
    priority: 1,
    images: [site.ogImage],
  },
  {
    path: "/postavshchiki",
    title: "Поставщики",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/rekvizity",
    title: "Реквизиты",
    changeFrequency: "yearly",
    priority: 0.4,
  },
  {
    path: "/privacy",
    title: "Политика обработки персональных данных",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    path: "/karta-sajta",
    title: "Карта сайта",
    changeFrequency: "monthly",
    priority: 0.2,
  },
];

export const homeSitemapSections = [
  { href: "/#proizvodstvo", title: "Производство и монтаж" },
  { href: "/#postavshchiki", title: "Поставщики" },
  { href: "/#proektirovanie", title: "Проектирование" },
  { href: "/#servis", title: "Сервис" },
  { href: "/#obekty", title: "Объекты" },
  { href: "/#faq", title: "Вопросы" },
  { href: "/#kontakty", title: "Контакты" },
] as const;
