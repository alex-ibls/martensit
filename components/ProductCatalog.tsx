import Image from "next/image";
import Link from "next/link";
import {
  productCatalogHref,
  productHref,
  productSections,
  type Product,
  type ProductSection,
} from "@/lib/products";

export function ProductPreviewCard({ product }: { product: Product }) {
  return (
    <article id={product.id} className="scroll-mt-28 flex flex-col overflow-hidden bg-surface">
      <Link href={productHref(product.id)} className="group flex flex-1 flex-col">
        <div className="relative aspect-[4/3]">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            quality={75}
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-1 flex-col p-6 sm:p-8">
          <h3 className="font-display text-xl font-semibold tracking-tight text-foreground group-hover:text-accent">
            {product.name}
          </h3>
          <p className="mt-3 text-sm leading-7 text-muted">{product.summary}</p>
          <span className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
            Подробнее
          </span>
        </div>
      </Link>
    </article>
  );
}

function CatalogSection({ section }: { section: ProductSection }) {
  return (
    <section id={section.id} className="scroll-mt-28 mt-16 sm:mt-20">
      <p className="kicker text-accent">{section.kicker}</p>
      <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {section.title}
      </h2>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">{section.intro}</p>
      <div className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
        {section.products.map((product) => (
          <ProductPreviewCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export function ProductSectionNav() {
  return (
    <nav
      className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[11px] font-medium uppercase tracking-[0.16em]"
      aria-label="Разделы продукции"
    >
      {productSections.map((section) => (
        <a key={section.id} href={`#${section.id}`} className="text-accent hover:text-accent-hover">
          {section.kicker}
        </a>
      ))}
    </nav>
  );
}

export function ProductCatalog() {
  return (
    <>
      {productSections.map((section) => (
        <CatalogSection key={section.id} section={section} />
      ))}
    </>
  );
}

export function ProductCategoryGrid() {
  return (
    <div className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
      {productSections.map((section) => {
        const cover = section.products[0];
        return (
          <Link
            key={section.id}
            href={`${productCatalogHref}#${section.id}`}
            className="group overflow-hidden bg-surface"
          >
            <div className="relative h-52">
              <Image
                src={cover.image}
                alt={section.title}
                fill
                quality={75}
                className="object-cover object-center transition duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="p-6 sm:p-8">
              <p className="kicker text-accent">{section.kicker}</p>
              <h3 className="font-display mt-3 text-xl font-semibold tracking-tight text-foreground">
                {section.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">{section.intro}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
