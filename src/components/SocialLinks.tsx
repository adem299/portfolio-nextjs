import { ArrowUpRight } from "lucide-react";
import { socialLinks } from "@/lib/data";
import { cn } from "@/lib/utils";

const items = [
  { key: "email", label: "Email", value: socialLinks.email, href: `mailto:${socialLinks.email}` },
  { key: "github", label: "GitHub", value: socialLinks.github.replace("https://", ""), href: socialLinks.github },
  {
    key: "linkedin",
    label: "LinkedIn",
    value: socialLinks.linkedin.replace(/^https:\/\/(www\.)?/, "").replace(/\/$/, ""),
    href: socialLinks.linkedin,
  },
];

const externalProps = (href: string) =>
  href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" };

interface SocialLinksProps {
  /** "inline": compact mono links. "list": label/value rows, like a spec table. */
  variant?: "inline" | "list";
  className?: string;
}

export default function SocialLinks({ variant = "inline", className }: Readonly<SocialLinksProps>) {
  if (variant === "list") {
    return (
      <ul className={cn("border-t border-line font-mono text-sm", className)}>
        {items.map((item) => (
          <li key={item.key}>
            <a
              href={item.href}
              {...externalProps(item.href)}
              className="group grid grid-cols-[6rem_1fr_auto] items-center gap-3 border-b border-line py-3.5 transition-colors hover:text-accent"
            >
              <span className="label-mono">{item.label}</span>
              <span className="truncate">{item.value}</span>
              <ArrowUpRight className="h-4 w-4 text-foreground-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={cn("flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs", className)}>
      {items.map((item) => (
        <li key={item.key}>
          <a
            href={item.href}
            {...externalProps(item.href)}
            className="inline-flex items-center gap-1 text-foreground-muted transition-colors hover:text-accent"
          >
            {item.label.toLowerCase()}
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </li>
      ))}
    </ul>
  );
}
