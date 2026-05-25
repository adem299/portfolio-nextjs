// Form validation and sanitization utilities (SRP)

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate contact form fields.
 */
export function validateContactForm(data: {
  name: string;
  email: string;
  message: string;
}): ValidationResult {
  if (!data.name || !data.email || !data.message) {
    return { valid: false, error: "Missing required fields" };
  }

  if (!EMAIL_REGEX.test(data.email)) {
    return { valid: false, error: "Invalid email address" };
  }

  return { valid: true };
}

/**
 * Escape HTML special characters to prevent XSS in email content.
 */
export function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char]);
}
