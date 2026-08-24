import { NextResponse } from "next/server";

const tasks = new Set(["production", "design", "service"]);
const clients = new Set(["private", "company"]);

function isRuPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length === 11 && (digits.startsWith("7") || digits.startsWith("8"));
}

export async function POST(request: Request) {
  let body: {
    name?: string;
    phone?: string;
    client?: string;
    task?: string;
    comment?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const name = String(body.name || "").trim();
  const phone = String(body.phone || "").trim();
  const client = String(body.client || "");
  const task = String(body.task || "");
  const comment = String(body.comment || "").trim();

  if (!name || !isRuPhone(phone) || !clients.has(client) || !tasks.has(task)) {
    return NextResponse.json({ error: "validation" }, { status: 400 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const text = [
    "Заявка с сайта Мартенсит",
    `Имя: ${name}`,
    `Телефон: ${phone}`,
    `Клиент: ${client === "company" ? "компания" : "частник"}`,
    `Задача: ${task}`,
    comment ? `Комментарий: ${comment}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  if (token && chatId) {
    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
    if (!tg.ok) {
      return NextResponse.json({ error: "delivery" }, { status: 502 });
    }
  } else {
    console.info("[lead]", text);
  }

  return NextResponse.json({ ok: true });
}
