import { EmailTemplate } from "@/components/common/email-template";
import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const { name, email, message } = await request.json();

    // Validate the request data
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Format the current date
    const date = new Date().toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: `Contact Form <${
        process.env.FROM_EMAIL ?? "onboarding@resend.dev"
      }>`,
      to: process.env.TO_EMAIL ?? "your.email@example.com",
      subject: `Portfolio Contact: ${name}`,
      replyTo: email,
      react: EmailTemplate({ name, email, message, date }),
    });

    if (error) {
      console.error("Error sending email:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, messageId: data?.id });
  } catch (error) {
    console.error("Error in contact API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
