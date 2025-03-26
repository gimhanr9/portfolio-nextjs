import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, beforeEach, it, expect, jest } from "@jest/globals";

// Mock the toast function
jest.mock("@/components/ui/use-toast", () => ({
  toast: jest.fn(),
}));

// Mock next-intl
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

// Mock fetch
global.fetch = jest.fn();

describe("ContactForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock successful fetch response
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        success: true,
        messageId: "test-id",
        message: "Message sent successfully",
      }),
    });
  });

  it("should render the form correctly", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/form.labels.name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/form.labels.email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/form.labels.message/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /form.buttons.send/i })
    ).toBeInTheDocument();
  });

  it("should show validation errors when submitting empty form", async () => {
    render(<ContactSection />);

    // Submit the form without filling any fields
    fireEvent.click(screen.getByRole("button", { name: /form.buttons.send/i }));

    // Check for validation errors
    await waitFor(() => {
      expect(screen.getByText(/form.errors.nameRequired/i)).toBeInTheDocument();
      expect(
        screen.getByText(/form.errors.emailRequired/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/form.errors.messageRequired/i)
      ).toBeInTheDocument();
    });

    // Verify fetch was not called
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("should call the API when form is submitted with valid data", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    // Fill out the form
    await user.type(screen.getByLabelText(/form.labels.name/i), "Test User");
    await user.type(
      screen.getByLabelText(/form.labels.email/i),
      "test@example.com"
    );
    await user.type(
      screen.getByLabelText(/form.labels.message/i),
      "This is a test message that is long enough."
    );

    // Submit the form
    await user.click(
      screen.getByRole("button", { name: /form.buttons.send/i })
    );

    // Verify fetch was called with the correct data
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Test User",
          email: "test@example.com",
          message: "This is a test message that is long enough.",
        }),
      });
    });

    // Verify success state
    await waitFor(() => {
      expect(screen.getByText(/form.buttons.sent/i)).toBeInTheDocument();
    });
  });

  it("should handle API errors gracefully", async () => {
    // Mock fetch to return an error
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValueOnce({
        error: "Test error message",
      }),
    });

    const user = userEvent.setup();
    render(<ContactForm />);

    // Fill out the form
    await user.type(screen.getByLabelText(/form.labels.name/i), "Test User");
    await user.type(
      screen.getByLabelText(/form.labels.email/i),
      "test@example.com"
    );
    await user.type(
      screen.getByLabelText(/form.labels.message/i),
      "This is a test message that is long enough."
    );

    // Submit the form
    await user.click(
      screen.getByRole("button", { name: /form.buttons.send/i })
    );

    // Verify error handling
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /form.buttons.send/i })
      ).toBeEnabled();
      // The toast should be called with an error message
      expect(require("@/components/ui/use-toast").toast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: expect.stringContaining("form.errors.title"),
          variant: "destructive",
        })
      );
    });
  });
});
