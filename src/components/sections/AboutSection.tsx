"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { techStackHighlights } from "@/lib/data";

export default function AboutSection() {
  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="About Me"
          subtitle="Passionate about building impactful software solutions"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 space-y-5"
          >
            <div className="glass rounded-2xl p-6 md:p-8 space-y-4">
              <p className="text-foreground-muted leading-relaxed text-sm md:text-base">
                I&apos;m a <span className="text-white font-medium">Software Engineer</span> with a strong focus on{" "}
                <span className="text-accent-blue font-medium">backend engineering</span> and building{" "}
                <span className="text-accent-purple font-medium">scalable systems</span>. I thrive on solving complex
                problems and crafting clean, maintainable architectures.
              </p>
              <p className="text-foreground-muted leading-relaxed text-sm md:text-base">
                With hands-on industry experience using{" "}
                <span className="text-white font-medium">Spring Boot, PostgreSQL, Redis, and Next.js</span>, I&apos;ve
                contributed to developing ERP systems, AI-powered platforms, and full-stack applications that serve
                real-world users.
              </p>
              <p className="text-foreground-muted leading-relaxed text-sm md:text-base">
                My interests span{" "}
                <span className="text-accent-cyan font-medium">cloud-native systems</span>,{" "}
                <span className="text-accent-purple font-medium">AI integration</span>, and{" "}
                <span className="text-accent-blue font-medium">software architecture</span>. I&apos;m passionate about
                continuous learning and staying at the forefront of modern engineering practices.
              </p>
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="glass rounded-2xl p-6 md:p-8 h-full">
              <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-purple"/>
                  Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {techStackHighlights.map((tech, index) => (
                  <motion.span
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={`px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-medium border bg-gradient-to-r cursor-default transition-all duration-200 ${tech.colorClass}`}
                  >
                    {tech.name}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
