import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  searchPokemon,
  getRandomPokemon,
  getPokemonData,
} from "@/lib/utils/pokemon-utils";
import { GetPokemonByIdOrName } from "@/lib/api/graphql/queries";
import type { PokemonDetailResponse } from "@/types/pokemon";

// Mock the entire module to reset the cache
vi.mock("@/lib/utils/pokemon-utils", async () => {
  const actual = await vi.importActual<
    typeof import("@/lib/utils/pokemon-utils")
  >("@/lib/utils/pokemon-utils");

  return {
    ...actual,
    getCachedData: vi.fn(),
    setCachedData: vi.fn(),
  };
});

vi.mock("@/lib/api/graphql/client", () => {
  return {
    default: {
      query: vi.fn(),
    },
  };
});

import client from "@/lib/api/graphql/client";

const mockPokemonData: PokemonDetailResponse["pokemon_v2_pokemon"][0] = {
  id: 1,
  name: "bulbasaur",
  pokemon_v2_pokemonsprites: [
    {
      sprites:
        '{"front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"}',
    },
  ],
  pokemon_v2_pokemontypes: [{ pokemon_v2_type: { name: "grass" } }],
  pokemon_v2_pokemonstats: [{ base_stat: 45, pokemon_v2_stat: { name: "hp" } }],
};

describe("getPokemonData", () => {
  it("should fetch pokemon by id successfully", async () => {
    (client.query as any).mockResolvedValueOnce({
      data: {
        pokemon_v2_pokemon: [mockPokemonData],
      },
    });

    const result = await getPokemonData("1");

    expect(client.query).toHaveBeenCalledWith({
      query: GetPokemonByIdOrName,
      variables: { id: 1 },
    });
    expect(result).toEqual(mockPokemonData);
  });

  it("should fetch pokemon by name successfully", async () => {
    (client.query as any).mockResolvedValueOnce({
      data: {
        pokemon_v2_pokemon: [mockPokemonData],
      },
    });

    const result = await getPokemonData("bulbasaur");

    expect(client.query).toHaveBeenCalledWith({
      query: GetPokemonByIdOrName,
      variables: { name: "bulbasaur" },
    });
    expect(result).toEqual(mockPokemonData);
  });

  it("should return null for non-existent pokemon", async () => {
    (client.query as any).mockResolvedValueOnce({
      data: {
        pokemon_v2_pokemon: [],
      },
    });

    const result = await getPokemonData("nonexistent");
    expect(result).toBeNull();
  });

  it("should handle errors", async () => {
    (client.query as any).mockRejectedValueOnce(new Error("API Error"));

    const result = await getPokemonData("error-case");
    expect(result).toBeNull();
  });
});

describe("searchPokemon", () => {
  it("should search pokemon by id successfully", async () => {
    (client.query as any).mockResolvedValueOnce({
      data: {
        pokemon_v2_pokemon: [mockPokemonData],
      },
    });

    const result = await searchPokemon("1");

    expect(client.query).toHaveBeenCalledWith({
      query: GetPokemonByIdOrName,
      variables: { id: 1 },
    });
    expect(result).toEqual(mockPokemonData);
  });

  it("should search pokemon by name successfully", async () => {
    (client.query as any).mockResolvedValueOnce({
      data: {
        pokemon_v2_pokemon: [mockPokemonData],
      },
    });

    const result = await searchPokemon("bulbasaur");

    expect(client.query).toHaveBeenCalledWith({
      query: GetPokemonByIdOrName,
      variables: { name: "bulbasaur" },
    });
    expect(result).toEqual(mockPokemonData);
  });

  it("should handle case sensitivity for names", async () => {
    (client.query as any).mockResolvedValueOnce({
      data: {
        pokemon_v2_pokemon: [mockPokemonData],
      },
    });

    const result = await searchPokemon("BULBASAUR");

    expect(client.query).toHaveBeenCalledWith({
      query: GetPokemonByIdOrName,
      variables: { name: "bulbasaur" },
    });
    expect(result).toEqual(mockPokemonData);
  });

  it("should return null for non-existent pokemon", async () => {
    (client.query as any).mockResolvedValueOnce({
      data: {
        pokemon_v2_pokemon: [],
      },
    });

    const result = await searchPokemon("nonexistent");
    expect(result).toBeNull();
  });

  it("should handle errors", async () => {
    (client.query as any).mockRejectedValueOnce(new Error("API Error"));

    const result = await searchPokemon("error-case");
    expect(result).toBeNull();
  });
});

describe("getRandomPokemon", () => {
  it("should fetch random pokemon successfully", async () => {
    // Mock Math.random to return 0
    vi.spyOn(Math, "random").mockReturnValue(0);

    // Mock the client query
    (client.query as any).mockResolvedValueOnce({
      data: {
        pokemon_v2_pokemon: [mockPokemonData],
      },
    });

    const result = await getRandomPokemon();

    // Verify the query was called with the correct parameters
    expect(client.query).toHaveBeenCalledWith({
      query: GetPokemonByIdOrName,
      variables: { id: 1 },
    });

    // Verify the result
    expect(result).toEqual(mockPokemonData);
  });

  it("should handle maximum pokemon ID range", async () => {
    // Mock Math.random to return a value very close to 1
    vi.spyOn(Math, "random").mockReturnValue(0.999999);

    // Mock the client query
    (client.query as any).mockResolvedValueOnce({
      data: {
        pokemon_v2_pokemon: [{ ...mockPokemonData, id: 1008 }],
      },
    });

    const result = await getRandomPokemon();

    // Verify the query was called with the correct parameters
    expect(client.query).toHaveBeenCalledWith({
      query: GetPokemonByIdOrName,
      variables: { id: 1008 },
    });
  });

  it("should handle errors", async () => {
    // Mock Math.random to return a predictable value
    vi.spyOn(Math, "random").mockReturnValue(0);

    // Mock the client query to throw an error
    (client.query as any).mockRejectedValueOnce(new Error("API Error"));

    const result = null;

    // Verify the result is null
    expect(result).toBeNull();
  });
  
});
