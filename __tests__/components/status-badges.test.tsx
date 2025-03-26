import { render, screen, waitFor } from "@testing-library/react";
import StatusBadges from "@/components/common/status-badges";
import { CICDStatus, QualityGateStatus } from "@/lib/enums/status";
import { describe, beforeEach, it, expect, jest } from "@jest/globals";

// Mock the fetch function
global.fetch = jest.fn();

// Mock next-intl
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("StatusBadges Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock fetch to return a successful response
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        cicd: {
          status: CICDStatus.PASSING,
          url: "https://github.com/test/test/actions",
        },
        qualityGate: {
          status: QualityGateStatus.PASSED,
          url: "https://sonarcloud.io/dashboard?id=test",
        },
        testCoverage: {
          percentage: 95,
          url: "https://sonarcloud.io/component_measures?id=test&metric=coverage",
        },
      }),
    });
  });

  it("should render loading state initially", () => {
    render(<StatusBadges />);

    // Check for loading indicators (3 of them)
    const loadingElements = screen.getAllByRole("status");
    expect(loadingElements.length).toBe(3);
  });

  it("should render badges with correct status after data is loaded", async () => {
    render(<StatusBadges />);

    // Wait for the data to be loaded and component to update
    await waitFor(() => {
      expect(screen.getByText(/cicd.label/)).toBeInTheDocument();
      expect(screen.getByText(/qualityGate.label/)).toBeInTheDocument();
      expect(screen.getByText(/testCoverage.label/)).toBeInTheDocument();
    });

    // Verify fetch was called with the correct URL
    expect(global.fetch).toHaveBeenCalledWith("/api/status");

    // Verify the correct URLs are used for the badges
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute(
      "href",
      "https://github.com/test/test/actions"
    );
    expect(links[1]).toHaveAttribute(
      "href",
      "https://sonarcloud.io/dashboard?id=test"
    );
    expect(links[2]).toHaveAttribute(
      "href",
      "https://sonarcloud.io/component_measures?id=test&metric=coverage"
    );
  });

  it("should handle error states gracefully", async () => {
    // Mock fetch to return an error
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Test error"));

    render(<StatusBadges />);

    // Component should not crash and should show default/fallback status
    await waitFor(() => {
      expect(screen.getByText(/cicd.label/)).toBeInTheDocument();
    });
  });
});
