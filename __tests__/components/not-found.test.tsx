/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import NotFound from "@/app/not-found";

// Mock Framer Motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
  },
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

// Mock next/font/google
vi.mock("next/font/google", () => ({
  Single_Day: () => ({
    className: "mocked-font",
    style: { fontFamily: "mocked-font" },
  }),
}));

describe("NotFound Page", () => {
  it("renders not found message", () => {
    render(<NotFound />);
    expect(screen.getByText(/No Pokemon Found!/i)).toBeInTheDocument();
  });

  it("renders navigation link", () => {
    render(<NotFound />);
    const backButton = screen.getByAltText(/ChevronLeft/i);
    expect(backButton).toBeInTheDocument();
    expect(backButton.closest("a")).toHaveAttribute("href", "/");
  });

  it("renders the duck image", () => {
    render(<NotFound />);
    const image = screen.getByAltText(/No Pokemon Found!/i);
    expect(image).toBeInTheDocument();
  });

  it("renders with correct layout classes", () => {
    const { container } = render(<NotFound />);
    expect(container.firstChild).toHaveClass("min-h-screen");
    expect(container.firstChild).toHaveClass("bg-themeMainColor");
  });
});