/**
 * React JS APP
 *
 */

import authStore from 'store/auth';
import { AppConst } from 'constants/app.constant';
import Cookies from 'js-cookie';

export const AuthController = {
  authenticateUser: async (): Promise<boolean> => {
    authStore.setData({ authStatus: 'Success' });
    return true;
  },

  logout: (): void => {
    Cookies.remove(AppConst.AUTH_COOKIE_KEY)
    authStore.clearData();
    window.location.reload();
  },
};
