// __tests__/tech-stack.test.tsx
import { render, screen } from "@testing-library/react";
import TechStack from "@/components/common/tech-stack";
import { technologies } from "@/data/skills";

// Mock next-intl's useTranslations hook
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    if (key === "techStack") return "Tech Stack";
    return key;
  },
}));

// Mock TechIcon to just render a placeholder span with the icon name
jest.mock("@/components/common/tech-icons", () => (props: any) => {
  return <span data-testid="tech-icon">{props.name}</span>;
});

describe("TechStack", () => {
  it("renders heading with translation", () => {
    render(<TechStack />);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Tech Stack"
    );
  });

  it("renders all technologies", () => {
    render(<TechStack />);
    // There should be as many tech-icon elements as technologies
    const icons = screen.getAllByTestId("tech-icon");
    expect(icons.length).toBe(technologies.length);

    // Check that each technology name appears
    technologies.forEach((tech) => {
      expect(screen.getByText(tech.name)).toBeInTheDocument();
    });
  });
});
