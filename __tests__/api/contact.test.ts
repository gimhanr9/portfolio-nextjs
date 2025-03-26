import { NextRequest } from "next/server";
import { POST } from "@/app/api/contact/route";
import { Resend } from "resend";
import { describe, beforeEach, it, expect, jest } from "@jest/globals";

// Mock the Resend module
jest.mock("resend", () => {
  return {
    Resend: jest.fn().mockImplementation(() => {
      return {
        emails: {
          send: jest.fn().mockResolvedValue({
            data: { id: "test-id" },
            error: null,
          }),
        },
      };
    }),
  };
});

// Mock the next-intl module
jest.mock("next-intl/server", () => ({
  getTranslations: jest.fn().mockImplementation(() => {
    return (key: string) => key;
  }),
}));

describe("Contact API Route", () => {
  beforeEach(() => {
    // Reset environment variables before each test
    process.env.RESEND_API_KEY = "test-api-key";
    process.env.FROM_EMAIL = "test@example.com";
    process.env.TO_EMAIL = "recipient@example.com";

    // Clear all mocks
    jest.clearAllMocks();
  });

  it("should return 400 if required fields are missing", async () => {
    // Create a mock request with missing fields
    const request = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Test User",
        // email is missing
        message: "Test message",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBeDefined();
  });

  it("should return 400 if email is invalid", async () => {
    // Create a mock request with invalid email
    const request = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Test User",
        email: "invalid-email",
        message: "Test message",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBeDefined();
  });

  it("should return 500 if Resend API key is not configured", async () => {
    // Remove the API key
    process.env.RESEND_API_KEY = "";

    const request = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        message: "Test message",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBeDefined();
  });

  it("should return 200 if email is sent successfully", async () => {
    const request = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "en",
      },
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        message: "Test message",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.messageId).toBe("test-id");

    // Verify Resend was called with correct parameters
    const resendInstance = (Resend as jest.Mock).mock.results[0].value;
    expect(resendInstance.emails.send).toHaveBeenCalledTimes(1);
    expect(resendInstance.emails.send).toHaveBeenCalledWith(
      expect.objectContaining({
        from: expect.stringContaining("test@example.com"),
        to: "recipient@example.com",
        subject: expect.stringContaining("Test User"),
        reply_to: "test@example.com",
      })
    );
  });

  it("should handle Resend API errors", async () => {
    // Mock Resend to return an error
    (Resend as jest.Mock).mockImplementationOnce(() => {
      return {
        emails: {
          send: jest.fn().mockResolvedValue({
            data: null,
            error: { message: "Test error" },
          }),
        },
      };
    });

    const request = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        message: "Test message",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBeDefined();
  });
});
