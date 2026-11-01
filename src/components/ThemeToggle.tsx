"use client";

import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  theme: "dark" | "light";
  onToggle: () => void;
}

export default function ThemeToggle({ theme, onToggle }: Readonly<ThemeToggleProps>) {
  const Icon = theme === "light" ? Sun : Moon;
  return (
    <button
      onClick={onToggle}
      className="flex h-9 w-9 items-center justify-center border border-line text-foreground-muted transition-colors hover:border-accent hover:text-accent cursor-pointer"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
