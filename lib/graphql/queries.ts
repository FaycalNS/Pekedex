import { gql } from '@apollo/client';

export const GET_POKEMONS = gql`
 query samplePokeAPIquery {
  gen3_species: pokemon_v2_pokemonspecies(where: {pokemon_v2_generation: {name: {_eq: "generation-iii"}}}, order_by: {id: asc}, limit: 10) {
    name
    id
  }
}
`;



