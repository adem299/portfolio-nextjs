import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { sectionNumber } from "@/lib/data";

interface SectionProps {
  /** Section id; its "01 / LABEL" number comes from the order of navLinks. */
  id: string;
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** "split": sticky heading column + content column. "stacked": heading above full-width content. */
  layout?: "split" | "stacked";
  children: React.ReactNode;
}

// Numbered blueprint section: hairline divider, margin rails, annotated heading.
export default function Section({
  id,
  label,
  title,
  intro,
  layout = "split",
  children,
}: Readonly<SectionProps>) {
  const split = layout === "split";

  return (
    <section id={id} className="border-t border-line">
      <div className={cn("shell py-20 md:py-28", split && "grid gap-12 lg:grid-cols-12")}>
        <Reveal className={cn(split ? "lg:col-span-4 lg:sticky lg:top-28 lg:self-start" : "mb-14 max-w-3xl")}>
          <p className="label-mono">
            <span className="text-accent">{sectionNumber(id)}</span> / {label}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-balance md:text-4xl">{title}</h2>
          {intro && <p className="mt-4 text-foreground-muted leading-relaxed">{intro}</p>}
        </Reveal>

        <div className={cn(split && "lg:col-span-8")}>{children}</div>
      </div>
    </section>
  );
}
