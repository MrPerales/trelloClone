import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Board } from '../models/board.model';
import { checkToken } from '../interceptors/token.interceptor';
import { Card } from '../models/card.model';
import { Colors } from '../models/colors.model';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  constructor(private http: HttpClient) {}
  bufferSpace = 65535;
  apiUrl = environment.API_URL;
  getBoards(id: Board['id']) {
    return this.http.get<Board>(`${this.apiUrl}/api/v1/boards/${id}`, {
      context: checkToken(),
    });
  }
  createNewBoard(title: string, backgroundColor: Colors) {
    return this.http.post<Board>(
      `${this.apiUrl}/api/v1/boards`,
      {
        title,
        backgroundColor,
      },
      { context: checkToken() }
    );
  }
  getPosition(cards: Card[], currentIndex: number) {
    if (cards.length === 1) {
      // return 'is New';
      return this.bufferSpace;
    }
    if (cards.length > 2 && currentIndex === 0) {
      // cads[1] ya que es la que estaba antes en el top
      const topPosition = cards[1].position / 2;
      return topPosition;
      // return 'is top';
    }
    // variable para tener un parametro que comparar con currentIndex
    const lastIndex = cards.length - 1;
    // cards.length > 1 ya que minimo tiene que tener 1 elemento
    if (cards.length > 1 && currentIndex > 0 && currentIndex < lastIndex) {
      //  sacamos el promedio de las posiciones adyacentes
      const previousPosition = cards[currentIndex - 1].position;
      const nextPosition = cards[currentIndex + 1].position;
      const middlePosition = (previousPosition + nextPosition) / 2;
      return middlePosition;
      // return 'is middle';
    }
    if (cards.length > 1 && currentIndex === lastIndex) {
      // cads[lastIndex-1] ya que es la que estaba antes en el bottom
      const bottomPosition = cards[lastIndex - 1].position;
      return bottomPosition + this.bufferSpace;
      // return 'is bottom';
    }

    return 0;
  }
  getPositionNewItems(elements: Card[] | List[]) {
    // solo tenemos dos opc si es nueva en toda la lista va al principio
    // y si no hasta el final
    if (elements.length === 0) {
      // return 'is New';
      return this.bufferSpace;
    }
    // agregamos al final de la lista
    const lastIndex = elements.length - 1;
    // quitamos el -1 ya que no tiene card atras
    const bottomPosition = elements[lastIndex].position;
    return bottomPosition + this.bufferSpace;
  }
}
