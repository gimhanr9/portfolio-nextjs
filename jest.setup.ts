import "@testing-library/jest-dom";
import { TextDecoder, TextEncoder } from "util";
import { jest } from "@jest/globals";

// Mock environment variables
process.env = {
  ...process.env,
  GITHUB_TOKEN: "test-github-token",
  REPO_OWNER: "test-owner",
  REPO_NAME: "test-repo",
  SONAR_TOKEN: "test-sonar-token",
  SONAR_PROJECT_KEY: "test-project-key",
  RESEND_API_KEY: "test-resend-api-key",
  FROM_EMAIL: "test@example.com",
  TO_EMAIL: "recipient@example.com",
};

// Mock TextEncoder/TextDecoder
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

// Mock fetch if not available
if (!global.fetch) {
  global.fetch = jest.fn();
}

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {
    return null;
  }
  observe() {
    return null;
  }
  takeRecords() {
    return [];
  }
  unobserve() {
    return null;
  }
} as any;

// Mock SpeechSynthesis
Object.defineProperty(window, "speechSynthesis", {
  writable: true,
  value: {
    speak: jest.fn(),
    cancel: jest.fn(),
    pause: jest.fn(),
    resume: jest.fn(),
    getVoices: jest.fn().mockReturnValue([]),
    onvoiceschanged: null,
    speaking: false,
    pending: false,
    paused: false,
  },
});

// Mock SpeechSynthesisUtterance
global.SpeechSynthesisUtterance = jest.fn().mockImplementation(() => ({
  text: "",
  voice: null,
  lang: "",
  rate: 1,
  pitch: 1,
  volume: 1,
  onstart: null,
  onend: null,
  onerror: null,
  onpause: null,
  onresume: null,
  onmark: null,
  onboundary: null,
}));
