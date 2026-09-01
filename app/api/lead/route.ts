import { NextResponse } from "next/server";
import { verifyCaptcha } from "@/lib/captcha";
import {
  leadTaskLabel,
  parseLeadFile,
  parseLeadPayload,
  safeAttachmentName,
} from "@/lib/lead";
import { sendLeadMail, smtpConfigured } from "@/lib/mail";

export const runtime = "nodejs";

async function readLeadRequest(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("multipart/form-data")) {
    const form = await request.formData();
    return {
      fields: {
        name: form.get("name"),
        email: form.get("email"),
        phone: form.get("phone"),
        task: form.get("task"),
        comment: form.get("comment"),
        website: form.get("website"),
        captchaToken: form.get("captchaToken"),
        captcha: form.get("captcha"),
      },
      file: form.get("file"),
    };
  }

  const json = (await request.json()) as Record<string, unknown>;
  return { fields: json, file: null };
}

export async function POST(request: Request) {
  let fields: Record<string, unknown>;
  let fileValue: FormDataEntryValue | null;

  try {
    const parsedRequest = await readLeadRequest(request);
    fields = parsedRequest.fields;
    fileValue = parsedRequest.file;
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const parsed = parseLeadPayload(fields);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  if (parsed.spam) {
    return NextResponse.json({ ok: true });
  }

  if (!verifyCaptcha(fields.captchaToken, fields.captcha)) {
    return NextResponse.json({ error: "captcha" }, { status: 400 });
  }

  const parsedFile = parseLeadFile(fileValue);
  if (!parsedFile.ok) {
    return NextResponse.json({ error: parsedFile.error }, { status: 400 });
  }

  const attachment = parsedFile.file
    ? {
        filename: safeAttachmentName(parsedFile.file.name),
        content: Buffer.from(await parsedFile.file.arrayBuffer()),
        contentType: parsedFile.file.type || undefined,
      }
    : undefined;

  const text = [
    "Заявка с сайта Мартенсит",
    `Имя: ${parsed.name}`,
    `Почта: ${parsed.email}`,
    parsed.phone ? `Телефон: ${parsed.phone}` : "Телефон: не указан",
    `Задача: ${leadTaskLabel(parsed.task)}`,
    parsed.comment ? `Комментарий: ${parsed.comment}` : "",
    attachment ? `Вложение: ${attachment.filename}` : "Вложение: нет",
  ]
    .filter(Boolean)
    .join("\n");

  if (!smtpConfigured()) {
    console.error("[lead] SMTP is not configured");
    return NextResponse.json({ error: "delivery" }, { status: 503 });
  }

  try {
    await sendLeadMail(text, `Заявка с сайта: ${parsed.name}`, attachment, parsed.email);
  } catch {
    console.error("[lead] SMTP failed");
    return NextResponse.json({ error: "delivery" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
