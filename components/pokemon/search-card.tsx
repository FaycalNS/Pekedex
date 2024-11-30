/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";


import { useToast } from "@/hooks/use-toast";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { searchFormSchema } from "@/schemas";
import { LoadingSpinner } from "@/components/loading-spinner";
import { searchPokemon, getRandomPokemon } from "@/lib/utils/pokemon-utils";

type SearchFormValues = z.infer<typeof searchFormSchema>;

export default function SearchCard() {
  const { toast } = useToast();
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
        throw new Error("Pokemon not found");
      }
      router.push(`/pokemon/${pokemon.name}`);
    } catch (error) {
      toast({
        title: "Pokemon not found",
        description: "Please try another name or ID",
        variant: "destructive",
      });
    } finally {
      setIsSearchLoading(false);
    }
  };

  const handleRandomSearch = async () => {
    setIsRandomLoading(true);
    try {
      const pokemon = await getRandomPokemon();
      if (pokemon) {
        router.push(`/pokemon/${pokemon.name}`);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get random Pokemon. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRandomLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[428px] mx-auto md:mx-0 z-40">
      <Card className="py-4 px-6 sm:py-10 sm:px-[60px] bg-white border-[2px] border-themeBorder rounded-[10px]">
        <CardHeader className="flex items-center justify-center p-0 pb-4">
          <div className="relative w-[94px] h-[92px]">
            <Image
              src="/assets/images/pokeball.svg"
              alt="Pokeball"
              fill
              className="object-contain"
              priority
            />
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-2 p-0 pb-[34px]">
            <label
              htmlFor="pokemon-search"
              className="text-themeTextColor text-base font-bold"
            >
              Pokemon Name or Id
            </label>
            <Input
              id="pokemon-search"
              {...register("query")}
              disabled={isSearchLoading || isRandomLoading}
              className="w-full h-[60px] rounded-[5px] border-[#CFC7C2] bg-[#FAFAFA] focus:border-themeBgColor focus:ring-themeBgColor"
            />
            {errors.query && (
              <span className="text-themeMainColor text-sm">
                {errors.query.message}
              </span>
            )}
          </CardContent>
          <CardFooter className="w-full flex flex-col sm:flex-row gap-3 justify-between items-center p-0">
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
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
