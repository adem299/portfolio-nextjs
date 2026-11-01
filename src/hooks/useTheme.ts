"use client";

import { useCallback, useSyncExternalStore } from "react";

type Theme = "dark" | "light";

// The inline script in layout.tsx applies the saved theme to <html> before hydration,
// so the DOM class is the source of truth; this hook just reads and flips it.
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

const getSnapshot = (): Theme =>
  document.documentElement.classList.contains("light") ? "light" : "dark";
const getServerSnapshot = (): Theme => "dark";

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("light", nextTheme === "light");
    try {
      localStorage.setItem("theme", nextTheme);
    } catch {
      // Storage can be unavailable (private mode); the toggle still works for this visit.
    }
    listeners.forEach((listener) => listener());
  }, [theme]);

  return { theme, toggleTheme } as const;
}
