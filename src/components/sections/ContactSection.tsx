"use client";

import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import SocialLinks from "@/components/SocialLinks";
import SectionHeading from "@/components/SectionHeading";
import { useContactForm } from "@/hooks/useContactForm";

export default function ContactSection() {
  const {
    formData,
    setFormData,
    handleSubmit,
    isLoading,
    isSubmitted,
    error,
    retryCountdown,
  } = useContactForm();

  const isDisabled = isLoading || isSubmitted || retryCountdown > 0;

  return (
    <section id="contact" className="section-padding relative">
      {/* Background accents */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-accent-blue/[0.04] blur-[120px]" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-accent-purple/[0.03] blur-[100px]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Get In Touch"
          subtitle="Let's build something impactful together"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-accent-purple" />
                <h3 className="text-lg font-semibold text-white">
                  Let&apos;s Connect
                </h3>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-6">
                I&apos;m always open to discussing new projects, creative ideas,
                or opportunities to be part of something meaningful.
              </p>

              <SocialLinks variant="labeled" />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-6 md:p-8 space-y-5"
            >
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-foreground-muted mb-2"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm placeholder-foreground-muted/50 focus:outline-none focus:border-accent-purple/40 focus:ring-1 focus:ring-accent-purple/20 transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-foreground-muted mb-2"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm placeholder-foreground-muted/50 focus:outline-none focus:border-accent-purple/40 focus:ring-1 focus:ring-accent-purple/20 transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-foreground-muted mb-2"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm placeholder-foreground-muted/50 focus:outline-none focus:border-accent-purple/40 focus:ring-1 focus:ring-accent-purple/20 transition-all resize-none"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                  {error}
                </div>
              )}

              <SubmitButton
                isLoading={isLoading}
                isSubmitted={isSubmitted}
                isDisabled={isDisabled}
                retryCountdown={retryCountdown}
              />
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ===== Sub-component =====

interface SubmitButtonProps {
  isLoading: boolean;
  isSubmitted: boolean;
  isDisabled: boolean;
  retryCountdown: number;
}

function SubmitButton({
  isLoading,
  isSubmitted,
  isDisabled,
  retryCountdown,
}: SubmitButtonProps) {
  const buttonClass = isSubmitted
    ? "bg-green-500/20 border border-green-500/30 text-green-300"
    : isLoading
      ? "bg-blue-600/50 border border-blue-500/30 text-blue-100"
      : retryCountdown > 0
        ? "bg-red-600/20 border border-red-500/30 text-red-300 cursor-not-allowed"
        : "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40";

  return (
    <motion.button
      type="submit"
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      disabled={isDisabled}
      className={`w-full py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${buttonClass}`}
    >
      {isSubmitted ? (
        <>
          <span>Message Sent!</span>
          <span className="text-lg">✓</span>
        </>
      ) : isLoading ? (
        <>
          <span>Sending...</span>
          <span className="inline-block animate-spin">⏳</span>
        </>
      ) : retryCountdown > 0 ? (
        <span>Wait {retryCountdown}s</span>
      ) : (
        <>
          <span>Send Message</span>
          <Send className="w-4 h-4" />
        </>
      )}
    </motion.button>
  );
}
