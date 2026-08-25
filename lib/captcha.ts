import { createHmac, randomBytes, timingSafeEqual } from "crypto";

const ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
const LENGTH = 4;
const TTL_MS = 10 * 60 * 1000;

function secret() {
  return process.env.CAPTCHA_SECRET?.trim() || "";
}

export function captchaConfigured() {
  return secret().length >= 16;
}

function hmac(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

function randomText() {
  const bytes = randomBytes(LENGTH);
  let text = "";
  for (const byte of bytes) {
    text += ALPHABET[byte % ALPHABET.length];
  }
  return text;
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function captchaSvg(text: string) {
  const chars = [...text].map((char, index) => {
    const x = 22 + index * 38;
    const y = 34 + ((index % 2) * 6 - 3);
    const rotate = (index - 1.5) * 8;
    const fill = index % 2 === 0 ? "#1B1A1B" : "#18747E";
    return `<text x="${x}" y="${y}" fill="${fill}" font-size="28" font-family="ui-sans-serif, system-ui, sans-serif" font-weight="700" transform="rotate(${rotate} ${x} ${y})">${escapeXml(char)}</text>`;
  });

  const noise = Array.from({ length: 5 }, (_, i) => {
    const y = 12 + i * 8;
    return `<path d="M8 ${y} C 60 ${y + (i % 2 ? 10 : -10)}, 120 ${y + (i % 2 ? -8 : 8)}, 172 ${y}" fill="none" stroke="#74C4CD" stroke-opacity="0.45" stroke-width="1.2"/>`;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="56" viewBox="0 0 180 56" role="img" aria-hidden="true"><rect width="180" height="56" rx="6" fill="#ECEBE9"/>${noise.join("")}${chars.join("")}</svg>`;
}

export function issueCaptcha() {
  if (!captchaConfigured()) {
    throw new Error("captcha_unconfigured");
  }

  const answer = randomText();
  const exp = Date.now() + TTL_MS;
  const nonce = randomBytes(8).toString("hex");
  const sig = hmac(`${exp}.${nonce}.${answer}`);

  return {
    token: `${exp}.${nonce}.${sig}`,
    svg: captchaSvg(answer),
  };
}

export function verifyCaptcha(token: unknown, answer: unknown) {
  if (!captchaConfigured()) return false;

  const rawToken = String(token || "").trim();
  const rawAnswer = String(answer || "")
    .trim()
    .toUpperCase()
    .replaceAll(" ", "");

  const parts = rawToken.split(".");
  if (parts.length !== 3 || rawAnswer.length !== LENGTH) return false;

  const [expRaw, nonce, sig] = parts;
  const exp = Number(expRaw);
  if (!Number.isFinite(exp) || Date.now() > exp) return false;
  if (!/^[a-f0-9]{16}$/.test(nonce) || !/^[a-f0-9]{64}$/.test(sig)) return false;

  const expected = hmac(`${exp}.${nonce}.${rawAnswer}`);
  return safeEqual(expected, sig);
}
