import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { skillCategories } from "@/lib/data";

export default function SkillsSection() {
  return (
    <Section id="skills" label="Skills" title="The toolbox." intro="What I reach for, grouped by layer.">
      <dl className="border-t border-line">
        {skillCategories.map((category, i) => (
          <Reveal
            key={category.name}
            delay={i * 0.05}
            className="grid gap-3 border-b border-line py-6 sm:grid-cols-[10.5rem_1fr] sm:gap-8"
          >
              <dt className="label-mono pt-1.5">
                <span className="text-accent">L{i + 1}</span> · {category.name}
              </dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="border border-line px-3 py-1.5 font-mono text-xs transition-colors hover:border-accent hover:text-accent"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </dd>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
