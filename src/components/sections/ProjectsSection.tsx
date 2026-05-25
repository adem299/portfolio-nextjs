"use client";

import { motion } from "framer-motion";
import { ExternalLink, Image as ImageIcon } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { projects } from "@/lib/data";
import Image from "next/image";

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-padding relative">
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-accent-purple/[0.04] blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Projects"
          subtitle="Showcasing innovative solutions and technical expertise"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className={`flex flex-col h-full glass rounded-2xl overflow-hidden bg-gradient-to-br ${project.gradient} transition-all duration-300 group`}
              >
                {/* Image Container */}
                <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden flex items-center justify-center`}>
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-foreground-muted/50">
                      <ImageIcon className="w-8 h-8" />
                      <span className="text-xs font-medium">Project Image</span>
                    </div>
                  )}
                </div>

                {/* Content Body */}
                <div className="flex-grow flex flex-col p-6 md:p-8">
                  {/* Title & Description */}
                  <div className="mb-4">
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-2 group-hover:text-accent-purple transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm text-foreground-muted leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mb-5 flex-grow">
                    <ul className="space-y-2">
                      {project.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-foreground-muted"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan shrink-0 mt-1.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/[0.03] border border-white/[0.06] text-foreground-muted/95 hover:text-white hover:bg-white/[0.06] transition-colors duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Footer - Explore Project Link */}
                  {project.link && (
                    <div className="pt-4 border-t border-white/5 mt-auto">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold bg-white/[0.03] border border-white/10 text-foreground-muted hover:text-white hover:bg-accent-blue/10 hover:border-accent-blue/30 transition-all duration-300 cursor-pointer group/link"
                        title="View Project"
                      >
                        <span>Explore Project</span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover/link:text-accent-blue group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all duration-300" />
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
