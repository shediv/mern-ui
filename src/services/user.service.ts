/**
 * React JS APP
 *
 */

import { ApiEndpoint } from 'constants/api-endpoint.constant';

// import { ajax, AjaxResponse } from 'rxjs/ajax';
import { UserData } from 'types/user';


export const UserService = {
  fetchUserData: async (userId: string, token: string): Promise<UserData> => {
    const response = await fetch(`${ApiEndpoint.USER_URL}/user/details/${userId}`, {
      method: "get",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    const result = await response.json()
    return result;
  },

  loginUserCall: async (data: any): Promise<UserData> => {
    const response = await fetch(`${ApiEndpoint.USER_URL}/user/signin`, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()
    return result;

  },

  updateUserPasswordCall: async (id: string, userInfo: any, token: string): Promise<UserData> => {
    const response = await fetch(`${ApiEndpoint.USER_URL}/user/updatePassword/${id}`, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userInfo),
    })

    const result = await response.json()
    return result;

  },
  
  signupUserCall: async (data: any): Promise<UserData> => {
    var formData = new FormData();
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('email', data.email);
    formData.append('phoneNumber', data.phoneNumber);
    formData.append('dob', data.dob);
    formData.append('password', data.password);
    formData.append("picture", data.picture);
    
    const response = await fetch(`${ApiEndpoint.USER_URL}/user/signup`, {
      method: "post",
      headers: {
        'Accept': 'application/json',
      },
      body: formData,
    })

    const result = await response.json()
    return result;

  },
};
