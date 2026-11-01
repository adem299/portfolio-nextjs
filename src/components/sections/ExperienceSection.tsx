import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { experiences } from "@/lib/data";
import { pad2 } from "@/lib/format";

export default function ExperienceSection() {
  return (
    <Section
      id="experience"
      label="Experience"
      title="Where I've shipped."
      intro="Industry, research, and teaching roles, most recent first."
    >
      <ol className="border-t border-line">
        {experiences.map((exp, i) => (
          <Reveal
            as="li"
            key={`${exp.company}-${exp.role}`}
            delay={i * 0.05}
            className="grid gap-4 border-b border-line py-8 md:grid-cols-[10.5rem_1fr] md:gap-8"
          >
              <div className="space-y-1 font-mono text-xs text-foreground-muted">
                <p className="text-accent">E-{pad2(experiences.length - i)}</p>
                <p>{exp.period}</p>
                <p>{exp.location}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium md:text-xl">
                  {exp.role} <span className="text-foreground-muted">@ {exp.company}</span>
                </h3>
                <ul className="mt-4 space-y-2 text-[15px] text-foreground-muted">
                  {exp.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                      {highlight}
                    </li>
                  ))}
                </ul>
                <ul className="mt-5 flex flex-wrap gap-1.5 font-mono text-[11px] text-foreground-muted">
                  {exp.tech.map((tech) => (
                    <li key={tech} className="border border-line px-2 py-0.5">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
