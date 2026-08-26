import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { faqItems } from "@/lib/faq";
import { btnGhostHero, btnPrimary } from "@/lib/ui";
import { BrandLogo } from "@/components/BrandLogo";
import { LeadForm } from "@/components/LeadForm";
import { MessengerLinks } from "@/components/Messengers";
import { PortfolioGallery } from "@/components/PortfolioGallery";

function SectionDrawing({
  src,
  onDark = false,
  invertOnDark = false,
}: {
  src: string;
  onDark?: boolean;
  invertOnDark?: boolean;
}) {
  const drawingClass = onDark
    ? "section-drawing-on-dark"
    : invertOnDark
      ? "section-drawing-invert-on-dark"
      : "section-drawing";
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <Image
        src={src}
        alt=""
        fill
        quality={75}
        className={`object-cover object-center ${drawingClass}`}
        sizes="100vw"
      />
    </div>
  );
}

function Section({
  id,
  children,
  className = "",
  drawing,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  drawing?: string;
}) {
  return (
    <section id={id} className={`relative scroll-mt-24 overflow-hidden ${className}`}>
      {drawing ? <SectionDrawing src={drawing} /> : null}
      <div className="relative px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">{children}</div>
      </div>
    </section>
  );
}

function Kicker({ children }: { children: ReactNode }) {
  return <p className="kicker text-accent">{children}</p>;
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
      {children}
    </h2>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-hero">
      <SectionDrawing src="/drawings/hero.jpg" onDark />
      <div className="absolute inset-0 bg-gradient-to-r from-hero via-hero/88 to-hero/70" />
      <div className="relative mx-auto flex min-h-[max(92vh,42rem)] max-w-6xl flex-col justify-end px-4 pt-28 sm:px-6">
        <div className="pb-12 sm:pb-16">
          <p className="kicker text-cta">
            {site.city} · {site.coverage}
          </p>
          <h1 className="mt-5 max-w-3xl border-l-4 border-cta pl-5 text-zinc-50 sm:pl-6">
            <span className="font-display block text-5xl font-semibold uppercase leading-none tracking-[0.06em] sm:text-7xl">
              {site.brand}
            </span>
            <span className="mt-4 block max-w-xl text-lg font-normal leading-snug text-zinc-300 sm:text-2xl">
              {site.tagline}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
            Производство в Воронеже, монтаж светопрозрачных конструкций по всей
            России — алюминиевые и ПВХ системы. Изготовление на заказ, замер,
            проект. Заказать от производителя.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#kontakty" className={btnPrimary}>
              Новый объект / заказать замер
            </a>
            <a href="#servis" className={btnGhostHero}>
              Сервис действующей конструкции
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-white/10 py-10 sm:flex-row sm:items-end sm:gap-5 sm:py-12">
          <div>
            <p className="kicker text-cta">Производство</p>
            <p className="font-display mt-3 text-5xl font-semibold leading-none tracking-tight text-zinc-50 sm:text-6xl">
              {site.capacity}
            </p>
          </div>
          <p className="max-w-[13.5rem] text-sm uppercase leading-5 tracking-[0.14em] text-zinc-400 sm:pb-1">
            светопрозрачных конструкций в месяц
          </p>
        </div>
      </div>
    </section>
  );
}

