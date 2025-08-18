import { renderHook, act } from "@testing-library/react";
import { useToast } from "@/hooks/use-toast";

describe("useToast hook", () => {
  beforeEach(() => {
    // Reset memory state before each test
    const state = (useToast as any).memoryState;
    if (state) state.toasts = [];

    // Clear any existing timeouts
    const timeouts = (useToast as any).toastTimeouts;
    if (timeouts) {
      timeouts.forEach((timeout: NodeJS.Timeout) => clearTimeout(timeout));
      timeouts.clear();
    }
  });

  afterEach(() => {
    // Clean up any remaining timeouts
    jest.clearAllTimers();
  });

  test("should initialize with empty toasts", () => {
    const { result } = renderHook(() => useToast());
    expect(result.current.toasts).toEqual([]);
  });

  test("should add a toast using the hook", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: "Test toast" });
    });

    expect(result.current.toasts.length).toBe(1);
    expect(result.current.toasts[0].title).toBe("Test toast");
    expect(result.current.toasts[0].id).toBeDefined();
  });

  test("should dismiss a toast (mark as closed)", () => {
    const { result } = renderHook(() => useToast());

    let toastId: string = "";
    act(() => {
      const t = result.current.toast({ title: "Dismiss me" });
      toastId = t.id;
    });

    expect(result.current.toasts[0].open).toBe(true);

    act(() => {
      result.current.dismiss(toastId);
    });

    expect(result.current.toasts[0].open).toBe(false);
    // Toast is still in array but marked as closed
    expect(result.current.toasts.length).toBe(1);
  });

  test("should update a toast", () => {
    const { result } = renderHook(() => useToast());

    let toastId: string = "";
    act(() => {
      const t = result.current.toast({ title: "Old title" });
      toastId = t.id;
    });

    // Update the toast with the same ID
    act(() => {
      result.current.toast({ title: "Updated title" });
    });

    // Since TOAST_LIMIT is 1, the new toast replaces the old one
    expect(result.current.toasts[0].title).toBe("Updated title");
  });

  test("should remove toast from array after timeout", () => {
    jest.useFakeTimers();

    const { result } = renderHook(() => useToast());

    act(() => {
      const t = result.current.toast({ title: "Auto remove" });
      // Immediately dismiss it to trigger the removal timeout
      result.current.dismiss(t.id);
    });

    expect(result.current.toasts.length).toBe(1);
    expect(result.current.toasts[0].open).toBe(false);

    // Fast-forward past the TOAST_REMOVE_DELAY (1000000ms)
    act(() => {
      jest.advanceTimersByTime(1000001);
    });

    // Now it should be removed from the array
    expect(result.current.toasts.length).toBe(0);

    jest.useRealTimers();
  });

  test("should respect toast limit", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: "Toast 1" });
      result.current.toast({ title: "Toast 2" });
      result.current.toast({ title: "Toast 3" });
    });

    // TOAST_LIMIT is 1, so only the most recent toast should remain
    expect(result.current.toasts.length).toBe(1);
    expect(result.current.toasts[0].title).toBe("Toast 3");
  });

  test("should dismiss all toasts when no toastId provided", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: "Toast 1" });
    });

    expect(result.current.toasts[0].open).toBe(true);

    act(() => {
      result.current.dismiss(); // No toastId provided
    });

    expect(result.current.toasts[0].open).toBe(false);
  });

  test("should handle onOpenChange callback", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: "Test toast" });
    });

    const toast = result.current.toasts[0];
    expect(toast.open).toBe(true);

    // Simulate the onOpenChange callback being called with false
    act(() => {
      toast.onOpenChange?.(false);
    });

    expect(result.current.toasts[0].open).toBe(false);
  });

  test("should return toast object with dismiss and update methods", () => {
    const { result } = renderHook(() => useToast());

    let toastObject: any;
    act(() => {
      toastObject = result.current.toast({ title: "Test toast" });
    });

    expect(toastObject).toHaveProperty("id");
    expect(toastObject).toHaveProperty("dismiss");
    expect(toastObject).toHaveProperty("update");
    expect(typeof toastObject.dismiss).toBe("function");
    expect(typeof toastObject.update).toBe("function");
  });
});
