import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { switchMap, tap } from 'rxjs';
import { TokenService } from './token.service';
import { ResponseLogin } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.API_URL;

  constructor(private http: HttpClient, private tokenServices: TokenService) {}
  login(email: string, password: string) {
    return this.http
      .post<ResponseLogin>(`${this.apiUrl}/api/v1/auth/login`, {
        email,
        password,
      })
      .pipe(
        // save token
        tap((response) => {
          this.tokenServices.saveToken(response.access_token);
        })
      );
  }
  register(email: string, password: string, name: string) {
    return this.http.post(`${this.apiUrl}/api/v1/auth/register`, {
      email,
      name,
      password,
    });
  }
  registerAndLogin(email: string, password: string, name: string) {
    return this.register(email, password, name).pipe(
      // switch map es un Observable para ver que lo anterior esta OK
      switchMap(() => this.login(email, password))
    );
  }
  isAvailable(email: string) {
    return this.http.post<{ isAvailable: boolean }>(
      `${this.apiUrl}/api/v1/auth/is-available`,
      {
        email,
      }
    );
  }
  recovery(email: string) {
    return this.http.post(`${this.apiUrl}/api/v1/auth/recovery`, {
      email,
    });
  }
  changePassword(token: string, newPassword: string) {
    return this.http.post(`${this.apiUrl}/api/v1/auth/change-password`, {
      token,
      newPassword,
    });
  }
}
