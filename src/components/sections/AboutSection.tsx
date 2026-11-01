import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { profile } from "@/lib/data";
import { pad2 } from "@/lib/format";

export default function AboutSection() {
  const [lead, ...paragraphs] = profile.about;

  return (
    <Section id="about" label="About" title="Engineer first, framework second.">
      <Reveal className="space-y-6 text-foreground-muted leading-relaxed">
        <p className="text-xl leading-relaxed text-foreground md:text-2xl">{lead}</p>
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </Reveal>

      <Reveal delay={0.1} className="mt-12">
        <p className="label-mono mb-4">Focus areas</p>
        <ul className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 md:grid-cols-3">
          {profile.focusAreas.map((area, i) => (
            <li key={area} className="flex items-baseline gap-3 bg-background px-4 py-4 text-sm">
              <span className="font-mono text-xs text-accent">{pad2(i + 1)}</span>
              {area}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
