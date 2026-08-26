export type ProfileBrand = {
  name: string;
  src: string;
  note?: string;
  knockout?: boolean;
};

export const aluminumProfiles: ProfileBrand[] = [
  { name: "Алютех", src: "/brands/alutech.svg" },
  { name: "Алнео", src: "/brands/alneo.png" },
  { name: "Татпроф", src: "/brands/tatprof-white.png", knockout: true },
  { name: "Проведал", src: "/brands/provedal.png" },
];

export const pvcProfiles: ProfileBrand[] = [
  { name: "ТиСН", src: "/brands/tisn.png", note: "58 / 70 мм" },
  { name: "Экспроф", src: "/brands/exprof.svg" },
  { name: "KBE", src: "/brands/kbe.svg", note: "от 100 000" },
];
