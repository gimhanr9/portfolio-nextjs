import { siteConfig } from "@/config/site";
import { CICDStatus, QualityGateStatus, StatusData } from "@/lib/enums/status";

// Fetch GitHub Actions workflow status
async function fetchCICDStatus(): Promise<StatusData["cicd"]> {
  const { token, repoOwner, repoName } = siteConfig.github;
  const defaultUrl = `${siteConfig.urls.github}/${repoOwner}/${repoName}/actions`;

  if (!token) {
    return {
      status: CICDStatus.NOT_AVAILABLE,
      url: defaultUrl,
    };
  }

  try {
    const response = await fetch(
      `${siteConfig.urls.githubApi}/repos/${repoOwner}/${repoName}/actions/runs?per_page=1`,
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      return {
        status: CICDStatus.NOT_AVAILABLE,
        url: defaultUrl,
      };
    }

    const data = await response.json();
    if (!data.workflow_runs || data.workflow_runs?.length === 0) {
      return {
        status: CICDStatus.NOT_AVAILABLE,
        url: defaultUrl,
      };
    }

    const latestRun = data.workflow_runs[0];
    return {
      status:
        latestRun.conclusion === "success"
          ? CICDStatus.PASSING
          : latestRun.conclusion === null
          ? CICDStatus.PENDING
          : CICDStatus.FAILING,
      url: latestRun.html_url || defaultUrl,
    };
  } catch (error) {
    return {
      status: CICDStatus.NOT_AVAILABLE,
      url: defaultUrl,
    };
  }
}

// Fetch SonarQube quality gate status
async function fetchQualityGateStatus(): Promise<StatusData["qualityGate"]> {
  const { token, projectKey } = siteConfig.sonar;
  const defaultUrl = `${siteConfig.urls.sonarCloud}/dashboard?id=${projectKey}`;

  if (!token) {
    return {
      status: QualityGateStatus.NOT_AVAILABLE,
      url: defaultUrl,
    };
  }

  try {
    const response = await fetch(
      `${siteConfig.urls.sonarCloudApi}/qualitygates/project_status?projectKey=${projectKey}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      return {
        status: QualityGateStatus.NOT_AVAILABLE,
        url: defaultUrl,
      };
    }

    const data = await response.json();
    return {
      status:
        data.projectStatus?.status === "OK"
          ? QualityGateStatus.PASSED
          : data.projectStatus
          ? QualityGateStatus.FAILED
          : QualityGateStatus.NOT_AVAILABLE,
      url: defaultUrl,
    };
  } catch (error) {
    return {
      status: QualityGateStatus.NOT_AVAILABLE,
      url: defaultUrl,
    };
  }
}

// Fetch test coverage
async function fetchTestCoverage(): Promise<StatusData["testCoverage"]> {
  const { token, projectKey } = siteConfig.sonar;
  const repoOwner = siteConfig.github.repoOwner;
  const repoName = siteConfig.github.repoName;
  const defaultUrl = `${siteConfig.urls.github}/${repoOwner}/${repoName}/actions`;

  if (!token) {
    return {
      percentage: 0,
      url: defaultUrl,
    };
  }

  try {
    const response = await fetch(
      `${siteConfig.urls.sonarCloudApi}/measures/component?component=${projectKey}&metricKeys=coverage`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      return {
        percentage: 0,
        url: defaultUrl,
      };
    }

    const data = await response.json();
    const coverageValue = data.component?.measures?.[0]?.value;

    return {
      percentage: coverageValue ? Number.parseFloat(coverageValue) : 0,
      url: `${siteConfig.urls.sonarCloud}/component_measures?id=${projectKey}&metric=coverage`,
    };
  } catch (error) {
    return {
      percentage: 0,
      url: defaultUrl,
    };
  }
}

// Main function to fetch all project status data
export async function fetchProjectStatus(): Promise<StatusData> {
  // Fetch all statuses in parallel
  const [cicdStatus, qualityGateStatus, testCoverageStatus] = await Promise.all(
    [fetchCICDStatus(), fetchQualityGateStatus(), fetchTestCoverage()]
  );

  return {
    cicd: cicdStatus,
    qualityGate: qualityGateStatus,
    testCoverage: testCoverageStatus,
  };
}
