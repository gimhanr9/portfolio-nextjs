export enum CICDStatus {
  PASSING = "passing",
  FAILING = "failing",
  PENDING = "pending",
  NOT_AVAILABLE = "not_available",
}

export enum QualityGateStatus {
  PASSED = "passed",
  FAILED = "failed",
  PENDING = "pending",
  NOT_AVAILABLE = "not_available",
}

export interface StatusData {
  cicd: {
    status: CICDStatus;
    url: string;
  };
  qualityGate: {
    status: QualityGateStatus;
    url: string;
  };
  testCoverage: {
    percentage: number;
    url: string;
  };
}
