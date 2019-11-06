import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { API_URL, API_WS } from '../constants';
import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';
import { store } from '../store';

const httpLink = new HttpLink({
  uri: API_URL,
});
export const wsLink = new WebSocketLink({
  uri: API_WS,
  options: {
    reconnect: true,
    connectionParams: () => ({
      token: store.getState().auth.token,
    }),
  },
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

export const apiClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
