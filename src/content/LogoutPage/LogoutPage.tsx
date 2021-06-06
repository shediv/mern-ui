/**
 * React JS APP
 *
 */

import { Loading } from 'carbon-components-react';
import React from 'react';

import './_logout-page.scss';

export const LogoutPage = (): React.ReactElement => {
  const renderMainUI = () => {
    window.location.href = `${process.env.REACT_APP_AUTH_CONNECT_LOGOUT_URL}`;

    return (
      <div className="bx--grid bx--grid--full-width logout-page__wrapper">
        <Loading description="Logging OUT User..." withOverlay={false} active />
      </div>
    );
  };

  return renderMainUI();
};
