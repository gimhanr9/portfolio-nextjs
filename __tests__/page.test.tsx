// app/[locale]/page.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "@/app/[locale]/page";

// Mock the next-intl useTranslations hook
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    // Simple mock translations for testing
    const translations: Record<string, string> = {
      "hero.greeting": "Hello",
      "hero.name": "John Doe",
      "hero.description": "Welcome to my portfolio",
      "hero.badge": "Developer",
      "buttons.viewWork": "View Work",
      "buttons.getInTouch": "Get in Touch",
      "about.title": "About Me",
      "about.description": "About description",
      "tabs.skills": "Skills",
      "tabs.experience": "Experience",
      "tabs.education": "Education",
      "projects.title": "Projects",
      "projects.description": "Project description",
      "projects.viewAll": "View All Projects",
    };
    return translations[key] || key;
  },
}));

// Mock window.scrollIntoView since it is used by buttons
window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe("Home page", () => {
  const params = { locale: "en" };

  it("renders hero section with translated text", () => {
    render(<Home params={params} />);

    // Check for greeting and name
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();

    // Check for badge text
    expect(screen.getByText("Developer")).toBeInTheDocument();

    // Check for description text
    expect(screen.getByText("Welcome to my portfolio")).toBeInTheDocument();

    // Buttons exist
    expect(
      screen.getByRole("button", { name: /View Work/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Get in Touch/i })
    ).toBeInTheDocument();
  });

  it("scroll buttons call scrollIntoView", () => {
    render(<Home params={params} />);

    const viewWorkButton = screen.getByRole("button", { name: /View Work/i });
    fireEvent.click(viewWorkButton);
    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();

    const getInTouchButton = screen.getByRole("button", {
      name: /Get in Touch/i,
    });
    fireEvent.click(getInTouchButton);
    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it("renders main sections by id", () => {
    render(<Home params={params} />);
    expect(screen.getByRole("main")).toBeInTheDocument();

    expect(screen.getByText("About Me")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });
});