export function Pillars() {
  const items = [
    {
      id: "proizvodstvo",
      n: "01",
      title: "Производство и монтаж",
      text: "Изготавливаем светопрозрачные конструкции на алюминии и ПВХ. Производство в Воронеже, монтаж на объекте по всей России.",
    },
    {
      id: "proektirovanie",
      n: "02",
      title: "Замер и проектирование",
      text: "Замер светопрозрачных конструкций и проектирование: сложная архитектура и типовые проёмы. Выезд на объект заказчика.",
    },
    {
      id: "servis-card",
      n: "03",
      title: "Сервис и обслуживание",
      text: "Ремонт и обслуживание светопрозрачных конструкций: диагностика, ремонт, сервис действующих систем.",
    },
  ];

  return (
    <Section>
      <Kicker>Завод</Kicker>
      <SectionTitle>Полный цикл</SectionTitle>
      <div className="mt-12 grid gap-px bg-border md:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.title}
            id={item.id === "proizvodstvo" || item.id === "proektirovanie" ? item.id : undefined}
            className="scroll-mt-24 bg-surface p-6 sm:p-8"
          >
            <p className="font-display text-sm tracking-[0.16em] text-accent">{item.n}</p>
            <h3 className="font-display mt-4 text-xl font-semibold tracking-tight text-foreground">
              {item.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-muted">{item.text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

export function Systems() {
  return (
    <Section className="bg-surface-muted" drawing="/drawings/aluminum.jpg">
      <Kicker>Системы</Kicker>
      <SectionTitle>Алюминиевые и ПВХ светопрозрачные конструкции</SectionTitle>
      <div className="mt-12 grid gap-px bg-border md:grid-cols-2">
        <article className="overflow-hidden bg-surface">
          <div className="relative h-64">
            <Image
              src="/portfolio/14-highrise.jpg"
              alt="Фасадное остекление, алюминиевые светопрозрачные конструкции"
              fill
              quality={70}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="p-6 sm:p-8">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">Алюминий</h3>
            <p className="mt-4 text-sm leading-7 text-muted">
              Фасадное остекление, входные группы из алюминия, панорамное
              остекление, алюминиевые окна и двери. Там, где нужна жёсткость и
              масштаб.
            </p>
          </div>
        </article>
        <article className="overflow-hidden bg-surface">
          <div className="relative h-64">
            <Image
              src="/portfolio/18-house-dusk.jpg"
              alt="Окна ПВХ от производителя, частный дом"
              fill
              quality={70}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="p-6 sm:p-8">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">ПВХ</h3>
            <p className="mt-4 text-sm leading-7 text-muted">
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
      <Kicker>Проектирование</Kicker>
      <SectionTitle>Проектирование светопрозрачных конструкций</SectionTitle>
      <div className="mt-12 grid gap-px bg-border md:grid-cols-2">
        <article className="bg-surface p-6 sm:p-8">
          <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
            Сложная архитектура
          </h3>
          <p className="mt-4 text-sm leading-7 text-muted">
            Нестандартные узлы, панорамное и фасадное остекление. Считаем,
            проектируем, производим под объект.
          </p>
        </article>
        <article className="bg-surface p-6 sm:p-8">
          <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
            Типовые задачи
          </h3>
          <p className="mt-4 text-sm leading-7 text-muted">
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
    <Section id="servis" className="bg-surface-muted" drawing="/drawings/service.jpg">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <Kicker>Сервис</Kicker>
          <SectionTitle>Ремонт и обслуживание светопрозрачных конструкций</SectionTitle>
          <p className="mt-5 text-muted leading-7">
            Диагностика, ремонт алюминиевых конструкций и окон ПВХ, обслуживание
            уже стоящих светопрозрачных конструкций. Заявка на выезд по России —
            по согласованию.
          </p>
          <a href="#kontakty" className={`${btnPrimary} mt-8`}>
            Вызвать сервис
          </a>
        </div>
        <div className="relative h-80 overflow-hidden">
          <Image
            src="/illustrations/service.jpg"
            alt="Ремонт и обслуживание светопрозрачных конструкций: уплотнители, фурнитура, стеклопакет"
            fill
            quality={75}
            className="object-cover object-center"
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
      <div className="grid gap-px bg-border md:grid-cols-2">
        <article className="bg-surface p-6 sm:p-10">
          <Kicker>Частный заказ</Kicker>
          <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight text-foreground">
            Частному заказчику
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted">
            Дом, окна ПВХ, входная группа, обслуживание. Замер на объекте — по
            всей России.
          </p>
        </article>
        <article className="bg-surface p-6 sm:p-10">
          <Kicker>Подряд</Kicker>
          <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight text-foreground">
            Застройщику и подрядчику
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted">
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
    <Section className="bg-surface-muted" drawing="/drawings/entrance.jpg">
      <Kicker>Маршрут</Kicker>
      <SectionTitle>Остекление под ключ</SectionTitle>
      <div className="mt-12 grid gap-px bg-border md:grid-cols-2">
        <ol className="space-y-5 bg-surface p-6 text-sm leading-6 text-muted sm:p-8">
          <li className="kicker text-accent">Новый объект</li>
          <li>1. Заявка на сайте, звонок, почта или Telegram</li>
          <li>2. Замер на объекте клиента</li>
          <li>3. Проект и согласование</li>
          <li>4. Производство</li>
          <li>5. Монтаж</li>
        </ol>
        <ol className="space-y-5 bg-surface p-6 text-sm leading-6 text-muted sm:p-8">
          <li className="kicker text-accent">Сервис</li>
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
    <section id="obekty" className="scroll-mt-24 py-16 sm:py-24">
      <PortfolioGallery />
    </section>
  );
}

export function Faq() {
  return (
    <Section id="faq" drawing="/drawings/complex.jpg">
      <Kicker>Справка</Kicker>
      <SectionTitle>Вопросы</SectionTitle>
      <dl className="mt-12 grid gap-0 border-t border-border">
        {faqItems.map((item) => (
          <div key={item.q} className="border-b border-border py-6">
            <dt className="font-display text-lg font-semibold tracking-tight text-foreground">{item.q}</dt>
            <dd className="mt-2 text-sm leading-7 text-muted">{item.a}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

export function Contacts() {
  return (
    <Section id="kontakty" className="bg-surface-muted pt-8">
      <div className="grid gap-10 md:grid-cols-2 md:items-start md:gap-16">
        <div>
          <Kicker>Связь</Kicker>
          <SectionTitle>Контакты</SectionTitle>
          <div className="mt-8">
            <BrandLogo />
          </div>
          <p className="mt-4 text-sm uppercase tracking-[0.14em] text-muted">
            {site.city} · {site.coverage}
          </p>
          <a
            href={site.phoneHref}
            className="font-display mt-5 block text-2xl font-semibold tracking-tight text-foreground hover:text-accent"
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
              className="mt-3 inline-block text-sm uppercase tracking-[0.12em] text-accent hover:text-accent-hover"
            >
              Реквизиты
            </Link>
          </p>
          <p className="mt-6 max-w-xl text-sm leading-7 text-faint">
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
