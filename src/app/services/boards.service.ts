import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Board } from '../models/board.model';
import { checkToken } from '../interceptors/token.interceptor';
import { Card } from '../models/card.model';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  constructor(private http: HttpClient) {}
  apiUrl = environment.API_URL;
  getBoards(id: Board['id']) {
    return this.http.get<Board>(`${this.apiUrl}/api/v1/boards/${id}`, {
      context: checkToken(),
    });
  }
  getPosition(cards: Card[], currentIndex: number) {
    if (cards.length === 1) {
      return 'is New';
    }
    if (cards.length > 2 && currentIndex === 0) {
      return 'is top';
    }
    // variable para tener un parametro que comparar con currentIndex
    const lastIndex = cards.length - 1;
    // cards.length > 1 ya que minimo tiene que tener 1 elemento
    if (cards.length > 1 && currentIndex > 0 && currentIndex < lastIndex) {
      return 'is middle';
    }
    if (cards.length > 1 && currentIndex === lastIndex) {
      return 'is bottom';
    }

    console.log(currentIndex);

    return 0;
  }
}
