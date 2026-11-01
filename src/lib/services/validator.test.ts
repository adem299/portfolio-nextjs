import { describe, expect, it } from "vitest";
import { CONTACT_LIMITS, escapeHtml, parseContactForm } from "./validator";

const valid = { name: "Ade", email: "ade@example.com", message: "Hello" };

describe("parseContactForm", () => {
  it("returns trimmed data for a valid body", () => {
    expect(parseContactForm({ name: "  Ade ", email: "ade@example.com ", message: " Hi " })).toEqual({
      ok: true,
      data: { name: "Ade", email: "ade@example.com", message: "Hi" },
    });
  });

  it.each([null, "text", 42, undefined])("rejects a non-object body (%s)", (body) => {
    expect(parseContactForm(body).ok).toBe(false);
  });

  it("rejects missing, blank, or non-string fields", () => {
    expect(parseContactForm({ ...valid, name: "" }).ok).toBe(false);
    expect(parseContactForm({ ...valid, message: "   " }).ok).toBe(false);
    expect(parseContactForm({ ...valid, name: { toString: () => "x" } }).ok).toBe(false);
    expect(parseContactForm({ email: valid.email, message: valid.message }).ok).toBe(false);
  });

  it("rejects an invalid email", () => {
    expect(parseContactForm({ ...valid, email: "not-an-email" })).toEqual({ ok: false, error: "Invalid email address" });
  });

  it("rejects fields over the length limit", () => {
    const result = parseContactForm({ ...valid, message: "x".repeat(CONTACT_LIMITS.message + 1) });
    expect(result.ok).toBe(false);
  });
});

describe("escapeHtml", () => {
  it("escapes HTML special characters", () => {
    expect(escapeHtml(`<a href="x">'&'</a>`)).toBe("&lt;a href=&quot;x&quot;&gt;&#039;&amp;&#039;&lt;/a&gt;");
  });
});
