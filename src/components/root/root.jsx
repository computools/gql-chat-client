import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { apiClient } from '../../api';
import App from './app';
import HelmetWrapper from './helmet';
import store from '../../store';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from '../../constants';

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={apiClient}>
        <StoreProvider store={store}>
          <PersistGate persistor={store}>
            <BrowserRouter>
              <HelmetWrapper />
              <App />
            </BrowserRouter>
          </PersistGate>
        </StoreProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default Root;
