/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Error from "@/app/error";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock next/font/google
vi.mock("next/font/google", () => ({
  Single_Day: () => ({
    className: "mocked-font",
    style: { fontFamily: "mocked-font" },
  }),
}));

// Mock React hooks
vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return {
    ...actual,
    useEffect: vi.fn((callback) => callback()),
  };
});

describe("Error Page", () => {
  const mockReset = vi.fn();
  const mockError = {
    name: "Error",
    message: "Test error",
  } as Error;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders error message", () => {
    render(<Error error={mockError} reset={mockReset} />);
    expect(screen.getByText(/Something went wrong!/i)).toBeInTheDocument();
  });

  it("calls reset function when try again is clicked", () => {
    render(<Error error={mockError} reset={mockReset} />);
    fireEvent.click(screen.getByText(/Try Again/i));
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it("renders go home link", () => {
    render(<Error error={mockError} reset={mockReset} />);
    const link = screen.getByText(/Go Home/i);
    expect(link).toBeInTheDocument();
    expect(link.closest("a")).toHaveAttribute("href", "/");
  });

  it("logs error to console", () => {
    const consoleSpy = vi.spyOn(console, "error");
    render(<Error error={mockError} reset={mockReset} />);
    expect(consoleSpy).toHaveBeenCalledWith("Error:", mockError);
  });
});
