import {
  fetchProjectStatus,
  fetchCICDStatus,
  fetchQualityGateStatus,
  fetchTestCoverage,
} from "@/lib/api/status";
import { CICDStatus, QualityGateStatus } from "@/lib/enums/status";
import { config } from "@/lib/config";
import { describe, expect, it, jest, beforeEach } from "@jest/globals";

// Mock global fetch
global.fetch = jest.fn() as jest.Mock;

describe("Status API Functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Reset config values for testing
    config.github.token = "test-github-token";
    config.github.repoOwner = "test-owner";
    config.github.repoName = "test-repo";
    config.sonar.token = "test-sonar-token";
    config.sonar.projectKey = "test-project-key";
  });

  describe("fetchCICDStatus", () => {
    it("should return passing status when GitHub workflow is successful", async () => {
      // Mock successful GitHub API response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
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
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/repos/test-owner/test-repo/actions/runs"),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: "token test-github-token",
          }),
        })
      );
    });

    it("should return failing status when GitHub workflow fails", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
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
      (global.fetch as jest.Mock).mockResolvedValueOnce({
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
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it("should handle API errors gracefully", async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("API error"));

      const result = await fetchCICDStatus();

      expect(result.status).toBe(CICDStatus.NOT_AVAILABLE);
    });
  });

  describe("fetchQualityGateStatus", () => {
    it("should return passed status when SonarQube quality gate passes", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce({
          projectStatus: {
            status: "OK",
          },
        }),
      });

      const result = await fetchQualityGateStatus();

      expect(result.status).toBe(QualityGateStatus.PASSED);
      expect(global.fetch).toHaveBeenCalledWith(
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
      (global.fetch as jest.Mock).mockResolvedValueOnce({
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
      expect(global.fetch).not.toHaveBeenCalled();
    });
  });

  describe("fetchTestCoverage", () => {
    it("should return correct coverage percentage", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
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
      (global.fetch as jest.Mock).mockResolvedValueOnce({
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
      const mockCICDStatus = {
        status: CICDStatus.PASSING,
        url: "test-url",
      };

      const mockQualityGateStatus = {
        status: QualityGateStatus.PASSED,
        url: "test-url",
      };

      const mockTestCoverage = {
        percentage: 90,
        url: "test-url",
      };

      // Use jest.spyOn to mock the functions
      jest.spyOn(global, "fetch").mockImplementation((url) => {
        if (url.toString().includes("actions/runs")) {
          return Promise.resolve({
            ok: true,
            json: () =>
              Promise.resolve({
                workflow_runs: [
                  { conclusion: "success", html_url: "test-url" },
                ],
              }),
          }) as unknown as Promise<Response>;
        } else if (url.toString().includes("qualitygates")) {
          return Promise.resolve({
            ok: true,
            json: () =>
              Promise.resolve({
                projectStatus: { status: "OK" },
              }),
          }) as unknown as Promise<Response>;
        } else if (url.toString().includes("measures")) {
          return Promise.resolve({
            ok: true,
            json: () =>
              Promise.resolve({
                component: { measures: [{ value: "90" }] },
              }),
          }) as unknown as Promise<Response>;
        }
        return Promise.reject(new Error("Unknown URL"));
      });

      const result = await fetchProjectStatus();

      expect(result).toHaveProperty("cicd");
      expect(result).toHaveProperty("qualityGate");
      expect(result).toHaveProperty("testCoverage");
      expect(result.cicd.status).toBe(CICDStatus.PASSING);
      expect(result.qualityGate.status).toBe(QualityGateStatus.PASSED);
      expect(result.testCoverage.percentage).toBe(90);
    });
  });
});
