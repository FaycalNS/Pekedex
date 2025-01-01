// __tests__/integration/pokemon-detail.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, beforeEach, vi } from "vitest";
import PokemonPage from "@/app/pokemon/[idOrName]/page";
import { getPokemonData, getPokemonSpecies, getEvolutionChain } from "@/lib/utils/pokemon-utils";
import { EvolutionChainResponse, PokemonDetailResponse, PokemonSpeciesResponse } from "@/types/pokemon";
import { notFound } from "next/navigation";
vi.mock("@/lib/utils/pokemon-utils", () => ({
  getPokemonData: vi.fn(),
  getPokemonSpecies: vi.fn(),
  getEvolutionChain: vi.fn(),
}));
vi.mock("next/navigation", () => ({
  notFound: vi.fn(),
}));
vi.mock('next/font/google', () => ({
    Abel: () => ({
      className: 'mocked-font',
      style: { fontFamily: 'mocked-font' },
    }),
  }));
    vi.mock('next/image', () => ({
        default: ({ src, alt }: { src: string; alt: string }) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} />
        ),
      }));
const mockPokemonData: PokemonDetailResponse['pokemon_v2_pokemon'][0] = {
  id: 1,
  name: "bulbasaur",
  pokemon_v2_pokemonsprites: [
    {
      sprites: JSON.stringify({
        other: {
          'official-artwork': {
            front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
          }
        }
      })
    }
  ],
  pokemon_v2_pokemontypes: [
    { pokemon_v2_type: { name: "grass" } }
  ],
  pokemon_v2_pokemonstats: [
    { base_stat: 45, pokemon_v2_stat: { name: "hp" } }
  ]
};

const mockSpeciesData: PokemonSpeciesResponse['pokemon_v2_pokemonspecies'][0] = {
  pokemon_v2_pokemonspeciesflavortexts: [
    { flavor_text: "Test description" }
  ],
  evolution_chain_id: 1,
  pokemon_v2_pokemoncolor: {
    name: "green"
  }
};

const mockEvolutionData: EvolutionChainResponse['pokemon_v2_evolutionchain'][0] = {
  pokemon_v2_pokemonspecies: [
    { id: 1, name: "bulbasaur", evolves_from_species_id: null },
    { id: 2, name: "ivysaur", evolves_from_species_id: 1 }
  ]
};

describe("Pokemon Detail Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should display evolution chain and handle tab switching", async () => {
    const user = userEvent.setup();

    vi.mocked(getPokemonData).mockResolvedValueOnce(mockPokemonData);
    vi.mocked(getPokemonSpecies).mockResolvedValueOnce(mockSpeciesData);
    vi.mocked(getEvolutionChain).mockResolvedValueOnce(mockEvolutionData);

    const page = await PokemonPage({ 
      params: { idOrName: 'bulbasaur' },
    });

    render(page);

    const title = await screen.findByRole('heading', { 
      name: /bulbasaur/i,
    });
    expect(title).toBeInTheDocument();

    // Click evolutions tab
    const evolutionsTab = screen.getByRole('tab', { name: /evolutions/i });
    await user.click(evolutionsTab);

    await waitFor(() => {
      const bulbasaur = screen.getByText(/bulbasaur/i, { ignore: 'h1' });
      const ivysaur = screen.getByText(/ivysaur/i);
      expect(bulbasaur).toBeInTheDocument();
      expect(ivysaur).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it("should handle pokemon not found", async () => {
    // Setup mocks
    vi.mocked(getPokemonData).mockResolvedValueOnce(null);
    vi.mocked(getPokemonSpecies).mockResolvedValueOnce(null);
    vi.mocked(getEvolutionChain).mockResolvedValueOnce(null);

    // Execute the page function
    try {
      await PokemonPage({ 
        params: { idOrName: 'nonexistent' },
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // Ignore any errors
    }

    // Verify notFound was called
    expect(notFound).toHaveBeenCalled();
  });

  it("should display pokemon stats correctly", async () => {
    vi.mocked(getPokemonData).mockResolvedValueOnce(mockPokemonData);
    vi.mocked(getPokemonSpecies).mockResolvedValueOnce(mockSpeciesData);
    vi.mocked(getEvolutionChain).mockResolvedValueOnce(mockEvolutionData);

    const page = await PokemonPage({ 
      params: { idOrName: 'bulbasaur' },
    });

    render(page);

    await waitFor(() => {
      expect(screen.getByText('45')).toBeInTheDocument();
      expect(screen.getByText('HP')).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});