import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getTranslations } from "next-intl/server";
import { EmailTemplate } from "@/components/common/email-template";

// Initialize Resend with your API key

// Simple email validation function that avoids complex regex backtracking
function isValidEmail(email: string): boolean {
  // Basic structure check
  if (!email || email.length > 320) return false;

  // Check for @ symbol and proper structure
  const parts = email.split("@");
  if (parts.length !== 2) return false;

  const [local, domain] = parts;

  // Check local part
  if (
    !local ||
    local.length > 64 ||
    local.startsWith(".") ||
    local.endsWith(".")
  )
    return false;

  // Check domain part
  if (!domain || domain.length > 255 || !domain.includes(".")) return false;
  const domainParts = domain.split(".");
  const tld = domainParts[domainParts.length - 1];
  if (!tld || tld.length < 2) return false;

  return true;
}

export async function POST(request: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Get the locale from the Accept-Language header or default to 'en'
    const acceptLanguage = request.headers.get("accept-language") ?? "en";
    const locale = acceptLanguage.split(",")[0].split("-")[0] || "en";

    // Get translations for the specified locale
    const t = await getTranslations({ locale, namespace: "contact.form" });

    // Parse the request body
    const { name, email, message } = await request.json();

    // Validate the request data
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: t("errors.missingFields") },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: t("errors.emailInvalid") },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("Resend API key is not configured");
      return NextResponse.json(
        { error: t("errors.emailServiceNotConfigured") },
        { status: 500 }
      );
    }

    // Format the current date based on locale
    const date = new Date().toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    try {
      // Send the email using Resend
      const { data, error } = await resend.emails.send({
        from: `Contact Form <${
          process.env.FROM_EMAIL ?? "no-reply@gimhanrodrigo.com"
        }>`,
        to: process.env.TO_EMAIL ?? "gimhanr9@gmail.com",
        subject: `Portfolio Contact: ${name}`,
        replyTo: email,
        react: EmailTemplate({ name, email, message, date }),
      });

      if (error) {
        console.error("Resend API error:", error);
        return NextResponse.json(
          { error: t("errors.sendFailed") },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        messageId: data?.id,
        message: t("success.message"),
      });
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      return NextResponse.json(
        { error: t("errors.emailServiceError") },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}
