import { beforeEach, describe, expect, it } from "vitest";
import { RATE_LIMIT_WINDOW_MS } from "@/lib/constants";
import { checkRateLimit, resetRateLimiter } from "./rateLimiter";

describe("checkRateLimit", () => {
  beforeEach(resetRateLimiter);

  it("allows the first request and blocks a second one inside the window", () => {
    expect(checkRateLimit("1.1.1.1", 0)).toEqual({ allowed: true });
    expect(checkRateLimit("1.1.1.1", 60_000)).toEqual({
      allowed: false,
      retryAfter: (RATE_LIMIT_WINDOW_MS - 60_000) / 1000,
    });
  });

  it("allows again once the window has passed", () => {
    checkRateLimit("1.1.1.1", 0);
    expect(checkRateLimit("1.1.1.1", RATE_LIMIT_WINDOW_MS)).toEqual({ allowed: true });
  });

  it("tracks each IP separately", () => {
    checkRateLimit("1.1.1.1", 0);
    expect(checkRateLimit("2.2.2.2", 0)).toEqual({ allowed: true });
  });
});
