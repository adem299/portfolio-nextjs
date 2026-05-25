"use client";

import { motion } from "framer-motion";
import { Award, Trophy } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { achievements } from "@/lib/data";

export default function AchievementsSection() {
  return (
    <section id="achievements" className="section-padding relative">
      <div className="absolute top-0 left-1/2 w-[400px] h-[400px] rounded-full bg-accent-purple/[0.04] blur-[120px]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Achievements"
          subtitle="Certifications and competition highlights"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => {
            const isCert = achievement.type === "certification";
            const Icon = isCert ? Award : Trophy;
            return (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <motion.div
                  whileHover={{ y: -3, scale: 1.01 }}
                  className={`h-full glass rounded-xl p-5 flex items-start gap-4 transition-all duration-300 hover:border-white/15 ${
                    isCert
                      ? "hover:shadow-blue-500/5 hover:shadow-lg"
                      : "hover:shadow-amber-500/5 hover:shadow-lg"
                  }`}
                >
                  <div
                    className={`p-2.5 rounded-lg shrink-0 ${
                      isCert
                        ? "bg-blue-500/10 border border-blue-500/20"
                        : "bg-amber-500/10 border border-amber-500/20"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isCert ? "text-blue-400" : "text-amber-400"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white leading-snug">
                      {achievement.title}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        isCert ? "text-blue-400/70" : "text-amber-400/70"
                      }`}
                    >
                      {isCert ? "Certification" : "Competition"}
                    </p>
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
