import React from 'react';
import { CssBaseline } from '@material-ui/core';
import Router from './router';
import GlobalCss from '../common/GlobalCss';

const App = () => {
  return (
    <>
      <CssBaseline />
      <GlobalCss />
      <Router />
    </>
  );
};

export default App;
