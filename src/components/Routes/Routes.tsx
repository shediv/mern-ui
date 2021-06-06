/**
 * React JS APP
 *
 */

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { HomePage } from 'content/HomePage';
import { LoginPage } from 'content/LoginPage';
import { SignupPage } from 'content/SignUp';
import { LogoutPage } from 'content/LogoutPage';
import { PrivateRoute } from 'components/PrivateRoute';
const Page404 = React.lazy(() => import('content/Page404'));

export const Routes = (): React.ReactElement => {
  return (
    <Switch>
      <PrivateRoute component={HomePage} path="/" exact />
      <PrivateRoute component={LogoutPage} path="/logout" exact />
      <Route component={LoginPage} path="/login" />
      <Route component={SignupPage} path="/signup" />
      <Route component={HomePage} path="/home" />
      <Route component={Page404} />
    </Switch>
  );
};
