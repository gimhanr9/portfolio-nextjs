import { siteConfig } from "@/config/site";
import { CICDStatus, QualityGateStatus, StatusData } from "@/lib/enums/status";
import { NextResponse } from "next/server";

// Fetch GitHub Actions workflow status
export async function fetchCICDStatus(): Promise<StatusData["cicd"]> {
  const { token, repoOwner, repoName } = siteConfig.github;
  const defaultUrl = `${siteConfig.urls.github}/${repoOwner}/${repoName}/actions`;

  if (!token) {
    console.log("GitHub token is not configured");
    return {
      status: CICDStatus.NOT_AVAILABLE,
      url: defaultUrl,
    };
  }

  try {
    console.log(`Fetching CI/CD status for ${repoOwner}/${repoName}`);

    // Fetch latest commit SHA from the main branch
    const latestCommitResponse = await fetch(
      `${siteConfig.urls.githubApi}/repos/${repoOwner}/${repoName}/commits/main`,
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
        cache: "no-store",
      }
    );

    if (!latestCommitResponse.ok) {
      throw new Error(
        `Failed to fetch latest commit: ${latestCommitResponse.statusText}`
      );
    }

    const latestCommit = await latestCommitResponse.json();
    const latestCommitSha = latestCommit.sha;

    // Fetch latest workflow run for ci.yml
    const latestRunResponse = await fetch(
      `${siteConfig.urls.githubApi}/repos/${repoOwner}/${repoName}/actions/workflows/ci.yml/runs?branch=main&per_page=1`,
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
        cache: "no-store",
      }
    );

    if (!latestRunResponse.ok) {
      throw new Error(
        `Failed to fetch workflow run: ${latestRunResponse.statusText}`
      );
    }

    const runData = await latestRunResponse.json();
    const latestRun = runData.workflow_runs?.[0];

    if (!latestRun) {
      return {
        status: CICDStatus.NOT_AVAILABLE,
        url: defaultUrl,
      };
    }

    const isLatest = latestRun.head_sha === latestCommitSha;

    const status: CICDStatus = isLatest
      ? latestRun.conclusion === "success"
        ? CICDStatus.PASSING
        : latestRun.conclusion === null
        ? CICDStatus.PENDING
        : CICDStatus.FAILING
      : CICDStatus.PENDING;

    return {
      status,
      url: latestRun.html_url ?? defaultUrl,
    };
  } catch (error) {
    console.error("Error fetching CI/CD status:", error);
    return {
      status: CICDStatus.NOT_AVAILABLE,
      url: defaultUrl,
    };
  }
}

// Fetch SonarQube quality gate status
export async function fetchQualityGateStatus(): Promise<
  StatusData["qualityGate"]
> {
  const { token, projectKey } = siteConfig.sonar;
  const defaultUrl = `${siteConfig.urls.sonarCloud}/dashboard?id=${projectKey}`;

  if (!token) {
    console.log("SonarQube token is not configured");
    return {
      status: QualityGateStatus.NOT_AVAILABLE,
      url: defaultUrl,
    };
  }

  try {
    console.log(`Fetching quality gate status for ${projectKey}`);

    const response = await fetch(
      `${siteConfig.urls.sonarCloudApi}/qualitygates/project_status?projectKey=${projectKey}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        cache: "no-store", // force fresh result
      }
    );

    if (!response.ok) {
      console.error(
        `SonarQube API error: ${response.status} ${response.statusText}`
      );
      return {
        status: QualityGateStatus.NOT_AVAILABLE,
        url: defaultUrl,
      };
    }

    const data = await response.json();
    console.log("SonarQube API response:", data);

    const status = data?.projectStatus?.status;
    return {
      status:
        status === "OK"
          ? QualityGateStatus.PASSED
          : status === "ERROR" || status === "WARN"
          ? QualityGateStatus.FAILED
          : QualityGateStatus.NOT_AVAILABLE,
      url: defaultUrl,
    };
  } catch (error) {
    console.error("Error fetching quality gate status:", error);
    return {
      status: QualityGateStatus.NOT_AVAILABLE,
      url: defaultUrl,
    };
  }
}

// Fetch test coverage
export async function fetchTestCoverage(): Promise<StatusData["testCoverage"]> {
  const { token, projectKey } = siteConfig.sonar;
  const repoOwner = siteConfig.github.repoOwner;
  const repoName = siteConfig.github.repoName;
  const defaultUrl = `${siteConfig.urls.github}/${repoOwner}/${repoName}/actions`;

  if (!token) {
    console.log("SonarQube token is not configured for test coverage");
    return {
      percentage: 0,
      url: defaultUrl,
    };
  }

  try {
    console.log(`Fetching test coverage for ${projectKey}`);
    const response = await fetch(
      `${siteConfig.urls.sonarCloudApi}/measures/component?component=${projectKey}&metricKeys=coverage`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // Remove the next: { revalidate } option
        // next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      console.error(
        `SonarQube API error for coverage: ${response.status} ${response.statusText}`
      );
      return {
        percentage: 0,
        url: defaultUrl,
      };
    }

    const data = await response.json();
    console.log("SonarQube coverage API response:", data);

    const coverageValue = data.component?.measures?.[0]?.value;

    return {
      percentage: coverageValue ? Number.parseFloat(coverageValue) : 0,
      url: `${siteConfig.urls.sonarCloud}/component_measures?id=${projectKey}&metric=coverage`,
    };
  } catch (error) {
    console.error("Error fetching test coverage:", error);
    return {
      percentage: 0,
      url: defaultUrl,
    };
  }
}

// Main function to fetch all project status data
export async function fetchProjectStatus(): Promise<StatusData> {
  console.log("Fetching all project status data");

  try {
    // Fetch all statuses in parallel
    const [cicdStatus, qualityGateStatus, testCoverageStatus] =
      await Promise.all([
        fetchCICDStatus(),
        fetchQualityGateStatus(),
        fetchTestCoverage(),
      ]);

    return {
      cicd: cicdStatus,
      qualityGate: qualityGateStatus,
      testCoverage: testCoverageStatus,
    };
  } catch (error) {
    console.error("Error fetching project status:", error);
    // Return default values if there's an error
    return {
      cicd: {
        status: CICDStatus.NOT_AVAILABLE,
        url: `${siteConfig.urls.github}/${siteConfig.github.repoOwner}/${siteConfig.github.repoName}/actions`,
      },
      qualityGate: {
        status: QualityGateStatus.NOT_AVAILABLE,
        url: `${siteConfig.urls.sonarCloud}/dashboard?id=${siteConfig.sonar.projectKey}`,
      },
      testCoverage: {
        percentage: 0,
        url: `${siteConfig.urls.github}/${siteConfig.github.repoOwner}/${siteConfig.github.repoName}/actions`,
      },
    };
  }
}

export async function GET() {
  try {
    // This runs on the server, so environment variables are accessible
    const statusData = await fetchProjectStatus();

    return NextResponse.json(statusData);
  } catch (error) {
    console.error("Error fetching project status:", error);
    return NextResponse.json(
      { error: "Failed to fetch project status" },
      { status: 500 }
    );
  }
}
