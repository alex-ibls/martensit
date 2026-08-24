import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Политика обработки персональных данных",
  description: `Политика обработки персональных данных завода светопрозрачных конструкций ${site.brand}, ${site.city}.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
  openGraph: {
    title: `Политика обработки персональных данных | ${site.brand}`,
    description: `Политика обработки персональных данных завода светопрозрачных конструкций ${site.brand}, ${site.city}.`,
  },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <Link href="/" className="text-sm text-teal-200">
        ← На главную
      </Link>
      <h1 className="mt-6 text-3xl font-semibold text-zinc-50">
        Политика обработки персональных данных
      </h1>
      <div className="mt-8 space-y-4 text-sm leading-7 text-zinc-400">
        <p>
          Оператор: {site.legalName}, {site.city}. Телефон:{" "}
          <a href={site.phoneHref} className="text-teal-200">
            {site.phone}
          </a>
          . Почта:{" "}
          <a href={`mailto:${site.email}`} className="text-teal-200">
            {site.email}
          </a>
          .
        </p>
        <p>
          Форма на сайте собирает имя, телефон и сведения о задаче, чтобы
          связаться с вами по заявке. Данные не продаём и не передаём третьим
          лицам, кроме сервисов доставки сообщений (Telegram), если заявка
          уходит туда.
        </p>
        <p>
          Отправляя форму, вы соглашаетесь на обработку указанных данных для
          ответа на обращение. Чтобы отозвать согласие, напишите на{" "}
          <a href={`mailto:${site.email}`} className="text-teal-200">
            {site.email}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
