/**
 * React JS APP
 *
 */
import { UserService } from 'services';
import userStore from 'store/user';
import { UserData } from 'types/user';
import { AppConst } from 'constants/app.constant';
import Cookies from 'js-cookie';

export const UserController = {
  fetchUserData: async (userId: string, token: string): Promise<boolean> => {
    const userData: UserData = await UserService.fetchUserData(userId, token);
    userStore.setData({ userData });

    return true;
  },

  loginUser: async (username: string, password: string): Promise<boolean> => {
    let data = { email : username, password: password }
    const userData: UserData = await UserService.loginUserCall(data);
    if (userData?.token) {
      userStore.setData({ userData });
      Cookies.set(AppConst.AUTH_COOKIE_KEY, userData.token);
      return true;
    } else {
      return false;
    }    
  },

  signupUser: async (userInfo: any): Promise<boolean> => {
    const userData: UserData = await UserService.signupUserCall(userInfo);
    if (userData?.email) {
      return true;
    } else {
      return false;
    }    
  },
};
