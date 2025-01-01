"use client";
import { LoadingSpinner } from "@/components/loading-spinner";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen transition-colors duration-100 bg-gray-100 px-5"
      role="status"
    >
      <div className="w-full min-h-svh max-w-[1196px] mx-auto flex items-center justify-center">
        <LoadingSpinner color="themeMainColor" size={8} />
      </div>
    </motion.div>
  );
}