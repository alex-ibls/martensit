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
  legalName: "ООО «Магнит»",
  inn: "3663144524",
  ogrn: "1193668033932",
  ogrnDate: "12.09.2019",
  kpp: "366301001",
  okpo: "41504348",
  director: "Помельцов Дмитрий Владиславович",
  bankName: "Центрально-Черноземный банк ПАО Сбербанк",
  bankCity: "Воронеж",
  bik: "042007681",
  account: "40702810313000019181",
  accountDisplay: "407 028 103 130 000 19181",
  corrAccount: "30101810600000000681",
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

export function homeSectionHref(hash: string) {
  return `/${hash.startsWith("#") ? hash : `#${hash}`}`;
}

export function requisitesText() {
  return [
    site.legalName,
    `ИНН ${site.inn}`,
    `КПП ${site.kpp}`,
    `ОГРН ${site.ogrn}`,
    `Дата регистрации ${site.ogrnDate}`,
    `ОКПО ${site.okpo}`,
    `Р/с ${site.account}`,
    `Банк ${site.bankName}, г. ${site.bankCity}`,
    `БИК ${site.bik}`,
    `К/с ${site.corrAccount}`,
    `Генеральный директор ${site.director}`,
  ].join("\n");
}
