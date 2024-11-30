/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchCard from "@/components/pokemon/search-card";
import { Mock, beforeEach, describe, expect, it, vi } from "vitest";
import { useRouter } from "next/navigation";
import { getRandomPokemon, searchPokemon } from "@/lib/utils/pokemon-utils";
import userEvent from "@testing-library/user-event";

// Mock the utility functions
vi.mock("@/lib/utils/pokemon-utils", () => ({
  searchPokemon: vi.fn(),
  getRandomPokemon: vi.fn()
}));

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("SearchCard", () => {
  beforeEach(() => {
    (useRouter as Mock).mockReturnValue({
      push: vi.fn(),
      prefetch: vi.fn(),
    });
  });

  it("renders search input and buttons", () => {
    render(<SearchCard />);

    expect(screen.getByLabelText(/pokemon name or id/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /random/i })).toBeInTheDocument();
  });

  it("validates input correctly", async () => {
    render(<SearchCard />);

    const input = screen.getByLabelText(/pokemon name or id/i);
    fireEvent.change(input, { target: { value: "!!!" } });

    await waitFor(() => {
      expect(screen.getByText(/must be a valid pokemon name/i)).toBeInTheDocument();
    });
  });

  it("bulbasaur", async () => {
    const mockPokemon = {
      id: -1,
      name: "bulbasaur",
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(searchPokemon).mockResolvedValueOnce(mockPokemon as any);

    render(<SearchCard />);

    const input = screen.getByLabelText(/pokemon name or id/i);
    fireEvent.change(input, { target: { value: "bulbasaur" } });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(useRouter().push).toHaveBeenCalledWith("/pokemon/bulbasaur");
    });
  });

  it("shows loading state while searching", async () => {
    vi.mocked(searchPokemon).mockImplementationOnce(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<SearchCard />);

    const input = screen.getByLabelText(/pokemon name or id/i);
    fireEvent.change(input, { target: { value: "bulbasaur" } });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /random/i })).toBeDisabled();
    });
  });

  it("handles random pokemon search", async () => {
    const mockPokemon = {
      id: 1,
      name: "bulbasaur",
    };

    vi.mocked(getRandomPokemon).mockResolvedValueOnce(mockPokemon as any);

    render(<SearchCard />);

    await userEvent.click(screen.getByRole("button", { name: /random/i }));

    await waitFor(() => {
      expect(useRouter().push).toHaveBeenCalledWith("/pokemon/bulbasaur");
    });
  });
});