/**
 * React JS APP
 *
 */

import React, { useLayoutEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  SkipToContent,
  HeaderMenu,
} from 'carbon-components-react/lib/components/UIShell';
import UserAvatarFilledAlt20 from '@carbon/icons-react/lib/user--avatar--filled--alt/20';
import { AuthController } from 'controllers';
import userStore from 'store/user';

export const AppHeader = (): React.ReactElement => {
  const history = useHistory();
  const [userState, setUserState] = useState(userStore.getData());

  useLayoutEffect(() => {
    const subs = userStore.subscribe(setUserState);

    return () => subs.unsubscribe();
  }, []);

  const onLogoutClick = () => {
    AuthController.logout();
    history.push('/');
  };

  const renderMenuContent = (data: { ariaLabel: string }) => (
    <>
      {data.ariaLabel}
      <UserAvatarFilledAlt20 />
      {userState.userData?.email}
    </>
  );

  return (
    <Header aria-label="MERN Client">
      <SkipToContent />
      <HeaderName href="/" prefix="MERN">
        UI
      </HeaderName>
      <HeaderGlobalBar>
        <HeaderNavigation aria-label="MERN Client">
          <HeaderMenu
            aria-label="User Email Address"
            menuLinkName=""
            renderMenuContent={renderMenuContent}
          >
            {userState.userData && 
              <HeaderMenuItem onClick={onLogoutClick}>
                <label className="app-header__link">Logout</label>
              </HeaderMenuItem>
            }
          </HeaderMenu>
        </HeaderNavigation>
      </HeaderGlobalBar>
    </Header>
  );
};
