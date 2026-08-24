export const site = {
  brand: "Мартенсит",
  tagline: "завод светопрозрачных конструкций",
  legalName: "Мартенсит",
  city: "Воронеж",
  region: "Воронежская область",
  capacity: "2 500–3 000 м²",
  title: "Мартенсит — завод светопрозрачных конструкций | Воронеж",
  description:
    "Мартенсит — завод светопрозрачных конструкций в Воронеже. Производство и монтаж на алюминиевых и ПВХ системах. Замер, проектирование сложных и типовых решений, сервис. Объём 2 500–3 000 м² в месяц.",
  h1: "Мартенсит — завод светопрозрачных конструкций",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  telegramUrl: process.env.NEXT_PUBLIC_TELEGRAM_URL || "",
  maxUrl: process.env.NEXT_PUBLIC_MAX_URL || "",
  email: "semen.morgunov@inbox.ru",
  phone: "+7 980 544-28-13",
  phoneHref: "tel:+79805442813",
} as const;

export const nav = [
  { href: "#proizvodstvo", label: "Производство" },
  { href: "#proektirovanie", label: "Проектирование" },
  { href: "#servis", label: "Сервис" },
  { href: "#obekty", label: "Объекты" },
  { href: "#zayavka", label: "Заявка" },
] as const;

export function messengerHref(url: string) {
  return url || "#zayavka";
}
