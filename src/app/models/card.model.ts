import { List } from './list.model';

export interface Card {
  id: string;
  title: string;
  position: number;
  list: List;
  description?: string;
}
// export interface CreateCardDto {
//   title: string;
//   description: string;
//   position: number;
//   boardId: number;
//   listId: number;
// }
// ó
// extendemos de Card y omitimos los campos de id y list
export interface CreateCardDto extends Omit<Card, 'id' | 'list'> {
  listId: string;
  boardId: string;
}

export interface UpdateCardDto {
  title?: string;
  position?: number;
  description?: string;
  listId?: string | number;
  boardId?: string;
}
