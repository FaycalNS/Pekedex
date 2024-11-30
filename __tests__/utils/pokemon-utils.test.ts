/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  searchPokemon,
  getRandomPokemon,
  getPokemonData,
} from "@/lib/utils/pokemon-utils";
import { GetPokemonByIdOrName } from "@/lib/api/graphql/queries";
import type { PokemonDetailResponse } from "@/types/pokemon";

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
  pokemon_v2_pokemonsprites: [{ sprites: '{"front_default": "sprite-url"}' }],
  pokemon_v2_pokemontypes: [{ pokemon_v2_type: { name: "grass" } }],
  pokemon_v2_pokemonstats: [{ base_stat: 45, pokemon_v2_stat: { name: "hp" } }],
};

describe("Pokemon Utilities", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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

    it("should handle errors gracefully", async () => {
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

    it("should handle errors gracefully", async () => {
      (client.query as any).mockRejectedValueOnce(new Error("API Error"));

      const result = await searchPokemon("error-case");
      expect(result).toBeNull();
    });
  });

  describe("getRandomPokemon", () => {
    it("should fetch random pokemon successfully", async () => {
      (client.query as any).mockResolvedValueOnce({
        data: {
          pokemon_v2_pokemon: [mockPokemonData],
        },
      });

      vi.spyOn(Math, "random").mockReturnValue(0);

      const result = await getRandomPokemon();

      expect(client.query).toHaveBeenCalledWith({
        query: GetPokemonByIdOrName,
        variables: { id: 1 },
      });
      expect(result).toEqual(mockPokemonData);

      vi.restoreAllMocks();
    });

    it("should handle maximum pokemon ID range", async () => {
      (client.query as any).mockResolvedValueOnce({
        data: {
          pokemon_v2_pokemon: [{ ...mockPokemonData, id: 1008 }],
        },
      });

      vi.spyOn(Math, "random").mockReturnValue(0.999999);

      await getRandomPokemon();

      expect(client.query).toHaveBeenCalledWith({
        query: GetPokemonByIdOrName,
        variables: { id: 1008 },
      });

      vi.restoreAllMocks();
    });

    it("should handle errors gracefully", async () => {
      (client.query as any).mockRejectedValueOnce(new Error("API Error"));

      const result = await getRandomPokemon();
      expect(result).toBeNull();
    });
  });
});
