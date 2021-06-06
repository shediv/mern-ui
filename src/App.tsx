/**
 * React JS APP
 *
 */

import React, { Suspense } from 'react';
import { Routes } from 'components/Routes';
import './app.scss';
import { AppHeader } from 'components/AppHeader';
import { AppUtil } from 'utils';
import { Content } from 'carbon-components-react/lib/components/UIShell';
import { ErrorHandler } from 'components/ErrorHandler';
import { Loading } from 'carbon-components-react';

const App = (): React.ReactElement => {
  if (process.env.NODE_ENV === 'development') {
    AppUtil.getAuthCookie();
  }

  return (
    <Suspense fallback={<Loading active small />}>
      <ErrorHandler>
        <>
          <AppHeader />
          <Content>
            <Routes />
          </Content>
        </>
      </ErrorHandler>
    </Suspense>
  );
};

export { App };
