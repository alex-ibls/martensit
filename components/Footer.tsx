import Link from "next/link";
import { nav, site } from "@/lib/site";
import { MessengerLinks } from "@/components/Messengers";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0c0e10] py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div>
          <p className="font-semibold text-zinc-50">{site.brand}</p>
          <p className="mt-1 text-sm text-zinc-400">{site.tagline}</p>
          <p className="mt-1 text-sm text-zinc-400">{site.city}</p>
          <a
            href={site.phoneHref}
            className="mt-2 block text-sm text-teal-200 hover:text-teal-100"
          >
            {site.phone}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="mt-2 inline-block text-sm text-teal-200 hover:text-teal-100"
          >
            {site.email}
          </a>
          <p className="mt-3 text-sm text-zinc-500">
            Замер и встреча — по согласованию.
          </p>
        </div>
        <nav className="flex flex-col gap-2 text-sm text-zinc-300" aria-label="Подвал">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-teal-200">
              {item.label}
            </a>
          ))}
          <Link href="/privacy" className="hover:text-teal-200">
            Политика обработки персональных данных
          </Link>
        </nav>
        <MessengerLinks />
      </div>
      <p className="mx-auto mt-8 max-w-6xl px-4 text-xs text-zinc-600 sm:px-6">
        © {new Date().getFullYear()} {site.brand} — {site.tagline}.
      </p>
    </footer>
  );
}
