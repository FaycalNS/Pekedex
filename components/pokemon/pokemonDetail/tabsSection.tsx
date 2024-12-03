import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatsTab from "./statsTab";
import EvolutionsTab from "./evolutionsTab";
import MovesTab from "./movesTab";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PokemonDetailResponse, EvolutionChainResponse } from "@/types/pokemon";
interface TabsSectionProps {
  stats: PokemonDetailResponse['pokemon_v2_pokemon'][0]['pokemon_v2_pokemonstats'];
  mainType: string;
  evolutionChain: EvolutionChainResponse['pokemon_v2_evolutionchain'][0]['pokemon_v2_pokemonspecies'];
}

export default function TabsSection({ stats, mainType, evolutionChain }: TabsSectionProps) {
  const [activeTab, setActiveTab] = useState("stats");

  return (
    <Tabs
      defaultValue="stats"
      className="w-full flex flex-col justify-start items-center  gap-[40px] sm:gap-[60px]"
      onValueChange={setActiveTab}
    >
      <TabsList className={`w-full max-w-[700px] flex flex-row justify-around items-center gap-2 sm:gap-6 md:gap-10 bg-transparent h-[40px] m-0 p-0 text-pokemon-${mainType} overflow-x-scroll`}>
        {["stats", "evolutions", "moves"].map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            style={{ '--pokemon-color': `var(--pokemon-${mainType})` } as React.CSSProperties}
            className="text-sm sm:text-base h-full min-w-[80px] sm:min-w-[160px] md:min-w-[206px] rounded-[20px] uppercase"
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-[647px] flec justify-center items-center pb-[40px] sm:pb-[60px] overflow-x-scroll"
        >
          <TabsContent value="stats" className="w-full flex items-center justify-center m-0">
            <StatsTab stats={stats} mainType={mainType} />
          </TabsContent>
          <TabsContent value="evolutions" className="w-full flex items-center justify-center m-0">
            <EvolutionsTab evolutionChain={evolutionChain} mainType={mainType} />
          </TabsContent>
          <TabsContent value="moves" className="w-full flex items-center justify-center m-0">
            <MovesTab />
          </TabsContent>
        </motion.div>
      </AnimatePresence>
    </Tabs>
  );
}
