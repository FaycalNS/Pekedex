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

export async function getPokemonData(idOrName: string) {
  const isId = /^\d+$/.test(idOrName);

  try {
    const { data } = await client.query<PokemonDetailResponse>({
      query: GetPokemonByIdOrName,
      variables: isId
        ? { id: parseInt(idOrName) }
        : { name: idOrName.toLowerCase() },
    });

    return data?.pokemon_v2_pokemon[0] ?? null;
  } catch {
    return null;
  }
}

export async function getPokemonSpecies(pokemonId: number) {
  try {
    const { data } = await client.query<PokemonSpeciesResponse>({
      query: GetPokemonSpecies,
      variables: { pokemonId },
    });

    return data?.pokemon_v2_pokemonspecies[0] ?? null;
  } catch {
    return null;
  }
}

export async function getEvolutionChain(evolutionChainId: number) {
  try {
    const { data } = await client.query<EvolutionChainResponse>({
      query: GetEvolutionChain,
      variables: { evolutionChainId },
    });

    return data?.pokemon_v2_evolutionchain[0] ?? null;
  } catch {
    return null;
  }
}

export async function searchPokemon(query: string) {
  const isId = /^\d+$/.test(query);

  try {
    const { data } = await client.query<PokemonDetailResponse>({
      query: GetPokemonByIdOrName,
      variables: isId ? { id: parseInt(query) } : { name: query.toLowerCase() },
    });

    return data?.pokemon_v2_pokemon[0] ?? null;
  } catch {
    return null;
  }
}

export async function getRandomPokemon() {
  const randomId = Math.floor(Math.random() * 1008) + 1;
  return searchPokemon(randomId.toString());
}