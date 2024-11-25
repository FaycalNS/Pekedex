"use client";
import SearchCard from "@/components/pokemon/search-card";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-white" />
      <div
        className="absolute inset-0 bg-themeBgColor"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 10%)",
        }}
      />

      {/* Gray diagonal line */}
      <div
        className="absolute inset-0 bg-themeBorder"
        style={{
          clipPath: "polygon(0 12%, 100% 92%, 100% 88%, 0 8%)",
        }}
      />

      <div
        className="relative z-20 w-full mx-auto px-4 min-h-screen
          flex flex-col-reverse md:flex-row items-center justify-center
          max-w-[1440px] gap-8"
      >
        {/* Pikachu Image Container */}
        <div
          className="w-full sm:w-[70%] md:w-1/2 h-[90%] z-30 
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
