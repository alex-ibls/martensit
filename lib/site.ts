export const site = {
  brand: "Мартенсит",
  tagline: "завод светопрозрачных конструкций",
  legalName: "Мартенсит",
  city: "Воронеж",
  region: "Воронежская область",
  country: "Россия",
  coverage: "по всей России",
  capacity: "2 500–3 000 м²",
  title:
    "Производство и монтаж светопрозрачных конструкций по России — завод Мартенсит, Воронеж",
  description:
    "Завод светопрозрачных конструкций в Воронеже. Изготовление и монтаж на алюминии и ПВХ по всей России. Замер, проект, входные группы, фасады, окна. Заказать от производителя.",
  h1: "Мартенсит — завод светопрозрачных конструкций",
  keywords: [
    "светопрозрачные конструкции",
    "светопрозрачные конструкции Воронеж",
    "светопрозрачные конструкции по России",
    "завод светопрозрачных конструкций",
    "производство светопрозрачных конструкций",
    "монтаж светопрозрачных конструкций",
    "монтаж светопрозрачных конструкций по России",
    "алюминиевые светопрозрачные конструкции",
    "ПВХ конструкции",
    "фасадное остекление",
    "входные группы",
    "окна ПВХ от производителя",
  ],
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  email: "semen.morgunov@inbox.ru",
  phone: "+7 980 544-28-13",
  phoneHref: "tel:+79805442813",
  telegramUrl: process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/+79805442813",
  maxUrl:
    process.env.NEXT_PUBLIC_MAX_URL ||
    "https://max.ru/u/f9LHodD0cOKjSvFzylsc-JTXQtUCXMxiJflXuIc9r2MZAzkjWJ7lyp7B3PU",
} as const;

export const nav = [
  { href: "#proizvodstvo", label: "Производство" },
  { href: "#proektirovanie", label: "Проектирование" },
  { href: "#servis", label: "Сервис" },
  { href: "#obekty", label: "Объекты" },
  { href: "#kontakty", label: "Контакты" },
] as const;

export function messengerHref(url: string) {
  return url || "#kontakty";
}
