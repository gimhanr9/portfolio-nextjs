import { render, screen } from "@testing-library/react";
import ProjectsPage from "@/app/[locale]/projects/page";
import "@testing-library/jest-dom";
// Mock next/link since it uses next/router internally
jest.mock("next/link", () => {
  return ({ children }: { children: React.ReactNode }) => children;
});

// Optionally mock useRouter if needed
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock ProjectCard to isolate testing
jest.mock(
  "@/components/common/project-card",
  () =>
    ({ title }: { title: string }) =>
      <div data-testid="project-card">{title}</div>
);

describe("ProjectsPage", () => {
  it("renders the heading", () => {
    render(<ProjectsPage />);
    expect(screen.getByText("My Projects")).toBeInTheDocument();
  });

  it("renders the back button with accessible name", () => {
    render(<ProjectsPage />);
    expect(
      screen.getByRole("button", { name: /back to home/i })
    ).toBeInTheDocument();
  });

  it("renders all project cards", () => {
    render(<ProjectsPage />);
    const cards = screen.getAllByTestId("project-card");
    expect(cards.length).toBe(6);
  });

  it("renders specific project titles", () => {
    render(<ProjectsPage />);
    expect(screen.getByText("E-Commerce Platform")).toBeInTheDocument();
    expect(screen.getByText("Task Management App")).toBeInTheDocument();
    expect(screen.getByText("Analytics Dashboard")).toBeInTheDocument();
  });
});
