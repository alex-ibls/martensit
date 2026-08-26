"use client";

import { useEffect, useState } from "react";
import {
  applyTheme,
  nextThemeMode,
  readThemeMode,
  THEME_STORAGE_KEY,
  themeLabels,
  type ThemeMode,
} from "@/lib/theme";
import { btnIcon } from "@/lib/ui";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v1.5M12 19.5V21M4.9 4.9l1.1 1.1M18 18l1.1 1.1M3 12h1.5M19.5 12H21M4.9 19.1 6 18M18 6l1.1-1.1" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M17.2 14.2A7 7 0 0 1 9.8 6.8 7 7 0 1 0 17.2 14.2Z" />
    </svg>
  );
}

function SystemIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3.5" y="5" width="17" height="12" rx="1.5" />
      <path d="M8 19h8" />
    </svg>
  );
}

const icons: Record<ThemeMode, typeof SunIcon> = {
  system: SystemIcon,
  light: SunIcon,
  dark: MoonIcon,
};

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>("light");

  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") {
      setMode(stored);
      return;
    }
    setMode(readThemeMode());
  }, []);

  function cycle() {
    const next = nextThemeMode(mode);
    applyTheme(next);
    setMode(next);
  }

  const Icon = icons[mode];

  return (
    <button
      type="button"
      onClick={cycle}
      className={btnIcon}
      aria-label={`Тема: ${themeLabels[mode]}. Нажмите, чтобы сменить`}
      title={`Тема: ${themeLabels[mode]}`}
    >
      <Icon />
    </button>
  );
}
