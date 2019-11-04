import React, { useEffect, useCallback } from 'react';
import { CssBaseline } from '@material-ui/core';
import Router from './router';
import GlobalCss from '../common/global-css';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';
import { Loader } from '../common';

const App = () => {
  const dispatch = useDispatch();
  const checkUserToken = useCallback(() => dispatch(authActions.verifyUserToken()), [dispatch]);
  const isUserLoaded = useSelector(state => state.auth.isUserLoaded);

  useEffect(() => {
    checkUserToken();
  }, [checkUserToken]);

  return (
    <>
      <CssBaseline />
      <GlobalCss />
      {isUserLoaded ? <Router /> : <Loader />}
    </>
  );
};

export default App;
