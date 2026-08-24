import type { ReactNode } from "react";
import Image from "next/image";
import { site } from "@/lib/site";
import { portfolio } from "@/lib/portfolio";
import { LeadForm } from "@/components/LeadForm";
import { MessengerLinks } from "@/components/Messengers";

const heroTiles = [...portfolio, portfolio[14], portfolio[17]];

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

export function Hero() {
  return (
    <section id="top" className="relative h-[88vh] min-h-[36rem] overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-6 gap-px bg-[#111418] lg:grid-cols-6 lg:grid-rows-4">
        {heroTiles.map((item, index) => (
          <div key={`${item.src}-${index}`} className="relative overflow-hidden">
            <Image
              src={item.src}
              alt=""
              fill
              priority={index < 12}
              className="object-cover"
              sizes="(max-width: 1024px) 25vw, 17vw"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#111418] via-[#111418]/88 to-[#111418]/55" />
      <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-24">
        <p className="text-sm uppercase tracking-[0.2em] text-teal-200/90">
          {site.city}
        </p>
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight text-zinc-50 sm:text-5xl">
          <span className="block">{site.brand}</span>
          <span className="mt-2 block text-2xl font-normal tracking-wide text-zinc-200 sm:text-3xl">
            {site.tagline}
          </span>
        </h1>
        <p className="mt-5 max-w-2xl text-base text-zinc-300 sm:text-lg">
          Производим и монтируем конструкции на алюминиевых и ПВХ профильных
          системах. Замеряем и проектируем — от типового проёма до сложной
          архитектуры. Обслуживаем действующие конструкции.
        </p>
        <p className="mt-4 inline-flex w-fit rounded-full border border-amber-200/30 bg-amber-200/10 px-4 py-1.5 text-sm text-amber-100">
          Объём производства {site.capacity} в месяц
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#zayavka"
            className="inline-flex items-center justify-center rounded-full bg-teal-200 px-6 py-3 text-sm font-semibold text-[#111418] hover:bg-teal-100"
          >
            Новый объект / замер
          </a>
          <a
            href="#servis"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-zinc-50 hover:bg-white/10"
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
    <Section className="border-y border-white/10 bg-[#0c0e10] py-10 sm:py-12">
      <p className="text-center text-sm tracking-wide text-zinc-400">
        Объём производства светопрозрачных конструкций
      </p>
      <p className="mt-2 text-center text-3xl font-semibold text-zinc-50 sm:text-4xl">
        {site.capacity} <span className="text-lg font-normal text-zinc-400">в месяц</span>
      </p>
    </Section>
  );
}

export function Pillars() {
  const items = [
    {
      id: "proizvodstvo",
      title: "Производство и монтаж",
      text: "Светопрозрачные конструкции на алюминиевых и ПВХ профильных системах — изготавливаем и ставим на объект.",
    },
    {
      id: "proektirovanie",
      title: "Замер и проектирование",
      text: "Сложные архитектурные узлы и типовые задачи. Выезд замерщика на объект заказчика.",
    },
    {
      id: "servis-card",
      title: "Сервис и обслуживание",
      text: "Диагностика, ремонт и обслуживание действующих конструкций.",
    },
  ];

  return (
    <Section>
      <h2 className="text-2xl font-semibold text-zinc-50 sm:text-3xl">Полный цикл</h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.title}
            id={item.id === "proizvodstvo" || item.id === "proektirovanie" ? item.id : undefined}
            className="scroll-mt-24 rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <h3 className="text-lg font-medium text-zinc-50">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{item.text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

export function Systems() {
  return (
    <Section className="bg-[#0c0e10]">
      <h2 className="text-2xl font-semibold text-zinc-50 sm:text-3xl">
        Алюминиевые и ПВХ профильные системы
      </h2>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <article className="overflow-hidden rounded-2xl border border-white/10">
          <div className="relative h-56">
            <Image
              src="/portfolio/14-highrise.jpg"
              alt="Фасадное остекление на алюминиевой системе"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl text-zinc-50">Алюминий</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Фасады, входные группы, крупные пролёты, панорама, архитектурные
              решения. Там, где нужна жёсткость и масштаб.
            </p>
          </div>
        </article>
        <article className="overflow-hidden rounded-2xl border border-white/10">
          <div className="relative h-56">
            <Image
              src="/portfolio/18-house-dusk.jpg"
              alt="Окна ПВХ частного дома"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl text-zinc-50">ПВХ</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Окна, двери, типовые проёмы, частный сектор. Серийные и
              стандартные задачи без лишней сложности.
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
      <h2 className="text-2xl font-semibold text-zinc-50 sm:text-3xl">
        Сложные архитектурные решения и типовые задачи
      </h2>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-white/10 p-6">
          <h3 className="text-lg text-zinc-50">Сложная архитектура</h3>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Нестандартные узлы, проект, панорама, фасад. Считаем, проектируем,
            производим под объект.
          </p>
        </article>
        <article className="rounded-2xl border border-white/10 p-6">
          <h3 className="text-lg text-zinc-50">Типовые задачи</h3>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Стандартный проём, замена, серия. Берём обычные заказы так же, как
            и крупные.
          </p>
        </article>
      </div>
    </Section>
  );
}

export function Service() {
  return (
    <Section id="servis" className="bg-[#0c0e10]">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold text-zinc-50 sm:text-3xl">
            Сервис и обслуживание действующих конструкций
          </h2>
          <p className="mt-4 text-zinc-400">
            Диагностика, ремонт, обслуживание уже стоящих светопрозрачных
            конструкций. Заявка на выезд — по согласованию.
          </p>
          <a
            href="#zayavka"
            className="mt-6 inline-flex rounded-full bg-teal-200 px-6 py-3 text-sm font-semibold text-[#111418] hover:bg-teal-100"
          >
            Вызвать сервис
          </a>
        </div>
        <div className="relative h-72 overflow-hidden rounded-2xl">
          <Image
            src="/portfolio/21-pvc-window.jpg"
            alt="Оконная конструкция, вид из помещения"
            fill
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
      <h2 className="text-2xl font-semibold text-zinc-50 sm:text-3xl">Кому работаем</h2>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-white/10 p-6">
          <h3 className="text-lg text-zinc-50">Частному заказчику</h3>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Дом, замена окон, входная группа, обслуживание. Замер на вашем
            объекте.
          </p>
        </article>
        <article className="rounded-2xl border border-white/10 p-6">
          <h3 className="text-lg text-zinc-50">Застройщику и подрядчику</h3>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Проект, объём {site.capacity} в месяц, монтаж, сопровождение объекта.
          </p>
        </article>
      </div>
    </Section>
  );
}

export function Process() {
  return (
    <Section className="bg-[#0c0e10]">
      <h2 className="text-2xl font-semibold text-zinc-50 sm:text-3xl">Как работаем</h2>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <ol className="space-y-4 text-sm text-zinc-300">
          <li className="text-xs uppercase tracking-wide text-teal-200">Новый объект</li>
          <li>1. Заявка в форме, Telegram или MAX</li>
          <li>2. Замер на объекте клиента</li>
          <li>3. Проект и согласование</li>
          <li>4. Производство</li>
          <li>5. Монтаж</li>
        </ol>
        <ol className="space-y-4 text-sm text-zinc-300">
          <li className="text-xs uppercase tracking-wide text-teal-200">Сервис</li>
          <li>1. Заявка</li>
          <li>2. Диагностика</li>
          <li>3. Ремонт или обслуживание</li>
        </ol>
      </div>
    </Section>
  );
}

export function Portfolio() {
  return (
    <Section id="obekty">
      <h2 className="text-2xl font-semibold text-zinc-50 sm:text-3xl">Объекты</h2>
      <p className="mt-3 text-zinc-400">Конструкции на алюминии и ПВХ. Адреса объектов не указываем.</p>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {portfolio.map((item) => (
          <li key={item.src} className="overflow-hidden rounded-2xl border border-white/10">
            <div className="relative aspect-[4/3]">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <p className="px-4 py-3 text-sm text-zinc-400">{item.caption}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function Lead() {
  return (
    <Section id="zayavka" className="bg-[#0c0e10]">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold text-zinc-50 sm:text-3xl">Заявка</h2>
          <p className="mt-3 text-zinc-400">
            Позвоните или напишите задачу — ответим по телефону, на почте, в
            Telegram или MAX.
          </p>
          <a
            href={site.phoneHref}
            className="mt-4 block text-lg font-medium text-teal-200 hover:text-teal-100"
          >
            {site.phone}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="mt-2 inline-block text-teal-200 hover:text-teal-100"
          >
            {site.email}
          </a>
          <MessengerLinks className="mt-6" />
        </div>
        <LeadForm />
      </div>
    </Section>
  );
}

export function Faq() {
  const items = [
    {
      q: "Как проходит замер?",
      a: "Выезжаем на объект клиента в Воронеже.",
    },
    {
      q: "Какой объём можете взять?",
      a: `${site.capacity} светопрозрачных конструкций в месяц.`,
    },
    {
      q: "Только сложные проекты?",
      a: "Нет. Делаем и архитектурные решения, и типовые окна, двери, проёмы.",
    },
    {
      q: "Есть обслуживание уже стоящих конструкций?",
      a: "Да. Сервис действующих светопрозрачных конструкций: диагностика, ремонт, обслуживание.",
    },
  ];

  return (
    <Section>
      <h2 className="text-2xl font-semibold text-zinc-50 sm:text-3xl">Вопросы</h2>
      <dl className="mt-10 grid gap-6">
        {items.map((item) => (
          <div key={item.q} className="border-b border-white/10 pb-6">
            <dt className="font-medium text-zinc-50">{item.q}</dt>
            <dd className="mt-2 text-sm leading-6 text-zinc-400">{item.a}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

export function Contacts() {
  return (
    <Section className="bg-[#0c0e10] pt-8">
      <h2 className="text-2xl font-semibold text-zinc-50 sm:text-3xl">Контакты</h2>
      <p className="mt-4 text-zinc-300">{site.brand}</p>
      <p className="mt-1 text-zinc-400">{site.tagline}</p>
      <p className="mt-1 text-zinc-400">{site.city}</p>
      <a
        href={site.phoneHref}
        className="mt-3 block text-lg font-medium text-teal-200 hover:text-teal-100"
      >
        {site.phone}
      </a>
      <a
        href={`mailto:${site.email}`}
        className="mt-2 inline-block text-teal-200 hover:text-teal-100"
      >
        {site.email}
      </a>
      <p className="mt-4 max-w-xl text-sm text-zinc-500">
        Замер, сервис и встреча — по заявке. Звоните или пишите на почту, в
        Telegram или MAX.
      </p>
      <MessengerLinks className="mt-6" />
    </Section>
  );
}
