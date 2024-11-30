import { Metadata } from "next";
import { getPokemonTypeColor } from "@/lib/utils/color-utils";
import { getPokemonData } from "@/lib/utils/pokemon-utils";
import PokemonDetail from "@/components/pokemon/pokemonDetail";

export const metadata: Metadata = {
  title: 'Pokemon Details | Pokedex',
  description: 'View detailed information about Pokemon including stats, evolutions, and moves.',
};

interface Props {
  params: { idOrName: string }
}

export default async function PokemonPage({ params }: Props) {
  const [initialType, initialData] = await Promise.all([
    getPokemonTypeColor(params.idOrName),
    getPokemonData(params.idOrName)
  ]);
  
  return( 
    <PokemonDetail 
      idOrName={params.idOrName} 
      initialType={initialType} 
      initialData={initialData}
    />
  );
}