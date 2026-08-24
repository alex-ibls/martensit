"use client";

import { useState } from "react";
import { nav, site } from "@/lib/site";
import { BrandLogo } from "@/components/BrandLogo";
import { MessengerLinks } from "@/components/Messengers";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:gap-4 sm:px-6">
        <a href="#top" className="min-w-0 shrink">
          <BrandLogo taglineClassName="hidden text-[11px] font-normal tracking-wide text-muted xl:block" />
        </a>

        <nav className="hidden items-center gap-4 text-sm text-muted lg:flex xl:gap-6" aria-label="Основное меню">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="whitespace-nowrap hover:text-accent">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={site.phoneHref}
            className="hidden whitespace-nowrap text-sm font-medium text-foreground hover:text-accent sm:inline"
          >
            {site.phone}
          </a>
          <a
            href={site.phoneHref}
            className="inline-flex min-h-11 items-center whitespace-nowrap rounded-md border border-border bg-surface px-3 text-sm text-foreground hover:border-accent/40 sm:hidden"
          >
            Позвонить
          </a>
          <ThemeToggle />
          <div className="hidden lg:block xl:hidden">
            <MessengerLinks compact />
          </div>
          <div className="hidden xl:block">
            <MessengerLinks />
          </div>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border text-foreground lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden className="text-lg">
              {open ? "×" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-menu" className="border-t border-border bg-background px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-3 text-foreground" aria-label="Мобильное меню">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="min-h-11 py-2.5"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a href={site.phoneHref} className="mt-4 block text-accent">
            {site.phone}
          </a>
          <MessengerLinks className="mt-4 lg:hidden" />
        </div>
      ) : null}
    </header>
  );
}
