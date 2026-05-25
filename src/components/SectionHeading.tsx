"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12 md:mb-16"
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
        <span className="text-gradient">{title}</span>
      </h2>
      {subtitle && (
        <p className="text-foreground-muted text-base md:text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan opacity-60" />
    </motion.div>
  );
}
