import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { pageShareMetadata } from "@/lib/seo";
import { PrivacyJsonLd } from "@/components/JsonLd";
import { ThemeToggle } from "@/components/ThemeToggle";

const privacyTitle = "Политика обработки персональных данных";
const privacyDescription = `Политика обработки персональных данных завода «${site.brand}», ${site.city}.`;
const privacyOgTitle = `${privacyTitle} — завод ${site.brand}, ${site.city}`;

export async function generateMetadata(): Promise<Metadata> {
  const share = await pageShareMetadata({
    title: privacyOgTitle,
    description: privacyDescription,
    path: "/privacy",
  });

  return {
    ...share,
    title: privacyTitle,
    description: privacyDescription,
    alternates: { canonical: "/privacy" },
    robots: { index: true, follow: true },
  };
}

export default function PrivacyPage() {
  return (
    <main id="main-content" className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <PrivacyJsonLd />
      <div className="flex items-center justify-between gap-4">
        <Link href="/" className="text-sm text-accent hover:text-accent-hover">
          ← На главную
        </Link>
        <ThemeToggle />
      </div>
      <h1 className="font-display mt-6 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {privacyTitle}
      </h1>
      <div className="mt-8 space-y-4 text-sm leading-7 text-muted">
        <p>
          Оператор: {site.legalName}, ИНН {site.inn}, КПП {site.kpp}, ОГРН{" "}
          {site.ogrn}, {site.city}.{" "}
          <Link href="/rekvizity" className="text-accent underline underline-offset-2 hover:text-accent-hover">
            Реквизиты
          </Link>
          . Телефон:{" "}
          <a href={site.phoneHref} className="text-accent underline underline-offset-2 hover:text-accent-hover">
            {site.phone}
          </a>
          . Почта:{" "}
          <a href={`mailto:${site.email}`} className="text-accent underline underline-offset-2 hover:text-accent-hover">
            {site.email}
          </a>
          .
        </p>
        <p>
          Если вы оставляете заявку на сайте, пишете на почту, в Telegram либо
          звоните, мы обрабатываем имя, электронную почту, телефон (если
          указан), тип задачи и текст обращения, чтобы ответить. К заявке
          можно приложить файл: фото, PDF, ZIP или чертёж. Заявка с сайта
          приходит на {site.email}. Данные не
          продаём и не передаём третьим лицам, кроме сервисов доставки сообщений
          и почты, если переписка идёт там.
        </p>
        <p>
          На форме заявки есть проверка от ботов: вы вводите символы с картинки.
          Проверка считается на нашем сервере, без Google и Яндекс SmartCaptcha.
        </p>
        <p>
          На сайте работает Яндекс.Метрика: она обрабатывает технические данные
          о посещении (cookie, IP, действия на страницах) на серверах Яндекса.
        </p>
        <p>
          Чтобы отозвать согласие на обработку этих данных, напишите на{" "}
          <a href={`mailto:${site.email}`} className="text-accent underline underline-offset-2 hover:text-accent-hover">
            {site.email}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
