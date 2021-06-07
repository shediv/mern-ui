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
import { ApiEndpoint } from 'constants/api-endpoint.constant';

import {
  Tabs,
  Tab,
} from 'carbon-components-react';

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
      <div className="bx--row landing-page__r2">
        <div className="bx--col bx--no-gutter">
          <div className="bx--col-md-4 bx--offset-lg-1 bx--col-lg-8">
            <h3>Welcome {userInfo?.firstName}</h3>
            <img
              className="profile-pic landing-page__illo"
              src={`${ApiEndpoint.USER_URL}/${userInfo?.picture}`}
              alt="Profile Pic"
            />
          </div>

          <Tabs aria-label="Tab navigation" className="info-tab">
            <Tab label="About">
              <div className="bx--grid bx--grid--no-gutter bx--grid--full-width">
                <div className="bx--row landing-page__tab-content">
                  <div className="bx--col-md-4 bx--col-lg-7 content">
                    <span> First Name: {userInfo?.firstName}</span>
                  </div>

                  <div className="bx--col-md-4 bx--col-lg-7 content">
                    <span> Last Name: {userInfo?.lastName}</span>
                  </div>

                  <div className="bx--col-md-4 bx--col-lg-7 content">
                    <span> Email: {userInfo?.email}</span>
                  </div>

                  <div className="bx--col-md-4 bx--col-lg-7">
                    <span> Phone Number: {userInfo?.phoneNumber}</span>
                  </div>

                  <div className="bx--col-md-4 bx--col-lg-7">
                    <span> Birth Date: {userInfo?.dob}</span>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab label="Update Password">
              <div className="bx--grid bx--grid--no-gutter bx--grid--full-width">
                <div className="bx--row landing-page__tab-content">
                  <div className="bx--col-lg-16">
                    Rapidly build beautiful and accessible experiences. The
                    Carbon kit contains all resources you need to get started.
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
