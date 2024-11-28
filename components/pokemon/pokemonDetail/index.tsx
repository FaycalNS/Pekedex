"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "./header";
import TabsSection from "./tabsSection";
import { motion } from "framer-motion";
import { Abel } from "next/font/google";

const abel = Abel({
  weight: ["400"],
  subsets: ["latin"],
});

export default function PokemonDetail() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-pokemon-grass px-5"
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
            className=" w-[19px] sm:w-[29px] md:w-[39px] h-[37px] sm:h-[47px] md:h-[67px] relative flex items-center justify-center"
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
            <Header />
            <TabsSection />
        </motion.div>

  
      </div>
    </motion.div>
  );
}
