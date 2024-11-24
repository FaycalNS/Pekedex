/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from 'vitest';
import { 
  searchPokemons,
  getPokemonDetail,
  getRandomPokemon,
  getPokemonSpecies,
  getEvolutionChain
} from '@/lib/api/rest/endpoints/pokemon';
import type {
  Pokemon,
  PokemonListRESTResponse,
  PokemonSpecies,
  EvolutionChain
} from '@/types/pokemon';

describe('Pokemon REST Endpoints', () => {
  // searchPokemons Tests
  describe('searchPokemons', () => {
    it('should fetch pokemon list successfully', async () => {
      const data = await searchPokemons(20, 0) as PokemonListRESTResponse;

      expect(data).toMatchObject({
        count: expect.any(Number),
        next: expect.any(String),
        previous: null,
        results: expect.arrayContaining([
          expect.objectContaining({
            name: expect.any(String),
            url: expect.any(String)
          })
        ])
      });
    });

    it('should handle invalid pagination parameters', async () => {
      try {
        await searchPokemons(-1, -1);
      } catch (error: any) {
        expect(error.message).toContain('HTTP error');
      }
    });
  });

  // getPokemonDetail Tests
  describe('getPokemonDetail', () => {
    it('should fetch pokemon by name successfully', async () => {
      const data = await getPokemonDetail('bulbasaur') as Pokemon;

      expect(data).toMatchObject({
        id: 1,
        name: 'bulbasaur',
        sprites: {
          front_default: expect.any(String)
        },
        types: expect.arrayContaining([
          expect.objectContaining({
            type: { name: expect.any(String) }
          })
        ])
      });
    });

    it('should fetch pokemon by id successfully', async () => {
      const data = await getPokemonDetail('1') as Pokemon;

      expect(data).toMatchObject({
        id: 1,
        name: 'bulbasaur'
      });
    });

    it('should handle non-existent pokemon', async () => {
      await expect(getPokemonDetail('nonexistent')).rejects.toThrow('HTTP error');
    });
  });

  // getRandomPokemon Tests
  describe('getRandomPokemon', () => {
    it('should fetch a random pokemon successfully', async () => {
      const data = await getRandomPokemon() as Pokemon;

      expect(data).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        sprites: expect.any(Object),
        types: expect.any(Array)
      });
    });

    it('should handle API errors', async () => {
      // Mock a failed random number to trigger error
      vi.spyOn(Math, 'random').mockReturnValue(2);
      
      try {
        await getRandomPokemon();
      } catch (error: any) {
        expect(error.message).toContain('HTTP error');
      }
      
      vi.restoreAllMocks();
    });
  });

  // getPokemonSpecies Tests
  describe('getPokemonSpecies', () => {
    it('should fetch pokemon species successfully', async () => {
      const data = await getPokemonSpecies(1) as PokemonSpecies;

      expect(data).toMatchObject({
        flavor_text_entries: expect.arrayContaining([
          expect.objectContaining({
            flavor_text: expect.any(String),
            language: { name: expect.any(String) }
          })
        ]),
        evolution_chain: {
          url: expect.any(String)
        },
        color: {
          name: expect.any(String)
        }
      });
    });

    it('should handle invalid pokemon id', async () => {
      await expect(getPokemonSpecies(0)).rejects.toThrow('HTTP error');
    });
  });

  // getEvolutionChain Tests
  describe('getEvolutionChain', () => {
    it('should fetch evolution chain successfully', async () => {
      const url = 'https://pokeapi.co/api/v2/evolution-chain/1/';
      const data = await getEvolutionChain(url) as EvolutionChain;

      expect(data).toMatchObject({
        chain: {
          species: {
            name: expect.any(String),
            url: expect.any(String)
          },
          evolves_to: expect.any(Array)
        }
      });
    });

    it('should handle invalid evolution chain url', async () => {
      await expect(
        getEvolutionChain('invalid-url')
      ).rejects.toThrow('HTTP error');
    });

    it('should handle non-existent evolution chain', async () => {
      await expect(
        getEvolutionChain('https://pokeapi.co/api/v2/evolution-chain/9999999/')
      ).rejects.toThrow('HTTP error');
    });
  });
});