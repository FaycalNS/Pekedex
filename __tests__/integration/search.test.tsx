import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";
import { GetPokemonByIdOrName } from "@/lib/api/graphql/queries";
import App from "@/app/page";
import { Mock, beforeEach, describe, expect, it, vi } from "vitest";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

const WrapperWithToast = ({ children }: { children: React.ReactNode }) => (
  <>
    <Toaster />
    <MockedProvider mocks={mocks}>{children}</MockedProvider>
  </>
);
const mocks = [
  // Success mock
  {
    request: {
      query: GetPokemonByIdOrName,
      variables: { name: "bulbasaur", id: -1 },
    },
    result: {
      data: {
        pokemon_v2_pokemon: [
          {
            id: 1,
            name: "bulbasaur",
            pokemon_v2_pokemonsprites: [
              { sprites: '{"front_default":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.pn"}' },
            ],
            pokemon_v2_pokemontypes: [{ pokemon_v2_type: { name: "grass" } }],
          },
        ],
      },
    },
  },
  // Error mock
  {
    request: {
      query: GetPokemonByIdOrName,
      variables: { name: "nonexistent", id: -1 },
    },
    error: new Error("Pokemon not found"),
  },
  // Random pokemon mock
  {
    request: {
      query: GetPokemonByIdOrName,
      variables: { id: 1, name: "" },
    },
    result: {
      data: {
        pokemon_v2_pokemon: [{
          id: 1,
          name: "bulbasaur",
          pokemon_v2_pokemonsprites: [{ sprites: '{"front_default":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"}' }],
          pokemon_v2_pokemontypes: [{ pokemon_v2_type: { name: "grass" } }],
        }],
      },
    },
  },
];
describe("Search Integration", () => {
  beforeEach(() => {
    // Mock the useRouter hook
    (useRouter as Mock).mockReturnValue({
      push: vi.fn(), // Mock the push method
      prefetch: vi.fn(),
    });
  });
  it("should search and navigate to pokemon detail page", async () => {
    render(
      <MockedProvider mocks={mocks}>
        <App />
      </MockedProvider>
    );

    const input = screen.getByLabelText(/pokemon name or id/i);
    await userEvent.type(input, "bulbasaur");
    await userEvent.click(screen.getByRole("button", { name: /search/i }));

    // Wait for the navigation and check if `push` was called with the correct path
    await waitFor(() => {
      expect(useRouter().push).toHaveBeenCalledWith("/pokemon/bulbasaur");
    });
  });

  it("should handle search errors correctly", async () => {
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
  // Mock Math.random to return consistent value
  vi.spyOn(Math, 'random').mockReturnValue(0);

  render(
    <MockedProvider mocks={mocks}>
      <App />
    </MockedProvider>
  );

  await userEvent.click(screen.getByRole("button", { name: /random/i }));

  await waitFor(() => {
    expect(useRouter().push).toHaveBeenCalledWith("/pokemon/bulbasaur");
  });

  vi.restoreAllMocks();
});
});
