/* eslint-disable @typescript-eslint/no-explicit-any */
import client from "@/lib/api/graphql/client";
import { 
  GetPokemonByIdOrName, 
  GetPokemonSpecies, 
  GetEvolutionChain 
} from "@/lib/api/graphql/queries";
import type { 
  PokemonDetailResponse, 
  PokemonSpeciesResponse, 
  EvolutionChainResponse 
} from "@/types/pokemon";

// Cache duration set to 24 hours for better performance
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const pokemonCache = new Map<string, { data: any; timestamp: number }>();

function getCachedData<T>(key: string): T | null {
  const cached = pokemonCache.get(key);
  if (!cached) return null;

  const isExpired = Date.now() - cached.timestamp > CACHE_DURATION;
  if (isExpired) {
    pokemonCache.delete(key);
    return null;
  }

  return cached.data as T;
}

function setCachedData(key: string, data: any) {
  pokemonCache.set(key, {
    data,
    timestamp: Date.now()
  });
}

export async function getPokemonData(idOrName: string) {
  const cacheKey = `pokemon-${idOrName}`;
  const cached = getCachedData<PokemonDetailResponse['pokemon_v2_pokemon'][0]>(cacheKey);
  if (cached) return cached;

  const isId = /^\d+$/.test(idOrName);

  try {
    const { data } = await client.query<PokemonDetailResponse>({
      query: GetPokemonByIdOrName,
      variables: isId
        ? { id: parseInt(idOrName) }
        : { name: idOrName.toLowerCase() },
    });

    const result = data?.pokemon_v2_pokemon[0] ?? null;
    if (result) setCachedData(cacheKey, result);
    return result;
  } catch {
    return null;
  }
}

export async function getPokemonSpecies(pokemonId: number) {
  const cacheKey = `species-${pokemonId}`;
  const cached = getCachedData<PokemonSpeciesResponse['pokemon_v2_pokemonspecies'][0]>(cacheKey);
  if (cached) return cached;

  try {
    const { data } = await client.query<PokemonSpeciesResponse>({
      query: GetPokemonSpecies,
      variables: { pokemonId },
    });

    const result = data?.pokemon_v2_pokemonspecies[0] ?? null;
    if (result) setCachedData(cacheKey, result);
    return result;
  } catch {
    return null;
  }
}

export async function getEvolutionChain(evolutionChainId: number) {
  const cacheKey = `evolution-${evolutionChainId}`;
  const cached = getCachedData<EvolutionChainResponse['pokemon_v2_evolutionchain'][0]>(cacheKey);
  if (cached) return cached;

  try {
    const { data } = await client.query<EvolutionChainResponse>({
      query: GetEvolutionChain,
      variables: { evolutionChainId },
    });

    const result = data?.pokemon_v2_evolutionchain[0] ?? null;
    if (result) setCachedData(cacheKey, result);
    return result;
  } catch {
    return null;
  }
}

export async function searchPokemon(query: string) {
  const cacheKey = `search-${query}`;
  const cached = getCachedData<PokemonDetailResponse['pokemon_v2_pokemon'][0]>(cacheKey);
  if (cached) return cached;

  const isId = /^\d+$/.test(query);

  try {
    const { data } = await client.query<PokemonDetailResponse>({
      query: GetPokemonByIdOrName,
      variables: isId ? { id: parseInt(query) } : { name: query.toLowerCase() },
    });

    const result = data?.pokemon_v2_pokemon[0] ?? null;
    if (result) setCachedData(cacheKey, result);
    return result;
  } catch {
    return null;
  }
}

export async function getRandomPokemon() {
  const randomId = Math.floor(Math.random() * 1008) + 1;
  return searchPokemon(randomId.toString());
}