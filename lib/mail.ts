import nodemailer from "nodemailer";

function env(name: string) {
  return process.env[name]?.trim() || "";
}

export function smtpConfigured() {
  return Boolean(env("SMTP_HOST") && env("SMTP_USER") && env("SMTP_PASS") && env("SMTP_TO"));
}

export function mailTransport() {
  const port = Number(env("SMTP_PORT") || "465");
  const secure = env("SMTP_SECURE") !== "false" && port === 465;

  return nodemailer.createTransport({
    host: env("SMTP_HOST") || "smtp.timeweb.ru",
    port,
    secure,
    auth: {
      user: env("SMTP_USER"),
      pass: env("SMTP_PASS"),
    },
  });
}

export async function sendLeadMail(
  text: string,
  subject: string,
  attachment?: { filename: string; content: Buffer; contentType?: string },
) {
  if (!smtpConfigured()) {
    throw new Error("smtp_unconfigured");
  }

  const from = env("SMTP_FROM") || env("SMTP_USER");
  const to = env("SMTP_TO");

  await mailTransport().sendMail({
    from,
    to,
    subject,
    text,
    attachments: attachment ? [attachment] : undefined,
  });
}
