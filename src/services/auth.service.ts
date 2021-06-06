/**
 * React JS APP
 *
 */

import jwtDecode from 'jwt-decode';
import { AuthData } from 'types/auth';

export const AuthService = {
  authenticateUser: (authSSOCookie: string): Promise<AuthData> => {
    // return new Promise<void>((resolve) => {
    //   setTimeout(() => {
    //     // TODO Implement API call
    //     resolve();
    //   }, 5000);
    // });
    return jwtDecode(authSSOCookie);
  },
};
