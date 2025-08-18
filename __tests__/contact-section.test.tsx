// __tests__/contact-section.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactSection from "@/components/common/contact-section";
import { useToast } from "@/hooks/use-toast";

// Mock next-intl translations
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

// Mock useToast
jest.mock("@/hooks/use-toast", () => ({
  useToast: jest.fn(),
}));

// Mock console.error to keep test output clean
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

describe("ContactSection", () => {
  let toastMock: jest.Mock;

  beforeEach(() => {
    toastMock = jest.fn();
    (useToast as jest.Mock).mockReturnValue({ toast: toastMock });

    // Mock fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      } as Response)
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders the form fields", () => {
    render(<ContactSection />);
    expect(screen.getByLabelText("form.labels.name")).toBeInTheDocument();
    expect(screen.getByLabelText("form.labels.email")).toBeInTheDocument();
    expect(screen.getByLabelText("form.labels.message")).toBeInTheDocument();
    expect(screen.getByText("form.buttons.send")).toBeInTheDocument();
  });

  it("shows validation errors when fields are empty", async () => {
    render(<ContactSection />);
    fireEvent.click(screen.getByText("form.buttons.send"));

    await waitFor(() => {
      expect(screen.getByText("form.errors.nameRequired")).toBeInTheDocument();
      expect(screen.getByText("form.errors.emailRequired")).toBeInTheDocument();
      expect(
        screen.getByText("form.errors.messageRequired")
      ).toBeInTheDocument();
    });
  });

  it("submits the form successfully", async () => {
    render(<ContactSection />);

    fireEvent.change(screen.getByLabelText("form.labels.name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("form.labels.email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("form.labels.message"), {
      target: { value: "Hello there!" },
    });

    fireEvent.click(screen.getByText("form.buttons.send"));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/contact", expect.any(Object));
      expect(toastMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "form.success.title",
        })
      );
    });

    // Ensure form is reset after timeout
    await waitFor(
      () => {
        expect(screen.getByLabelText("form.labels.name")).toHaveValue("");
      },
      { timeout: 2500 }
    );
  });

  it("shows server error when fetch fails", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: "Server error occurred" }),
      } as Response)
    );

    render(<ContactSection />);

    fireEvent.change(screen.getByLabelText("form.labels.name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("form.labels.email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("form.labels.message"), {
      target: { value: "Hello there!" },
    });

    fireEvent.click(screen.getByText("form.buttons.send"));

    await waitFor(() => {
      expect(screen.getByText("Server error occurred")).toBeInTheDocument();
      expect(toastMock).toHaveBeenCalledWith(
        expect.objectContaining({
          variant: "destructive",
        })
      );
    });
  });
});
