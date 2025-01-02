'use client';
import { motion } from "framer-motion";
import SearchCard from "@/components/pokemon/search-card";

export default function AnimatedContent() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-white" 
      />
      <motion.div
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 bg-themeBgColor"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 10%)",
        }}
      />

      <motion.div
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7 }}
        className="absolute inset-0 bg-themeBorder"
        style={{
          clipPath: "polygon(0 12%, 100% 92%, 100% 88%, 0 8%)",
        }}
      />

      <div
        className="z-20 w-full mx-auto px-4 min-h-screen
          flex flex-col-reverse md:flex-row items-center justify-center
          max-w-[1440px] gap-8"
      >
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="w-full sm:w-[80%] lg:w-1/2 h-[90%] z-30 
            absolute right-0 bottom-0 
            transform translate-x-28 sm:translate-x-32 md:translate-x-36 
            bg-[url('/assets/images/pikachu.png')] 
            bg-contain bg-no-repeat bg-right-bottom"
        />

        <SearchCard />
      </div>
    </main>
  );
}