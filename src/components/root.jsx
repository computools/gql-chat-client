import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { apiClient } from '../api';
import Router from './app';
import HelmetWrapper from './helmet';
import store from '../store';

const Root = () => {
  return (
    <ApolloProvider client={apiClient}>
      <Provider store={store}>
        <BrowserRouter>
          <HelmetWrapper />
          <Router />
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  );
};

export default Root;
