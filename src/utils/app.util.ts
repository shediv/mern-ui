/**
 * React JS APP
 *
 */

import { AppConst } from 'constants/app.constant';

import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";

export const AppUtil = {
  getAuthCookie: (): string | undefined => {
    const ssoCookie = Cookies.get(AppConst.AUTH_COOKIE_KEY);

    if (
      ssoCookie &&
      ssoCookie !== undefined &&
      ssoCookie !== '' &&
      ssoCookie !== `{{${AppConst.AUTH_COOKIE_KEY}}}`
    ) {
      console.log("jwt_decode =====", jwt_decode(ssoCookie));
      return ssoCookie;
    }

    if (process.env.NODE_ENV === 'development') {
      const pageURL = window.location.href;

      if (pageURL.includes(AppConst.AUTH_COOKIE_KEY)) {
        let authCookie = pageURL.split(`${AppConst.AUTH_COOKIE_KEY}=`).pop() || '';
        authCookie = authCookie.split('#/')[0];
        Cookies.set(AppConst.AUTH_COOKIE_KEY, authCookie);

        return authCookie;
      }
    }

    return undefined;
  },

  extendAuthCookie: (expiryTime: Date): string | undefined => {
    const ssoCookie = Cookies.get(AppConst.AUTH_COOKIE_KEY);

    if (ssoCookie && ssoCookie !== undefined && ssoCookie !== '') {
      let hostname: string | string[] = window.location.hostname;
      hostname = hostname.split('.');
      let cookieDomain = hostname[0];

      if (hostname.length > 1) {
        cookieDomain = `.${hostname[hostname.length - 2]}.${hostname[hostname.length - 1]}`;
      }
      Cookies.remove(AppConst.AUTH_COOKIE_KEY, {
        domain: cookieDomain,
      });
      Cookies.set(AppConst.AUTH_COOKIE_KEY, ssoCookie, {
        expires: expiryTime,
        domain: cookieDomain,
      });

      return ssoCookie;
    }

    return undefined;
  },

  removeAuthCookie: (): void => {
    let hostname: string | string[] = window.location.hostname;
    hostname = hostname.split('.');
    let cookieDomain = hostname[0];

    if (hostname.length > 1) {
      cookieDomain = `.${hostname[hostname.length - 2]}.${hostname[hostname.length - 1]}`;
    }
    Cookies.remove(AppConst.AUTH_COOKIE_KEY, {
      domain: cookieDomain,
    });
    Object.keys(Cookies.get()).forEach((cookieName) => {
      const cookieAttributes = {
        domain: cookieDomain,
      };
      Cookies.remove(cookieName, cookieAttributes);
    });
  },
};
