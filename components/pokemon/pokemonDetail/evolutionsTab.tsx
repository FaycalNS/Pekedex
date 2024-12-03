import Image from "next/image";
import { motion } from "framer-motion";
import { EvolutionChainResponse } from "@/types/pokemon";

interface EvolutionsTabProps {
  evolutionChain: EvolutionChainResponse['pokemon_v2_evolutionchain'][0]['pokemon_v2_pokemonspecies'];
  mainType: string;
}

export default function EvolutionsTab({ evolutionChain, mainType }: EvolutionsTabProps) {
  const sortedEvolutions = [...evolutionChain].sort((a, b) => a.id - b.id);

  return (
    <motion.div
      className="w-full flex flex-col sm:flex-row justify-center items-center gap-12 sm:gap-[22px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {sortedEvolutions.map((pokemon, index) => (
        <div key={pokemon.id} className="flex items-center">
          {index > 0 && (
            <svg
              className={`stroke-pokemon-${mainType} sm:w-24 h-3 rotate-90 sm:rotate-0`}
              viewBox="0 0 98 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 6H95.0388" strokeWidth="4" strokeLinecap="round" />
              <path d="M91.5 2.28744L95.0388 6" strokeWidth="4" strokeLinecap="round" />
              <path d="M91.5 9.28744L95.0388 6" strokeWidth="4" strokeLinecap="round" />
            </svg>
          )}
          <motion.div
            className="flex flex-col justify-center items-center gap-3"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="relative w-[107px] h-[107px]">
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                alt={pokemon.name}
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-[36px] text-black capitalize">{pokemon.name}</span>
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
}