"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { MessengerLinks } from "@/components/Messengers";
import { isLeadEmail, isRuPhone, leadFileAccept, leadFileHint, LEAD_FILE_MAX_BYTES, leadTasks } from "@/lib/lead";
import { site } from "@/lib/site";

import { fieldClass, btnPrimary, btnIcon, panel } from "@/lib/ui";

type CaptchaChallenge = {
  token: string;
  svg: string;
};

export function LeadForm({ commentDefault = "" }: { commentDefault?: string }) {
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
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const task = String(data.get("task") || "");
    const captchaAnswer = String(data.get("captcha") || "").trim();
    const consent = data.get("consent") === "on";

    if (!name || !isLeadEmail(email) || !task || !consent) {
      setError("Укажите имя, адрес электронной почты и отметьте согласие.");
      return;
    }
    if (phone && !isRuPhone(phone)) {
      setError("Телефон, если указываете, — в формате +7 или 8xxxxxxxxxx.");
      return;
    }
    if (!captcha?.token || !captchaAnswer) {
      setError("Введите символы с картинки.");
      return;
    }

    const file = data.get("file");
    if (file instanceof File && file.size > LEAD_FILE_MAX_BYTES) {
      setError("Файл больше 10 МБ. Уменьшите его или отправьте без вложения.");
      return;
    }

    setStatus("loading");
    try {
      const payload = new FormData(form);
      payload.set("captchaToken", captcha.token);
      const res = await fetch("/api/lead", {
        method: "POST",
        body: payload,
      });
      const result = (await res.json().catch(() => ({}))) as { error?: string };
      if (res.ok) {
        setStatus("ok");
        form.reset();
        return;
      }
      if (result.error === "captcha") {
        setError("Неверные символы. Введите заново.");
        form.querySelector<HTMLInputElement>('input[name="captcha"]')?.select();
        await loadCaptcha();
        setStatus("idle");
        return;
      }
      if (result.error === "file") {
        setError("Этот файл нельзя прикрепить. Нужны фото, PDF, ZIP или чертёж DWG/DXF до 10 МБ.");
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
      <div className={`${panel} p-6 sm:p-8`}>
        <p className="text-lg font-medium text-foreground">Заявка принята. Напишем на почту или перезвоним.</p>
        <a href={site.phoneHref} className="mt-3 block text-accent hover:text-accent-hover">
          {site.phone}
        </a>
        <p className="mt-2 text-sm text-muted">Если удобнее мессенджер — Telegram:</p>
        <MessengerLinks className="mt-4" />
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`grid gap-4 ${panel} p-6 sm:p-8`}>
      <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">Заявка</h3>
      <label className="sr-only">
        Сайт
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="grid gap-1 text-sm text-muted">
        Имя
        <input name="name" required autoComplete="name" className={fieldClass} />
      </label>
      <label className="grid gap-1 text-sm text-muted">
        Электронная почта
        <input
          name="email"
          required
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="name@company.ru"
          className={fieldClass}
        />
      </label>
      <label className="grid gap-1 text-sm text-muted">
        Телефон
        <input
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+7 900 000-00-00"
          className={fieldClass}
        />
      </label>
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
        <textarea name="comment" rows={3} defaultValue={commentDefault} className={fieldClass} />
      </label>
      <label className="grid gap-1 text-sm text-muted">
        Файл, если нужно
        <input
          name="file"
          type="file"
          accept={leadFileAccept}
          className="rounded-none border border-border bg-background px-3 py-2 text-sm text-foreground file:mr-3 file:rounded-none file:border-0 file:bg-surface-muted file:px-3 file:py-1.5 file:text-xs file:uppercase file:tracking-[0.12em] file:text-foreground"
        />
        <span className="text-xs text-faint">{leadFileHint}</span>
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
              className="h-14 w-[180px] rounded-none border border-border bg-[#ecebe9]"
            />
          ) : (
            <div className="h-14 w-[180px] rounded-none border border-border bg-background" />
          )}
          <button
            type="button"
            onClick={() => {
              loadCaptcha().catch(() => {
                setError("Не удалось обновить проверку.");
              });
            }}
            className={btnIcon}
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
        className={btnPrimary}
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
