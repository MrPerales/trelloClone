import { Component } from '@angular/core';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { toDO } from '../../models/toDo.Model';
@Component({
  selector: 'app-board',
  standalone: true,
  imports: [DragDropModule, NavbarComponent],
  templateUrl: './board.component.html',
  styles: [
    `
      /* Animate items as they're being sorted. */
      .cdk-drop-list-dragging .cdk-drag {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }

      /* Animate an item that has been dropped. */
      .cdk-drag-animating {
        transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
      }
    `,
  ],
})
export class BoardComponent {
  todos: toDO[] = [
    {
      id: '1',
      title: 'buy a game',
    },
    {
      id: '2',
      title: 'wathc a movie',
    },
    {
      id: '3',
      title: 'Make dishes',
    },
  ];
  doing: toDO[] = [
    {
      id: '4',
      title: 'play games',
    },
    {
      id: '6',
      title: 'coding',
    },
  ];
  done: toDO[] = [
    {
      id: '5',
      title: 'make homework',
    },
  ];
  drop(event: CdkDragDrop<toDO[]>) {
    // validacion para ver si el moviemiento es en la misma columna y
    // hacemos reordenamiento
    if (event.previousContainer === event.container) {
      // paara mover un item del array
      // event.container.data, se obtiene por la propiedad [cdkDropListData]
      // del archivo HTML
      // (array , previusIndex , currentIndex)
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      //si es diferente container movermos entre contenedores
      // transferArrayItem(
      // datos del previus array
      // datos actuales ,
      // previousIndex,
      // currentIndex
      // )
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
