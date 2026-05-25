"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { skillCategories } from "@/lib/data";

const categoryColors = [
  "from-blue-500/20 to-indigo-500/20 border-blue-500/20",
  "from-cyan-500/20 to-teal-500/20 border-cyan-500/20",
  "from-purple-500/20 to-violet-500/20 border-purple-500/20",
  "from-amber-500/20 to-orange-500/20 border-amber-500/20",
];

const skillBadgeColors = [
  "hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-blue-300",
  "hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:text-cyan-300",
  "hover:bg-purple-500/10 hover:border-purple-500/30 hover:text-purple-300",
  "hover:bg-amber-500/10 hover:border-amber-500/30 hover:text-amber-300",
];

export default function SkillsSection() {
  return (
    <section id="skills" className="section-padding relative">
      {/* Background accent */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-accent-cyan/[0.03] blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Skills"
          subtitle="Technologies and tools I work with"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, catIndex) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  className="h-full glass rounded-2xl p-6 transition-all duration-300 hover:border-white/15"
                >
                  {/* Category Header */}
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br border w-fit mb-5 ${categoryColors[catIndex]}`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-4">
                    {category.name}
                  </h3>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.3,
                          delay: catIndex * 0.1 + skillIndex * 0.05,
                        }}
                        whileHover={{ scale: 1.05 }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.04] border border-white/[0.08] text-foreground-muted transition-all duration-200 cursor-default ${skillBadgeColors[catIndex]}`}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
