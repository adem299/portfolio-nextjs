"use client";

import { motion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** Animate on mount instead of when scrolled into view (for above-the-fold content). */
  immediate?: boolean;
  /** Render as a list item so it can sit directly inside <ul>/<ol>. */
  as?: "div" | "li";
}

// Shared fade-up entrance so sections can stay server components.
export default function Reveal({ children, delay = 0, className, immediate = false, as = "div" }: Readonly<RevealProps>) {
  const Component = as === "li" ? motion.li : motion.div;
  const target = { opacity: 1, y: 0 };
  return (
    <Component
      initial={{ opacity: 0, y: 16 }}
      {...(immediate ? { animate: target } : { whileInView: target, viewport: { once: true, margin: "-60px" } })}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
}
