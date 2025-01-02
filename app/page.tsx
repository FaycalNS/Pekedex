import type { Metadata } from "next";
import AnimatedContent from "@/components/pokemon/animated-content";

export const metadata: Metadata = {
  title: "Search Pokemon - Pokedex",
  description:
    "Find your favorite Pokemon by name or ID. Explore Pokemon details, stats, and more.",
};

export default function Home() {
  return <AnimatedContent />;
}