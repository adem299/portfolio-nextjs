"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";
import ThemeToggle from "@/components/ThemeToggle";
import { pad2 } from "@/lib/format";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navLinks.map((link) => link.href.replace("#", ""));
      let current = "";
      for (const id of sections) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= 120) current = id;
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        isScrolled || isMobileOpen
          ? "border-line bg-background/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
    >
      <nav className="shell flex h-16 items-center justify-between gap-6">
        <a href="#hero" className="font-mono text-sm font-medium tracking-tight" aria-label="Back to top">
          ade<span className="text-accent">.</span>mulyana
        </a>

        <ul className="hidden items-center gap-0.5 font-mono text-[12.5px] lg:flex">
          {navLinks.map((link, i) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative block px-2.5 py-1.5 transition-colors",
                    isActive ? "text-foreground" : "text-foreground-muted hover:text-foreground"
                  )}
                >
                  <span className={cn("mr-1", isActive ? "text-accent" : "text-foreground-muted/60")}>{pad2(i + 1)}</span>
                  {link.label.toLowerCase()}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2.5 -bottom-[13px] h-px bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <LocalClock />
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <button
            onClick={() => setIsMobileOpen((open) => !open)}
            className="flex h-9 items-center border border-line px-3 font-mono text-xs text-foreground-muted transition-colors hover:border-accent hover:text-accent lg:hidden cursor-pointer"
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
          >
            {isMobileOpen ? "close" : "menu"}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.ul
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="shell overflow-hidden border-t border-line font-mono text-sm lg:hidden"
          >
            {navLinks.map((link, i) => (
              <li key={link.href} className="border-b border-line last:border-b-0">
                <a
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center gap-3 py-3.5 text-foreground-muted transition-colors hover:text-foreground"
                >
                  <span className="text-accent">{pad2(i + 1)}</span>
                  {link.label.toLowerCase()}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}

// Live local time in Indonesia (WIB). Rendered only after mount to avoid hydration mismatch.
const wibFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Jakarta",
  hour: "2-digit",
  minute: "2-digit",
});

function LocalClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(wibFormatter.format(new Date()));
    const first = setTimeout(tick, 0);
    const interval = setInterval(tick, 15_000);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, []);

  return (
    <span className="hidden font-mono text-xs text-foreground-muted tabular-nums sm:inline" title="Local time in Indonesia">
      WIB {time ?? "--:--"}
    </span>
  );
}
