"use client";

import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import { parseMarkdownSegments } from "@/lib/renderMarkdown";

interface ChatMessageProps {
  text: string;
  isUser: boolean;
}

// Single chat message bubble with avatar and markdown-bold rendering.
export default function ChatMessage({ text, isUser }: Readonly<ChatMessageProps>) {
  const segments = parseMarkdownSegments(text);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div
        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
          isUser
            ? "bg-accent-purple/20 border border-accent-purple/30"
            : "bg-accent-blue/20 border border-accent-blue/30"
        }`}
      >
        {isUser ? (
          <User className="w-3.5 h-3.5 text-accent-purple" />
        ) : (
          <Bot className="w-3.5 h-3.5 text-accent-blue" />
        )}
      </div>

      {/* Message Bubble */}
      <div
        className={`max-w-[80%] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed whitespace-pre-line ${
          isUser
            ? "bg-accent-purple/15 border border-accent-purple/20 text-white chat-msg-user"
            : "bg-white/[0.04] border border-white/[0.08] text-foreground-muted chat-msg-bot"
        }`}
      >
        {segments.map((segment, i) =>
          segment.bold ? (
            <strong key={i} className="text-white font-semibold">
              {segment.text}
            </strong>
          ) : (
            <span key={i}>{segment.text}</span>
          )
        )}
      </div>
    </motion.div>
  );
}
