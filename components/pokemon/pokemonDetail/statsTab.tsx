import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { PokemonDetailResponse } from "@/types/pokemon";

interface StatsTabProps {
  stats: PokemonDetailResponse['pokemon_v2_pokemon'][0]['pokemon_v2_pokemonstats'];
  mainType: string;
}

export default function StatsTab({ stats, mainType }: StatsTabProps) {
  const STAT_NAMES = {
    hp: "HP",
    attack: "ATK",
    defense: "DEF",
    "special-attack": "SATK",
    "special-defense": "SDEF",
    speed: "SPD"
  };

  return (
    <div className="w-full max-w-[310px] flex flex-col gap-2">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.pokemon_v2_stat.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex flex-row gap-2 justify-between items-center"
        >
          <div className="flex justify-between items-center gap-1 sm:gap-0 text-xs">
            <span className={`text-pokemon-${mainType} min-w-[30px] text-left`}>
              {STAT_NAMES[stat.pokemon_v2_stat.name as keyof typeof STAT_NAMES]}
            </span>
            <span className="w-fit sm:min-w-[30px] text-right text-[#666666] text-sm">
              {stat.base_stat}
            </span>
          </div>
          <Progress
            value={stat.base_stat}
            className="bg-[#F0F0F0] transition-all duration-1000 w-full"
            indicatorColor={`bg-pokemon-${mainType}`}
          />
        </motion.div>
      ))}
    </div>
  );
}