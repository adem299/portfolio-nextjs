// In-memory rate limiter — separated from route handler (SRP)

import { RATE_LIMIT_WINDOW_MS, CLEANUP_INTERVAL_MS } from "@/lib/constants";

const requestLog = new Map<string, number>();

export interface RateLimitResult {
  allowed: boolean;
  retryAfter?: number;
}

/**
 * Check if a given IP is within the rate limit window.
 * Records the request timestamp if allowed.
 */
export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now();
  const lastRequest = requestLog.get(ip);

  if (!lastRequest) {
    requestLog.set(ip, now);
    return { allowed: true };
  }

  const elapsed = now - lastRequest;

  if (elapsed < RATE_LIMIT_WINDOW_MS) {
    const retryAfter = Math.ceil((RATE_LIMIT_WINDOW_MS - elapsed) / 1000);
    return { allowed: false, retryAfter };
  }

  requestLog.set(ip, now);
  return { allowed: true };
}

/**
 * Remove expired entries from the rate limit store.
 * Should be called periodically to prevent memory leaks.
 */
export function cleanupExpiredEntries(): void {
  const cutoff = Date.now() - RATE_LIMIT_WINDOW_MS * 2;

  for (const [ip, timestamp] of requestLog.entries()) {
    if (timestamp < cutoff) {
      requestLog.delete(ip);
    }
  }
}

// Auto-cleanup on module load
setInterval(cleanupExpiredEntries, CLEANUP_INTERVAL_MS);
