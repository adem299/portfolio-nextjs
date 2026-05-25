// Lightweight markdown segment parser for chat messages.
// Splits text by **bold** markers and returns typed segments.

export interface MarkdownSegment {
  text: string;
  bold: boolean;
}

/**
 * Parse a string containing **bold** markers into typed segments.
 * Handles unmatched markers gracefully by treating them as plain text.
 */
export function parseMarkdownSegments(input: string): MarkdownSegment[] {
  const parts = input.split("**");
  return parts.map((text, index) => ({
    text,
    bold: index % 2 === 1,
  }));
}
