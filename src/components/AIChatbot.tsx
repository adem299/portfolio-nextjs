"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Bot, Sparkles } from "lucide-react";
import { getAIResponse, suggestedQuestions } from "@/lib/chatbot-data";
import { AI_MIN_DELAY_MS, AI_RANDOM_DELAY_MS } from "@/lib/constants";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

const INITIAL_MESSAGE: Message = {
  id: 0,
  text: "Hi! 👋 I'm Ade's AI assistant. Ask me anything about his experience, projects, skills, or background!",
  isUser: false,
};

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSend = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: messages.length,
      text: messageText,
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking delay with named constants
    const delay = AI_MIN_DELAY_MS + Math.random() * AI_RANDOM_DELAY_MS;
    setTimeout(() => {
      const response = getAIResponse(messageText);
      const aiMessage: Message = {
        id: messages.length + 1,
        text: response,
        isUser: false,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, delay);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-shadow duration-300 cursor-pointer"
        aria-label="Toggle AI Chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-2xl animate-ping bg-blue-500/20 pointer-events-none" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 w-[360px] sm:w-[400px] max-h-[600px] flex flex-col glass-strong rounded-2xl shadow-2xl shadow-black/40 overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/5 bg-gradient-to-r from-accent-blue/10 via-accent-purple/10 to-accent-cyan/10 chat-header">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                    AI Assistant
                    <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
                  </h3>
                  <p className="text-xs text-foreground-muted">
                    Ask about Ade&apos;s portfolio
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] max-h-[400px]">
              {messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  text={msg.text}
                  isUser={msg.isUser}
                />
              ))}

              {/* Typing Indicator */}
              {isTyping && <TypingIndicator />}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-1.5">
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="px-3 py-1.5 rounded-lg text-xs bg-white/[0.04] border border-white/[0.08] text-foreground-muted hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer chat-suggested-btn"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <ChatInput
              value={input}
              onChange={setInput}
              onSend={() => handleSend()}
              inputRef={inputRef}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ===== Sub-component =====

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex gap-2.5"
    >
      <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-accent-blue/20 border border-accent-blue/30 shrink-0">
        <Bot className="w-3.5 h-3.5 text-accent-blue" />
      </div>
      <div className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08]">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-1.5 h-1.5 rounded-full bg-foreground-muted"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
