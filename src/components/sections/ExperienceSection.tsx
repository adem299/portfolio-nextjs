"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { experiences } from "@/lib/data";

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-padding relative">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-accent-blue/[0.04] blur-[120px]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Experience"
          subtitle="Professional journey and industry contributions"
        />

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent-blue via-accent-purple to-accent-cyan opacity-20" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={`${exp.company}-${exp.role}`}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative pl-12 md:pl-16"
              >
                {/* Timeline Dot */}
                <div className="absolute left-2.5 md:left-4.5 top-6 w-3 h-3 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple ring-4 ring-background" />

                {/* Card */}
                <motion.div
                  whileHover={{ y: -2 }}
                  className="glass rounded-2xl p-6 md:p-8 transition-all duration-300 hover:border-white/15"
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-white">
                        {exp.role}
                      </h3>
                      <p className="text-accent-purple font-medium text-sm md:text-base">
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 text-xs md:text-sm text-foreground-muted shrink-0">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-2 mb-5">
                    {exp.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm text-foreground-muted"
                      >
                        <span className="w-1 h-1 rounded-full bg-accent-blue mt-2 shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-md text-xs font-medium bg-white/[0.04] border border-white/[0.08] text-foreground-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
