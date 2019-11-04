import React from 'react';
import { Switch } from 'react-router-dom';
import { routes } from '../../constants/routes';
import SignUpPage from '../../pages/sign-up';
import Page404 from '../../pages/page-404';
import PrivateRoute from '../common/private-route';
import LoginPage from '../../pages/login';

const Router = () => {
  return (
    <Switch>
      <PrivateRoute path={routes.signup} component={SignUpPage} isAllowed={true} />
      <PrivateRoute path={routes.login} component={LoginPage} isAllowed={true} />
      <PrivateRoute path="*" component={Page404} />
    </Switch>
  );
};

export default Router;
