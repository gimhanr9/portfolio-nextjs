import React from "react";
import { render, screen, act } from "@testing-library/react";
import AnimatedText from "@/components/common/animated-text";

jest.useFakeTimers();

describe("AnimatedText", () => {
  const text = "Hello, world!";
  const delay = 1; // 1 second

  it("renders with initial visibility false", () => {
    render(<AnimatedText text={text} delay={delay} />);
    const span = screen.getByText(text);
    expect(span).toHaveAttribute("data-visible", "false");
  });

  it("becomes visible after delay", () => {
    render(<AnimatedText text={text} delay={delay} />);
    const span = screen.getByText(text);

    expect(span).toHaveAttribute("data-visible", "false");

    // Advance timers by delay seconds
    act(() => {
      jest.advanceTimersByTime(delay * 1000);
    });

    // Now the visibility should be true
    expect(span).toHaveAttribute("data-visible", "true");
  });

  it("clears timer on unmount", () => {
    const { unmount } = render(<AnimatedText text={text} delay={delay} />);
    unmount();
  });
});
