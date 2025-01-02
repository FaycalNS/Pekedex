/* eslint-disable react/no-unescaped-entities */
'use client';
import Link from "next/link";
import Image from "next/image";
import { Single_Day } from 'next/font/google';
import { motion } from "framer-motion";

const SingleDay = Single_Day({
  weight: '400',
  style: 'normal'
});

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-themeMainColor text-white flex flex-col items-center justify-center p-4"
    >
      <div className="w-full min-h-screen max-w-[1196px] mx-auto flex flex-col justify-start items-center gap-[30px] sm:gap-[47px] md:gap-[77px]">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full flex items-center pt-[30px] sm:pt-[47px] md:pt-[77px]"
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
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`${SingleDay.className} flex-1 w-full text-center font-normal text-4xl sm:text-[65px] md:text-[75px] leading-[93px] text-white`}
          >
            No Pokemon Found!
          </motion.h1>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`${SingleDay.className} w-full flex-1 flex justify-center items-start gap-[40px] sm:gap-[60px] rounded-b-none px-5 shadow-none border-b-0`}
        >
          <motion.div 
            className="relative w-[360px] h-[470px]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Image
              src="/assets/images/duck.png"
              alt="No Pokemon Found!"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}