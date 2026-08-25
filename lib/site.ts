function envText(name: string) {
  return process.env[name]?.trim() || "";
}

function envCounterId(name: string) {
  const value = envText(name);
  return /^\d+$/.test(value) ? value : "";
}

export const site = {
  brand: "Мартенсит",
  tagline: "завод светопрозрачных конструкций",
  orgName: "Завод светопрозрачных конструкций Мартенсит",
  legalName: "ООО «Мартенсит»",
  inn: "3628021590",
  ogrn: "1213600030930",
  kpp: "362801001",
  city: "Воронеж",
  region: "Воронежская область",
  country: "Россия",
  coverage: "по всей России",
  capacity: "2 500–3 000 м²",
  logo: "/brand/lockup.png",
  logoMark: "/brand/mark.png",
  ogImage: "/og/cover.jpg",
  title:
    "Производство и монтаж светопрозрачных конструкций по России — завод Мартенсит, Воронеж",
  description:
    "Завод светопрозрачных конструкций в Воронеже. Производство и монтаж на алюминии и ПВХ по всей России, замер, проектирование, сервис действующих конструкций. Объём 2 500–3 000 м² в месяц.",
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
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(
    /\/$/,
    "",
  ),
  email: "info@martensit-group.ru",
  phone: "+7 980 544-28-13",
  phoneHref: "tel:+79805442813",
  telegramUrl: process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/+79805442813",
  yandexMetrikaId: envCounterId("NEXT_PUBLIC_YANDEX_METRIKA_ID") || "111903056",
  yandexVerification:
    envText("NEXT_PUBLIC_YANDEX_VERIFICATION") || envText("YANDEX_VERIFICATION"),
  googleVerification:
    envText("NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION") ||
    envText("GOOGLE_SITE_VERIFICATION"),
  leadChannels: ["form", "phone", "telegram", "email"] as const,
} as const;

export function absoluteUrl(path = "/") {
  if (path === "/" || path === "") return site.siteUrl;
  return `${site.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function isPublicSiteUrl() {
  try {
    const { hostname } = new URL(site.siteUrl);
    return hostname !== "localhost" && hostname !== "127.0.0.1";
  } catch {
    return false;
  }
}

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
