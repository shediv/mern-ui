/**
 * React JS APP
 *
 */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AppUtil } from 'utils';

export const PrivateRoute: React.FC<{
  component: React.FC;
  path: string;
  exact: boolean;
}> = (props) => {

  const authCookie = AppUtil.getAuthCookie();

  if (authCookie) {
    return <Route component={props.component} exact={props.exact} path={props.path} />;
  }

  return <Redirect to="/login" />;
};
