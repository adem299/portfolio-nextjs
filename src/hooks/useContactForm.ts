"use client";

import { useState, useEffect, useCallback } from "react";
import {
  sendContactMessage,
  type ContactFormData,
} from "@/lib/services/contactService";
import { SUCCESS_DISPLAY_MS } from "@/lib/constants";

interface UseContactFormReturn {
  formData: ContactFormData;
  setFormData: React.Dispatch<React.SetStateAction<ContactFormData>>;
  handleSubmit: (e: React.SubmitEvent) => Promise<void>;
  isLoading: boolean;
  isSubmitted: boolean;
  error: string | null;
  retryCountdown: number;
}

const INITIAL_FORM_DATA: ContactFormData = {
  name: "",
  email: "",
  message: "",
};

/**
 * Custom hook encapsulating contact form state, submission, and error handling.
 */
export function useContactForm(): UseContactFormReturn {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_DATA);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCountdown, setRetryCountdown] = useState(0);

  // Countdown timer for rate limiting
  useEffect(() => {
    if (retryCountdown <= 0) return;

    const interval = setInterval(() => {
      setRetryCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [retryCountdown]);

  const handleSubmit = useCallback(
    async (e: React.SubmitEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);

      try {
        const result = await sendContactMessage(formData);

        if (!result.success) {
          if (result.retryAfter) {
            setRetryCountdown(result.retryAfter);
          }
          // Strip retry info from display message
          const displayError = (result.error || "Something went wrong").replace(
            /\s*Please try again in \d+ seconds\.?/i,
            ""
          );
          throw new Error(displayError);
        }

        setIsSubmitted(true);
        setFormData(INITIAL_FORM_DATA);
        setTimeout(() => setIsSubmitted(false), SUCCESS_DISPLAY_MS);
      } catch (err) {
        const errorMsg =
          err instanceof Error ? err.message : "Something went wrong";
        setError(errorMsg);
        console.error("Form submission error:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [formData]
  );

  return {
    formData,
    setFormData,
    handleSubmit,
    isLoading,
    isSubmitted,
    error,
    retryCountdown,
  };
}
