import { EmailTemplate } from "@/components/common/email-template";
import { NextRequest, NextResponse } from "next/server";
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

    try {
      // Check if Resend API key is configured
      if (!process.env.RESEND_API_KEY) {
        console.error("Resend API key is not configured");
        return NextResponse.json(
          {
            error:
              "Email service is not configured. Please contact the administrator.",
          },
          { status: 500 }
        );
      }

      // Send the email using Resend
      const { data, error } = await resend.emails.send({
        from: `Contact Form <${
          process.env.FROM_EMAIL ?? "gimhanrg@gmail.com"
        }>`,
        to: process.env.TO_EMAIL ?? "gimhanr9@gmail.com",
        subject: `Portfolio Contact: ${name}`,
        replyTo: email,
        react: EmailTemplate({ name, email, message, date }),
      });

      if (error) {
        console.error("Resend API error:", error);
        return NextResponse.json(
          { error: "Failed to send email. Please try again later." },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        messageId: data?.id,
        message: "Your message has been sent successfully",
      });
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      return NextResponse.json(
        { error: "Email service error. Please try again later." },
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
