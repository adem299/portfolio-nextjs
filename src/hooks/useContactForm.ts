"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { sendContactMessage, type ContactFormData } from "@/lib/services/contactService";
import { SUCCESS_DISPLAY_MS } from "@/lib/constants";

const INITIAL_FORM_DATA: ContactFormData = { name: "", email: "", message: "" };

/** Contact form state, submission, and rate-limit countdown. */
export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_DATA);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCountdown, setRetryCountdown] = useState(0);
  const successTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (retryCountdown <= 0) return;
    const timer = setTimeout(() => setRetryCountdown((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [retryCountdown]);

  useEffect(() => () => clearTimeout(successTimer.current), []);

  const updateField = useCallback((field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);

      const result = await sendContactMessage(formData);
      setIsLoading(false);

      if (!result.success) {
        setError(result.error);
        if (result.retryAfter) setRetryCountdown(result.retryAfter);
        return;
      }

      setIsSubmitted(true);
      setFormData(INITIAL_FORM_DATA);
      successTimer.current = setTimeout(() => setIsSubmitted(false), SUCCESS_DISPLAY_MS);
    },
    [formData]
  );

  return { formData, updateField, handleSubmit, isLoading, isSubmitted, error, retryCountdown };
}
