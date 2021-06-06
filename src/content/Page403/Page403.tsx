/**
 * React JS APP
 *
 */

import { Button } from 'carbon-components-react';
import React from 'react';

export const Page403 = (): React.ReactElement => {
  const onLogoutClick = () => {
    const logoutPath = `${process.env.REACT_APP_AUTH_CONNECT_LOGOUT_URL}?loginType=github_enterprise`;
    window.location.href = logoutPath;
  };

  return (
    <div className="bx--grid bx--grid--full-width">
      <div className="bx--row page-403__banner">
        <h1>403</h1>
        <h2>FORBIDDEN</h2>
        <Button onClick={onLogoutClick}>Logout</Button>
      </div>
    </div>
  );
};
