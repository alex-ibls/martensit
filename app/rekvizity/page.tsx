import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CopyRequisites } from "@/components/CopyRequisites";
import { site } from "@/lib/site";

const pageTitle = "Реквизиты";
const pageDescription = `Реквизиты ${site.legalName}: ИНН, КПП, ОГРН, расчётный счёт, банк, директор.`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/rekvizity" },
  openGraph: {
    title: `${pageTitle} — завод ${site.brand}, ${site.city}`,
    description: pageDescription,
    url: "/rekvizity",
    siteName: site.orgName,
    locale: "ru_RU",
    type: "website",
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.h1 }],
  },
};

const rows = [
  { label: "Организация", value: site.legalName },
  { label: "ИНН", value: site.inn },
  { label: "КПП", value: site.kpp },
  { label: "ОГРН", value: site.ogrn },
  { label: "Дата регистрации", value: site.ogrnDate },
  { label: "ОКПО", value: site.okpo },
  { label: "Р/с", value: site.accountDisplay },
  {
    label: "Банк",
    value: `${site.bankName}, г. ${site.bankCity}`,
  },
  { label: "БИК", value: site.bik },
  { label: "К/с", value: site.corrAccount },
  { label: "Генеральный директор", value: site.director },
] as const;

export default function RequisitesPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="mx-auto max-w-3xl px-4 pb-20 pt-24 sm:px-6">
        <Link href="/" className="text-sm text-accent hover:text-accent-hover">
          ← На главную
        </Link>
        <h1 className="font-display mt-6 text-3xl font-semibold text-foreground">
          Реквизиты
        </h1>
        <dl className="mt-8 divide-y divide-border rounded-xl border border-border bg-surface">
          {rows.map((row) => (
            <div
              key={row.label}
              className="grid gap-1 px-4 py-3 sm:grid-cols-[12rem_1fr] sm:items-baseline sm:gap-4"
            >
              <dt className="text-sm text-muted">{row.label}</dt>
              <dd className="font-medium text-foreground">{row.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8">
          <CopyRequisites />
        </div>
      </main>
      <Footer />
    </>
  );
}
