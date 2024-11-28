import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

export default function StatsTab() {
  return (
    <div className="w-full max-w-[310px] flex flex-col gap-2">
      {["HP", "ATK", "DEF", "SATK", "SDEF", "SPD"].map((stat, index) => (
        <motion.div
          key={stat}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex flex-row gap-2 justify-between items-center"
        >
          <div className=" flex justify-between items-center gap-1 sm:gap-0 text-xs">
            <span className="text-pokemon-grass min-w-[30px] text-left">
              {stat}
            </span>
            <span className="w-fit sm:min-w-[30px] text-right text-[#666666] text-sm">
              45
            </span>
          </div>
          <Progress
            value={45}
            className=" bg-[#F0F0F0] transition-all duration-1000 w-full "
            indicatorColor="bg-pokemon-grass"
          />
        </motion.div>
      ))}
    </div>
  );
}
