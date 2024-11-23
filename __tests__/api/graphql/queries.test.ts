/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from "vitest";
import client from "@/lib/api/graphql/client";
import {
    GetPokemons,
    GetPokemonByIdOrName,
    GetPokemonTypes,
    GetPokemonStats,
} from "@/lib/api/graphql/queries/";
import { 
    PokemonListResponse, 
    PokemonDetailResponse, 
    PokemonType,
    PokemonStat 
} from "@/types/pokemon";

describe("Pokemon Queries", () => {
  // GetPokemons Tests
  describe("GetPokemons", () => {
    it("should fetch pokemon list successfully", async () => {
        const { data } = await client.query<PokemonListResponse>({
        query: GetPokemons,
        variables: { limit: 1, offset: 0 },
      });

      expect(data.pokemon_v2_pokemon).toBeDefined();
      expect(Array.isArray(data.pokemon_v2_pokemon)).toBe(true);
      expect(data.pokemon_v2_pokemon[0]).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        pokemon_v2_pokemonsprites: expect.any(Array),
        pokemon_v2_pokemontypes: expect.any(Array),
      });
    });
  });

  // GetPokemonByIdOrName Tests
  describe("GetPokemonByIdOrName", () => {
    it("should fetch pokemon by name successfully", async () => {
      const { data } = await client.query<PokemonDetailResponse>({
        query: GetPokemonByIdOrName,
        variables: { name: "bulbasaur" },
      });

      expect(data.pokemon_v2_pokemon[0]).toMatchObject({
        id: 1,
        name: "bulbasaur",
      });
    });

    it("should return empty array for nonexistent pokemon", async () => {
      const { data } = await client.query<PokemonDetailResponse>({
        query: GetPokemonByIdOrName,
        variables: { name: "nonexistent" },
      });

      expect(data.pokemon_v2_pokemon).toHaveLength(0);
    });
  });

  // GetPokemonTypes Tests
  describe("GetPokemonTypes", () => {
    it("should fetch pokemon types successfully", async () => {
      const { data } = await client.query<PokemonType>({
        query: GetPokemonTypes,
      });

      expect(data.pokemon_v2_type).toBeDefined();
      expect(data.pokemon_v2_type).toHaveLength(2);
      expect(data.pokemon_v2_type[0]).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
      });
    });
  });

  // GetPokemonStats Tests
  describe("GetPokemonStats", () => {
    it("should fetch pokemon stats successfully", async () => {
      const { data } = await client.query<PokemonStat>({
        query: GetPokemonStats,
        variables: { pokemonId: 1 },
      });

      expect(data.pokemon_v2_pokemonstat).toBeDefined();
      expect(data.pokemon_v2_pokemonstat).toHaveLength(2);
      expect(data.pokemon_v2_pokemonstat[0]).toMatchObject({
        base_stat: expect.any(Number),
        pokemon_v2_stat: {
          name: expect.any(String),
        },
      });
    });

    it("should handle invalid pokemon id", async () => {
      try {
        await client.query<PokemonStat>({
          query: GetPokemonStats,
          variables: { pokemonId: 0 },
        });
      } catch (error: any) {
        expect(error.message).toBe("Invalid Pokemon ID");
      }
    });
  });
});
