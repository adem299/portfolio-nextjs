"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import FlowDiagram from "@/components/FlowDiagram";
import type { Project } from "@/lib/data";
import { pad2 } from "@/lib/format";

interface ProjectDetailModalProps {
  project: Project | null;
  /** Project code shown in the header, e.g. "P-01" */
  code: string;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, code, onClose }: Readonly<ProjectDetailModalProps>) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const detail = project?.detail;
  const isOpen = !!detail;

  // Lock body scroll, close on Escape, and move focus into the dialog while open
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  // Sections are numbered in order; Results is skipped when there is nothing verified to show
  let n = 0;
  const heading = (title: string) => (
    <h3 className="label-mono mb-4">
      <span className="text-accent">§ {pad2(++n)}</span> {title}
    </h3>
  );

  return (
    <AnimatePresence>
      {project && detail && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto px-4 py-6 sm:py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} aria-hidden />

          <motion.article
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
            className="ticks relative z-10 my-auto w-full max-w-3xl border border-line-strong bg-surface shadow-2xl shadow-black/40"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0, transition: { type: "spring", damping: 30, stiffness: 320 } }}
            exit={{ opacity: 0, y: 16, transition: { duration: 0.15 } }}
          >
            {/* Document header */}
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <span className="label-mono">
                case_study / <span className="text-accent">{code}</span>
              </span>
              <button
                ref={closeRef}
                onClick={onClose}
                className="font-mono text-xs text-foreground-muted transition-colors hover:text-accent cursor-pointer"
                aria-label="Close case study"
              >
                [esc] close ✕
              </button>
            </div>

            {detail.screenshots[0] && (
              <div className="relative aspect-[16/8] border-b border-line">
                <Image
                  src={detail.screenshots[0].src}
                  alt={detail.screenshots[0].caption}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
                <span className="label-mono absolute bottom-3 left-3 bg-background/85 px-2 py-1 backdrop-blur-sm">
                  fig. — {detail.screenshots[0].caption}
                </span>
              </div>
            )}

            <div className="space-y-10 px-5 py-8 sm:px-8">
              <header>
                <h2 id="case-study-title" className="text-3xl font-semibold tracking-[-0.03em]">
                  {project.title}
                </h2>
                <p className="mt-3 leading-relaxed text-foreground-muted">{project.description}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5 font-mono text-[11px] text-foreground-muted">
                  {project.tech.map((tech) => (
                    <li key={tech} className="border border-line px-2 py-0.5">
                      {tech}
                    </li>
                  ))}
                </ul>
              </header>

              <div className="grid gap-px border border-line bg-line md:grid-cols-2">
                <section className="bg-surface p-5">
                  {heading("Problem")}
                  <p className="text-[15px] leading-relaxed text-foreground-muted">{detail.problem}</p>
                </section>
                <section className="bg-surface p-5">
                  {heading("Solution")}
                  <p className="text-[15px] leading-relaxed text-foreground-muted">{detail.solution}</p>
                </section>
              </div>

              <section>
                {heading("Use cases")}
                <table className="w-full border-t border-line text-left text-[15px]">
                  <tbody>
                    {detail.useCases.map((uc) => (
                      <tr key={uc.action} className="border-b border-line align-top">
                        <th scope="row" className="w-28 py-3 pr-4 font-mono text-xs font-normal text-accent">
                          {uc.actor}
                        </th>
                        <td className="py-3 leading-relaxed text-foreground-muted">{uc.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>

              <section>
                {heading("Architecture")}
                {project.flow && (
                  <div className="mb-5">
                    <FlowDiagram steps={project.flow} />
                  </div>
                )}
                <ol className="space-y-2.5 text-[15px] text-foreground-muted">
                  {detail.architecture.map((item, i) => (
                    <li key={item} className="flex gap-3">
                      <span className="font-mono text-xs leading-6 text-accent">{pad2(i + 1)}</span>
                      {item}
                    </li>
                  ))}
                </ol>
              </section>

              {detail.results.length > 0 && (
                <section>
                  {heading("Results")}
                  <dl className="grid gap-px border border-line bg-line sm:grid-cols-2">
                    {detail.results.map((result) => (
                      <div key={result.label} className="flex flex-col-reverse bg-surface p-4">
                        <dt className="label-mono mt-1.5">{result.label}</dt>
                        <dd className="text-lg font-semibold">{result.value}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}

              {detail.links.length > 0 && (
                <div className="flex flex-wrap gap-3 border-t border-line pt-6">
                  {detail.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline"
                    >
                      {link.label}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
