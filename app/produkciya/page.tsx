import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LeadForm } from "@/components/LeadForm";
import { ProductCatalog, ProductSectionNav } from "@/components/ProductCatalog";
import { ProductsJsonLd } from "@/components/JsonLd";
import { pageShareMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const pageTitle = "Продукция";
const pageDescription = `Каталог светопрозрачных конструкций завода «${site.brand}»: порталы, перегородки, остекление беседок и террас, ограждения, окна, двери, фасады и входные группы. Производство в ${site.city}, монтаж ${site.coverage}.`;

export async function generateMetadata(): Promise<Metadata> {
  const share = await pageShareMetadata({
    title: `${pageTitle} — завод ${site.brand}, ${site.city}`,
    description: pageDescription,
    path: "/produkciya",
  });

  return {
    ...share,
    title: pageTitle,
    description: pageDescription,
    keywords: [
      ...site.keywords,
      "портальные системы",
      "стеклянные перегородки",
      "остекление беседок",
      "стеклянные ограждения",
      "алюминиевые окна",
      "алюминиевые двери",
      "фасадное остекление",
      "входные группы",
    ],
    alternates: { canonical: "/produkciya" },
  };
}

export default function ProductsPage() {
  return (
    <>
      <ProductsJsonLd />
      <Header />
      <main id="main-content">
        <div className="mx-auto max-w-6xl px-4 pb-8 pt-24 sm:px-6">
          <Link href="/" className="text-sm text-accent hover:text-accent-hover">
            ← На главную
          </Link>
          <p className="kicker mt-6 text-accent">Каталог</p>
          <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Продукция
          </h1>
          <ProductSectionNav />
        </div>
        <div className="border-t border-border bg-surface-muted pb-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <ProductCatalog />
          </div>
        </div>
        <section className="border-t border-border px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-start md:gap-16">
            <div>
              <p className="kicker text-accent">Заявка</p>
              <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-foreground">
                Расчёт по конструкции
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                Напишите тип продукции и объект в комментарии. Замер, проект и
                производство согласовываем отдельно.
              </p>
              <a
                href={site.phoneHref}
                className="font-display mt-6 block text-2xl font-semibold tracking-tight text-foreground hover:text-accent"
              >
                {site.phone}
              </a>
            </div>
            <LeadForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
