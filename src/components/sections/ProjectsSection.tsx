"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, FileText } from "lucide-react";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import FlowDiagram from "@/components/FlowDiagram";
import ProjectDetailModal from "@/components/ProjectDetailModal";
import { projects } from "@/lib/data";
import { pad2, projectCode } from "@/lib/format";

export default function ProjectsSection() {
  const [selected, setSelected] = useState<number | null>(null);
  // Stable so the modal's open/close effect doesn't re-run on every render
  const close = useCallback(() => setSelected(null), []);

  return (
    <Section
      id="projects"
      label="Selected work"
      layout="stacked"
      title="Systems I've designed and built."
      intro="Each one started as a real problem. Open a case study for the problem, architecture, and use cases."
    >
      <div className="border-b border-line">
        {projects.map((project, i) => (
          <Reveal key={project.title} className="group grid gap-8 border-t border-line py-10 lg:grid-cols-12 lg:gap-12 lg:py-14">
            <div className="lg:col-span-6">
              <div className="ticks relative aspect-[16/10] overflow-hidden border border-line bg-surface">
                {project.image && (
                  <Image
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                )}
                <span className="label-mono absolute left-3 top-3 bg-background/85 px-2 py-1 text-foreground backdrop-blur-sm">
                  fig. {pad2(i + 1)}
                </span>
              </div>
            </div>

            <div className="flex flex-col lg:col-span-6">
              <p className="label-mono">
                <span className="text-accent">{projectCode(i)}</span> · {project.tech.join(" / ")}
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] md:text-3xl">{project.title}</h3>
              <p className="mt-4 leading-relaxed text-foreground-muted">{project.description}</p>

              {project.flow && (
                <div className="mt-6">
                  <p className="label-mono mb-2.5">System flow</p>
                  <FlowDiagram steps={project.flow} />
                </div>
              )}

              <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2 text-sm text-foreground-muted sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-2.5">
                    <span aria-hidden className="font-mono text-accent">+</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3 lg:mt-auto lg:pt-8">
                {project.detail && (
                  <button onClick={() => setSelected(i)} className="btn btn-primary">
                    <FileText className="h-4 w-4" />
                    Read case study
                  </button>
                )}
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                    {project.detail?.links[0]?.label ?? "Open project"}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <ProjectDetailModal
        project={selected === null ? null : projects[selected]}
        code={selected === null ? "" : projectCode(selected)}
        onClose={close}
      />
    </Section>
  );
}
