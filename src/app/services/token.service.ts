import { Injectable } from '@angular/core';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';

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
}
