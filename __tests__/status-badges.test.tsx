// __tests__/status-badges.test.tsx

// QUICK FIX: Mock next-intl at the very top before any other imports
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      "cicd.label": "CI/CD",
      "cicd.passing": "Passing",
      "cicd.failing": "Failing",
      "cicd.pending": "Pending",
      "cicd.notAvailable": "Not Available",
      "qualityGate.label": "Quality Gate",
      "qualityGate.passed": "Passed",
      "qualityGate.failed": "Failed",
      "qualityGate.pending": "Pending",
      "qualityGate.notAvailable": "Not Available",
      "testCoverage.label": "Test Coverage",
      "testCoverage.notAvailable": "Not Available",
    };
    return translations[key] || key;
  },
}));

// Mock the icons
jest.mock("@/lib/icons", () => ({
  CICDIcon: ({ className, "data-testid": testId }: any) => (
    <div className={className} data-testid={testId}>
      CI/CD Icon
    </div>
  ),
  SonarQubeIcon: ({ className, "data-testid": testId }: any) => (
    <div className={className} data-testid={testId}>
      SonarQube Icon
    </div>
  ),
  JestIcon: ({ className, "data-testid": testId }: any) => (
    <div className={className} data-testid={testId}>
      Jest Icon
    </div>
  ),
}));

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { CICDStatus, QualityGateStatus } from "@/lib/enums/status";
import StatusBadges from "@/components/common/status-badges";

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("StatusBadges Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockClear();

    // Suppress console.error for tests (the component logs errors which is expected)
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders loading state initially", () => {
    // Mock a delayed response to test loading state
    mockFetch.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: () => Promise.resolve({}),
              }),
            1000
          )
        )
    );

    render(<StatusBadges />);

    const skeletons = screen.getAllByRole("status");
    expect(skeletons.length).toBe(3); // CICD, QualityGate, TestCoverage

    // Check for skeleton animation class
    skeletons.forEach((skeleton) => {
      expect(skeleton).toHaveClass("animate-pulse");
    });
  });

  test("renders status badges after successful fetch", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          cicd: {
            status: CICDStatus.PASSING,
            url: "https://github.com/user/repo/actions",
          },
          qualityGate: {
            status: QualityGateStatus.PASSED,
            url: "https://sonarcloud.io/dashboard?id=project",
          },
          testCoverage: {
            percentage: 95,
            url: "https://sonarcloud.io/coverage?id=project",
          },
        }),
    });

    render(<StatusBadges />);

    await waitFor(() => {
      // Use more flexible text matching that handles split text
      expect(
        screen.getByText((content, element) => {
          return element?.textContent === "CI/CD:" || false;
        })
      ).toBeInTheDocument();

      expect(screen.getByText("Passing")).toBeInTheDocument();

      expect(
        screen.getByText((content, element) => {
          return element?.textContent === "Quality Gate:" || false;
        })
      ).toBeInTheDocument();

      expect(screen.getByText("Passed")).toBeInTheDocument();

      expect(
        screen.getByText((content, element) => {
          return element?.textContent === "Test Coverage:" || false;
        })
      ).toBeInTheDocument();

      expect(screen.getByText("95%")).toBeInTheDocument();
    });

    // Verify icons are rendered
    expect(screen.getByTestId("cicd-icon")).toBeInTheDocument();
    expect(screen.getByTestId("qualityGate-icon")).toBeInTheDocument();
    expect(screen.getByTestId("testCoverage-icon")).toBeInTheDocument();
  });

  test("handles fetch failure gracefully", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    render(<StatusBadges />);

    await waitFor(() => {
      // Should show default PENDING states since fetch failed
      expect(
        screen.getByText((content, element) => {
          return element?.textContent === "CI/CD:" || false;
        })
      ).toBeInTheDocument();

      expect(
        screen.getByText((content, element) => {
          return element?.textContent === "Quality Gate:" || false;
        })
      ).toBeInTheDocument();

      expect(
        screen.getByText((content, element) => {
          return element?.textContent === "Test Coverage:" || false;
        })
      ).toBeInTheDocument();

      // Check for pending/not available states using getAllByText for multiple matches
      const pendingElements = screen.getAllByText("Pending");
      expect(pendingElements).toHaveLength(2); // CI/CD and Quality Gate both show "Pending"

      expect(screen.getByText("Not Available")).toBeInTheDocument(); // Test Coverage shows "Not Available"
    });
  });

  test("handles API error response", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    render(<StatusBadges />);

    await waitFor(() => {
      // Should show default PENDING states when API fails
      expect(
        screen.getByText((content, element) => {
          return element?.textContent === "CI/CD:" || false;
        })
      ).toBeInTheDocument();

      expect(
        screen.getByText((content, element) => {
          return element?.textContent === "Quality Gate:" || false;
        })
      ).toBeInTheDocument();

      expect(
        screen.getByText((content, element) => {
          return element?.textContent === "Test Coverage:" || false;
        })
      ).toBeInTheDocument();

      // Check for pending/not available states using getAllByText for multiple matches
      const pendingElements = screen.getAllByText("Pending");
      expect(pendingElements).toHaveLength(2); // CI/CD and Quality Gate both show "Pending"

      expect(screen.getByText("Not Available")).toBeInTheDocument(); // Test Coverage shows "Not Available"
    });
  });

  test("renders different status colors correctly", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          cicd: {
            status: CICDStatus.FAILING,
            url: "https://github.com/user/repo/actions",
          },
          qualityGate: {
            status: QualityGateStatus.FAILED,
            url: "https://sonarcloud.io/dashboard?id=project",
          },
          testCoverage: {
            percentage: 45,
            url: "https://sonarcloud.io/coverage?id=project",
          },
        }),
    });

    render(<StatusBadges />);

    await waitFor(() => {
      expect(screen.getByText("Failing")).toBeInTheDocument();
      expect(screen.getByText("Failed")).toBeInTheDocument();
      expect(screen.getByText("45%")).toBeInTheDocument();
    });
  });

  test("handles zero test coverage", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          cicd: {
            status: CICDStatus.PASSING,
            url: "https://github.com/user/repo/actions",
          },
          qualityGate: {
            status: QualityGateStatus.PASSED,
            url: "https://sonarcloud.io/dashboard?id=project",
          },
          testCoverage: {
            percentage: 0,
            url: "https://sonarcloud.io/coverage?id=project",
          },
        }),
    });

    render(<StatusBadges />);

    await waitFor(() => {
      // For zero coverage, it should show "Not Available"
      expect(screen.getByText("Not Available")).toBeInTheDocument();
      expect(screen.getByText("Passing")).toBeInTheDocument();
      expect(screen.getByText("Passed")).toBeInTheDocument();
    });
  });

  test("renders clickable links with correct URLs", async () => {
    const cicdUrl = "https://github.com/user/repo/actions";
    const qualityGateUrl = "https://sonarcloud.io/dashboard?id=project";
    const testCoverageUrl = "https://sonarcloud.io/coverage?id=project";

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          cicd: { status: CICDStatus.PASSING, url: cicdUrl },
          qualityGate: {
            status: QualityGateStatus.PASSED,
            url: qualityGateUrl,
          },
          testCoverage: { percentage: 85, url: testCoverageUrl },
        }),
    });

    render(<StatusBadges />);

    await waitFor(() => {
      const links = screen.getAllByRole("link");
      expect(links).toHaveLength(3);

      expect(links[0]).toHaveAttribute("href", cicdUrl);
      expect(links[1]).toHaveAttribute("href", qualityGateUrl);
      expect(links[2]).toHaveAttribute("href", testCoverageUrl);

      // Check that links open in new tab
      links.forEach((link) => {
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
      });
    });
  });

  test("uses correct API endpoint", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          cicd: { status: CICDStatus.PASSING, url: "#" },
          qualityGate: { status: QualityGateStatus.PASSED, url: "#" },
          testCoverage: { percentage: 80, url: "#" },
        }),
    });

    render(<StatusBadges />);

    await waitFor(() => {
      expect(screen.getByText("Passing")).toBeInTheDocument();
    });

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/app-status")
    );
  });

  test("shows appropriate CSS classes for different statuses", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          cicd: { status: CICDStatus.PASSING, url: "#" },
          qualityGate: { status: QualityGateStatus.PASSED, url: "#" },
          testCoverage: { percentage: 95, url: "#" },
        }),
    });

    render(<StatusBadges />);

    await waitFor(() => {
      const links = screen.getAllByRole("link");

      // CICD passing should have green colors
      expect(links[0]).toHaveClass("bg-green-100", "text-green-800");

      // Quality gate passed should have blue colors
      expect(links[1]).toHaveClass("bg-blue-100", "text-blue-800");

      // High test coverage (95%) should have green colors
      expect(links[2]).toHaveClass("bg-green-100", "text-green-800");
    });
  });

  test("handles component lifecycle correctly", async () => {
    // Test that component doesn't crash during unmount
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          cicd: { status: CICDStatus.PASSING, url: "#" },
          qualityGate: { status: QualityGateStatus.PASSED, url: "#" },
          testCoverage: { percentage: 80, url: "#" },
        }),
    });

    const { unmount } = render(<StatusBadges />);

    await waitFor(() => {
      expect(screen.getByText("Passing")).toBeInTheDocument();
    });

    // Should not throw error on unmount
    expect(() => unmount()).not.toThrow();
  });
});
