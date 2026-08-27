import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BrandMark } from "@/components/ProfileTape";
import { aluminumProfiles, pvcProfiles, type ProfileBrand } from "@/lib/profiles";
import { site } from "@/lib/site";

const pageTitle = "Поставщики";
const pageDescription = `Алюминиевые и ПВХ системы завода «${site.brand}»: Алютех, Алнео, Татпроф, Проведал, ТиСН, Экспроф, KBE.`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/postavshchiki" },
  openGraph: {
    title: `${pageTitle} — завод ${site.brand}, ${site.city}`,
    description: pageDescription,
    url: "/postavshchiki",
    siteName: site.orgName,
    locale: "ru_RU",
    type: "website",
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.h1 }],
  },
};

function SupplierItem({ item }: { item: ProfileBrand }) {
  return (
    <li id={item.id} className="scroll-mt-28 flex flex-col gap-5 py-10 sm:flex-row sm:gap-10">
      <div className="w-40 shrink-0">
        <BrandMark item={item} className="h-11 w-auto max-w-[10.5rem]" />
        {item.note ? (
          <p className="mt-3 text-[10px] tracking-[0.12em] text-faint">{item.note}</p>
        ) : null}
      </div>
      <div className="min-w-0">
        <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
          {item.name}
        </h3>
        <div className="mt-3 space-y-3 text-sm leading-7 text-muted">
          {item.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </li>
  );
}

function SupplierGroup({
  id,
  title,
  items,
}: {
  id: string;
  title: string;
  items: readonly ProfileBrand[];
}) {
  return (
    <section id={id} className="scroll-mt-28 mt-14">
      <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      <ul className="mt-2 divide-y divide-border border-y border-border">
        {items.map((item) => (
          <SupplierItem key={item.id} item={item} />
        ))}
      </ul>
    </section>
  );
}

export default function SuppliersPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="mx-auto max-w-4xl px-4 pb-20 pt-24 sm:px-6">
        <Link href="/#postavshchiki" className="text-sm text-accent hover:text-accent-hover">
          ← На главную
        </Link>
        <p className="kicker mt-6 text-accent">Профили</p>
        <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight text-foreground">
          Поставщики
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-muted">
          Изготавливаем светопрозрачные конструкции на алюминиевых и ПВХ системах
          этих производителей.
        </p>
        <SupplierGroup id="alyuminij" title="Алюминий" items={aluminumProfiles} />
        <SupplierGroup id="pvh" title="ПВХ-системы" items={pvcProfiles} />
      </main>
      <Footer />
    </>
  );
}
