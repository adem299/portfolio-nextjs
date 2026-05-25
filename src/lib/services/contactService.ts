// Contact form service — abstracts API communication (DIP)

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactResult {
  success: boolean;
  error?: string;
  retryAfter?: number;
}

const CONTACT_API_ENDPOINT = "/api/contact";

/**
 * Send a contact form message via the API.
 * Returns a structured result instead of throwing on known errors.
 */
export async function sendContactMessage(
  data: ContactFormData
): Promise<ContactResult> {
  const response = await fetch(CONTACT_API_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const body = await response.json();

  if (!response.ok) {
    let retryAfter: number | undefined;

    if (response.status === 429) {
      const match = body.error?.match(/(\d+)\s*seconds/);
      retryAfter = match ? Number.parseInt(match[1]) : 300;
    }

    return {
      success: false,
      error: body.error || "Failed to send message",
      retryAfter,
    };
  }

  return { success: true };
}
