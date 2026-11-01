// Client-side contact API wrapper: hides fetch/HTTP details from the UI.

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export type ContactResult =
  | { success: true }
  | { success: false; error: string; retryAfter?: number };

const CONTACT_API_ENDPOINT = "/api/contact";

/** Send a contact message. Known failures come back as a result, not a thrown error. */
export async function sendContactMessage(data: ContactFormData): Promise<ContactResult> {
  let response: Response;
  try {
    response = await fetch(CONTACT_API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch {
    return { success: false, error: "Network error. Check your connection and try again." };
  }

  if (response.ok) return { success: true };

  const body: { error?: string; retryAfter?: number } = await response.json().catch(() => ({}));
  return {
    success: false,
    error: body.error || "Failed to send message",
    retryAfter: typeof body.retryAfter === "number" ? body.retryAfter : undefined,
  };
}
