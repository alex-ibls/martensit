import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-muted py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div>
          <BrandLogo />
          <p className="mt-3 text-sm text-muted">
            {site.city} · {site.coverage}
          </p>
        </div>
        <nav className="flex flex-col gap-2 text-sm text-muted" aria-label="Подвал">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-accent">
              {item.label}
            </a>
          ))}
          <Link href="/privacy" className="hover:text-accent">
            Политика обработки персональных данных
          </Link>
        </nav>
      </div>
      <p className="mx-auto mt-8 max-w-6xl px-4 text-xs text-faint sm:px-6">
        © {new Date().getFullYear()} {site.legalName}. Производство в Воронеже,
        монтаж светопрозрачных конструкций по всей России.
      </p>
    </footer>
  );
}
