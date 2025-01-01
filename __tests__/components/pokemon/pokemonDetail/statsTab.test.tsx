import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StatsTab from "@/components/pokemon/pokemonDetail/statsTab";
import type { PokemonDetailResponse } from "@/types/pokemon";

describe("StatsTab", () => {
  const mockStats: PokemonDetailResponse['pokemon_v2_pokemon'][0]['pokemon_v2_pokemonstats'] = [
    { base_stat: 45, pokemon_v2_stat: { name: "hp" } },
    { base_stat: 49, pokemon_v2_stat: { name: "attack" } },
    { base_stat: 49, pokemon_v2_stat: { name: "defense" } },
    { base_stat: 65, pokemon_v2_stat: { name: "special-attack" } },
    { base_stat: 65, pokemon_v2_stat: { name: "special-defense" } },
    { base_stat: 45, pokemon_v2_stat: { name: "speed" } }
  ];

  it("renders all stats with correct labels", () => {
    render(<StatsTab stats={mockStats} mainType="grass" />);

    expect(screen.getByText("HP")).toBeInTheDocument();
    expect(screen.getByText("ATK")).toBeInTheDocument();
    expect(screen.getByText("DEF")).toBeInTheDocument();
    expect(screen.getByText("SATK")).toBeInTheDocument();
    expect(screen.getByText("SDEF")).toBeInTheDocument();
    expect(screen.getByText("SPD")).toBeInTheDocument();
  });

  it("displays correct stat values", () => {
    const { container } = render(<StatsTab stats={mockStats} mainType="grass" />);
    
    const statValues = container.querySelectorAll('span.text-right');
    expect(statValues).toHaveLength(mockStats.length);
    
    statValues.forEach((element, index) => {
      expect(element.textContent).toBe(mockStats[index].base_stat.toString());
    });
  });

  it("applies correct type color to stat labels", () => {
    render(<StatsTab stats={mockStats} mainType="grass" />);

    const statLabels = screen.getAllByText(/(HP|ATK|DEF|SATK|SDEF|SPD)/);
    statLabels.forEach(label => {
      expect(label).toHaveClass("text-pokemon-grass");
    });
  });

  it("sets correct aria-valuenow on progress bars", () => {
    render(<StatsTab stats={mockStats} mainType="grass" />);

    const progressBars = screen.getAllByRole("progressbar");
    expect(progressBars).toHaveLength(mockStats.length);

    progressBars.forEach((progressBar, index) => {
      expect(progressBar).toHaveAttribute(
        "aria-valuenow", 
        mockStats[index].base_stat.toString()
      );
    });
  });
});