import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatsTab from "./statsTab";
import EvolutionsTab from "./evolutionsTab";
import MovesTab from "./movesTab";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TabsSection() {
  const [activeTab, setActiveTab] = useState("stats");

  return (
    <Tabs
      defaultValue="stats"
      className="w-full flex flex-col justify-start items-center  gap-[40px] sm:gap-[60px]"
      onValueChange={setActiveTab}
    >
      <TabsList className="w-full max-w-[700px] flex flex-row justify-around items-center gap-2 sm:gap-6 md:gap-10 bg-transparent h-[40px] m-0 p-0 text-pokemon-grass overflow-x-scroll ">
        <TabsTrigger
          value="stats"
          className="data-[state=active]:text-white data-[state=active]:bg-pokemon-grass text-sm sm:text-base h-full min-w-[80px] sm:min-w-[160px] md:min-w-[206px] rounded-[20px] uppercase"
        >
          Stats
        </TabsTrigger>
        <TabsTrigger
          value="evolutions"
          className="data-[state=active]:text-white data-[state=active]:bg-pokemon-grass text-sm sm:text-base h-full min-w-[80px] sm:min-w-[160px] md:min-w-[206px] rounded-[20px] uppercase"
        >
          Evolutions
        </TabsTrigger>
        <TabsTrigger
          value="moves"
          className="data-[state=active]:text-white data-[state=active]:bg-pokemon-grass text-sm sm:text-base h-full min-w-[80px] sm:min-w-[160px] md:min-w-[206px] rounded-[20px] uppercase"
        >
          Moves
        </TabsTrigger>
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
          <TabsContent
            value="stats"
            className="w-full flex items-center justify-center m-0"
          >
            <StatsTab />
          </TabsContent>
          <TabsContent
            value="evolutions"
            className="w-full flex items-center justify-center m-0"
          >
            <EvolutionsTab />
          </TabsContent>
          <TabsContent
            value="moves"
            className="w-full flex items-center justify-center m-0"
          >
            <MovesTab />
          </TabsContent>
        </motion.div>
      </AnimatePresence>
    </Tabs>
  );
}
