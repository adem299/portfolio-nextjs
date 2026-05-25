"use client";

import { motion } from "framer-motion";
import { ArrowDown, ChevronRight, Download, Mail } from "lucide-react";
import SocialLinks from "@/components/SocialLinks";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid" />

      {/* Floating Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-accent-blue/[0.07] blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent-purple/[0.08] blur-[100px] animate-float-slow" />
      <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full bg-accent-cyan/[0.05] blur-[80px] animate-pulse-glow" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-sm text-foreground-muted">
            Open to opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
        >
          <span className="text-white">Hi, I&apos;m </span>
          <span className="text-gradient">Ade Mulyana</span>
        </motion.h1>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-lg sm:text-xl md:text-2xl text-foreground-muted font-medium mb-6"
        >
          Software Engineer | Backend & Full-Stack Engineer
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-base md:text-lg text-foreground-muted/80 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Full-Stack Engineer specializing in scalable backend systems and modern software development.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <button
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group relative px-8 py-3.5 rounded-xl font-medium text-sm bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <span className="flex items-center gap-2">
              View Projects
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </button>
          <a
            href="/cv-ade-mulyana.pdf"
            download="CV_Ade_Mulyana.pdf"
            className="group px-8 py-3.5 rounded-xl font-medium text-sm glass hover:bg-white/[0.06] text-white border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <span className="flex items-center gap-2">
              Download CV
              <Download className="w-4.5 h-4.5 group-hover:translate-y-0.5 transition-transform" />
            </span>
          </a>
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group px-8 py-3.5 rounded-xl font-medium text-sm glass hover:bg-white/[0.06] text-white border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <span className="flex items-center gap-2">
              Contact Me
              <Mail className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex items-center justify-center"
        >
          <SocialLinks variant="icon-only" />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-foreground-muted/50"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
