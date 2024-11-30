import  client  from "@/lib/api/graphql/client";
import { GetPokemonByIdOrName } from "@/lib/api/graphql/queries";

export async function getPokemonTypeColor(idOrName: string): Promise<string> {
  const isId = /^\d+$/.test(idOrName);
  
  try {
    const { data } = await client.query({
      query: GetPokemonByIdOrName,
      variables: isId 
        ? { id: parseInt(idOrName) }
        : { name: idOrName.toLowerCase() },
    });

    return data?.pokemon_v2_pokemon[0]?.pokemon_v2_pokemontypes[0]?.pokemon_v2_type.name ?? "normal";
  } catch {
    return "normal";
  }
}

