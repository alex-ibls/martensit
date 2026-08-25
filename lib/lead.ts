export const leadTasks = [
  { value: "production", label: "Производство и монтаж" },
  { value: "design", label: "Замер и проектирование" },
  { value: "service", label: "Сервис" },
] as const;

export const leadClients = [
  { value: "private", label: "Частный заказчик" },
  { value: "company", label: "Компания" },
] as const;

const taskValues = new Set<string>(leadTasks.map((item) => item.value));
const clientValues = new Set<string>(leadClients.map((item) => item.value));

export const LEAD_FILE_MAX_BYTES = 10 * 1024 * 1024;
export const leadFileAccept = ".jpg,.jpeg,.png,.webp,.heic,.heif,.pdf,.zip,.dwg,.dxf";
export const leadFileHint = "Фото проёма, PDF, ZIP или чертёж DWG/DXF, до 10 МБ";

const allowedFileExt = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".heic",
  ".heif",
  ".pdf",
  ".zip",
  ".dwg",
  ".dxf",
]);

const allowedFileMime = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "application/pdf",
  "application/zip",
  "application/x-zip-compressed",
  "application/acad",
  "image/vnd.dwg",
  "application/dxf",
  "application/octet-stream",
]);

export function fileExtension(name: string) {
  const base = name.replace(/^.*[/\\]/, "");
  const dot = base.lastIndexOf(".");
  return dot >= 0 ? base.slice(dot).toLowerCase() : "";
}

export function safeAttachmentName(name: string) {
  const base = name.replace(/^.*[/\\]/, "").trim();
  const cleaned = base.replace(/[^\w.\-()\sа-яА-ЯёЁ]+/gi, "_").slice(0, 80);
  return cleaned || "attachment";
}

export function parseLeadFile(value: FormDataEntryValue | null) {
  if (!value || typeof value === "string") {
    return { ok: true as const, file: null };
  }
  if (!(value instanceof File) || value.size === 0 || !value.name) {
    return { ok: true as const, file: null };
  }
  if (value.size > LEAD_FILE_MAX_BYTES) {
    return { ok: false as const, error: "file" as const };
  }

  const ext = fileExtension(value.name);
  if (!allowedFileExt.has(ext)) {
    return { ok: false as const, error: "file" as const };
  }

  const mime = (value.type || "application/octet-stream").toLowerCase();
  if (!allowedFileMime.has(mime)) {
    return { ok: false as const, error: "file" as const };
  }
  if (mime === "application/octet-stream" && ![".dwg", ".dxf", ".zip"].includes(ext)) {
    return { ok: false as const, error: "file" as const };
  }

  return { ok: true as const, file: value };
}

export function isRuPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length === 11 && (digits.startsWith("7") || digits.startsWith("8"));
}

export function leadTaskLabel(value: string) {
  return leadTasks.find((item) => item.value === value)?.label || value;
}

export function leadClientLabel(value: string) {
  return leadClients.find((item) => item.value === value)?.label || value;
}

export function parseLeadPayload(input: {
  name?: unknown;
  phone?: unknown;
  client?: unknown;
  task?: unknown;
  comment?: unknown;
  website?: unknown;
}) {
  const name = String(input.name || "").trim().slice(0, 80);
  const phone = String(input.phone || "").trim().slice(0, 32);
  const client = String(input.client || "");
  const task = String(input.task || "");
  const comment = String(input.comment || "").trim().slice(0, 2000);
  const honeypot = String(input.website || "").trim();

  if (honeypot) {
    return { ok: true as const, spam: true as const };
  }

  if (!name || !isRuPhone(phone) || !clientValues.has(client) || !taskValues.has(task)) {
    return { ok: false as const, error: "validation" as const };
  }

  return {
    ok: true as const,
    spam: false as const,
    name,
    phone,
    client,
    task,
    comment,
  };
}
