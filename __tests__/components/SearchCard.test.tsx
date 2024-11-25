import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import SearchCard from "@/components/pokemon/search-card";
import { GetPokemonByIdOrName } from "@/lib/api/graphql/queries";
import { Mock, beforeEach, describe, expect, it, vi } from "vitest";
import { useRouter } from "next/navigation";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));
const mocks = [
  // Name search mock
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
              { sprites: '{"front_default":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png""}' },
            ],
            pokemon_v2_pokemontypes: [{ pokemon_v2_type: { name: "grass" } }],
          },
        ],
      },
    },
  },
  // ID search mock
  {
    request: {
      query: GetPokemonByIdOrName,
      variables: { name: "", id: 1 },
    },
    result: {
      data: {
        pokemon_v2_pokemon: [
          {
            id: 1,
            name: "bulbasaur",
            pokemon_v2_pokemonsprites: [
              { sprites: '{"front_default":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"}' },
            ],
            pokemon_v2_pokemontypes: [{ pokemon_v2_type: { name: "grass" } }],
          },
        ],
      },
    },
  },
];

describe("SearchCard", () => {
  beforeEach(() => {
    (useRouter as Mock).mockReturnValue({
      push: vi.fn(),
      prefetch: vi.fn(),
    });
  });
  it("renders search input and buttons", () => {
    render(
      <MockedProvider mocks={mocks}>
        <SearchCard />
      </MockedProvider>
    );

    expect(screen.getByLabelText(/pokemon name or id/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /random/i })).toBeInTheDocument();
  });

  it("validates input correctly", async () => {
    render(
      <MockedProvider mocks={mocks}>
        <SearchCard />
      </MockedProvider>
    );

    const input = screen.getByLabelText(/pokemon name or id/i);
    fireEvent.change(input, { target: { value: "!!!" } });

    await waitFor(() => {
      expect(
        screen.getByText(/must be a valid pokemon name/i)
      ).toBeInTheDocument();
    });
  });

  it("performs search by Name successfully", async () => {
    render(
      <MockedProvider mocks={mocks}>
        <SearchCard />
      </MockedProvider>
    );

    const input = screen.getByLabelText(/pokemon name or id/i);
    fireEvent.change(input, { target: { value: "bulbasaur" } });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /search/i })
      ).not.toBeDisabled();
    });
  });

  it("performs search by ID successfully", async () => {
    render(
      <MockedProvider mocks={mocks}>
        <SearchCard />
      </MockedProvider>
    );

    const input = screen.getByLabelText(/pokemon name or id/i);
    fireEvent.change(input, { target: { value: "1" } });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /search/i })
      ).not.toBeDisabled();
    });
  });

  it("shows loading state while searching", async () => {
    render(
      <MockedProvider mocks={mocks}>
        <SearchCard />
      </MockedProvider>
    );

    const input = screen.getByLabelText(/pokemon name or id/i);
    fireEvent.change(input, { target: { value: "bulbasaur" } });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    // Wait for the button to be disabled
    await waitFor(() =>
      expect(screen.getByRole("button", { name: /random/i })).toBeDisabled()
    );
  });
});
