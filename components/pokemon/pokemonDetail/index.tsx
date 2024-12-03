/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "./header";
import TabsSection from "./tabsSection";
import { motion } from "framer-motion";
import { Abel } from "next/font/google";
import type { 
  PokemonDetailResponse, 
  PokemonSpeciesResponse, 
  EvolutionChainResponse 
} from "@/types/pokemon";
import { useMemo } from "react";

const abel = Abel({
  weight: ["400"],
  subsets: ["latin"],
});

interface PokemonDetailProps {
  idOrName: string;
  initialType: string;
  initialData: PokemonDetailResponse['pokemon_v2_pokemon'][0];
  initialSpecies: PokemonSpeciesResponse['pokemon_v2_pokemonspecies'][0] | null;
  initialEvolution: EvolutionChainResponse['pokemon_v2_evolutionchain'][0] | null;
}

export default function PokemonDetail({
  idOrName,
  initialType,
  initialData,
  initialSpecies,
  initialEvolution,
}: PokemonDetailProps) {
  const {
    spriteUrl,
    description
  } = useMemo(() => {
    // Get sprite URL
    let derivedSpriteUrl = '';
    if (initialData?.pokemon_v2_pokemonsprites?.[0]?.sprites) {
      try {
        const spritesData = typeof initialData.pokemon_v2_pokemonsprites[0].sprites === 'string'
          ? JSON.parse(initialData.pokemon_v2_pokemonsprites[0].sprites)
          : initialData.pokemon_v2_pokemonsprites[0].sprites;
        
        derivedSpriteUrl = spritesData?.other?.['official-artwork']?.front_default ||
                          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${initialData.id}.png`;
      } catch (error) {
        derivedSpriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${initialData.id}.png`;
      }
    }

    // Get description
    const englishDescription = initialSpecies?.pokemon_v2_pokemonspeciesflavortexts[0].flavor_text as string;

    return {
      spriteUrl: derivedSpriteUrl,
      description: englishDescription
    };
  }, [initialData, initialSpecies]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen transition-colors duration-100 bg-pokemon-${initialType} px-5`}
    >
      <div className="w-full min-h-svh max-w-[1196px] mx-auto flex flex-col justify-start items-center gap-[30px] sm:gap-[47px] md:gap-[77px]">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full pt-[30px] sm:pt-[47px] md:pt-[77px]"
        >
          <Link
            href="/"
            className="w-[19px] sm:w-[29px] md:w-[39px] h-[37px] sm:h-[47px] md:h-[67px] relative flex items-center justify-center"
          >
            <Image
              src="/assets/images/ChevronLeft.svg"
              alt="ChevronLeft"
              fill
              className="object-contain"
              priority
            />
          </Link>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`${abel.className} w-full flex-1 rounded-t-[48px] bg-white flex flex-col justify-start items-center gap-[40px] sm:gap-[60px] rounded-b-none px-5 shadow-none border-b-0`}
        >
          <Header 
            name={initialData.name}
            types={initialData.pokemon_v2_pokemontypes}
            description={description}
            spriteUrl={spriteUrl}
          />
          <TabsSection 
            stats={initialData.pokemon_v2_pokemonstats}
            mainType={initialType}
            evolutionChain={initialEvolution?.pokemon_v2_pokemonspecies ?? []}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}