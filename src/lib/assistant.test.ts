import { describe, expect, it } from "vitest";
import { getAssistantReply, suggestedQuestions } from "./assistant";
import { experiences, socialLinks } from "./data";

describe("getAssistantReply", () => {
  it("does not treat 'his' as the greeting 'hi'", () => {
    expect(getAssistantReply("What's his experience?")).toContain(experiences[0].company);
  });

  it("matches keyword prefixes", () => {
    expect(getAssistantReply("what skills does he have")).toContain("Backend");
  });

  it("answers greetings only on exact words", () => {
    expect(getAssistantReply("hello")).toContain("portfolio assistant");
  });

  it("builds the contact reply from data.ts", () => {
    expect(getAssistantReply("how can I contact him?")).toContain(socialLinks.email);
  });

  it("falls back for unknown questions", () => {
    expect(getAssistantReply("qwerty")).toContain("Try asking about");
  });

  it("gives a non-fallback answer to every suggested question", () => {
    const fallback = getAssistantReply("qwerty");
    for (const question of suggestedQuestions) {
      expect(getAssistantReply(question)).not.toBe(fallback);
    }
  });
});
