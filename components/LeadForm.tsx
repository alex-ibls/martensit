"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { MessengerLinks } from "@/components/Messengers";
import { site } from "@/lib/site";

const tasks = [
  { value: "production", label: "Производство и монтаж" },
  { value: "design", label: "Замер и проектирование" },
  { value: "service", label: "Сервис" },
] as const;

function isRuPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length === 11 && (digits.startsWith("7") || digits.startsWith("8"));
}

export function LeadForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState("");

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
    const consent = data.get("consent") === "on";

    if (!name || !isRuPhone(phone) || !client || !task || !consent) {
      setError("Укажите имя, телефон в формате +7 или 8xxxxxxxxxx и отметьте согласие.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, client, task, comment }),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
      setError("Не удалось отправить. Позвоните или напишите в Telegram / MAX.");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl border border-teal-300/30 bg-teal-300/5 p-6">
        <p className="text-lg font-medium text-zinc-50">Заявка принята. Перезвоним или напишем.</p>
        <a href={site.phoneHref} className="mt-3 block text-teal-200">
          {site.phone}
        </a>
        <p className="mt-2 text-sm text-zinc-400">
          Если удобнее мессенджер — Telegram или MAX:
        </p>
        <MessengerLinks className="mt-4" />
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <label className="grid gap-1 text-sm text-zinc-300">
        Имя
        <input
          name="name"
          required
          autoComplete="name"
          className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-zinc-50 outline-none focus:border-teal-300/50"
        />
      </label>
      <label className="grid gap-1 text-sm text-zinc-300">
        Телефон
        <input
          name="phone"
          required
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+7 900 000-00-00"
          className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-zinc-50 outline-none focus:border-teal-300/50"
        />
      </label>
      <fieldset className="grid gap-2 text-sm text-zinc-300">
        <legend>Кто вы</legend>
        <label className="flex items-center gap-2">
          <input type="radio" name="client" value="private" required />
          Частный заказчик
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="client" value="company" />
          Компания
        </label>
      </fieldset>
      <label className="grid gap-1 text-sm text-zinc-300">
        Тип задачи
        <select
          name="task"
          required
          defaultValue=""
          className="rounded-lg border border-white/15 bg-[#1a1e24] px-3 py-2 text-zinc-50 outline-none focus:border-teal-300/50"
        >
          <option value="" disabled>
            Выберите
          </option>
          {tasks.map((task) => (
            <option key={task.value} value={task.value}>
              {task.label}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 text-sm text-zinc-300">
        Комментарий
        <textarea
          name="comment"
          rows={3}
          className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-zinc-50 outline-none focus:border-teal-300/50"
        />
      </label>
      <label className="flex items-start gap-2 text-sm text-zinc-400">
        <input name="consent" type="checkbox" required className="mt-1" />
        <span>
          Согласен на обработку персональных данных.{" "}
          <Link href="/privacy" className="text-teal-200 underline">
            Политика
          </Link>
        </span>
      </label>
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
      {status === "error" ? (
        <>
          <a href={site.phoneHref} className="text-sm text-teal-200">
            {site.phone}
          </a>
          <MessengerLinks />
        </>
      ) : null}
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-teal-200 px-6 py-3 text-sm font-semibold text-[#111418] transition hover:bg-teal-100 disabled:opacity-60"
      >
        {status === "loading" ? "Отправка…" : "Отправить заявку"}
      </button>
    </form>
  );
}
