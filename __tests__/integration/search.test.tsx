import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "@/app/page";
import { Mock, beforeEach, describe, expect, it, vi } from "vitest";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { searchPokemon, getRandomPokemon } from "@/lib/utils/pokemon-utils";
import type { PokemonDetailResponse } from "@/types/pokemon";


vi.mock("@/lib/utils/pokemon-utils", () => ({
 searchPokemon: vi.fn(),
 getRandomPokemon: vi.fn(),
}));

vi.mock("next/navigation", () => ({
 useRouter: vi.fn(),
}));


const mockPokemonData: PokemonDetailResponse['pokemon_v2_pokemon'][0] = {
 id: 1,
 name: "bulbasaur",
 pokemon_v2_pokemonsprites: [
   { sprites: '{"front_default": "sprite-url"}' }
 ],
 pokemon_v2_pokemontypes: [
   { pokemon_v2_type: { name: "grass" } }
 ],
 pokemon_v2_pokemonstats: [
   { base_stat: 45, pokemon_v2_stat: { name: "hp" } }
 ]
};

const WrapperWithToast = ({ children }: { children: React.ReactNode }) => (
 <>
   <Toaster />
   {children}
 </>
);

describe("Search Integration", () => {
 beforeEach(() => {
   vi.clearAllMocks();
   (useRouter as Mock).mockReturnValue({
     push: vi.fn(),
     prefetch: vi.fn(),
   });
 });

 it("should search and navigate to pokemon detail page", async () => {
  vi.mocked(searchPokemon).mockResolvedValueOnce(mockPokemonData);

  render(
    <WrapperWithToast>
      <App />
    </WrapperWithToast>
  );

  const input = screen.getByLabelText(/pokemon name or id/i);
  await userEvent.type(input, "bulbasaur");
  await userEvent.click(screen.getByRole("button", { name: /Search/i }));

  await waitFor(() => {
    expect(useRouter().push).toHaveBeenCalledWith("/pokemon/bulbasaur");
  });
});

 it("should handle search errors correctly", async () => {
   vi.mocked(searchPokemon).mockResolvedValueOnce(null);

   render(
     <WrapperWithToast>
       <App />
     </WrapperWithToast>
   );

   const input = screen.getByLabelText(/pokemon name or id/i);
   await userEvent.type(input, "nonexistent");
   await userEvent.click(screen.getByRole("button", { name: /search/i }));

   await waitFor(() => {
     expect(screen.getByText("Pokemon not found")).toBeInTheDocument();
   });
 });

 it("should handle random pokemon search", async () => {
   vi.mocked(getRandomPokemon).mockResolvedValueOnce(mockPokemonData);

   render(
     <WrapperWithToast>
       <App />
     </WrapperWithToast>
   );

   await userEvent.click(screen.getByRole("button", { name: /random/i }));

   await waitFor(() => {
     expect(useRouter().push).toHaveBeenCalledWith("/pokemon/bulbasaur");
   });
 });

 it("should handle loading state during search", async () => {
  vi.mocked(searchPokemon).mockImplementationOnce(
    () => new Promise((resolve) => setTimeout(() => resolve(mockPokemonData), 100))
  );

  render(
    <WrapperWithToast>
      <App />
    </WrapperWithToast>
  );

  const input = screen.getByLabelText(/pokemon name or id/i);
  await userEvent.type(input, "bulbasaur");
  
  // Update button queries to match exact casing
  const searchButton = screen.getByRole("button", { name: /Search/i });
  const randomButton = screen.getByRole("button", { name: /Random/i });
  
  await userEvent.click(searchButton);

  expect(searchButton).toBeDisabled();
  expect(randomButton).toBeDisabled();
});

 it("should validate input before search", async () => {
   render(
     <WrapperWithToast>
       <App />
     </WrapperWithToast>
   );

   const input = screen.getByLabelText(/pokemon name or id/i);
   await userEvent.type(input, "!!!");

   await waitFor(() => {
     expect(screen.getByText(/must be a valid pokemon name/i)).toBeInTheDocument();
   });
 });
});