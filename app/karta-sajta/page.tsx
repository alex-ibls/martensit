import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { homeSitemapSections, sitemapPages } from "@/lib/sitemap";
import { productCatalogHref, productHref, productSections } from "@/lib/products";
import { pageShareMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const pageTitle = "Карта сайта";
const pageDescription = `Страницы сайта завода «${site.brand}»: каталог продукции и страницы конструкций, производство и монтаж, поставщики, реквизиты.`;

export async function generateMetadata(): Promise<Metadata> {
  const share = await pageShareMetadata({
    title: `${pageTitle} — завод ${site.brand}, ${site.city}`,
    description: pageDescription,
    path: "/karta-sajta",
  });

  return {
    ...share,
    title: pageTitle,
    description: pageDescription,
    alternates: { canonical: "/karta-sajta" },
  };
}

export default function SiteMapPage() {
  const pages = sitemapPages.filter((page) => page.path !== "/karta-sajta");

  return (
    <>
      <Header />
      <main id="main-content" className="mx-auto max-w-3xl px-4 pb-20 pt-24 sm:px-6">
        <Link href="/" className="text-sm text-accent hover:text-accent-hover">
          ← На главную
        </Link>
        <p className="kicker mt-6 text-accent">Навигация</p>
        <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight text-foreground">
          Карта сайта
        </h1>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
            Страницы
          </h2>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {pages.map((page) => (
              <li key={page.path}>
                <Link
                  href={page.path}
                  className="block py-3 text-sm text-accent hover:text-accent-hover"
                >
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
            Разделы главной
          </h2>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {homeSitemapSections.map((section) => (
              <li key={section.href}>
                <a
                  href={section.href}
                  className="block py-3 text-sm text-accent hover:text-accent-hover"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
            Продукция
          </h2>
          <p className="mt-3">
            <Link href={productCatalogHref} className="text-sm text-accent hover:text-accent-hover">
              Каталог
            </Link>
          </p>
          {productSections
            .filter((section) => section.id !== "dveri")
            .map((section) => (
            <div key={section.id} className="mt-8">
              <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                <Link
                  href={`${productCatalogHref}#${section.id}`}
                  className="hover:text-accent"
                >
                  {section.title}
                </Link>
              </h3>
              <ul className="mt-3 divide-y divide-border border-y border-border">
                {section.products.map((product) => (
                  <li key={product.id}>
                    <Link
                      href={productHref(product.id)}
                      className="block py-3 text-sm text-accent hover:text-accent-hover"
                    >
                      {product.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
