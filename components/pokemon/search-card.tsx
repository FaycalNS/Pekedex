/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Pokeball from "@/public/assets/images/Pokeball.svg"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { searchFormSchema } from "@/schemas";
import { LoadingSpinner } from "@/components/loading-spinner";
import { searchPokemon, getRandomPokemon } from "@/lib/utils/pokemon-utils";
import { motion } from "framer-motion";

type SearchFormValues = z.infer<typeof searchFormSchema>;

export default function SearchCard() {
  const router = useRouter();
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isRandomLoading, setIsRandomLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: SearchFormValues) => {
    setIsSearchLoading(true);
    try {
      const pokemon = await searchPokemon(data.query);
      if (!pokemon) {
        router.push('/not-found');
        return;
      }
      router.push(`/pokemon/${pokemon.name}`);
    } catch (error) {
      router.push('/not-found');
    } finally {
      setIsSearchLoading(false);
    }
  };

  const handleRandomSearch = async () => {
    setIsRandomLoading(true);
    try {
      const pokemon = await getRandomPokemon();
      if (!pokemon) {
        router.push('/not-found');
        return;
      }
      router.push(`/pokemon/${pokemon.name}`);
    } catch (error) {
      router.push('/not-found');
    } finally {
      setIsRandomLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="w-full max-w-[428px] mx-auto md:mx-0 z-40"
    >
      <Card className="py-4 px-6 sm:py-10 sm:px-[60px] bg-white border-[2px] border-themeBorder rounded-[10px]">
        <CardHeader className="flex items-center justify-center p-0 pb-4">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              delay: 0.5,
              type: "spring",
              stiffness: 260,
              damping: 20 
            }}
            className="relative w-[94px] h-[92px]"
          >
            <Image
              src={Pokeball}
              alt="Pokeball"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </CardHeader>
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <CardContent className="space-y-2 p-0 pb-[34px]">
            <motion.label
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              htmlFor="pokemon-search"
              className="text-themeTextColor text-base font-bold"
            >
              Pokemon Name or Id
            </motion.label>
            <Input
              id="pokemon-search"
              {...register("query")}
              disabled={isSearchLoading || isRandomLoading}
              className="w-full h-[60px] rounded-[5px] border-[#CFC7C2] bg-[#FAFAFA] focus:border-themeBgColor focus:ring-themeBgColor"
            />
            {errors.query && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-themeMainColor text-sm"
              >
                {errors.query.message}
              </motion.span>
            )}
          </CardContent>
          <CardFooter className="w-full flex flex-col sm:flex-row gap-3 justify-between items-center p-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="w-full sm:w-auto"
            >
              <Button
                type="submit"
                disabled={isSearchLoading || isRandomLoading}
                className="w-full sm:w-auto sm:min-w-[116px] bg-themeMainColor hover:bg-themeBgColor/90 
                  text-white font-bold text-sm rounded-[5px] py-5 px-7 leading-[18px]"
              >
                {isSearchLoading ? (
                  <LoadingSpinner color="white" size={4} />
                ) : (
                  "Search"
                )}
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="w-full sm:w-auto"
            >
              <Button
                type="button"
                onClick={handleRandomSearch}
                disabled={isSearchLoading || isRandomLoading}
                className="w-full sm:w-auto sm:min-w-[116px] bg-themeMainColor hover:bg-themeBgColor/90 
                  text-white font-bold text-sm rounded-[5px] py-5 px-7 leading-[18px]"
              >
                {isRandomLoading ? (
                  <LoadingSpinner color="white" size={4} />
                ) : (
                  "Random"
                )}
              </Button>
            </motion.div>
          </CardFooter>
        </motion.form>
      </Card>
    </motion.div>
  );
}