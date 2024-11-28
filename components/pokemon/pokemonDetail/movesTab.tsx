import { motion } from "framer-motion";

const moves = [
  { name: "Razor Wind", level: 1 },
  { name: "Swords Dance", level: 7 },
  { name: "Tackle", level: 1 },
  // Add more moves
];

export default function MovesTab() {
  return (
    <div className="w-full max-w-[375px]">
      {moves.map((move, index) => (
        <motion.div
          key={move.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="py-3 border-b border-[#E3E3E3]"
        >
          <h3 className="text-lg text-themeeTitleColor ">{move.name}</h3>
          <span className="text-sm text-[#A4A4A4]">Level {move.level}</span>
        </motion.div>
      ))}
    </div>
  );
}
