import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const mockApolloClient = new ApolloClient({
  uri: 'https://beta.pokeapi.co/graphql/v1beta',
  cache: new InMemoryCache()
});

export const withApollo = (Story: React.ComponentType) => (
  <ApolloProvider client={mockApolloClient}>
    <Story />
  </ApolloProvider>
);