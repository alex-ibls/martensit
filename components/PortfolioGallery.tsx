"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { portfolio } from "@/lib/portfolio";
import { btnIcon } from "@/lib/ui";

function Chevron({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      {dir === "prev" ? (
        <path d="M14.5 6 8.5 12l6 6" />
      ) : (
        <path d="m9.5 6 6 6-6 6" />
      )}
    </svg>
  );
}

export function PortfolioGallery() {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const reduceMotion = useRef(false);
  const listId = useId();
  const headingId = useId();
  const [index, setIndex] = useState(0);
  const total = portfolio.length;

  useEffect(() => {
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const syncIndex = useCallback(() => {
    const root = scrollerRef.current;
    if (!root) return;
    const slides = [...root.children] as HTMLElement[];
    if (!slides.length) return;
    const pad = Number.parseFloat(getComputedStyle(root).paddingInlineStart) || 0;
    const mark = root.scrollLeft + pad + 8;
    let best = 0;
    let bestDist = Infinity;
    slides.forEach((slide, i) => {
      const dist = Math.abs(slide.offsetLeft - mark);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setIndex(best);
  }, []);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;
    syncIndex();
    root.addEventListener("scroll", syncIndex, { passive: true });
    window.addEventListener("resize", syncIndex);
    return () => {
      root.removeEventListener("scroll", syncIndex);
      window.removeEventListener("resize", syncIndex);
    };
  }, [syncIndex]);

  const go = useCallback((dir: -1 | 1) => {
    const root = scrollerRef.current;
    if (!root) return;
    const slides = [...root.children] as HTMLElement[];
    const next = Math.min(slides.length - 1, Math.max(0, index + dir));
    if (next === index) return;
    slides[next]?.scrollIntoView({
      inline: "start",
      block: "nearest",
      behavior: reduceMotion.current ? "auto" : "smooth",
    });
  }, [index]);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;
    let pointerId: number | null = null;
    let startX = 0;
    let startScroll = 0;
    let dragging = false;

    function onPointerDown(event: PointerEvent) {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      const el = scrollerRef.current;
      if (!el) return;
      pointerId = event.pointerId;
      startX = event.clientX;
      startScroll = el.scrollLeft;
      dragging = false;
      el.setPointerCapture(event.pointerId);
    }

    function onPointerMove(event: PointerEvent) {
      const el = scrollerRef.current;
      if (!el || pointerId !== event.pointerId) return;
      const dx = event.clientX - startX;
      if (!dragging && Math.abs(dx) < 4) return;
      dragging = true;
      el.classList.add("cursor-grabbing");
      el.scrollLeft = startScroll - dx;
    }

    function onPointerUp(event: PointerEvent) {
      const el = scrollerRef.current;
      if (!el || pointerId !== event.pointerId) return;
      el.classList.remove("cursor-grabbing");
      if (el.hasPointerCapture(event.pointerId)) {
        el.releasePointerCapture(event.pointerId);
      }
      pointerId = null;
    }

    root.addEventListener("pointerdown", onPointerDown);
    root.addEventListener("pointermove", onPointerMove);
    root.addEventListener("pointerup", onPointerUp);
    root.addEventListener("pointercancel", onPointerUp);
    return () => {
      root.removeEventListener("pointerdown", onPointerDown);
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerup", onPointerUp);
      root.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  return (
    <div
      role="region"
      aria-labelledby={headingId}
      className="outline-none"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          go(-1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          go(1);
        }
      }}
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-4 px-4 sm:px-6">
        <div className="min-w-0">
          <p className="kicker text-accent">Работы</p>
          <h2 id={headingId} className="font-display mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Объекты
          </h2>
          <p className="mt-3 text-muted">
            Алюминиевые и ПВХ светопрозрачные конструкции.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p className="mr-2 tabular-nums text-sm text-muted" aria-live="polite">
            {index + 1} / {total}
          </p>
          <button
            type="button"
            className={`${btnIcon} disabled:pointer-events-none disabled:opacity-35`}
            aria-label="Предыдущий объект"
            aria-controls={listId}
            disabled={index === 0}
            onClick={() => go(-1)}
          >
            <Chevron dir="prev" />
          </button>
          <button
            type="button"
            className={`${btnIcon} disabled:pointer-events-none disabled:opacity-35`}
            aria-label="Следующий объект"
            aria-controls={listId}
            disabled={index === total - 1}
            onClick={() => go(1)}
          >
            <Chevron dir="next" />
          </button>
        </div>
      </div>

      <ul
        id={listId}
        ref={scrollerRef}
        aria-label="Слайды"
        className="gallery-scroll mt-10 flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-[max(1rem,calc((100vw-72rem)/2+1rem))] pb-2 sm:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] sm:[scroll-padding-inline:max(1.5rem,calc((100vw-72rem)/2+1.5rem))] [scroll-padding-inline:max(1rem,calc((100vw-72rem)/2+1rem))]"
      >
        {portfolio.map((item) => (
          <li
            key={item.src}
            className="w-[min(32rem,82vw)] shrink-0 snap-start overflow-hidden border border-border bg-surface"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                draggable={false}
                className="pointer-events-none object-cover"
                sizes="(max-width: 640px) 82vw, 32rem"
                quality={75}
              />
            </div>
            <p className="px-4 py-3 text-sm text-muted">{item.caption}</p>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-6 max-w-6xl px-4 sm:px-6" aria-hidden>
        <div className="h-px bg-border">
          <div
            className="h-px bg-accent transition-[width] duration-300 ease-out motion-reduce:transition-none"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
