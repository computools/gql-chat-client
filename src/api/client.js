import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
// import { concat } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { API_URL } from '../constants';

const link = new HttpLink({
  uri: API_URL,
});
// const middlewares = [link];
export const apiClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
