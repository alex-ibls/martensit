import { NextResponse } from "next/server";
import { verifyCaptcha } from "@/lib/captcha";
import {
  leadClientLabel,
  leadTaskLabel,
  parseLeadPayload,
} from "@/lib/lead";
import { sendLeadMail, smtpConfigured } from "@/lib/mail";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const parsed = parseLeadPayload(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  if (parsed.spam) {
    return NextResponse.json({ ok: true });
  }

  if (!verifyCaptcha(body.captchaToken, body.captcha)) {
    return NextResponse.json({ error: "captcha" }, { status: 400 });
  }

  const text = [
    "Заявка с сайта Мартенсит",
    `Имя: ${parsed.name}`,
    `Телефон: ${parsed.phone}`,
    `Клиент: ${leadClientLabel(parsed.client)}`,
    `Задача: ${leadTaskLabel(parsed.task)}`,
    parsed.comment ? `Комментарий: ${parsed.comment}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  if (!smtpConfigured()) {
    console.error("[lead] SMTP is not configured");
    return NextResponse.json({ error: "delivery" }, { status: 503 });
  }

  try {
    await sendLeadMail(text, `Заявка с сайта: ${parsed.name}`);
  } catch {
    console.error("[lead] SMTP failed");
    return NextResponse.json({ error: "delivery" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
