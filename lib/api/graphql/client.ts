import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://beta.pokeapi.co/graphql/v1beta",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          pokemon_v2_pokemon: {
            merge: false
          },
          pokemon_v2_pokemonspecies: {
            merge: false
          }
        }
      }
    }
  })
});

export default client;