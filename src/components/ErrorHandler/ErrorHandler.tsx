/**
 * React JS APP
 *
 */

import React from 'react';
import { useLocation } from 'react-router-dom';
import { get } from 'lodash';
const Page404 = React.lazy(() => import('content/Page404'));
const Page403 = React.lazy(() => import('content/Page403'));

type IProps = {
  children: React.ReactElement;
};

export const ErrorHandler = ({ children }: IProps): React.ReactElement => {
  const location = useLocation();

  switch (get(location.state, 'errorStatusCode')) {
    case 404:
      return <Page404 />;
    case 403:
      return <Page403 />;

    // ... cases for other types of errors

    default:
      return children;
  }
};
