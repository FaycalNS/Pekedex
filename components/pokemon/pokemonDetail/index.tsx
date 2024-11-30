"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "./header";
import TabsSection from "./tabsSection";
import { motion } from "framer-motion";
import { Abel } from "next/font/google";
import { useQuery } from "@apollo/client";
import { GetPokemonByIdOrName } from "@/lib/api/graphql/queries";
import { PokemonDetailResponse } from "@/types/pokemon";
import { LoadingSpinner } from "@/components/loading-spinner";

const abel = Abel({
  weight: ["400"],
  subsets: ["latin"],
});

interface PokemonDetailProps {
  idOrName: string;
  initialType: string;
  initialData: PokemonDetailResponse['pokemon_v2_pokemon'][0] | null;
}

export default function PokemonDetail({
  idOrName,
  initialType,
  initialData,
}: PokemonDetailProps) {
  const isId = /^\d+$/.test(idOrName);

  const { data, loading } = useQuery<PokemonDetailResponse>(
    GetPokemonByIdOrName,
    {
      variables: isId
        ? { id: parseInt(idOrName) }
        : { name: idOrName.toLowerCase() },
      skip: !!(initialData && initialType), // Skip if we have both initial values
    }
  );

  const pokemon = initialData || data?.pokemon_v2_pokemon[0];
  const typeColor = initialType || pokemon?.pokemon_v2_pokemontypes[0]?.pokemon_v2_type.name || "normal";

  console.log("MainType :", initialType);
  console.log("Pokemon :", pokemon);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen transition-colors duration-100 bg-pokemon-${typeColor} px-5`}
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
          {loading ? (
            <div className="min-h-screen flex items-center justify-center">
              <LoadingSpinner color={`pokemon-${typeColor}`} size={8} />
            </div>
          ) : (
            <>
              <Header />
              <TabsSection />
            </>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
