// __tests__/status.test.ts
import {
  fetchCICDStatus,
  fetchQualityGateStatus,
  fetchTestCoverage,
  fetchProjectStatus,
} from "@/lib/status-utils";
import { CICDStatus, QualityGateStatus } from "@/lib/enums/status";

// Mock siteConfig completely
jest.mock("@/config/site", () => ({
  siteConfig: {
    name: "Test Portfolio",
    url: "https://test.com",
    description: "Test portfolio",
    contactEmail: "test@test.com",
    locales: [],
    defaultLocale: "en",
    localePrefix: "as-needed",
    github: {
      token: "test-github-token",
      repoOwner: "test-owner",
      repoName: "test-repo",
    },
    sonar: {
      token: "test-sonar-token",
      projectKey: "test-project-key",
    },
    email: {
      apiKey: "test-api-key",
      fromEmail: "test@test.com",
      toEmail: "test@test.com",
    },
    urls: {
      github: "https://github.com",
      githubApi: "https://api.github.com",
      sonarCloud: "https://sonarcloud.io",
      sonarCloudApi: "https://sonarcloud.io/api",
      portfolio: "https://test.com",
      linkedin: "https://linkedin.com/test",
      twitter: "https://twitter.com/test",
      instagram: "https://instagram.com/test",
    },
    isDevelopment: false,
    isProduction: true,
  },
}));

// Mock console.log and console.error to avoid test output noise
const consoleSpy = {
  log: jest.spyOn(console, "log").mockImplementation(() => {}),
  error: jest.spyOn(console, "error").mockImplementation(() => {}),
};

// Mock fetch globally
global.fetch = jest.fn();
const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

