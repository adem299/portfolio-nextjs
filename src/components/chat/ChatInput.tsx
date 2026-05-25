"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

// Chat input field with send button.
export default function ChatInput({
  value,
  onChange,
  onSend,
  inputRef,
}: Readonly<ChatInputProps>) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="p-4 border-t border-white/5">
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about Ade..."
          className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm placeholder-foreground-muted/50 focus:outline-none focus:border-accent-purple/30 transition-colors"
        />
        <motion.button
          onClick={onSend}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!value.trim()}
          className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white disabled:opacity-30 transition-opacity cursor-pointer"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}
