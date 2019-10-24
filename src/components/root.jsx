import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Router from './app';
import HelmetWrapper from './helmet';
import store from '../store';

const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <HelmetWrapper />
        <Router />
      </BrowserRouter>
    </Provider>
  );
};

export default Root;