describe("Status Services", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockClear();
  });

  afterAll(() => {
    consoleSpy.log.mockRestore();
    consoleSpy.error.mockRestore();
  });

  describe("fetchCICDStatus", () => {
    const mockLatestCommitResponse = {
      sha: "test-commit-sha-123",
    };

    const mockWorkflowRunsResponse = {
      workflow_runs: [
        {
          head_sha: "test-commit-sha-123",
          conclusion: "success",
          html_url: "https://github.com/test-owner/test-repo/actions/runs/123",
        },
      ],
    };

    it("returns passing status when workflow succeeds", async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockLatestCommitResponse),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockWorkflowRunsResponse),
        } as Response);

      const result = await fetchCICDStatus();

      expect(result).toEqual({
        status: CICDStatus.PASSING,
        url: "https://github.com/test-owner/test-repo/actions/runs/123",
      });
    });

    it("returns failing status when workflow fails", async () => {
      const failedWorkflowResponse = {
        workflow_runs: [
          {
            head_sha: "test-commit-sha-123",
            conclusion: "failure",
            html_url:
              "https://github.com/test-owner/test-repo/actions/runs/124",
          },
        ],
      };

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockLatestCommitResponse),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(failedWorkflowResponse),
        } as Response);

      const result = await fetchCICDStatus();

      expect(result).toEqual({
        status: CICDStatus.FAILING,
        url: "https://github.com/test-owner/test-repo/actions/runs/124",
      });
    });

    it("returns pending status when workflow is running", async () => {
      const pendingWorkflowResponse = {
        workflow_runs: [
          {
            head_sha: "test-commit-sha-123",
            conclusion: null,
            html_url:
              "https://github.com/test-owner/test-repo/actions/runs/125",
          },
        ],
      };

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockLatestCommitResponse),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(pendingWorkflowResponse),
        } as Response);

      const result = await fetchCICDStatus();

      expect(result).toEqual({
        status: CICDStatus.PENDING,
        url: "https://github.com/test-owner/test-repo/actions/runs/125",
      });
    });

    it("returns pending status when commit SHA doesn't match", async () => {
      const outdatedWorkflowResponse = {
        workflow_runs: [
          {
            head_sha: "different-commit-sha",
            conclusion: "success",
            html_url:
              "https://github.com/test-owner/test-repo/actions/runs/126",
          },
        ],
      };

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockLatestCommitResponse),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(outdatedWorkflowResponse),
        } as Response);

      const result = await fetchCICDStatus();

      expect(result).toEqual({
        status: CICDStatus.PENDING,
        url: "https://github.com/test-owner/test-repo/actions/runs/126",
      });
    });

    it("returns not available status when no workflow runs exist", async () => {
      const emptyWorkflowResponse = {
        workflow_runs: [],
      };

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockLatestCommitResponse),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(emptyWorkflowResponse),
        } as Response);

      const result = await fetchCICDStatus();

      expect(result).toEqual({
        status: CICDStatus.NOT_AVAILABLE,
        url: "https://github.com/test-owner/test-repo/actions",
      });
    });

    it("returns not available status when fetch fails", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      const result = await fetchCICDStatus();

      expect(result).toEqual({
        status: CICDStatus.NOT_AVAILABLE,
        url: "https://github.com/test-owner/test-repo/actions",
      });
      expect(consoleSpy.error).toHaveBeenCalledWith(
        "Error fetching CI/CD status:",
        expect.any(Error)
      );
    });

    it("returns not available status when GitHub token is not configured", async () => {
      // Mock siteConfig with no token
      jest.doMock("@/config/site", () => ({
        siteConfig: {
          github: {
            token: undefined,
            repoOwner: "test-owner",
            repoName: "test-repo",
          },
          urls: {
            github: "https://github.com",
          },
        },
      }));

      // Clear module cache and re-import
      jest.resetModules();
      const {
        fetchCICDStatus: fetchCICDStatusWithoutToken,
      } = require("@/lib/status-utils");

      const result = await fetchCICDStatusWithoutToken();

      expect(result).toEqual({
        status: CICDStatus.NOT_AVAILABLE,
        url: "https://github.com/test-owner/test-repo/actions",
      });
      expect(consoleSpy.log).toHaveBeenCalledWith(
        "GitHub token is not configured"
      );

      // Restore the original mock and reset modules
      jest.resetModules();
    });
  });

  describe("fetchQualityGateStatus", () => {
    it("returns passed status when quality gate passes", async () => {
      const mockSonarResponse = {
        projectStatus: {
          status: "OK",
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockSonarResponse),
      } as Response);

      const result = await fetchQualityGateStatus();

      expect(result).toEqual({
        status: QualityGateStatus.PASSED,
        url: "https://sonarcloud.io/dashboard?id=test-project-key",
      });
    });

    it("returns failed status when quality gate fails", async () => {
      const mockSonarResponse = {
        projectStatus: {
          status: "ERROR",
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockSonarResponse),
      } as Response);

      const result = await fetchQualityGateStatus();

      expect(result).toEqual({
        status: QualityGateStatus.FAILED,
        url: "https://sonarcloud.io/dashboard?id=test-project-key",
      });
    });

    it("returns failed status when quality gate has warnings", async () => {
      const mockSonarResponse = {
        projectStatus: {
          status: "WARN",
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockSonarResponse),
      } as Response);

      const result = await fetchQualityGateStatus();

      expect(result).toEqual({
        status: QualityGateStatus.FAILED,
        url: "https://sonarcloud.io/dashboard?id=test-project-key",
      });
    });

    it("returns not available status when API call fails", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: "Not Found",
      } as Response);

      const result = await fetchQualityGateStatus();

      expect(result).toEqual({
        status: QualityGateStatus.NOT_AVAILABLE,
        url: "https://sonarcloud.io/dashboard?id=test-project-key",
      });
      expect(consoleSpy.error).toHaveBeenCalledWith(
        "SonarQube API error: 404 Not Found"
      );
    });

    it("returns not available status when network error occurs", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      const result = await fetchQualityGateStatus();

      expect(result).toEqual({
        status: QualityGateStatus.NOT_AVAILABLE,
        url: "https://sonarcloud.io/dashboard?id=test-project-key",
      });
      expect(consoleSpy.error).toHaveBeenCalledWith(
        "Error fetching quality gate status:",
        expect.any(Error)
      );
    });
  });

  describe("fetchTestCoverage", () => {
    it("returns coverage percentage when API succeeds", async () => {
      const mockCoverageResponse = {
        component: {
          measures: [
            {
              value: "85.5",
            },
          ],
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCoverageResponse),
      } as Response);

      const result = await fetchTestCoverage();

      expect(result).toEqual({
        percentage: 85.5,
        url: "https://sonarcloud.io/component_measures?id=test-project-key&metric=coverage",
      });
    });

    it("returns 0 percentage when no coverage data exists", async () => {
      const mockCoverageResponse = {
        component: {
          measures: [],
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCoverageResponse),
      } as Response);

      const result = await fetchTestCoverage();

      expect(result).toEqual({
        percentage: 0,
        url: "https://sonarcloud.io/component_measures?id=test-project-key&metric=coverage",
      });
    });

    it("returns 0 percentage when API call fails", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      } as Response);

      const result = await fetchTestCoverage();

      expect(result).toEqual({
        percentage: 0,
        url: "https://github.com/test-owner/test-repo/actions",
      });
      expect(consoleSpy.error).toHaveBeenCalledWith(
        "SonarQube API error for coverage: 500 Internal Server Error"
      );
    });
  });

  describe("fetchProjectStatus", () => {
    it("fetches all status data successfully", async () => {
      // Mock all API calls in the correct order as they appear in the individual functions
      mockFetch
        // CICD Status - Latest commit
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ sha: "test-sha" }),
        } as Response)
        // CICD Status - Workflow runs
        .mockResolvedValueOnce({
          ok: true,
          json: () =>
            Promise.resolve({
              workflow_runs: [
                {
                  head_sha: "test-sha",
                  conclusion: "success",
                  html_url:
                    "https://github.com/test-owner/test-repo/actions/runs/123",
                },
              ],
            }),
        } as Response)
        // Quality Gate Status
        .mockResolvedValueOnce({
          ok: true,
          json: () =>
            Promise.resolve({
              projectStatus: { status: "OK" },
            }),
        } as Response)
        // Test Coverage
        .mockResolvedValueOnce({
          ok: true,
          json: () =>
            Promise.resolve({
              component: {
                measures: [{ value: "90.0" }],
              },
            }),
        } as Response);

      const result = await fetchProjectStatus();

      expect(result).toEqual({
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
      });
    });

    it("returns default values when all services fail", async () => {
      mockFetch.mockRejectedValue(new Error("Network error"));

      const result = await fetchProjectStatus();

      expect(result).toEqual({
        cicd: {
          status: CICDStatus.NOT_AVAILABLE,
          url: "https://github.com/test-owner/test-repo/actions",
        },
        qualityGate: {
          status: QualityGateStatus.NOT_AVAILABLE,
          url: "https://sonarcloud.io/dashboard?id=test-project-key",
        },
        testCoverage: {
          percentage: 0,
          url: "https://github.com/test-owner/test-repo/actions",
        },
      });

      // The actual implementation doesn't log "Error fetching project status"
      // because Promise.all doesn't throw - individual functions handle their own errors
      // Instead, check that individual service errors were logged
      expect(consoleSpy.error).toHaveBeenCalledWith(
        "Error fetching CI/CD status:",
        expect.any(Error)
      );
      expect(consoleSpy.error).toHaveBeenCalledWith(
        "Error fetching quality gate status:",
        expect.any(Error)
      );
      expect(consoleSpy.error).toHaveBeenCalledWith(
        "Error fetching test coverage:",
        expect.any(Error)
      );
    });
  });

  describe("API calls", () => {
    it("makes correct GitHub API calls with proper headers", async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ sha: "test-sha" }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: () =>
            Promise.resolve({
              workflow_runs: [],
            }),
        } as Response);

      await fetchCICDStatus();

      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.github.com/repos/test-owner/test-repo/commits/main",
        {
          headers: {
            Authorization: "token test-github-token",
            Accept: "application/vnd.github.v3+json",
          },
          cache: "no-store",
        }
      );

      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.github.com/repos/test-owner/test-repo/actions/workflows/ci.yml/runs?branch=main&per_page=1",
        {
          headers: {
            Authorization: "token test-github-token",
            Accept: "application/vnd.github.v3+json",
          },
          cache: "no-store",
        }
      );
    });

    it("makes correct SonarCloud API calls with proper headers", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            projectStatus: { status: "OK" },
          }),
      } as Response);

      await fetchQualityGateStatus();

      expect(mockFetch).toHaveBeenCalledWith(
        "https://sonarcloud.io/api/qualitygates/project_status?projectKey=test-project-key",
        {
          headers: {
            Authorization: "Bearer test-sonar-token",
            Accept: "application/json",
          },
          cache: "no-store",
        }
      );
    });
  });
});
