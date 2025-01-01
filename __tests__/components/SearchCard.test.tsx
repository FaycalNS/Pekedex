/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, waitFor } from "@testing-library/react";
import SearchCard from "@/components/pokemon/search-card";
import { Mock, beforeEach, describe, expect, it, vi } from "vitest";
import { useRouter } from "next/navigation";
import { getRandomPokemon, searchPokemon } from "@/lib/utils/pokemon-utils";
import userEvent from "@testing-library/user-event";
import type { PokemonDetailResponse } from "@/types/pokemon";

// Mock the utility functions
vi.mock("@/lib/utils/pokemon-utils", () => ({
  searchPokemon: vi.fn(),
  getRandomPokemon: vi.fn()
}));

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

const mockPokemonData: PokemonDetailResponse['pokemon_v2_pokemon'][0] = {
  id: 1,
  name: "bulbasaur",
  pokemon_v2_pokemonsprites: [
    { sprites: '{"front_default": "sprite-url"}' }
  ],
  pokemon_v2_pokemontypes: [
    { pokemon_v2_type: { name: "grass" } }
  ],
  pokemon_v2_pokemonstats: [
    { base_stat: 45, pokemon_v2_stat: { name: "hp" } }
  ]
};

describe("SearchCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as Mock).mockReturnValue({
      push: vi.fn(),
      prefetch: vi.fn(),
    });
  });

  it("renders search input and buttons correctly", () => {
    render(<SearchCard />);

    expect(screen.getByLabelText(/pokemon name or id/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /random/i })).toBeInTheDocument();
  });

  it("validates input and shows error message", async () => {
    render(<SearchCard />);

    const input = screen.getByLabelText(/pokemon name or id/i);
    await userEvent.type(input, "!!!");

    await waitFor(() => {
      expect(screen.getByText(/must be a valid pokemon name/i)).toBeInTheDocument();
    });
  });

  it("searches for pokemon and navigates correctly", async () => {
    vi.mocked(searchPokemon).mockResolvedValueOnce(mockPokemonData);

    render(<SearchCard />);

    const input = screen.getByLabelText(/pokemon name or id/i);
    await userEvent.type(input, "bulbasaur");
    await userEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(useRouter().push).toHaveBeenCalledWith("/pokemon/bulbasaur");
    });
  });

  it("shows loading state during search", async () => {
    const user = userEvent.setup();
    
    vi.mocked(searchPokemon).mockImplementationOnce(
      () => new Promise((resolve) => setTimeout(() => resolve(mockPokemonData), 100))
    );

    render(<SearchCard />);

    const searchButton = screen.getByRole("button", { name: /Search/i });
    const randomButton = screen.getByRole("button", { name: /Random/i });
    const input = screen.getByLabelText(/pokemon name or id/i);
    
    await user.type(input, "bulbasaur");
    
    await user.click(searchButton);

    await waitFor(() => {
      expect(searchButton).toBeDisabled();
      expect(randomButton).toBeDisabled();
    });
  });

  it("handles random pokemon search successfully", async () => {
    vi.mocked(getRandomPokemon).mockResolvedValueOnce(mockPokemonData);

    render(<SearchCard />);

    await userEvent.click(screen.getByRole("button", { name: /random/i }));

    await waitFor(() => {
      expect(useRouter().push).toHaveBeenCalledWith("/pokemon/bulbasaur");
    });
  });
});