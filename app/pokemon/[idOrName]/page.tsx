import { Metadata } from "next";
import PokemonDetail from "@/components/pokemon/pokemonDetail";

export const metadata: Metadata = {
  title: 'Pokemon Details | Pokedex',
  description: 'View detailed information about Pokemon including stats, evolutions, and moves.',
};

export default function PokemonDetailPage() {
  return <PokemonDetail />;
}