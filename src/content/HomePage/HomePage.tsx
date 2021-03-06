/**
 * React JS APP
 *
 */

import React, { useState, useLayoutEffect, useEffect } from 'react';
import { TextInput, Button } from 'carbon-components-react';
import { Delete20 } from '@carbon/icons-react';
import { UserController } from 'controllers';
import userStore from 'store/user';
import { AjaxError } from 'rxjs/ajax';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import { AppConst } from 'constants/app.constant';
import { ApiEndpoint } from 'constants/api-endpoint.constant';
import { openToast } from 'toast-ts';

import {
  Tabs,
  Tab,
} from 'carbon-components-react';

export const HomePage = (): React.ReactElement => {
  const [userState, setUserState] = useState(userStore.getData());
  const [currentUserId, setCurrentUserId] = useState('');
  const [userToken, setUserToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
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

  const updatePassword = (e:any) => {
    e.preventDefault();
    if (newPassword && newPassword != '') {
      UserController.updateUserPassword(currentUserId, {"password": newPassword}, userToken).then((data) => {
        if(data) {
          openToast(AppConst.PASSWORD_UPDATED)
        }
      }).catch((error: AjaxError) => {
        console.log("password update error = ", error)
        openToast(AppConst.PASSWORD_UPDATED_ERROR)
      })
    }
  }

  const deleteField = (e:any) => {
    let fieldName = e || '';
    if (fieldName && fieldName != '') {
      UserController.deleteField(currentUserId, {"deleteField": fieldName}, userToken).then((data) => {        
        console.log("delete error = ", data)
        openToast(AppConst.DELETE_SUCCESS)
        window.location.reload();
      }).catch((error: AjaxError) => {
        console.log("delete error = ", error)
        openToast(AppConst.DELETE_ERROR)
      })
    }
  }

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
                  {userInfo?.firstName && <div className="bx--col-md-4 bx--col-lg-7 content">
                      <span> First Name: {userInfo?.firstName} <Delete20 className="delete-icon" id="try-free-delete" onClick={() => deleteField('firstName')} /></span>
                    </div>
                  }

                  {userInfo?.lastName && <div className="bx--col-md-4 bx--col-lg-7 content">
                      <span> Last Name: {userInfo?.lastName} <Delete20 className="delete-icon" id="try-free-delete" onClick={() => deleteField('lastName')} /></span>
                    </div>
                  }

                  <div className="bx--col-md-4 bx--col-lg-7 content">
                    <span> Email: {userInfo?.email}</span>
                  </div>
                  

                  {userInfo?.phoneNumber && <div className="bx--col-md-4 bx--col-lg-7">
                      <span> Phone Number: {userInfo?.phoneNumber} <Delete20 className="delete-icon" id="try-free-delete" onClick={() => deleteField('phoneNumber')} /></span>
                    </div>
                  }

                  {userInfo?.phoneNumber && <div className="bx--col-md-4 bx--col-lg-7">
                      <span> Birth Date: {userInfo?.dob} <Delete20 className="delete-icon" id="try-free-delete" onClick={() => deleteField('dob')} /></span>
                    </div>
                  }

                </div>
              </div>
            </Tab>
            <Tab label="Update Password">
              <div className="bx--grid bx--grid--no-gutter bx--grid--full-width">
                <div className="bx--row landing-page__tab-content">
                  <div style={{marginBottom: '1rem'}}>
                    <TextInput
                      id="password"
                      invalidText="Invalid password."
                      labelText="New Password"
                      placeholder=""
                      name="New Password" 
                      value={newPassword}
                      onChange={(e) => {console.log("e ==", e.target); setNewPassword(e.target.value)}}
                      required 
                    />

                  <Button
                    style={{marginTop: '1rem'}}
                    kind="primary"
                    tabIndex={0}
                    onClick={updatePassword}
                  >
                    Update Password
                  </Button>
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
