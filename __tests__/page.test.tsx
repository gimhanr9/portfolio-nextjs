import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "@/app/[locale]/page";

// Mock the next-intl useTranslations hook
jest.mock("next-intl", () => ({
  useTranslations: () => {
    const mockT = (key: string) => {
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
        "projects.showMore": "Show More",
        "projects.showLess": "Show Less",
        "projects.items.p1.title": "Project 1",
        "projects.items.p1.description": "Project 1 description",
        "projects.items.p2.title": "Project 2",
        "projects.items.p2.description": "Project 2 description",
        "projects.items.p3.title": "Project 3",
        "projects.items.p3.description": "Project 3 description",
        "projects.items.p4.title": "Project 4",
        "projects.items.p4.description": "Project 4 description",
        "projects.items.p5.title": "Project 5",
        "projects.items.p5.description": "Project 5 description",
      };
      return translations[key] || key;
    };

    // Add t.raw method for handling arrays
    mockT.raw = (key: string) => {
      const rawTranslations: Record<string, any> = {
        "projects.items.p1.tags": ["React", "TypeScript"],
        "projects.items.p2.tags": ["Next.js", "Tailwind"],
        "projects.items.p3.tags": ["Vue", "JavaScript"],
        "projects.items.p4.tags": ["Node.js", "Express"],
        "projects.items.p5.tags": ["Python", "Django"],
      };
      return rawTranslations[key] || [];
    };

    return mockT;
  },
}));

// Mock next/image to just render a basic img
jest.mock("next/image", () => (props: any) => {
  const { fill, priority, sizes, ...imgProps } = props;
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...imgProps} alt={props.alt || ""} />;
});

// Mock next/link
jest.mock("next/link", () => ({ children, href, ...props }: any) => (
  <a href={href} {...props}>
    {children}
  </a>
));

// Mock heavy UI components to avoid rendering complexity
jest.mock("@/components/common/animated-text", () => (props: any) => (
  <span>{props.text}</span>
));
jest.mock("@/components/common/voice-recital", () => () => null);
jest.mock("@/components/common/project-card", () => (props: any) => (
  <div data-testid="project-card">{props.title}</div>
));
jest.mock("@/components/common/skill-carousel", () => () => null);
jest.mock("@/components/common/tech-stack", () => () => null);
jest.mock("@/components/common/status-badges", () => () => null);
jest.mock("@/components/common/experience-timeline", () => () => null);
jest.mock("@/components/common/education-timeline", () => () => null);
jest.mock("@/components/common/contact-section", () => () => null);
jest.mock("@/components/common/navbar", () => () => null);
jest.mock("@/components/common/footer", () => () => null);

// Mock UI components
jest.mock("@/components/ui/badge", () => ({
  Badge: ({ children, ...props }: any) => <span {...props}>{children}</span>,
}));

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));

jest.mock("@/components/ui/tabs", () => ({
  Tabs: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  TabsContent: ({ children, ...props }: any) => (
    <div {...props}>{children}</div>
  ),
  TabsList: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  TabsTrigger: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  ArrowRight: () => <span data-testid="arrow-right-icon" />,
  ChevronDown: () => <span data-testid="chevron-down-icon" />,
  ChevronUp: () => <span data-testid="chevron-up-icon" />,
}));

// Mock lib icons
jest.mock("@/lib/icons", () => ({
  GithubIcon: () => <span data-testid="github-icon" />,
  LinkedinIcon: () => <span data-testid="linkedin-icon" />,
  TwitterIcon: () => <span data-testid="twitter-icon" />,
  MailIcon: () => <span data-testid="mail-icon" />,
}));

// Mock projects data to have predictable output
jest.mock("@/data/projects", () => ({
  projects: [
    { id: 1, key: "p1", showGithub: false, githubUrl: "" },
    { id: 2, key: "p2", showGithub: false, githubUrl: "" },
    { id: 3, key: "p3", showGithub: false, githubUrl: "" },
    { id: 4, key: "p4", showGithub: false, githubUrl: "" },
    { id: 5, key: "p5", showGithub: false, githubUrl: "" },
  ],
}));

// Mock skills data
jest.mock("@/data/skills", () => ({
  skillCategories: [],
}));

// Mock site config
jest.mock("@/config/site", () => ({
  siteConfig: {
    urls: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    contactEmail: "test@example.com",
  },
}));

// Mock getElementById for smooth scrolling
const mockGetElementById = jest.fn();
Object.defineProperty(document, "getElementById", {
  value: mockGetElementById,
});

// scrollIntoView mock
window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe("Home page", () => {
  const params = { locale: "en" };

  beforeEach(() => {
    mockGetElementById.mockReturnValue({
      scrollIntoView: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders hero section with translated text", () => {
    render(<Home params={params} />);

    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Developer")).toBeInTheDocument();
    expect(screen.getByText("Welcome to my portfolio")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /View Work/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Get in Touch/i })
    ).toBeInTheDocument();
  });

  it("scroll buttons call scrollIntoView", () => {
    render(<Home params={params} />);

    fireEvent.click(screen.getByRole("button", { name: /View Work/i }));
    expect(mockGetElementById).toHaveBeenCalledWith("projects");

    fireEvent.click(screen.getByRole("button", { name: /Get in Touch/i }));
    expect(mockGetElementById).toHaveBeenCalledWith("contact");
  });

  it("renders main sections by id", () => {
    render(<Home params={params} />);

    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByText("About Me")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  it("renders section elements with correct ids", () => {
    render(<Home params={params} />);

    expect(document.querySelector("#home")).toBeInTheDocument();
    expect(document.querySelector("#about")).toBeInTheDocument();
    expect(document.querySelector("#projects")).toBeInTheDocument();
    expect(document.querySelector("#contact")).toBeInTheDocument();
  });

  it("renders tab navigation", () => {
    render(<Home params={params} />);

    expect(screen.getByText("Skills")).toBeInTheDocument();
    expect(screen.getByText("Experience")).toBeInTheDocument();
    expect(screen.getByText("Education")).toBeInTheDocument();
  });

  it("displays initial projects (first 4)", () => {
    render(<Home params={params} />);

    const projectCards = screen.getAllByTestId("project-card");
    expect(projectCards).toHaveLength(4); // Should show first 4 projects initially
  });

  it("shows 'Show More' button when there are more than 4 projects", () => {
    render(<Home params={params} />);

    expect(screen.getByText("Show More")).toBeInTheDocument();
  });

  it("toggles between Show More and Show Less", () => {
    render(<Home params={params} />);

    const showMoreButton = screen.getByText("Show More");
    fireEvent.click(showMoreButton);

    expect(screen.getByText("Show Less")).toBeInTheDocument();
    const projectCards = screen.getAllByTestId("project-card");
    expect(projectCards).toHaveLength(5); // Should show all projects
  });

  it("renders social media links", () => {
    render(<Home params={params} />);

    expect(screen.getByTestId("github-icon")).toBeInTheDocument();
    expect(screen.getByTestId("linkedin-icon")).toBeInTheDocument();
    expect(screen.getByTestId("twitter-icon")).toBeInTheDocument();
    expect(screen.getByTestId("mail-icon")).toBeInTheDocument();
  });
});
