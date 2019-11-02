import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { routes } from '../../constants/routes';
import SignUp from '../../pages/sign-up';
import Page404 from '../../pages/page-404';
import PrivateRoute from '../common/private-route';

class Router extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute path={routes.signup} component={SignUp} isAllowed={true} />
        <PrivateRoute path="*" component={Page404} />
      </Switch>
    );
  }
}

export default Router;
