import { Card } from './card.model';

export interface List {
  id: string;
  title: string;
  position: number;
  cards: Card[];
  showFormCard?: boolean;
}
export interface CreateListDto extends Omit<List, 'id' | 'cards'> {
  boardId: string;
}
