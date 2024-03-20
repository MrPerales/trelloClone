import { Injectable } from '@angular/core';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';
import { JwtPayload, jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}
  saveToken(token: string) {
    // expires : 10 days
    // path available to all routes
    setCookie('token-trello', token, { expires: 10, path: '/' });
  }
  getToken() {
    return getCookie('token-trello');
  }
  removeToken() {
    removeCookie('token-trello');
  }
  isvalidToken() {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const decodeToken = jwtDecode<JwtPayload>(token);

    if (decodeToken && decodeToken?.exp) {
      const tokenDate = new Date(0);
      //ponemos la fecha que trae el token para poder leerla mejor por asi decirlo
      // console.log(decodeToken.exp); // 1710816924
      // console.log(tokenDate); // new Date('1970-01-01T00:00:00.000Z')
      tokenDate.setUTCSeconds(decodeToken.exp);

      // console.log(tokenDate);//new Date('2024-03-19T02:55:24.000Z')
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }

  // refresh token

  saveRefreshToken(token: string) {
    // expires : 10 days
    // path available to all routes
    setCookie('refresh-token-trello', token, { expires: 10, path: '/' });
  }
  getRefreshToken() {
    return getCookie('refresh-token-trello');
  }
  removeRefreshToken() {
    removeCookie('refresh-token-trello');
  }
  isvalidRefreshToken() {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return false;
    }
    const decodeRefreshToken = jwtDecode<JwtPayload>(refreshToken);

    if (decodeRefreshToken && decodeRefreshToken?.exp) {
      const refreshTokenDate = new Date(0);
      //ponemos la fecha que trae el token para poder leerla mejor por asi decirlo
      // console.log(decodeToken.exp); // 1710816924
      // console.log(refreshTokenDate); // new Date('1970-01-01T00:00:00.000Z')
      refreshTokenDate.setUTCSeconds(decodeRefreshToken.exp);

      // console.log(refreshTokenDate);//new Date('2024-03-19T02:55:24.000Z')
      const today = new Date();
      return refreshTokenDate.getTime() > today.getTime();
    }
    return false;
  }
}
