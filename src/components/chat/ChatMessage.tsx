import { parseMarkdownSegments } from "@/lib/renderMarkdown";

interface ChatMessageProps {
  text: string;
  isUser: boolean;
}

// One terminal line: "you $ …" for the visitor, "ade-bot › …" for replies. Supports **bold**.
export default function ChatMessage({ text, isUser }: Readonly<ChatMessageProps>) {
  return (
    <div className="text-[13px] leading-relaxed">
      <p className={`font-mono text-xs ${isUser ? "text-accent" : "text-foreground-muted"}`}>
        {isUser ? "you $" : "ade-bot ›"}
      </p>
      <p className={`mt-1 whitespace-pre-line ${isUser ? "text-foreground" : "text-foreground-muted"}`}>
        {parseMarkdownSegments(text).map((segment, i) =>
          segment.bold ? (
            <strong key={i} className="font-semibold text-foreground">
              {segment.text}
            </strong>
          ) : (
            <span key={i}>{segment.text}</span>
          )
        )}
      </p>
    </div>
  );
}
