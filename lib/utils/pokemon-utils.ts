import client from "@/lib/api/graphql/client";
import { GetPokemonByIdOrName } from "@/lib/api/graphql/queries";
import { PokemonDetailResponse } from "@/types/pokemon";

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
