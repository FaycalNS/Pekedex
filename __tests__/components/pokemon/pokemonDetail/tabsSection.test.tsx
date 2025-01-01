import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import TabsSection from "@/components/pokemon/pokemonDetail/tabsSection";
import type { 
  PokemonDetailResponse,
  EvolutionChainResponse 
} from "@/types/pokemon";

describe("TabsSection", () => {
  const mockStats: PokemonDetailResponse['pokemon_v2_pokemon'][0]['pokemon_v2_pokemonstats'] = [
    { base_stat: 45, pokemon_v2_stat: { name: "hp" } }
  ];

  const mockEvolutionChain: EvolutionChainResponse['pokemon_v2_evolutionchain'][0]['pokemon_v2_pokemonspecies'] = [
    { id: 1, name: "bulbasaur", evolves_from_species_id: null },
    { id: 2, name: "ivysaur", evolves_from_species_id: 1 }
  ];

  it("renders all tabs", () => {
    render(
      <TabsSection
        stats={mockStats}
        mainType="grass"
        evolutionChain={mockEvolutionChain}
      />
    );

    expect(screen.getByRole("tab", { name: /stats/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /evolutions/i })).toBeInTheDocument();
  });

  it("shows stats tab by default", () => {
    render(
      <TabsSection
        stats={mockStats}
        mainType="grass"
        evolutionChain={mockEvolutionChain}
      />
    );

    expect(screen.getByText("HP")).toBeInTheDocument();
  });

  it("switches between tabs correctly", async () => {
    const user = userEvent.setup();

    render(
      <TabsSection
        stats={mockStats}
        mainType="grass"
        evolutionChain={mockEvolutionChain}
      />
    );

    const evolutionsTab = screen.getByRole("tab", { name: /evolutions/i });
    await user.click(evolutionsTab);

    expect(screen.getByText("bulbasaur", { exact: false })).toBeInTheDocument();
  });

  it("applies correct type color to active tab", () => {
    render(
      <TabsSection
        stats={mockStats}
        mainType="grass"
        evolutionChain={mockEvolutionChain}
      />
    );

    const activeTab = screen.getByRole("tab", { selected: true });
    expect(activeTab).toHaveStyle({
      '--pokemon-color': 'var(--pokemon-grass)'
    });
  });
});