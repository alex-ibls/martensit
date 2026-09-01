import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { nav, site, navItemHref } from "@/lib/site";

const footerPages = [
  { href: "/postavshchiki", label: "Поставщики" },
  { href: "/karta-sajta", label: "Карта сайта" },
  { href: "/rekvizity", label: "Реквизиты" },
  { href: "/privacy", label: "Политика конфиденциальности" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-hero py-12 text-zinc-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div>
          <BrandLogo className="text-zinc-50" taglineClassName="hidden text-[11px] font-normal tracking-wide text-zinc-400 sm:block" />
          <p className="mt-4 text-xs uppercase tracking-[0.16em] text-zinc-500">
            {site.city} · {site.coverage}
          </p>
        </div>
        <nav
          className="grid grid-cols-1 gap-2 text-xs uppercase tracking-[0.16em] text-zinc-400 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-2"
          aria-label="Подвал"
        >
          <div className="flex flex-col gap-2">
            {nav.map((item) => (
              <a key={item.href} href={navItemHref(item.href)} className="hover:text-zinc-50">
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {footerPages.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-zinc-50">
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-6xl px-4 text-xs text-zinc-600 sm:px-6">
        © {new Date().getFullYear()} {site.legalName}. Производство в Воронеже,
        монтаж светопрозрачных конструкций по всей России.
      </p>
    </footer>
  );
}
