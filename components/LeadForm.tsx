"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { MessengerLinks } from "@/components/Messengers";
import { isRuPhone, leadClients, leadTasks } from "@/lib/lead";
import { site } from "@/lib/site";

const fieldClass =
  "rounded-md border border-border bg-background px-3 py-2 text-foreground outline-none focus:border-accent";

type CaptchaChallenge = {
  token: string;
  svg: string;
};

export function LeadForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const [captcha, setCaptcha] = useState<CaptchaChallenge | null>(null);

  const loadCaptcha = useCallback(async () => {
    const res = await fetch("/api/captcha", { cache: "no-store" });
    if (!res.ok) throw new Error("captcha");
    const data = (await res.json()) as CaptchaChallenge;
    if (!data.token || !data.svg) throw new Error("captcha");
    setCaptcha(data);
  }, []);

  useEffect(() => {
    loadCaptcha().catch(() => {
      setError("Не удалось загрузить проверку. Обновите страницу.");
    });
  }, [loadCaptcha]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const client = String(data.get("client") || "");
    const task = String(data.get("task") || "");
    const comment = String(data.get("comment") || "").trim();
    const website = String(data.get("website") || "").trim();
    const captchaAnswer = String(data.get("captcha") || "").trim();
    const consent = data.get("consent") === "on";

    if (!name || !isRuPhone(phone) || !client || !task || !consent) {
      setError("Укажите имя, телефон в формате +7 или 8xxxxxxxxxx и отметьте согласие.");
      return;
    }
    if (!captcha?.token || !captchaAnswer) {
      setError("Введите символы с картинки.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          client,
          task,
          comment,
          website,
          captchaToken: captcha.token,
          captcha: captchaAnswer,
        }),
      });
      const payload = (await res.json().catch(() => ({}))) as { error?: string };
      if (res.ok) {
        setStatus("ok");
        form.reset();
        return;
      }
      if (payload.error === "captcha") {
        setError("Неверные символы. Введите заново.");
        form.querySelector<HTMLInputElement>('input[name="captcha"]')?.select();
        await loadCaptcha();
        setStatus("idle");
        return;
      }
      throw new Error("fail");
    } catch {
      setStatus("error");
      setError("Не удалось отправить. Позвоните, напишите на почту или в Telegram.");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-xl border border-accent/30 bg-surface p-6">
        <p className="text-lg font-medium text-foreground">Заявка принята. Перезвоним или напишем.</p>
        <a href={site.phoneHref} className="mt-3 block text-accent hover:text-accent-hover">
          {site.phone}
        </a>
        <p className="mt-2 text-sm text-muted">Если удобнее мессенджер — Telegram:</p>
        <MessengerLinks className="mt-4" />
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-xl border border-border bg-surface p-6">
      <h3 className="font-display text-lg font-semibold text-foreground">Заявка</h3>
      <label className="sr-only">
        Сайт
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="grid gap-1 text-sm text-muted">
        Имя
        <input name="name" required autoComplete="name" className={fieldClass} />
      </label>
      <label className="grid gap-1 text-sm text-muted">
        Телефон
        <input
          name="phone"
          required
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+7 900 000-00-00"
          className={fieldClass}
        />
      </label>
      <fieldset className="grid gap-2 text-sm text-muted">
        <legend>Кто вы</legend>
        {leadClients.map((item) => (
          <label key={item.value} className="flex items-center gap-2 text-foreground">
            <input type="radio" name="client" value={item.value} required />
            {item.label}
          </label>
        ))}
      </fieldset>
      <label className="grid gap-1 text-sm text-muted">
        Тип задачи
        <select name="task" required defaultValue="" className={fieldClass}>
          <option value="" disabled>
            Выберите
          </option>
          {leadTasks.map((task) => (
            <option key={task.value} value={task.value}>
              {task.label}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 text-sm text-muted">
        Комментарий
        <textarea name="comment" rows={3} className={fieldClass} />
      </label>
      <div className="grid gap-2">
        <span className="text-sm text-muted">Проверка</span>
        <div className="flex items-center gap-2">
          {captcha ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(captcha.svg)}`}
              alt="Символы для проверки"
              width={180}
              height={56}
              className="h-14 w-[180px] rounded-md border border-border bg-[#ecebe9]"
            />
          ) : (
            <div className="h-14 w-[180px] rounded-md border border-border bg-background" />
          )}
          <button
            type="button"
            onClick={() => {
              loadCaptcha().catch(() => {
                setError("Не удалось обновить проверку.");
              });
            }}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background text-foreground transition hover:border-accent/40"
            aria-label="Обновить картинку"
            title="Обновить картинку"
          >
            <RefreshIcon />
          </button>
        </div>
        <label className="grid gap-1 text-sm text-muted">
          Символы с картинки
          <input
            name="captcha"
            required
            autoComplete="off"
            spellCheck={false}
            inputMode="text"
            className={`${fieldClass} uppercase tracking-[0.2em]`}
          />
        </label>
      </div>
      <label className="flex items-start gap-2 text-sm text-muted">
        <input name="consent" type="checkbox" required className="mt-1" />
        <span>
          Согласен на обработку персональных данных.{" "}
          <Link href="/privacy" className="text-accent underline underline-offset-2 hover:text-accent-hover">
            Политика
          </Link>
        </span>
      </label>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {status === "error" ? (
        <>
          <a href={site.phoneHref} className="text-sm text-accent hover:text-accent-hover">
            {site.phone}
          </a>
          <MessengerLinks />
        </>
      ) : null}
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-md bg-cta px-6 py-3 text-sm font-semibold text-cta-fg transition hover:brightness-110 disabled:opacity-60"
      >
        {status === "loading" ? "Отправка…" : "Отправить заявку"}
      </button>
    </form>
  );
}

function RefreshIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M20 12a8 8 0 1 1-2.2-5.5" />
      <path d="M20 5v5h-5" />
    </svg>
  );
}
