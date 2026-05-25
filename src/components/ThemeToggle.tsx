"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  theme: "dark" | "light";
  onToggle: () => void;
  /** Unique key prefix for AnimatePresence (avoids conflicts when multiple instances exist) */
  keyPrefix?: string;
}

// Reusable theme toggle button with animated icon transition.
export default function ThemeToggle({
  theme,
  onToggle,
  keyPrefix = "",
}: Readonly<ThemeToggleProps>) {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-lg glass hover:bg-white/[0.06] text-foreground-muted hover:text-white transition-colors duration-200 cursor-pointer flex items-center justify-center w-9 h-9"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "light" ? (
          <motion.div
            key={`${keyPrefix}sun`}
            initial={{ y: -10, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 10, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.15 }}
          >
            <Sun className="w-5 h-5 text-amber-500" />
          </motion.div>
        ) : (
          <motion.div
            key={`${keyPrefix}moon`}
            initial={{ y: -10, opacity: 0, rotate: 45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 10, opacity: 0, rotate: -45 }}
            transition={{ duration: 0.15 }}
          >
            <Moon className="w-5 h-5 text-accent-blue" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
