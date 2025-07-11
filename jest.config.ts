import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["lcov", "text"],

  testPathIgnorePatterns: ["/node_modules/", "/.next/", "/out/"],
};

export default createJestConfig(config);
