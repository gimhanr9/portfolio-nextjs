import {
  fetchCICDStatus,
  fetchQualityGateStatus,
} from "@/app/api/app-status/route";
import { siteConfig } from "@/config/site";
import { CICDStatus, QualityGateStatus } from "@/lib/enums/status";
import { describe, expect, it, jest, beforeEach } from "@jest/globals";

// Mock global fetch
global.fetch = jest.fn();

describe("Status API Functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Reset config values for testing
    siteConfig.github.token = "test-github-token";
    siteConfig.github.repoOwner = "test-owner";
    siteConfig.github.repoName = "test-repo";
    siteConfig.sonar.token = "test-sonar-token";
    siteConfig.sonar.projectKey = "test-project-key";
  });

  describe("fetchCICDStatus", () => {
    it("should return passing status when GitHub workflow is successful", async () => {
      // Mock successful GitHub API response
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce({
          workflow_runs: [
            {
              conclusion: "success",
              html_url:
                "https://github.com/test-owner/test-repo/actions/runs/1",
            },
          ],
        }),
      });

      const result = await fetchCICDStatus();

      expect(result.status).toBe(CICDStatus.PASSING);
      expect(result.url).toBe(
        "https://github.com/test-owner/test-repo/actions/runs/1"
      );
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/repos/test-owner/test-repo/actions/runs"),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: "token test-github-token",
          }),
        })
      );
    });

    it("should return failing status when GitHub workflow fails", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce({
          workflow_runs: [
            {
              conclusion: "failure",
              html_url:
                "https://github.com/test-owner/test-repo/actions/runs/1",
            },
          ],
        }),
      });

      const result = await fetchCICDStatus();

      expect(result.status).toBe(CICDStatus.FAILING);
    });

    it("should return pending status when GitHub workflow is in progress", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce({
          workflow_runs: [
            {
              conclusion: null,
              html_url:
                "https://github.com/test-owner/test-repo/actions/runs/1",
            },
          ],
        }),
      });

      const result = await fetchCICDStatus();

      expect(result.status).toBe(CICDStatus.PENDING);
    });

    it("should return not available status when GitHub token is missing", async () => {
      config.github.token = "";

      const result = await fetchCICDStatus();

      expect(result.status).toBe(CICDStatus.NOT_AVAILABLE);
      expect(fetch).not.toHaveBeenCalled();
    });

    it("should handle API errors gracefully", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("API error"));

      const result = await fetchCICDStatus();

      expect(result.status).toBe(CICDStatus.NOT_AVAILABLE);
    });
  });

  describe("fetchQualityGateStatus", () => {
    it("should return passed status when SonarQube quality gate passes", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce({
          projectStatus: {
            status: "OK",
          },
        }),
      });

      const result = await fetchQualityGateStatus();

      expect(result.status).toBe(QualityGateStatus.PASSED);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          "/qualitygates/project_status?projectKey=test-project-key"
        ),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: "Bearer test-sonar-token",
          }),
        })
      );
    });

    it("should return failed status when SonarQube quality gate fails", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce({
          projectStatus: {
            status: "ERROR",
          },
        }),
      });

      const result = await fetchQualityGateStatus();

      expect(result.status).toBe(QualityGateStatus.FAILED);
    });

    it("should return not available status when SonarQube token is missing", async () => {
      config.sonar.token = "";

      const result = await fetchQualityGateStatus();

      expect(result.status).toBe(QualityGateStatus.NOT_AVAILABLE);
      expect(fetch).not.toHaveBeenCalled();
    });
  });

  describe("fetchTestCoverage", () => {
    it("should return correct coverage percentage", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce({
          component: {
            measures: [
              {
                value: "85.5",
              },
            ],
          },
        }),
      });

      const result = await fetchTestCoverage();

      expect(result.percentage).toBe(85.5);
    });

    it("should return 0 when coverage data is not available", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce({
          component: {
            measures: [],
          },
        }),
      });

      const result = await fetchTestCoverage();

      expect(result.percentage).toBe(0);
    });
  });

  describe("fetchProjectStatus", () => {
    it("should fetch all statuses in parallel", async () => {
      // Mock the individual fetch functions
      jest.mock("@/lib/api/status", () => {
        const originalModule = jest.requireActual("@/lib/api/status");
        return {
          ...originalModule,
          fetchCICDStatus: jest.fn().mockResolvedValue({
            status: CICDStatus.PASSING,
            url: "test-url",
          }),
          fetchQualityGateStatus: jest.fn().mockResolvedValue({
            status: QualityGateStatus.PASSED,
            url: "test-url",
          }),
          fetchTestCoverage: jest.fn().mockResolvedValue({
            percentage: 90,
            url: "test-url",
          }),
        };
      });

      const result = await fetchProjectStatus();

      expect(result).toHaveProperty("cicd");
      expect(result).toHaveProperty("qualityGate");
      expect(result).toHaveProperty("testCoverage");
    });
  });
});
