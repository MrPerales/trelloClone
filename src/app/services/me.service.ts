import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { checkToken } from '../interceptors/token.interceptor';
import { Board } from '../models/board.model';
@Injectable({
  providedIn: 'root',
})
export class MeService {
  constructor(private http: HttpClient) {}
  apiUrl = environment.API_URL;

  getMeProfile() {
    return this.http.get<User>(`${this.apiUrl}/api/v1/me/profile`, {
      context: checkToken(),
    });
  }
  getMeBoards() {
    return this.http.get<Board[]>(`${this.apiUrl}/api/v1/me/boards`, {
      context: checkToken(),
    });
  }
}
