import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card, UpdateCardDto } from '../models/card.model';
import { environment } from '../../environments/environment';
import { checkToken } from '../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  constructor(private http: HttpClient) {}
  apiUrl = environment.API_URL;
  update(id: Card['id'], changes: UpdateCardDto) {
    return this.http.put<Card>(`${this.apiUrl}/api/v1/cards/${id}`, changes, {
      context: checkToken(),
    });
  }
}
