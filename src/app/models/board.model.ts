import { User } from './user.model';

export interface Board {
  id: string;
  title: string;
  backgroundColor: 'sky' | 'yellow' | 'green' | 'gray' | 'red' | 'violet';
  members: User[];
}
