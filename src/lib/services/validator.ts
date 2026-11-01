// Contact form parsing and sanitization (server side).

import type { ContactFormData } from "@/lib/services/contactService";

export const CONTACT_LIMITS = { name: 100, email: 254, message: 5000 } as const;

export type ParseResult =
  | { ok: true; data: ContactFormData }
  | { ok: false; error: string };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Turn an untrusted request body into typed, trimmed contact data.
 * "Parse, don't validate": callers only ever see data that passed every check.
 */
export function parseContactForm(body: unknown): ParseResult {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Invalid request body" };
  }

  const record = body as Record<string, unknown>;
  const fields = {} as ContactFormData;

  for (const key of ["name", "email", "message"] as const) {
    const value = record[key];
    if (typeof value !== "string" || value.trim() === "") {
      return { ok: false, error: "Missing required fields" };
    }
    if (value.length > CONTACT_LIMITS[key]) {
      return { ok: false, error: `The ${key} field is too long (max ${CONTACT_LIMITS[key]} characters)` };
    }
    fields[key] = value.trim();
  }

  if (!EMAIL_REGEX.test(fields.email)) {
    return { ok: false, error: "Invalid email address" };
  }

  return { ok: true, data: fields };
}

const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#039;",
};

/** Escape HTML special characters to prevent XSS in email content. */
export function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (char) => HTML_ENTITIES[char]);
}
