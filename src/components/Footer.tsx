import { ArrowUp } from "lucide-react";
import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col gap-6 py-10 font-mono text-xs text-foreground-muted md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} Ade Mulyana <span className="text-accent">·</span>{" "}Designed &amp; built in
          Indonesia with Next.js
        </p>
        <div className="flex items-center gap-8">
          <SocialLinks />
          <a href="#hero" className="inline-flex items-center gap-1 transition-colors hover:text-accent">
            top <ArrowUp className="h-3 w-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
