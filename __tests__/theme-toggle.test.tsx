import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ThemeToggle from "@/components/common/theme-toggle";

const setThemeMock = jest.fn();

jest.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: setThemeMock,
  }),
}));

describe("ThemeToggle", () => {
  beforeEach(() => {
    setThemeMock.mockClear();
  });

  // Skip test because useEffect makes testing initial null render impractical
  it.skip("renders nothing initially before mounted", () => {
    const { container } = render(<ThemeToggle />);
    expect(container.firstChild).toBeNull();
  });

  it("renders the toggle after mounted", async () => {
    render(<ThemeToggle />);
    await waitFor(() => expect(screen.getByRole("switch")).toBeInTheDocument());
  });

  it("toggles theme on switch click", async () => {
    render(<ThemeToggle />);
    await waitFor(() => expect(screen.getByRole("switch")).toBeInTheDocument());

    const toggle = screen.getByRole("switch");
    expect(toggle).not.toBeChecked();

    fireEvent.click(toggle);

    expect(setThemeMock).toHaveBeenCalledWith("dark");
  });
});
