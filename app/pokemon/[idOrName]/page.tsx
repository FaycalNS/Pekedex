import { Metadata } from "next";
//import { getPokemonTypeColor } from "@/lib/utils/color-utils";
import {
  getPokemonData,
  getPokemonSpecies,
  getEvolutionChain,
} from "@/lib/utils/pokemon-utils";
import PokemonDetail from "@/components/pokemon/pokemonDetail";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Pokemon Details | Pokedex",
  description:
    "View detailed information about Pokemon including stats, evolutions, and moves.",
};

interface Props {
  params: { idOrName: string };
}

export default async function PokemonPage({ params }: Props) {
  try {
    // Get initial Pokemon data
    const initialData = await getPokemonData(params.idOrName);

    if (!initialData) {
      notFound();
    }

    // Get Pokemon type color
    //const initialType = await getPokemonTypeColor(params.idOrName);

    // Get species data
    const speciesData = await getPokemonSpecies(initialData.id);

    // Get evolution chain if species data exists
    const evolutionData = speciesData?.evolution_chain_id
      ? await getEvolutionChain(speciesData.evolution_chain_id)
      : null;

    return (
      <PokemonDetail
        idOrName={params.idOrName}
        initialType={
          initialData.pokemon_v2_pokemontypes[0].pokemon_v2_type.name
        }
        initialData={initialData}
        initialSpecies={speciesData}
        initialEvolution={evolutionData}
      />
    );
  } catch (error) {
    // This will trigger the error.tsx boundary
    throw error;
  }
}
