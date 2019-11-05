import React, { useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import Router from './router';
import GlobalCss from '../common/global-css';
import { useSelector } from 'react-redux';
import { authActions } from '../../store/auth';
import { Loader, VerificationFailed } from '../common';
import { useActions } from '../hooks';

const actions = {
  verifyUserToken: authActions.verifyUserToken,
  updateUserToken: authActions.updateUserToken,
};

const App = () => {
  const { verifyUserToken, updateUserToken } = useActions(actions);
  const isUserLoading = useSelector(state => state.auth.isUserLoading);
  const tokenVerificationError = useSelector(state => state.auth.tokenVerificationError);

  useEffect(() => {
    verifyUserToken();
    updateUserToken();
  }, [verifyUserToken, updateUserToken]);

  const renderAppContent = () => {
    if (!isUserLoading && tokenVerificationError) {
      return <VerificationFailed {...{ tokenVerificationError, verifyUserToken }} />;
    }
    return isUserLoading ? <Loader /> : <Router />;
  };

  return (
    <>
      <CssBaseline />
      <GlobalCss />
      {renderAppContent()}
    </>
  );
};

export default App;
