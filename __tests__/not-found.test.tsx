// __tests__/not-found.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import NotFoundPage from "@/app/[locale]/not-found";

// Mock translations
jest.mock("next-intl", () => ({
  useTranslations: (namespace?: string) => {
    const translations: Record<string, string> = {
      title: "Page not found",
      description: "The page you are looking for does not exist.",
      goBack: "Go Back",
      backToHome: "Back to Home",
      suggestedLinks: "Suggested Links",
      projects: "Projects",
      about: "About",
      contact: "Contact",
    };

    return (key: string) => translations[key] || key;
  },
}));

// Mock next/link
jest.mock("next/link", () => ({ children, href, ...props }: any) => (
  <a href={href} {...props}>
    {children}
  </a>
));

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  ArrowLeft: () => <span data-testid="arrow-left-icon" />,
  Home: () => <span data-testid="home-icon" />,
  Search: () => <span data-testid="search-icon" />,
}));

// Mock UI components
jest.mock("@/components/ui/button", () => ({
  Button: ({ children, onClick, asChild, ...props }: any) => {
    if (asChild) {
      // When asChild is true, Button should render its children directly
      return children;
    }
    return (
      <button onClick={onClick} {...props}>
        {children}
      </button>
    );
  },
}));

// Mock window.history.back
const mockHistoryBack = jest.fn();
Object.defineProperty(window, "history", {
  value: {
    back: mockHistoryBack,
  },
  writable: true,
});

describe("NotFoundPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders 404 title and message", () => {
    render(<NotFoundPage />);

    // Use getByRole to target the main h1 heading specifically
    const mainHeading = screen.getByRole("heading", { level: 1 });
    expect(mainHeading).toHaveTextContent("404");

    expect(screen.getByText("Page not found")).toBeInTheDocument();
    expect(
      screen.getByText("The page you are looking for does not exist.")
    ).toBeInTheDocument();
  });

  it("calls window.history.back() when Go Back is clicked", () => {
    render(<NotFoundPage />);

    const goBackButton = screen.getByText("Go Back");
    fireEvent.click(goBackButton);

    expect(mockHistoryBack).toHaveBeenCalled();
  });

  it("renders navigation buttons", () => {
    render(<NotFoundPage />);

    expect(screen.getByText("Go Back")).toBeInTheDocument();
    expect(screen.getByText("Back to Home")).toBeInTheDocument();
  });

  it("renders search icon", () => {
    render(<NotFoundPage />);

    expect(screen.getByTestId("search-icon")).toBeInTheDocument();
  });

  it("renders back to home link with correct href", () => {
    render(<NotFoundPage />);

    const homeLink = screen.getByRole("link");
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("renders icons in buttons", () => {
    render(<NotFoundPage />);

    expect(screen.getByTestId("arrow-left-icon")).toBeInTheDocument();
    expect(screen.getByTestId("home-icon")).toBeInTheDocument();
  });
});
