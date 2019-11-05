import React, { useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import Router from './router';
import GlobalCss from '../common/global-css';
import { useSelector } from 'react-redux';
import { authActions } from '../../store/auth';
import { Loader } from '../common';
import { useActions } from '../hooks';

const actions = {
  verifyUserToken: authActions.verifyUserToken,
  updateUserToken: authActions.updateUserToken,
};

const App = () => {
  const { verifyUserToken, updateUserToken } = useActions(actions);
  const isUserLoaded = useSelector(state => state.auth.isUserLoaded);

  useEffect(() => {
    verifyUserToken();
    updateUserToken();
  }, [verifyUserToken, updateUserToken]);

  return (
    <>
      <CssBaseline />
      <GlobalCss />
      {isUserLoaded ? <Router /> : <Loader />}
    </>
  );
};

export default App;
