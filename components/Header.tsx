"use client";

import { useState } from "react";
import { nav, site } from "@/lib/site";
import { MessengerLinks } from "@/components/Messengers";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#111418]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="min-w-0 leading-tight">
          <span className="block font-semibold tracking-wide text-zinc-50">
            {site.brand}
          </span>
          <span className="hidden text-[11px] font-normal tracking-wide text-zinc-400 sm:block">
            {site.tagline}
          </span>
        </a>

        <nav className="hidden items-center gap-6 text-sm text-zinc-300 lg:flex" aria-label="Основное меню">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-teal-200">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className="hidden text-sm font-medium text-zinc-100 hover:text-teal-200 sm:inline"
          >
            {site.phone}
          </a>
          <a
            href={site.phoneHref}
            className="inline-flex h-10 items-center rounded-full border border-white/15 bg-white/5 px-3 text-sm text-zinc-100 hover:border-teal-300/40 sm:hidden"
          >
            Позвонить
          </a>
          <div className="md:hidden">
            <MessengerLinks compact />
          </div>
          <div className="hidden md:block">
            <MessengerLinks />
          </div>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-zinc-100 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Меню</span>
            <span aria-hidden className="text-lg">
              {open ? "×" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-menu" className="border-t border-white/10 bg-[#111418] px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-3 text-zinc-200" aria-label="Мобильное меню">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-1"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a href={site.phoneHref} className="mt-4 block text-teal-200">
            {site.phone}
          </a>
          <MessengerLinks className="mt-4 md:hidden" />
        </div>
      ) : null}
    </header>
  );
}
