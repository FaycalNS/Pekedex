import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import EvolutionsTab from "@/components/pokemon/pokemonDetail/evolutionsTab";
import type { EvolutionChainResponse } from "@/types/pokemon";

// Mock next/image
vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />
}));

describe("EvolutionsTab", () => {
  const mockEvolutionChain: EvolutionChainResponse['pokemon_v2_evolutionchain'][0]['pokemon_v2_pokemonspecies'] = [
    { id: 1, name: "bulbasaur", evolves_from_species_id: null },
    { id: 2, name: "ivysaur", evolves_from_species_id: 1 },
    { id: 3, name: "venusaur", evolves_from_species_id: 2 }
  ];

  it("renders all pokemon in evolution chain", () => {
    render(
      <EvolutionsTab evolutionChain={mockEvolutionChain} mainType="grass" />
    );

    mockEvolutionChain.forEach(pokemon => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
    });
  });

  it("renders correct number of evolution arrows", () => {
    const { container } = render(
      <EvolutionsTab evolutionChain={mockEvolutionChain} mainType="grass" />
    );

    const arrows = container.querySelectorAll('path[d*="M2 6H95.0388"]');
    expect(arrows.length).toBe(mockEvolutionChain.length - 1);
  });

  it("applies correct type color to arrows", () => {
    const { container } = render(
      <EvolutionsTab evolutionChain={mockEvolutionChain} mainType="grass" />
    );

    const arrows = container.getElementsByTagName("svg");
    Array.from(arrows).forEach(arrow => {
      expect(arrow).toHaveClass("stroke-pokemon-grass");
    });
  });

  it("handles single pokemon evolution chain", () => {
    const singlePokemon = [mockEvolutionChain[0]];
    const { container } = render(
      <EvolutionsTab evolutionChain={singlePokemon} mainType="grass" />
    );

    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    // Check for arrow SVG paths instead of img
    const arrowPaths = container.querySelectorAll('path[d*="M2 6H95.0388"]');
    expect(arrowPaths.length).toBe(0);
  });
});