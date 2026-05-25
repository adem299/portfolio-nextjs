import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/services/rateLimiter";
import { validateContactForm, escapeHtml } from "@/lib/services/validator";

const resend = new Resend(process.env.RESEND_API_KEY);

// Get client IP address from proxy headers
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded ? forwarded.split(",")[0].trim() : "unknown";
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIp = getClientIp(request);
    const rateLimitCheck = checkRateLimit(clientIp);

    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        {
          error: `Too many requests. Please try again in ${rateLimitCheck.retryAfter} seconds.`,
        },
        { status: 429 }
      );
    }

    // Validation
    const body = await request.json();
    const validation = validateContactForm(body);

    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Send email
    const data = await resend.emails.send({
      from: "onboarding@resend.dev", // replace later with new domain
      to: process.env.CONTACT_EMAIL || "delivered@resend.dev",
      replyTo: body.email,
      subject: `New Contact Form Submission from ${body.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(body.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(body.email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(body.message).replaceAll("\n", "<br>")}</p>
      `,
    });

    if (data.error) {
      console.error("Resend error:", data.error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
