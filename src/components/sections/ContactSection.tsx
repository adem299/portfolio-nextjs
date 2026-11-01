"use client";

import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import SocialLinks from "@/components/SocialLinks";
import { useContactForm } from "@/hooks/useContactForm";
import type { ContactFormData } from "@/lib/services/contactService";
import { CONTACT_LIMITS } from "@/lib/services/validator";

const fields: { name: keyof ContactFormData; label: string; type: string; placeholder: string }[] = [
  { name: "name", label: "name", type: "text", placeholder: "Your name" },
  { name: "email", label: "email", type: "email", placeholder: "you@company.com" },
  { name: "message", label: "message", type: "textarea", placeholder: "Tell me about the role, project, or idea…" },
];

export default function ContactSection() {
  const { formData, updateField, handleSubmit, isLoading, isSubmitted, error, retryCountdown } = useContactForm();
  const isDisabled = isLoading || isSubmitted || retryCountdown > 0;

  const buttonLabel = isSubmitted
    ? "200 OK · message sent"
    : isLoading
      ? "sending…"
      : retryCountdown > 0
        ? `429 · retry in ${retryCountdown}s`
        : "Send message";

  return (
    <Section
      id="contact"
      label="Contact"
      title="Let's build something that holds up."
      intro="Open to backend, full-stack, and AI engineering roles, and always happy to talk about an interesting project."
    >
      <div className="space-y-12">
        <Reveal>
          <form onSubmit={handleSubmit} className="ticks border border-line bg-surface">
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <span className="label-mono">
                <span className="text-accent">POST</span> /api/contact
              </span>
              <span className="label-mono hidden sm:inline">application/json</span>
            </div>

            {fields.map((field) => {
              const id = `contact-${field.name}`;
              const common = {
                id,
                required: true,
                maxLength: CONTACT_LIMITS[field.name],
                value: formData[field.name],
                placeholder: field.placeholder,
                onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                  updateField(field.name, e.target.value),
                className:
                  "w-full bg-transparent text-[15px] text-foreground placeholder:text-foreground-muted/50 focus:outline-none",
              };
              return (
                <div
                  key={field.name}
                  className="border-b border-line px-5 py-4 transition-colors focus-within:bg-surface-2"
                >
                  <label htmlFor={id} className="label-mono mb-2 block">
                    <span className="text-accent">&quot;</span>
                    {field.label}
                    <span className="text-accent">&quot;</span>:
                  </label>
                  {field.type === "textarea" ? (
                    <textarea rows={4} {...common} className={`${common.className} resize-none`} />
                  ) : (
                    <input type={field.type} {...common} />
                  )}
                </div>
              );
            })}

            {error && (
              <p role="alert" className="border-b border-line px-5 py-3 font-mono text-xs text-red-500">
                error: {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isDisabled}
              className="group flex w-full items-center justify-between bg-accent px-5 py-4 font-mono text-sm text-accent-foreground transition-colors hover:bg-foreground hover:text-background disabled:cursor-not-allowed disabled:bg-surface-2 disabled:text-foreground-muted cursor-pointer"
            >
              {buttonLabel}
              {!isDisabled && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
            </button>
          </form>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="label-mono mb-4">Or reach me directly</p>
          <SocialLinks variant="list" />
        </Reveal>
      </div>
    </Section>
  );
}
