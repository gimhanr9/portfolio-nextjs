import "@testing-library/jest-dom";
import fetch from "cross-fetch";
import "intersection-observer";
import ResizeObserver from "resize-observer-polyfill";

global.fetch = fetch;
global.ResizeObserver = ResizeObserver;

// jest.setup.js
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
