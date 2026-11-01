"use client";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

// Prompt-style input: "$ ask about ade…  [↵]"
export default function ChatInput({ value, onChange, onSend, inputRef }: Readonly<ChatInputProps>) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSend();
      }}
      className="flex items-center gap-2 border-t border-line px-4 py-3 font-mono text-[13px] focus-within:bg-surface"
    >
      <span className="text-accent" aria-hidden>
        $
      </span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="ask about ade…"
        aria-label="Ask a question"
        className="min-w-0 flex-1 bg-transparent text-foreground placeholder:text-foreground-muted/50 focus:outline-none"
      />
      <button
        type="submit"
        disabled={!value.trim()}
        className="border border-line px-2 py-0.5 text-xs text-foreground-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-40 cursor-pointer"
        aria-label="Send message"
      >
        ↵
      </button>
    </form>
  );
}
