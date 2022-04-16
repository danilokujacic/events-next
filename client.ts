import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_HOST,
  cache: new InMemoryCache(),
  headers: {
    Authorization:
      'Bearer ' + process.env.NEXT_PUBLIC_GRAPHQL_AUTHORIZATION_TOKEN,
  },
});
