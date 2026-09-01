import type { MetadataRoute } from "next";
import { allProducts, productHref } from "@/lib/products";
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
    path: "/produkciya",
    title: "Продукция",
    changeFrequency: "monthly",
    priority: 0.8,
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

export const productSitemapPages: SitemapPage[] = allProducts().map((product) => ({
  path: productHref(product.id),
  title: product.name,
  changeFrequency: "monthly",
  priority: 0.7,
  images: [product.image],
}));

export function allSitemapPages(): SitemapPage[] {
  return [...sitemapPages, ...productSitemapPages];
}

export const homeSitemapSections = [
  { href: "/#produkciya", title: "Продукция" },
  { href: "/#proizvodstvo", title: "Производство и монтаж" },
  { href: "/#postavshchiki", title: "Поставщики" },
  { href: "/#proektirovanie", title: "Проектирование" },
  { href: "/#servis", title: "Сервис" },
  { href: "/#obekty", title: "Объекты" },
  { href: "/#faq", title: "Вопросы" },
  { href: "/#kontakty", title: "Контакты" },
] as const;
