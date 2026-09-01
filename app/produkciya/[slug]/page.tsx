import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LeadForm } from "@/components/LeadForm";
import { ProductPageJsonLd } from "@/components/JsonLd";
import {
  allProducts,
  getProductBySlug,
  productCatalogHref,
  productHref,
} from "@/lib/products";
import { absoluteOn, pageShareMetadata, resolveMetadataBase } from "@/lib/seo";
import { site } from "@/lib/site";
import { btnPrimary } from "@/lib/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return allProducts().map((product) => ({ slug: product.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/produkciya/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const path = productHref(product.id);
  const title = product.name;
  const description = `${product.summary} Производство в ${site.city}, монтаж ${site.coverage}.`;
  const share = await pageShareMetadata({
    title: `${title} — завод ${site.brand}, ${site.city}`,
    description,
    path,
  });
  const metadataBase = await resolveMetadataBase();
  const imageUrl = absoluteOn(metadataBase, product.image);

  return {
    ...share,
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      ...share.openGraph,
      images: [
        {
          url: imageUrl,
          ...(imageUrl.startsWith("https:") ? { secureUrl: imageUrl } : {}),
          type: "image/jpeg",
          width: 1536,
          height: 1024,
          alt: product.imageAlt,
        },
      ],
    },
    twitter: {
      ...share.twitter,
      images: [imageUrl],
    },
    other: {
      "vk:image": imageUrl,
    },
  };
}

export default async function ProductPage({ params }: PageProps<"/produkciya/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <ProductPageJsonLd product={product} />
      <Header />
      <main id="main-content">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-24 sm:px-6">
          <p className="text-sm">
            <Link href={productCatalogHref} className="text-accent hover:text-accent-hover">
              ← К каталогу
            </Link>
            <span className="text-faint"> · {product.sectionTitle}</span>
          </p>
          <p className="kicker mt-6 text-accent">{product.sectionKicker}</p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {product.name}
          </h1>
        </div>

        <div className="border-t border-border bg-surface-muted">
          <div className="mx-auto grid max-w-6xl gap-px bg-border md:grid-cols-2">
            <div className="relative aspect-[4/3] bg-surface">
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                priority
                quality={80}
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="bg-surface p-6 sm:p-10">
              <p className="text-base leading-7 text-foreground">{product.summary}</p>
              <p className="mt-5 text-sm leading-7 text-muted">{product.body}</p>
              <p className="mt-6 text-[11px] uppercase tracking-[0.14em] text-faint">
                {product.uses.join(" · ")}
              </p>
              <Link href="#zayavka" className={`${btnPrimary} mt-8`}>
                Заказать расчёт
              </Link>
            </div>
          </div>
        </div>

        <section id="zayavka" className="scroll-mt-28 border-t border-border bg-surface-muted px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-start md:gap-16">
            <div>
              <p className="kicker text-accent">Заявка</p>
              <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-foreground">
                Расчёт по конструкции
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                Тип продукции уже в комментарии. При необходимости допишите объект
                и детали.
              </p>
              <a
                href={site.phoneHref}
                className="font-display mt-6 block text-2xl font-semibold tracking-tight text-foreground hover:text-accent"
              >
                {site.phone}
              </a>
            </div>
            <LeadForm
              key={product.id}
              commentDefault={`${product.sectionTitle}: ${product.name}`}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
