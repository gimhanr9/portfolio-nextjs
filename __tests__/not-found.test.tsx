// __tests__/not-found.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import LocalizedNotFound from "@/app/[locale]/not-found";

type TranslationKeys =
  | "title"
  | "description"
  | "goBack"
  | "backToHome"
  | "suggestedLinks"
  | "projects"
  | "about"
  | "contact"
  | "locale";

// Mock translations
jest.mock("next-intl", () => ({
  useTranslations: () => {
    const translations: Record<TranslationKeys, string> = {
      title: "Page not found",
      description: "The page you are looking for does not exist.",
      goBack: "Go Back",
      backToHome: "Back to Home",
      suggestedLinks: "Suggested Links",
      projects: "Projects",
      about: "About",
      contact: "Contact",
      locale: "en",
    };
    return (key: TranslationKeys) => translations[key];
  },
}));

// Mock useRouter
const mockBack = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));

describe("LocalizedNotFound", () => {
  it("renders 404 title and message", () => {
    render(<LocalizedNotFound />);

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Page not found")).toBeInTheDocument();
    expect(
      screen.getByText("The page you are looking for does not exist.")
    ).toBeInTheDocument();
  });

  it("calls router.back() when Go Back is clicked", () => {
    render(<LocalizedNotFound />);
    fireEvent.click(screen.getByText("Go Back"));
    expect(mockBack).toHaveBeenCalled();
  });

  it("renders navigation buttons", () => {
    render(<LocalizedNotFound />);
    expect(screen.getByText("Back to Home")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });
});
