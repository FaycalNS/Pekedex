/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PokemonDetail from "@/components/pokemon/pokemonDetail";
import type {
  PokemonDetailResponse,
  PokemonSpeciesResponse,
  EvolutionChainResponse,
} from "@/types/pokemon";

// Add font and image mocks
vi.mock("next/font/google", () => ({
  Abel: () => ({
    className: "mocked-font",
    style: { fontFamily: "mocked-font" },
  }),
}));

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

const mockPokemonData: PokemonDetailResponse["pokemon_v2_pokemon"][0] = {
  id: 1,
  name: "bulbasaur",
  pokemon_v2_pokemonsprites: [
    {
      sprites: JSON.stringify({
        other: {
          "official-artwork": {
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
          },
        },
      }),
    },
  ],
  pokemon_v2_pokemontypes: [
    {
      pokemon_v2_type: {
        name: "grass",
      },
    },
  ],
  pokemon_v2_pokemonstats: [
    {
      base_stat: 45,
      pokemon_v2_stat: {
        name: "hp",
      },
    },
  ],
};

const mockSpeciesData: PokemonSpeciesResponse["pokemon_v2_pokemonspecies"][0] =
  {
    pokemon_v2_pokemonspeciesflavortexts: [
      {
        flavor_text: "Test description",
      },
    ],
    evolution_chain_id: 1,
    pokemon_v2_pokemoncolor: {
      name: "green",
    },
  };

const mockEvolutionData: EvolutionChainResponse["pokemon_v2_evolutionchain"][0] =
  {
    pokemon_v2_pokemonspecies: [
      {
        id: 1,
        name: "bulbasaur",
        evolves_from_species_id: null,
      },
      {
        id: 2,
        name: "ivysaur",
        evolves_from_species_id: 1,
      },
    ],
  };

describe("PokemonDetail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("renders pokemon information correctly", async () => {
    render(
      <PokemonDetail
        idOrName="1"
        initialType={
          mockPokemonData.pokemon_v2_pokemontypes[0].pokemon_v2_type.name
        }
        initialData={mockPokemonData}
        initialSpecies={mockSpeciesData}
        initialEvolution={mockEvolutionData}
      />
    );

    await waitFor(() => {
      expect(
        screen.getByText(mockPokemonData.name, { exact: false })
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          mockPokemonData.pokemon_v2_pokemontypes[0].pokemon_v2_type.name,
          {
            exact: false,
            normalizer: (content) => content.toLowerCase(),
          }
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          mockSpeciesData.pokemon_v2_pokemonspeciesflavortexts[0].flavor_text
        )
      ).toBeInTheDocument();
    });
  });
  it("handles tab navigation correctly", async () => {
    render(
      <PokemonDetail
        idOrName="1"
        initialType={
          mockPokemonData.pokemon_v2_pokemontypes[0].pokemon_v2_type.name
        }
        initialData={mockPokemonData}
        initialSpecies={mockSpeciesData}
        initialEvolution={mockEvolutionData}
      />
    );

    await userEvent.click(screen.getByRole("tab", { name: /stats/i }));
    expect(screen.getByText("HP")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("tab", { name: /evolutions/i }));
    expect(screen.getByText("ivysaur", { exact: false })).toBeInTheDocument();
  });
  it("applies correct type color", () => {
    const { container } = render(
      <PokemonDetail
        idOrName="1"
        initialType={
          mockPokemonData.pokemon_v2_pokemontypes[0].pokemon_v2_type.name
        }
        initialData={mockPokemonData}
        initialSpecies={mockSpeciesData}
        initialEvolution={mockEvolutionData}
      />
    );

    const bgElement = container.querySelector(
      `.bg-pokemon-${mockPokemonData.pokemon_v2_pokemontypes[0].pokemon_v2_type.name}`
    );
    expect(bgElement).toBeInTheDocument();
  });

  it("handles missing data gracefully", () => {
    const partialData = {
      ...mockPokemonData,
      pokemon_v2_pokemonsprites: [],
    };

    render(
      <PokemonDetail
        idOrName="1"
        initialType={
          mockPokemonData.pokemon_v2_pokemontypes[0].pokemon_v2_type.name
        }
        initialData={partialData}
        initialSpecies={null}
        initialEvolution={null}
      />
    );

    // Should still render without crashing
    expect(
      screen.getByText(mockPokemonData.name, { exact: false })
    ).toBeInTheDocument();
  });
});
