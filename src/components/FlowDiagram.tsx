// Inline system-flow diagram: [step] → [step] → [step]
export default function FlowDiagram({ steps }: Readonly<{ steps: string[] }>) {
  return (
    <ol aria-label="System flow" className="flex flex-wrap items-center gap-y-2 font-mono text-[11.5px]">
      {steps.map((step, i) => (
        <li key={step} className="flex items-center">
          <span className="border border-line-strong bg-background px-2.5 py-1.5 whitespace-nowrap">{step}</span>
          {i < steps.length - 1 && (
            <span aria-hidden className="px-1.5 text-foreground-muted transition-colors group-hover:text-accent">
              ──▶
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
