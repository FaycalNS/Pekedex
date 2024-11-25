/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from "vitest";
import client from "@/lib/api/graphql/client";
import {
  GetPokemons,
  GetPokemonByIdOrName,
  GetPokemonTypes,
  GetPokemonStats,
  GetPokemonSpecies,
  GetEvolutionChain,
} from "@/lib/api/graphql/queries/";
import {
  PokemonListResponse,
  PokemonDetailResponse,
  PokemonType,
  PokemonStat,
  PokemonSpeciesResponse,
  EvolutionChainResponse,
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
        variables: { name: "bulbasaur" }  // id will use default -1
      });

      expect(data.pokemon_v2_pokemon[0]).toMatchObject({
        id: 1,
        name: "bulbasaur",
      });
    });

    it("should fetch pokemon by id successfully", async () => {
      const { data } = await client.query<PokemonDetailResponse>({
        query: GetPokemonByIdOrName,
        variables: { id: 1 }  // name will use default ""
      });

      expect(data.pokemon_v2_pokemon[0]).toMatchObject({
        id: 1,
        name: "bulbasaur",
      });
    });

    it("should handle non-existent pokemon", async () => {
      const { data } = await client.query({
        query: GetPokemonByIdOrName,
        variables: { name: "nonexistent" }
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

  // GetPokemonSpecies Tests
  describe("GetPokemonSpecies", () => {
    it("should fetch pokemon species successfully", async () => {
      const { data } = await client.query<PokemonSpeciesResponse>({
        query: GetPokemonSpecies,
        variables: { pokemonId: 1 },
      });

      expect(data.pokemon_v2_pokemonspecies[0]).toMatchObject({
        pokemon_v2_pokemonspeciesflavortexts: [
          {
            flavor_text: expect.any(String),
          },
        ],
        evolution_chain_id: expect.any(Number),
        pokemon_v2_pokemoncolor: {
          name: expect.any(String),
        },
      });
    });
  });

  // GetEvolutionChain Tests
  describe("GetEvolutionChain", () => {
    it("should fetch evolution chain successfully", async () => {
      const { data } = await client.query<EvolutionChainResponse>({
        query: GetEvolutionChain,
        variables: { evolutionChainId: 1 },
      });

      expect(data.pokemon_v2_evolutionchain[0]).toBeDefined();
      expect(
        data.pokemon_v2_evolutionchain[0].pokemon_v2_pokemonspecies
      ).toHaveLength(3);
      expect(
        data.pokemon_v2_evolutionchain[0].pokemon_v2_pokemonspecies
      ).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: expect.any(String),
            id: expect.any(Number),
            evolves_from_species_id: expect.any(Number) || null,
          }),
        ])
      );
    });
  });
});
