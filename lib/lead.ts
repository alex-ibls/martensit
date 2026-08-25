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
