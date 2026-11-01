"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAssistantReply, suggestedQuestions } from "@/lib/assistant";
import { REPLY_MIN_DELAY_MS, REPLY_RANDOM_DELAY_MS } from "@/lib/constants";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

const INITIAL_MESSAGE: Message = {
  id: 0,
  text: "Hi! 👋 I'm Ade's portfolio assistant. Ask me about his experience, projects, skills, or background.",
  isUser: false,
};

const replyDelay = () => REPLY_MIN_DELAY_MS + Math.random() * REPLY_RANDOM_DELAY_MS;

// Terminal-styled portfolio assistant (keyword-based, see lib/assistant.ts).
export default function PortfolioAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const nextId = useRef(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pendingReplies = useRef(new Set<ReturnType<typeof setTimeout>>());

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // Drop pending replies if the component unmounts mid-"typing"
  useEffect(() => {
    const pending = pendingReplies.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const handleSend = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    setMessages((prev) => [...prev, { id: nextId.current++, text: messageText, isUser: true }]);
    setInput("");
    setIsTyping(true);

    const timer = setTimeout(() => {
      pendingReplies.current.delete(timer);
      setMessages((prev) => [...prev, { id: nextId.current++, text: getAssistantReply(messageText), isUser: false }]);
      setIsTyping(false);
    }, replyDelay());
    pendingReplies.current.add(timer);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen((open) => !open)}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 border border-line-strong bg-background px-4 py-3 font-mono text-[13px] shadow-xl shadow-black/30 transition-colors hover:border-accent cursor-pointer"
        aria-label={isOpen ? "Close portfolio assistant" : "Open portfolio assistant"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <>
            <span className="text-accent">✕</span> close
          </>
        ) : (
          <>
            <span className="text-accent">&gt;</span>
            <span className="caret">ask ade</span>
          </>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            role="dialog"
            aria-label="Portfolio assistant"
            className="ticks fixed bottom-20 right-5 z-50 flex max-h-[min(600px,calc(100vh-7rem))] w-[min(400px,calc(100vw-2.5rem))] flex-col border border-line-strong bg-background shadow-2xl shadow-black/40"
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
              <span className="font-mono text-xs">
                ade@portfolio:<span className="text-accent">~/assistant</span>
              </span>
              <span className="label-mono">keyword mode</span>
            </div>

            <div className="min-h-[260px] flex-1 space-y-4 overflow-y-auto p-4" aria-live="polite">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} text={msg.text} isUser={msg.isUser} />
              ))}
              {isTyping && (
                <p className="font-mono text-[13px] text-foreground-muted">
                  ade-bot › <span className="caret" />
                </p>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-1.5 px-4 pb-3">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="border border-line px-2.5 py-1 font-mono text-[11px] text-foreground-muted transition-colors hover:border-accent hover:text-accent cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <ChatInput value={input} onChange={setInput} onSend={() => handleSend()} inputRef={inputRef} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
