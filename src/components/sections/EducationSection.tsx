import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { education } from "@/lib/data";

export default function EducationSection() {
  return (
    <Section id="education" label="Education" title="Foundations.">
      <ol className="border-t border-line">
        {education.map((edu, i) => (
          <Reveal
            as="li"
            key={edu.institution}
            delay={i * 0.05}
            className="grid gap-4 border-b border-line py-8 md:grid-cols-[10.5rem_1fr] md:gap-8"
          >
              <p className="font-mono text-xs text-foreground-muted">{edu.period}</p>
              <div>
                <h3 className="text-lg font-medium md:text-xl">{edu.degree}</h3>
                <p className="mt-1 text-foreground-muted">{edu.institution}</p>
                <ul className="mt-4 space-y-2 text-[15px] text-foreground-muted">
                  {edu.details.map((detail) => (
                    <li key={detail} className="flex gap-3">
                      <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                      {detail}
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
