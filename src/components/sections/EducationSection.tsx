"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { education } from "@/lib/data";

export default function EducationSection() {
  return (
    <section id="education" className="section-padding relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Education"
          subtitle="Academic foundation and continuous learning"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((edu, index) => {
            const Icon = edu.icon || GraduationCap;
            return (
              <motion.div
                key={edu.institution}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  className="h-full glass rounded-2xl p-6 md:p-8 transition-all duration-300 hover:border-white/15"
                >
                  {/* Icon */}
                  <div className="p-3 rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 border border-accent-blue/20 w-fit mb-5">
                    <Icon className="w-6 h-6 text-accent-blue" />
                  </div>

                  {/* Info */}
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {edu.institution}
                  </h3>
                  <p className="text-accent-purple font-medium text-sm mb-1">
                    {edu.degree}
                  </p>
                  <p className="text-xs text-foreground-muted mb-4">
                    {edu.period}
                  </p>

                  {/* Details */}
                  <ul className="space-y-2">
                    {edu.details.map((detail, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm text-foreground-muted"
                      >
                        <span className="w-1 h-1 rounded-full bg-accent-purple mt-2 shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
