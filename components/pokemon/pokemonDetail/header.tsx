import Image from "next/image";
import { motion } from "framer-motion";
export default function Header() {
  return (
    <div className="w-full flex flex-col items-center gap-3 relative">
      <motion.div
        initial={{ scale: 0.8, opacity: 0, marginTop: 0 }}
        animate={{ scale: 1, opacity: 1, marginTop: -90 }}
        transition={{ delay: 0.4 }}
        className="relative w-[170px] h-[170px]"
      >
        <Image
          src="/assets/images/bulbasaur.png"
          alt="Bulbasaur"
          fill
          className="object-contain"
          priority
        />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center flex flex-col items-center justify-start gap-3"
      >
        <h1
          className={`text-[40px] font-normal justify-center items-start leading-[50px] text-themeeTitleColor`}
        >
          Bulbasaur
        </h1>
        <div className="flex flex-row gap-4 sm:gap-[54px]">
          <span
            className={`px-4 py-2 min-w-[100px] sm:min-w-[164px] rounded-full bg-pokemon-grass text-white text-sm sm:text-lg font-extralight`}
          >
            GRASS
          </span>
          <span
            className={`px-4 py-2 min-w-[100px] sm:min-w-[164px] rounded-full bg-pokemon-poison text-white text-sm sm:text-lg font-thin`}
          >
            POISON
          </span>
        </div>
        <p
          className={`text-center text-themeeTitleColor mt-[28px] sm:mt-[48px] text-lg leading-[22px] font-extralight`}
        >
          Bulbasaur can be seen napping in bright sunlight...
        </p>
      </motion.div>
    </div>
  );
}
