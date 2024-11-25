import { gql } from "@apollo/client";

/**
 * Query to fetch a list of pokemons with pagination
 * @param limit - Number of pokemons to fetch
 * @param offset - Number of pokemons to skip
 */
export const GetPokemons = gql`
  query GetPokemons($limit: Int!, $offset: Int!) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset) {
      id
      name
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`;

/**
 * Query to fetch a specific pokemon by ID or name
 * @param id - Pokemon ID
 * @param name - Pokemon name
 */
export const GetPokemonByIdOrName = gql`
  query GetPokemonByIdOrName($name: String = "", $id: Int = -1) {
    pokemon_v2_pokemon(
      where: { _or: [{ id: { _eq: $id } }, { name: { _eq: $name } }] }
    ) {
      id
      name
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
    }
  }
`;

/**
 * Query to fetch all pokemon types
 */
export const GetPokemonTypes = gql`
  query GetPokemonTypes {
    pokemon_v2_type {
      id
      name
    }
  }
`;

/**
 * Query to fetch pokemon stats by pokemon ID
 * @param pokemonId - Pokemon ID
 */
export const GetPokemonStats = gql`
  query GetPokemonStats($pokemonId: Int!) {
    pokemon_v2_pokemonstat(where: { pokemon_id: { _eq: $pokemonId } }) {
      base_stat
      pokemon_v2_stat {
        name
      }
    }
  }
`;

/**
 * Query to fetch pokemon species details including description and color
 * @param pokemonId - Pokemon ID
 */
export const GetPokemonSpecies = gql`
  query GetPokemonSpecies($pokemonId: Int!) {
    pokemon_v2_pokemonspecies(where: { id: { _eq: $pokemonId } }) {
      pokemon_v2_pokemonspeciesflavortexts(
        where: { pokemon_v2_language: { name: { _eq: "en" } } }
        limit: 1
      ) {
        flavor_text
      }
      evolution_chain_id
      pokemon_v2_pokemoncolor {
        name
      }
    }
  }
`;

/**
 * Query to fetch pokemon evolution chain
 * @param evolutionChainId - Evolution Chain ID
 */
export const GetEvolutionChain = gql`
  query GetEvolutionChain($evolutionChainId: Int!) {
    pokemon_v2_evolutionchain(where: { id: { _eq: $evolutionChainId } }) {
      pokemon_v2_pokemonspecies {
        name
        id
        evolves_from_species_id
      }
    }
  }
`;
