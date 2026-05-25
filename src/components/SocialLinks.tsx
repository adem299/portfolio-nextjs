"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { socialLinks } from "@/lib/data";

type SocialLinksVariant = "icon-only" | "labeled";

interface SocialLinksProps {
  /** "icon-only" for compact icon buttons, "labeled" for icon + text links */
  variant?: SocialLinksVariant;
  className?: string;
}

interface SocialLinkItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  hoverBorderColor: string;
}

const socialLinkItems: SocialLinkItem[] = [
  {
    href: `mailto:${socialLinks.email}`,
    label: socialLinks.email,
    icon: Mail,
    hoverBorderColor: "group-hover:border-accent-blue/30",
  },
  {
    href: socialLinks.github,
    label: "GitHub",
    icon: GitHubIcon,
    hoverBorderColor: "group-hover:border-accent-purple/30",
  },
  {
    href: socialLinks.linkedin,
    label: "LinkedIn",
    icon: LinkedInIcon,
    hoverBorderColor: "group-hover:border-accent-cyan/30",
  },
];

/**
 * Reusable social links component — consolidates links from Hero, Contact, and Footer.
 * Supports two rendering variants to accommodate different visual contexts.
 */
export default function SocialLinks({
  variant = "icon-only",
  className = "",
}: Readonly<SocialLinksProps>) {
  if (variant === "labeled") {
    return <LabeledLinks className={className} />;
  }

  return <IconLinks className={className} />;
}

function IconLinks({ className }: Readonly<{ className: string }>) {
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      {socialLinkItems.map((link) => {
        const isExternal = !link.href.startsWith("mailto:");
        const Icon = link.icon;
        return (
          <motion.a
            key={link.label}
            href={link.href}
            {...(isExternal
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-xl glass hover:bg-white/[0.06] text-foreground-muted hover:text-white transition-colors duration-200"
            aria-label={link.label}
          >
            <Icon className="w-5 h-5" />
          </motion.a>
        );
      })}
    </div>
  );
}

function LabeledLinks({ className }: Readonly<{ className: string }>) {
  return (
    <div className={`space-y-4 ${className}`}>
      {socialLinkItems.map((link) => {
        const isExternal = !link.href.startsWith("mailto:");
        const Icon = link.icon;
        return (
          <a
            key={link.label}
            href={link.href}
            {...(isExternal
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="flex items-center gap-3 text-sm text-foreground-muted hover:text-white transition-colors group"
          >
            <div
              className={`p-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] ${link.hoverBorderColor} transition-colors`}
            >
              <Icon className="w-4 h-4" />
            </div>
            {link.label}
          </a>
        );
      })}
    </div>
  );
}
