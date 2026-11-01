// Builds the notification email for a contact form submission.

import type { ContactFormData } from "@/lib/services/contactService";
import { escapeHtml } from "@/lib/services/validator";

// Resend's shared test sender; replace once a custom domain is verified.
export const CONTACT_FROM_ADDRESS = "onboarding@resend.dev";

export function buildContactEmail({ name, email, message }: ContactFormData) {
  return {
    subject: `New Contact Form Submission from ${name.replace(/[\r\n]+/g, " ")}`,
    replyTo: email,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replaceAll("\n", "<br>")}</p>
    `,
  };
}
