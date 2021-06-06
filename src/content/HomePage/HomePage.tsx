/**
 * React JS APP
 *
 */

import React, { useState, useLayoutEffect, useEffect } from 'react';
import { UserController } from 'controllers';
import userStore from 'store/user';
import { AjaxError } from 'rxjs/ajax';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import { AppConst } from 'constants/app.constant';

const { LeadSpace } = require('@carbon/ibmdotcom-react');

export const HomePage = (): React.ReactElement => {
  const [userState, setUserState] = useState(userStore.getData());
  const [currentUserId, setCurrentUserId] = useState('');
  const [userToken, setUserToken] = useState('');
  const [userInfo, setUserInfo] = useState<any>();

  const history = useHistory();

  useLayoutEffect(() => {
    const subs = userStore.subscribe(setUserState);

    return () => subs.unsubscribe();
  }, []);

  useEffect(() => {
    if(userState?.userData) {
      setUserInfo(userState?.userData)
    }
  }, [userState])
  
  useEffect(() => {
    if (Cookies.get(AppConst.AUTH_COOKIE_KEY) && Cookies.get(AppConst.AUTH_COOKIE_KEY) !== undefined && Cookies.get(AppConst.AUTH_COOKIE_KEY) !== '') {
      const ssoCookie = Cookies.get(AppConst.AUTH_COOKIE_KEY) || '';
      setCurrentUserId(jwt_decode(ssoCookie))
      setUserToken(ssoCookie)
    }    
  }, []);

  useEffect(() => {
    if (currentUserId && userToken) {
      UserController.fetchUserData(currentUserId, userToken).catch((error: AjaxError) => {
        history.replace(history.location.pathname, {
          errorStatusCode: error.status,
        });
      });
    }    
  }, [currentUserId]);

  return (
    <div className="bx--grid bx--grid--full-width">
      <LeadSpace
        copy="MERN Stack App"
        title={`Welcome, ${userInfo?.firstName}`}
        type="default"
      />
    </div>
  );
};
