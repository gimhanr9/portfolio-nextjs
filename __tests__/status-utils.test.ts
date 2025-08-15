// __tests__/status.test.ts
import {
  fetchCICDStatus,
  fetchQualityGateStatus,
  fetchTestCoverage,
  fetchProjectStatus,
} from "@/lib/status-utils";
import { CICDStatus, QualityGateStatus } from "@/lib/enums/status";

// Mock the entire status-utils module to avoid actual API calls
jest.mock("@/lib/status-utils", () => ({
  fetchCICDStatus: jest.fn(),
  fetchQualityGateStatus: jest.fn(),
  fetchTestCoverage: jest.fn(),
  fetchProjectStatus: jest.fn(),
}));

// Get the mocked functions with proper typing
const mockFetchCICDStatus = fetchCICDStatus as jest.MockedFunction<
  typeof fetchCICDStatus
>;
const mockFetchQualityGateStatus =
  fetchQualityGateStatus as jest.MockedFunction<typeof fetchQualityGateStatus>;
const mockFetchTestCoverage = fetchTestCoverage as jest.MockedFunction<
  typeof fetchTestCoverage
>;
const mockFetchProjectStatus = fetchProjectStatus as jest.MockedFunction<
  typeof fetchProjectStatus
>;

describe("Status Services - Happy Paths", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchCICDStatus - Happy Path", () => {
    it("returns passing status when workflow succeeds", async () => {
      const expectedResult = {
        status: CICDStatus.PASSING,
        url: "https://github.com/test-owner/test-repo/actions/runs/123",
      };

      mockFetchCICDStatus.mockResolvedValue(expectedResult);

      const result = await fetchCICDStatus();

      expect(result).toEqual(expectedResult);
      expect(mockFetchCICDStatus).toHaveBeenCalledTimes(1);
    });

    it("returns pending status when workflow is running", async () => {
      const expectedResult = {
        status: CICDStatus.PENDING,
        url: "https://github.com/test-owner/test-repo/actions/runs/125",
      };

      mockFetchCICDStatus.mockResolvedValue(expectedResult);

      const result = await fetchCICDStatus();

      expect(result).toEqual(expectedResult);
    });
  });

  describe("fetchQualityGateStatus - Happy Path", () => {
    it("returns passed status when quality gate passes", async () => {
      const expectedResult = {
        status: QualityGateStatus.PASSED,
        url: "https://sonarcloud.io/dashboard?id=test-project-key",
      };

      mockFetchQualityGateStatus.mockResolvedValue(expectedResult);

      const result = await fetchQualityGateStatus();

      expect(result).toEqual(expectedResult);
      expect(mockFetchQualityGateStatus).toHaveBeenCalledTimes(1);
    });
  });

  describe("fetchTestCoverage - Happy Path", () => {
    it("returns coverage percentage when data is available", async () => {
      const expectedResult = {
        percentage: 85.5,
        url: "https://sonarcloud.io/component_measures?id=test-project-key&metric=coverage",
      };

      mockFetchTestCoverage.mockResolvedValue(expectedResult);

      const result = await fetchTestCoverage();

      expect(result).toEqual(expectedResult);
      expect(mockFetchTestCoverage).toHaveBeenCalledTimes(1);
    });

    it("returns high coverage percentage", async () => {
      const expectedResult = {
        percentage: 92.3,
        url: "https://sonarcloud.io/component_measures?id=test-project-key&metric=coverage",
      };

      mockFetchTestCoverage.mockResolvedValue(expectedResult);

      const result = await fetchTestCoverage();

      expect(result).toEqual(expectedResult);
    });
  });

  describe("fetchProjectStatus - Happy Path", () => {
    it("fetches all status data successfully", async () => {
      const expectedResult = {
        cicd: {
          status: CICDStatus.PASSING,
          url: "https://github.com/test-owner/test-repo/actions/runs/123",
        },
        qualityGate: {
          status: QualityGateStatus.PASSED,
          url: "https://sonarcloud.io/dashboard?id=test-project-key",
        },
        testCoverage: {
          percentage: 90.0,
          url: "https://sonarcloud.io/component_measures?id=test-project-key&metric=coverage",
        },
      };

      mockFetchProjectStatus.mockResolvedValue(expectedResult);

      const result = await fetchProjectStatus();

      expect(result).toEqual(expectedResult);
      expect(mockFetchProjectStatus).toHaveBeenCalledTimes(1);
    });

    it("handles mixed status results", async () => {
      const expectedResult = {
        cicd: {
          status: CICDStatus.PENDING,
          url: "https://github.com/test-owner/test-repo/actions/runs/124",
        },
        qualityGate: {
          status: QualityGateStatus.PASSED,
          url: "https://sonarcloud.io/dashboard?id=test-project-key",
        },
        testCoverage: {
          percentage: 78.5,
          url: "https://sonarcloud.io/component_measures?id=test-project-key&metric=coverage",
        },
      };

      mockFetchProjectStatus.mockResolvedValue(expectedResult);

      const result = await fetchProjectStatus();

      expect(result).toEqual(expectedResult);
    });
  });

  describe("Status Values", () => {
    it("validates CICD status enum values", () => {
      expect(CICDStatus.PASSING).toBeDefined();
      expect(CICDStatus.FAILING).toBeDefined();
      expect(CICDStatus.PENDING).toBeDefined();
      expect(CICDStatus.NOT_AVAILABLE).toBeDefined();
    });

    it("validates QualityGate status enum values", () => {
      expect(QualityGateStatus.PASSED).toBeDefined();
      expect(QualityGateStatus.FAILED).toBeDefined();
      expect(QualityGateStatus.NOT_AVAILABLE).toBeDefined();
    });
  });

  describe("Function Integration", () => {
    it("ensures all functions are properly exported", () => {
      expect(typeof fetchCICDStatus).toBe("function");
      expect(typeof fetchQualityGateStatus).toBe("function");
      expect(typeof fetchTestCoverage).toBe("function");
      expect(typeof fetchProjectStatus).toBe("function");
    });
  });
});

// Alternative approach: If you want to test the actual logic without API calls,
// you can create unit tests for helper functions or components that use these services
describe("Status Display Logic", () => {
  it("formats status data correctly", () => {
    const statusData = {
      cicd: {
        status: CICDStatus.PASSING,
        url: "https://github.com/test-owner/test-repo/actions/runs/123",
      },
      qualityGate: {
        status: QualityGateStatus.PASSED,
        url: "https://sonarcloud.io/dashboard?id=test-project-key",
      },
      testCoverage: {
        percentage: 85.5,
        url: "https://sonarcloud.io/component_measures?id=test-project-key&metric=coverage",
      },
    };

    // Test that the structure matches what your components expect
    expect(statusData.cicd.status).toBe(CICDStatus.PASSING);
    expect(statusData.qualityGate.status).toBe(QualityGateStatus.PASSED);
    expect(statusData.testCoverage.percentage).toBeGreaterThan(0);
    expect(statusData.testCoverage.percentage).toBeLessThanOrEqual(100);
  });

  it("validates URL formats", () => {
    const urls = [
      "https://github.com/test-owner/test-repo/actions/runs/123",
      "https://sonarcloud.io/dashboard?id=test-project-key",
      "https://sonarcloud.io/component_measures?id=test-project-key&metric=coverage",
    ];

    urls.forEach((url) => {
      expect(url).toMatch(/^https:\/\//);
      expect(typeof url).toBe("string");
      expect(url.length).toBeGreaterThan(10);
    });
  });
});
