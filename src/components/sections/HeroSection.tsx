import { ArrowRight, Download } from "lucide-react";
import Reveal from "@/components/Reveal";
import SocialLinks from "@/components/SocialLinks";
import { achievements, experiences, profile, projects } from "@/lib/data";
import { pad2 } from "@/lib/format";

const stats = [
  { value: pad2(experiences.length), label: "Roles held" },
  { value: pad2(projects.length), label: "Featured builds" },
  { value: profile.gpa.value, label: `GPA / ${profile.gpa.scale}` },
  { value: pad2(achievements.length), label: "Certs & awards" },
];

export default function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden pt-16">
      {/* Drafting grid, faded toward the edges */}
      <div
        aria-hidden
        className="bg-blueprint pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_75%_65%_at_30%_35%,#000_35%,transparent_100%)]"
      />

      <div className="shell relative">
        <div className="grid gap-14 py-20 md:py-28 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal immediate>
              <p className="label-mono">
                <span className="text-accent">{"//"}</span>{" "}{profile.headline}
              </p>
            </Reveal>

            <Reveal immediate delay={0.08}>
              <h1 className="mt-7 text-[2.75rem] leading-[0.98] font-semibold tracking-[-0.045em] text-balance sm:text-6xl lg:text-7xl">
                I turn messy problems{" "}<span className="text-accent">into stable systems.</span>
              </h1>
            </Reveal>

            <Reveal immediate delay={0.16}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-foreground-muted">{profile.intro}</p>
            </Reveal>

            <Reveal immediate delay={0.24} className="mt-10 flex flex-wrap items-center gap-3">
              <a href="#projects" className="btn btn-primary group">
                View selected work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a href="/cv-ade-mulyana.pdf" download="CV_Ade_Mulyana.pdf" className="btn btn-outline">
                Download CV
                <Download className="h-4 w-4" />
              </a>
            </Reveal>

            <Reveal immediate delay={0.3}>
              <SocialLinks className="mt-10" />
            </Reveal>
          </div>

          {/* Spec sheet */}
          <Reveal immediate delay={0.2} className="lg:col-span-5 lg:pt-10">
            <div className="ticks border border-line bg-surface/70 backdrop-blur-[2px]">
              <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                <span className="label-mono">spec_sheet.md</span>
                <span className="label-mono">rev. {new Date().getFullYear()}</span>
              </div>
              <dl className="divide-y divide-line font-mono text-[13px]">
                {profile.spec.map(([key, value]) => (
                  <div key={key} className="grid grid-cols-[6.5rem_1fr] gap-3 px-4 py-3">
                    <dt className="text-foreground-muted">{key}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex items-center gap-2.5 border-t border-line px-4 py-3 font-mono text-[13px]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                status: open to new roles
              </div>
            </div>
          </Reveal>
        </div>

        {/* Stats strip: gap-px over a line-colored background draws the dividers */}
        <Reveal immediate delay={0.35}>
          <dl className="grid grid-cols-2 gap-px border-y border-line bg-line md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse bg-background px-4 py-6 md:px-6">
                <dt className="label-mono mt-2">{stat.label}</dt>
                <dd className="text-3xl font-semibold tracking-tight tabular-nums md:text-4xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
