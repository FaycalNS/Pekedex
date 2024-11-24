import { graphql, HttpResponse } from "msw";

export const handlers = [
  graphql.query("GetPokemons", () => {
    return HttpResponse.json({
      data: {
        pokemon_v2_pokemon: [
          {
            id: 1,
            name: "bulbasaur",
            pokemon_v2_pokemonsprites: [
              {
                sprites:
                  '{"front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"}',
              },
            ],
            pokemon_v2_pokemontypes: [{ pokemon_v2_type: { name: "grass" } }],
          },
        ],
      },
    });
  }),

  graphql.query("GetPokemonByIdOrName", ({ variables }) => {
    // Not Found Scenario
    if (variables.name === "nonexistent") {
      return HttpResponse.json({
        data: {
          pokemon_v2_pokemon: [], // Empty array for not found
        },
      });
    }

    // Success Scenario
    return HttpResponse.json({
      data: {
        pokemon_v2_pokemon: [
          {
            id: 1,
            name: "bulbasaur",
            pokemon_v2_pokemonsprites: [
              {
                sprites:
                  '{"front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"}',
              },
            ],
            pokemon_v2_pokemontypes: [{ pokemon_v2_type: { name: "grass" } }],
            pokemon_v2_pokemonstats: [
              { base_stat: 45, pokemon_v2_stat: { name: "hp" } },
            ],
          },
        ],
      },
    });
  }),

  graphql.query("GetPokemonTypes", () => {
    return HttpResponse.json({
      data: {
        pokemon_v2_type: [
          { id: 1, name: "normal" },
          { id: 2, name: "fighting" },
        ],
      },
    });
  }),

  graphql.query("GetPokemonStats", ({ variables }) => {
    // Invalid ID Scenario
    if (variables.pokemonId <= 0) {
      return HttpResponse.json({
        data: null,
        errors: [{ message: "Invalid Pokemon ID" }],
      });
    }

    // Success Scenario
    return HttpResponse.json({
      data: {
        pokemon_v2_pokemonstat: [
          { base_stat: 45, pokemon_v2_stat: { name: "hp" } },
          { base_stat: 49, pokemon_v2_stat: { name: "attack" } },
        ],
      },
    });
  }),

  graphql.query("GetPokemonSpecies", () => {
    return HttpResponse.json({
      data: {
        pokemon_v2_pokemonspecies: [{
          pokemon_v2_pokemonspeciesflavortexts: [{
            flavor_text: "A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON."
          }],
          evolution_chain_id: 1,
          pokemon_v2_pokemoncolor: {
            name: "green"
          }
        }]
      }
    });
  }),

  graphql.query("GetEvolutionChain", () => {
    return HttpResponse.json({
      data: {
        pokemon_v2_evolutionchain: [{
          pokemon_v2_pokemonspecies: [
            {
              name: "bulbasaur",
              id: 1,
              evolves_from_species_id: null
            },
            {
              name: "ivysaur",
              id: 2,
              evolves_from_species_id: 1
            },
            {
              name: "venusaur",
              id: 3,
              evolves_from_species_id: 2
            }
          ]
        }]
      }
    });
  })
];
