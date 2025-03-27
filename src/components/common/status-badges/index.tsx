"use client";

import { useEffect, useState } from "react";
import { SonarQubeIcon, CICDIcon, JestIcon } from "@/lib/icons";
import { CICDStatus, QualityGateStatus, StatusData } from "@/lib/enums/status";
import { useTranslations } from "next-intl";

const StatusBadges = () => {
  const t = useTranslations("status");
  const [status, setStatus] = useState<StatusData>({
    cicd: {
      status: CICDStatus.PENDING,
      url: "#",
    },
    qualityGate: {
      status: QualityGateStatus.PENDING,
      url: "#",
    },
    testCoverage: {
      percentage: 0,
      url: "#",
    },
  });

  const [isLoading, setIsLoading] = useState(true);

  const getStatus = async () => {
    try {
      // Use the API route instead of direct function call
      const response = await fetch("/api/app-status");
      if (!response.ok) {
        throw new Error(`Status API returned ${response.status}`);
      }
      const data = await response.json();
      setStatus(data);
    } catch (error) {
      console.error("Failed to fetch status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  // Helper function to get badge color based on status
  const getCicdBadgeClass = (status: CICDStatus) => {
    switch (status) {
      case CICDStatus.PASSING:
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800";
      case CICDStatus.FAILING:
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800";
      case CICDStatus.NOT_AVAILABLE:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800";
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 dark:hover:bg-yellow-800";
    }
  };

  const getQualityGateBadgeClass = (status: QualityGateStatus) => {
    switch (status) {
      case QualityGateStatus.PASSED:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800";
      case QualityGateStatus.FAILED:
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800";
      case QualityGateStatus.NOT_AVAILABLE:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800";
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 dark:hover:bg-yellow-800";
    }
  };

  const getTestCoverageBadgeClass = (percentage: number) => {
    if (percentage >= 90) {
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800";
    } else if (percentage >= 70) {
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 dark:hover:bg-yellow-800";
    } else if (percentage > 0) {
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800";
    } else {
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800";
    }
  };

  // Helper function to get status text
  const getCicdStatusText = (status: CICDStatus) => {
    switch (status) {
      case CICDStatus.PASSING:
        return t("cicd.passing");
      case CICDStatus.FAILING:
        return t("cicd.failing");
      case CICDStatus.PENDING:
        return t("cicd.pending");
      case CICDStatus.NOT_AVAILABLE:
        return t("cicd.notAvailable");
    }
  };

  const getQualityGateStatusText = (status: QualityGateStatus) => {
    switch (status) {
      case QualityGateStatus.PASSED:
        return t("qualityGate.passed");
      case QualityGateStatus.FAILED:
        return t("qualityGate.failed");
      case QualityGateStatus.PENDING:
        return t("qualityGate.pending");
      case QualityGateStatus.NOT_AVAILABLE:
        return t("qualityGate.notAvailable");
    }
  };

  const getTestCoverageText = (percentage: number) => {
    return percentage > 0 ? `${percentage}%` : t("testCoverage.notAvailable");
  };

  if (isLoading) {
    return (
      <div className="flex flex-wrap justify-center gap-4 my-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-300 animate-pulse"
            role="status"
          >
            <div className="h-4 w-4 rounded-full bg-gray-300 dark:bg-gray-700"></div>
            <div className="h-4 w-20 rounded-full bg-gray-300 dark:bg-gray-700"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 my-6">
      <a
        href={status.cicd.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium hover:bg-opacity-80 transition-colors ${getCicdBadgeClass(
          status.cicd.status
        )}`}
      >
        <CICDIcon className="h-4 w-4" />
        <span>
          {t("cicd.label")}: {getCicdStatusText(status.cicd.status)}
        </span>
      </a>

      <a
        href={status.qualityGate.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium hover:bg-opacity-80 transition-colors ${getQualityGateBadgeClass(
          status.qualityGate.status
        )}`}
      >
        <SonarQubeIcon className="h-4 w-4" />
        <span>
          {t("qualityGate.label")}:{" "}
          {getQualityGateStatusText(status.qualityGate.status)}
        </span>
      </a>

      <a
        href={status.testCoverage.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium hover:bg-opacity-80 transition-colors ${getTestCoverageBadgeClass(
          status.testCoverage.percentage
        )}`}
      >
        <JestIcon className="h-4 w-4" />
        <span>
          {t("testCoverage.label")}:{" "}
          {getTestCoverageText(status.testCoverage.percentage)}
        </span>
      </a>
    </div>
  );
};

export default StatusBadges;
