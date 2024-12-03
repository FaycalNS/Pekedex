import Image from "next/image";
import { motion } from "framer-motion";
import { PokemonDetailResponse } from "@/types/pokemon";

interface HeaderProps {
  name: string;
  types: PokemonDetailResponse['pokemon_v2_pokemon'][0]['pokemon_v2_pokemontypes'];
  description: string;
  spriteUrl: string;
}

export default function Header({ name, types, description, spriteUrl }: HeaderProps) {
  return (
    <div className="w-full flex flex-col items-center gap-3 relative">
      <motion.div
        initial={{ scale: 0.8, opacity: 0, marginTop: 0 }}
        animate={{ scale: 1, opacity: 1, marginTop: -90 }}
        transition={{ delay: 0.4 }}
        className="relative w-[170px] h-[170px]"
      >
        {spriteUrl && (
          <Image
            src={spriteUrl}
            alt={name}
            fill
            className="object-contain"
            priority
          />
        )}
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center w-full flex flex-col items-center justify-start gap-3"
      >
        <h1 className="text-[40px] font-normal justify-center items-start leading-[50px] text-themeeTitleColor capitalize">
          {name}
        </h1>
        <div className="flex flex-row gap-4 sm:gap-[54px] flex-wrap justify-center">
          {types.map((type, index) => (
            <span
              key={`${type.pokemon_v2_type.name}-${index}`}
              className={`px-4 py-2 min-w-[100px] sm:min-w-[164px] rounded-full bg-pokemon-${type.pokemon_v2_type.name} text-white text-sm sm:text-lg font-extralight uppercase`}
            >
              {type.pokemon_v2_type.name}
            </span>
          ))}
        </div>
        {description && (
          <p className="text-center text-themeeTitleColor mt-[28px] sm:mt-[48px] text-lg leading-[22px] font-extralight max-w-[90%]">
            {description}
          </p>
        )}
      </motion.div>
    </div>
  );
}