import { restClient } from '@/lib/api/rest/client';
import type { Pokemon, PokemonListRESTResponse, PokemonSpecies, EvolutionChain } from '@/types/pokemon';

// For search page
export const searchPokemons = (limit: number = 20, offset: number = 0) => {
  return restClient.get<PokemonListRESTResponse>(`/pokemon?limit=${limit}&offset=${offset}`);
};

// For pokemon detail page - handles both ID and name
export const getPokemonDetail = (idOrName: string) => {
  return restClient.get<Pokemon>(`/pokemon/${idOrName.toLowerCase()}`);
};

// For random pokemon feature
export const getRandomPokemon = async () => {
  const totalPokemons = 1008; // Total available in API
  const randomId = Math.floor(Math.random() * totalPokemons) + 1;
  return restClient.get<Pokemon>(`/pokemon/${randomId}`);
};

// For getting pokemon species description and evolution chain URL
export const getPokemonSpecies = (id: number) => {
  return restClient.get<PokemonSpecies>(`/pokemon-species/${id}`);
};

// For evolution chain data
export const getEvolutionChain = (url: string) => {
  // Extract the ID from the URL since we need just that
  const id = url.split('/').filter(Boolean).pop();
  return restClient.get<EvolutionChain>(`/evolution-chain/${id}`);
};