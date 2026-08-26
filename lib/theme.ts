export const THEME_STORAGE_KEY = "martensit-theme";

export type ThemeMode = "system" | "light" | "dark";

export const themeModes: ThemeMode[] = ["light", "dark", "system"];

export const themeLabels: Record<ThemeMode, string> = {
  system: "Как в системе",
  light: "Светлая",
  dark: "Тёмная",
};

export const themeInitScript = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var s=localStorage.getItem(k);var t=s==="light"||s==="dark"||s==="system"?s:"light";var r=document.documentElement;r.setAttribute("data-theme",t);r.style.colorScheme=t==="system"?(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):t}catch(e){}})();`;

export function readThemeMode(): ThemeMode {
  if (typeof document === "undefined") return "light";
  const value = document.documentElement.getAttribute("data-theme");
  if (value === "light" || value === "dark" || value === "system") return value;
  return "light";
}

export function applyTheme(mode: ThemeMode) {
  const root = document.documentElement;
  root.setAttribute("data-theme", mode);
  const scheme =
    mode === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : mode;
  root.style.colorScheme = scheme;
  localStorage.setItem(THEME_STORAGE_KEY, mode);
}

export function nextThemeMode(mode: ThemeMode): ThemeMode {
  return themeModes[(themeModes.indexOf(mode) + 1) % themeModes.length];
}
