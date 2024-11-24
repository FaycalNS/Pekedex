import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Roboto } from "next/font/google";
const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

interface SearchCardProps {
  onSearch: (query: string) => void;
  onRandom: () => void;
}

export default function SearchCard({ onSearch, onRandom }: SearchCardProps) {
  return (
    <>
      <div className="w-full max-w-[428px] mx-auto md:mx-0 z-40">
        <Card className="py-4 px-6 sm:py-10 sm:px-[60px]  bg-white border-[2px] border-themeBorder rounded-[10px]">
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
          <CardContent className="space-y-2 p-0 pb-[34px]">
            <label className=" text-themeTextColor text-base font-bold">
              Pokemon Name or Id
            </label>
            <Input
              type="text"
              onChange={(e) => onSearch(e.target.value)}
              className="w-full h-[60px] rounded-[5px] border-[#CFC7C2] bg-[#FAFAFA] focus:border-themeBgColor focus:ring-themeBgColor"
            />
          </CardContent>
          <CardFooter className="w-full flex flex-col sm:flex-row gap-3 justify-between items-center p-0">
            <Button
              onClick={() => onSearch}
              className={`${roboto.className} w-full sm:w-auto bg-themeMainColor hover:bg-themeBgColor/90 
           text-white font-bold text-sm rounded-[5px] py-[12px] px-7 leading-[18px`}
            >
              Search
            </Button>
            <Button
              onClick={onRandom}
              className={`${roboto.className} w-full sm:w-auto bg-themeMainColor hover:bg-themeBgColor/90 
           text-white font-bold text-sm rounded-[5px] py-[12px] px-7 leading-[18px`}
            >
              Random
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
