import React from 'react';
import { Switch } from 'react-router-dom';
import { routes } from '../../constants/routes';
import PrivateRoute from '../common/private-route';
import { useSelector } from 'react-redux';
import { PageDefault } from '../common';
import { useHistory } from 'react-router-dom';
import { ChatsPage, LoginPage, SignUpPage } from '../../pages';

const withHeaderSet = new Set([routes.login, routes.signup, routes.chats]);
const hasHeader = pathname => withHeaderSet.has(pathname);

const Router = () => {
  const isUserLoggedIn = useSelector(state => !!state.auth.user);
  const history = useHistory();
  const withHeader = hasHeader(history.location.pathname);

  const routerSwitch = (
    <Switch>
      <PrivateRoute
        path={routes.signup}
        component={SignUpPage}
        isAllowed={!isUserLoggedIn}
        redirectTo={routes.chats}
      />
      <PrivateRoute
        path={routes.login}
        component={LoginPage}
        isAllowed={!isUserLoggedIn}
        redirectTo={routes.chats}
      />
      <PrivateRoute
        path={routes.chats}
        component={ChatsPage}
        isAllowed={isUserLoggedIn}
        redirectTo={routes.login}
      />
      <PrivateRoute path="*" isAllowed={false} redirectTo={routes.login} />
    </Switch>
  );

  if (withHeader) {
    return <PageDefault>{routerSwitch}</PageDefault>;
  }

  return routerSwitch;
};

export default Router;
