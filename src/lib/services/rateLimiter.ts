// In-memory, per-IP rate limiter: one accepted request per window.
// Note: memory is per server instance, so on serverless hosting this is best-effort only.

import { RATE_LIMIT_WINDOW_MS, CLEANUP_INTERVAL_MS } from "@/lib/constants";

const requestLog = new Map<string, number>();
let lastCleanup = 0;

export type RateLimitResult = { allowed: true } | { allowed: false; retryAfter: number };

/** Check whether `ip` may send now; records the request when allowed. */
export function checkRateLimit(ip: string, now: number = Date.now()): RateLimitResult {
  pruneExpired(now);

  const lastRequest = requestLog.get(ip);
  if (lastRequest !== undefined && now - lastRequest < RATE_LIMIT_WINDOW_MS) {
    return { allowed: false, retryAfter: Math.ceil((RATE_LIMIT_WINDOW_MS - (now - lastRequest)) / 1000) };
  }

  requestLog.set(ip, now);
  return { allowed: true };
}

// Lazy cleanup on use instead of a module-level timer, so importing has no side effects.
function pruneExpired(now: number) {
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;
  for (const [ip, timestamp] of requestLog) {
    if (now - timestamp >= RATE_LIMIT_WINDOW_MS) requestLog.delete(ip);
  }
}

/** Test helper: forget all recorded requests. */
export function resetRateLimiter() {
  requestLog.clear();
  lastCleanup = 0;
}
