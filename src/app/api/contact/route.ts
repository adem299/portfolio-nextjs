import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/services/rateLimiter";
import { parseContactForm } from "@/lib/services/validator";
import { buildContactEmail, CONTACT_FROM_ADDRESS } from "@/lib/services/contactEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded ? forwarded.split(",")[0].trim() : "unknown";
}

export async function POST(request: NextRequest) {
  const body: unknown = await request.json().catch(() => null);

  // Validate first so a typo doesn't burn the sender's rate-limit window
  const parsed = parseContactForm(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const rateLimit = checkRateLimit(getClientIp(request));
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests.", retryAfter: rateLimit.retryAfter },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfter) } }
    );
  }

  try {
    const { error } = await resend.emails.send({
      from: CONTACT_FROM_ADDRESS,
      to: process.env.CONTACT_EMAIL || "delivered@resend.dev",
      ...buildContactEmail(parsed.data),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
