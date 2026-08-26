import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { faqItems } from "@/lib/faq";
import { portfolio } from "@/lib/portfolio";
import { BrandLogo } from "@/components/BrandLogo";
import { LeadForm } from "@/components/LeadForm";
import { MessengerLinks } from "@/components/Messengers";
import { PortfolioGallery } from "@/components/PortfolioGallery";

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

function HeroCollage({
  copy,
  priority = false,
}: {
  copy: string;
  priority?: boolean;
}) {
  return (
    <div className="grid h-full w-1/2 shrink-0 grid-cols-4 grid-rows-6 gap-px lg:grid-cols-6 lg:grid-rows-4">
      {portfolio.map((item, index) => (
        <div
          key={`${copy}-${item.src}`}
          className={`relative overflow-hidden ${index >= 18 ? "col-span-2" : ""}`}
        >
          <Image
            src={item.src}
            alt=""
            fill
            priority={priority && index < 4}
            quality={70}
            className="object-cover"
            sizes="(min-width: 1024px) 17vw, 25vw"
          />
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative h-[88vh] min-h-[36rem] overflow-hidden">
      <div className="absolute inset-0 overflow-hidden bg-hero" aria-hidden>
        <div className="flex h-full w-[200%] will-change-transform animate-hero-marquee motion-reduce:animate-none">
          <HeroCollage copy="a" priority />
          <HeroCollage copy="b" />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-hero via-hero/88 to-hero/55" />
      <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-24">
        <p className="font-display text-sm uppercase tracking-[0.12em] text-cta sm:tracking-[0.2em]">
          {site.city} · {site.coverage}
        </p>
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight text-zinc-50 sm:text-5xl">
          <span className="font-display block uppercase tracking-[0.08em]">{site.brand}</span>
          <span className="mt-2 block text-xl font-normal leading-snug tracking-normal text-zinc-200 sm:text-3xl sm:tracking-wide">
            {site.tagline}
          </span>
        </h1>
        <p className="mt-5 max-w-2xl text-base text-zinc-300 sm:text-lg">
          Производство в Воронеже, монтаж светопрозрачных конструкций по всей
          России — алюминиевые и ПВХ системы. Изготовление на заказ, замер,
          проект. Заказать от производителя.
        </p>
        <p className="mt-4 inline-flex w-fit rounded-md border border-cta/40 bg-cta/10 px-4 py-1.5 text-sm text-cta">
          Объём производства {site.capacity} в месяц
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#kontakty"
            className="inline-flex items-center justify-center rounded-md bg-cta px-6 py-3 text-sm font-semibold text-cta-fg hover:brightness-110"
          >
            Новый объект / заказать замер
          </a>
          <a
            href="#servis"
            className="inline-flex items-center justify-center rounded-md border border-white/20 px-6 py-3 text-sm font-semibold text-zinc-50 hover:bg-white/10"
          >
            Сервис действующей конструкции
          </a>
        </div>
      </div>
    </section>
  );
}

export function Capacity() {
  return (
    <Section className="border-y border-border bg-surface-muted py-10 sm:py-12">
      <p className="text-center text-sm tracking-wide text-muted">
        Объём производства светопрозрачных конструкций
      </p>
      <p className="font-display mt-2 text-center text-3xl font-semibold text-foreground sm:text-4xl">
        {site.capacity} <span className="text-lg font-normal text-muted">в месяц</span>
      </p>
    </Section>
  );
}

export function Pillars() {
  const items = [
    {
      id: "proizvodstvo",
      title: "Производство и монтаж",
      text: "Изготавливаем светопрозрачные конструкции на алюминии и ПВХ. Производство в Воронеже, монтаж на объекте по всей России.",
    },
    {
      id: "proektirovanie",
      title: "Замер и проектирование",
      text: "Замер светопрозрачных конструкций и проектирование: сложная архитектура и типовые проёмы. Выезд на объект заказчика.",
    },
    {
      id: "servis-card",
      title: "Сервис и обслуживание",
      text: "Ремонт и обслуживание светопрозрачных конструкций: диагностика, ремонт, сервис действующих систем.",
    },
  ];

  return (
    <Section>
      <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">Полный цикл</h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.title}
            id={item.id === "proizvodstvo" || item.id === "proektirovanie" ? item.id : undefined}
            className="scroll-mt-24 rounded-xl border border-border bg-surface p-6"
          >
            <h3 className="text-lg font-medium text-foreground">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">{item.text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

export function Systems() {
  return (
    <Section className="bg-surface-muted">
      <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
        Алюминиевые и ПВХ светопрозрачные конструкции
      </h2>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <article className="overflow-hidden rounded-xl border border-border bg-surface">
          <div className="relative h-56">
            <Image
              src="/portfolio/14-highrise.jpg"
              alt="Фасадное остекление, алюминиевые светопрозрачные конструкции"
              fill
              quality={70}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl text-foreground">Алюминий</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Фасадное остекление, входные группы из алюминия, панорамное
              остекление, алюминиевые окна и двери. Там, где нужна жёсткость и
              масштаб.
            </p>
          </div>
        </article>
        <article className="overflow-hidden rounded-xl border border-border bg-surface">
          <div className="relative h-56">
            <Image
              src="/portfolio/18-house-dusk.jpg"
              alt="Окна ПВХ от производителя, частный дом"
              fill
              quality={70}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl text-foreground">ПВХ</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Окна ПВХ от производителя: типовые проёмы, двери, частный сектор.
              Серийные и стандартные задачи без лишней сложности.
            </p>
          </div>
        </article>
      </div>
    </Section>
  );
}

export function Design() {
  return (
    <Section>
      <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
        Проектирование светопрозрачных конструкций
      </h2>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <article className="rounded-xl border border-border bg-surface p-6">
          <h3 className="text-lg text-foreground">Сложная архитектура</h3>
          <p className="mt-3 text-sm leading-6 text-muted">
            Нестандартные узлы, панорамное и фасадное остекление. Считаем,
            проектируем, производим под объект.
          </p>
        </article>
        <article className="rounded-xl border border-border bg-surface p-6">
          <h3 className="text-lg text-foreground">Типовые задачи</h3>
          <p className="mt-3 text-sm leading-6 text-muted">
            Стандартный проём, окна, двери, серия. Берём обычные заказы так же,
            как и крупные.
          </p>
        </article>
      </div>
    </Section>
  );
}

export function Service() {
  return (
    <Section id="servis" className="bg-surface-muted">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
            Ремонт и обслуживание светопрозрачных конструкций
          </h2>
          <p className="mt-4 text-muted">
            Диагностика, ремонт алюминиевых конструкций и окон ПВХ, обслуживание
            уже стоящих светопрозрачных конструкций. Заявка на выезд по России —
            по согласованию.
          </p>
          <a
            href="#kontakty"
            className="mt-6 inline-flex rounded-md bg-cta px-6 py-3 text-sm font-semibold text-cta-fg hover:brightness-110"
          >
            Вызвать сервис
          </a>
        </div>
        <div className="relative h-72 overflow-hidden rounded-xl">
          <Image
            src="/portfolio/21-pvc-window.jpg"
            alt="Оконная конструкция, вид из помещения"
            fill
            quality={70}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </Section>
  );
}

export function Audiences() {
  return (
    <Section>
      <div className="grid gap-6 md:grid-cols-2">
        <article className="rounded-xl border border-border bg-surface p-6">
          <h2 className="font-display text-lg font-semibold text-foreground">Частному заказчику</h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Дом, окна ПВХ, входная группа, обслуживание. Замер на объекте — по
            всей России.
          </p>
        </article>
        <article className="rounded-xl border border-border bg-surface p-6">
          <h2 className="font-display text-lg font-semibold text-foreground">Застройщику и подрядчику</h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Светопрозрачные конструкции для застройщика по всей России: проект,
            объём {site.capacity} в месяц, монтаж, сопровождение объекта.
          </p>
        </article>
      </div>
    </Section>
  );
}

export function Process() {
  return (
    <Section className="bg-surface-muted">
      <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
        Остекление под ключ
      </h2>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <ol className="space-y-4 text-sm text-muted">
          <li className="text-xs uppercase tracking-wide text-accent">Новый объект</li>
          <li>1. Заявка на сайте, звонок, почта или Telegram</li>
          <li>2. Замер на объекте клиента</li>
          <li>3. Проект и согласование</li>
          <li>4. Производство</li>
          <li>5. Монтаж</li>
        </ol>
        <ol className="space-y-4 text-sm text-muted">
          <li className="text-xs uppercase tracking-wide text-accent">Сервис</li>
          <li>1. Заявка, звонок или сообщение</li>
          <li>2. Диагностика</li>
          <li>3. Ремонт или обслуживание</li>
        </ol>
      </div>
    </Section>
  );
}

export function Portfolio() {
  return (
    <section id="obekty" className="scroll-mt-24 py-16 sm:py-20">
      <PortfolioGallery />
    </section>
  );
}

export function Faq() {
  return (
    <Section id="faq">
      <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">Вопросы</h2>
      <dl className="mt-10 grid gap-6">
        {faqItems.map((item) => (
          <div key={item.q} className="border-b border-border pb-6">
            <dt className="font-medium text-foreground">{item.q}</dt>
            <dd className="mt-2 text-sm leading-6 text-muted">{item.a}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

export function Contacts() {
  return (
    <Section id="kontakty" className="bg-surface-muted pt-8">
      <div className="grid gap-10 md:grid-cols-2 md:items-start">
        <div>
          <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">Контакты</h2>
          <div className="mt-6">
            <BrandLogo />
          </div>
          <p className="mt-3 text-muted">
            {site.city} · {site.coverage}
          </p>
          <a
            href={site.phoneHref}
            className="mt-3 block text-lg font-medium text-accent hover:text-accent-hover"
          >
            {site.phone}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="mt-2 inline-block text-accent hover:text-accent-hover"
          >
            {site.email}
          </a>
          <p>
          <Link
            href="/rekvizity"
            className="mt-3 inline-block text-sm text-accent hover:text-accent-hover"
          >
            Реквизиты
          </Link></p>
          <p className="mt-4 max-w-xl text-sm text-faint">
            Заявка на сайте, звонок, почта или Telegram. Замер, сервис и встреча
            — объекты по всей России.
          </p>
          <MessengerLinks className="mt-6" />
        </div>
        <LeadForm />
      </div>
    </Section>
  );
}
