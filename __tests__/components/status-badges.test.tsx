import { render, screen, waitFor } from "@testing-library/react";
import StatusBadges from "@/components/common/status-badges";
import { fetchProjectStatus } from "@/lib/api/status";
import { CICDStatus, QualityGateStatus } from "@/lib/enums/status";

// Mock the fetchProjectStatus function
jest.mock("@/lib/api/status", () => ({
  fetchProjectStatus: jest.fn(),
}));

// Mock next-intl
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("StatusBadges Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render loading state initially", () => {
    // Mock the fetchProjectStatus to return a promise that never resolves
    (fetchProjectStatus as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );

    render(<StatusBadges />);

    // Check for loading indicators (3 of them)
    const loadingElements = screen.getAllByRole("status");
    expect(loadingElements.length).toBe(3);
  });

  it("should render badges with correct status after data is loaded", async () => {
    // Mock successful status data
    const mockStatusData = {
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
    };
    (fetchProjectStatus as jest.Mock).mockResolvedValue(mockStatusData);

    render(<StatusBadges />);

    // Wait for the data to be loaded and component to update
    await waitFor(() => {
      expect(screen.getByText(/cicd.label/)).toBeInTheDocument();
      expect(screen.getByText(/qualityGate.label/)).toBeInTheDocument();
      expect(screen.getByText(/testCoverage.label/)).toBeInTheDocument();
    });

    // Verify the correct URLs are used
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", mockStatusData.cicd.url);
    expect(links[1]).toHaveAttribute("href", mockStatusData.qualityGate.url);
    expect(links[2]).toHaveAttribute("href", mockStatusData.testCoverage.url);
  });

  it("should handle error states gracefully", async () => {
    // Mock fetchProjectStatus to throw an error
    (fetchProjectStatus as jest.Mock).mockRejectedValue(
      new Error("Test error")
    );

    render(<StatusBadges />);

    // Component should not crash and should show default/fallback status
    await waitFor(() => {
      expect(screen.getByText(/cicd.label/)).toBeInTheDocument();
    });
  });
});
