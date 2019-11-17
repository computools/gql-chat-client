import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { API_URL, API_WS } from '../constants';
import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';
import { store } from '../store';
import { setContext } from 'apollo-link-context';

const getToken = () => store.getState().auth.token;

const httpLink = new HttpLink({
  uri: API_URL,
});
const authLink = setContext((_, { headers }) => {
  const token = getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : '',
    },
  };
});
export const wsLink = new WebSocketLink({
  uri: API_WS,
  options: {
    reconnect: true,
    connectionParams: () => ({
      token: getToken(),
    }),
  },
});

const link = authLink.concat(
  split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink
  )
);

export const apiClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
