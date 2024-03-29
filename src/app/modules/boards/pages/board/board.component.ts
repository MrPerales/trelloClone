import { Component } from '@angular/core';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { NavbarComponent } from '../../../layout/components/navbar/navbar.component';
import { column, toDO } from '../../../../models/toDo.Model';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import {
  faPlus,
  faSquarePollHorizontal,
  faTrashCan,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BtnComponent } from '../../../shared/components/btn/btn.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';
import { ModalComponent } from '../../components/modal/modal.component';
@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    DragDropModule,
    NavbarComponent,
    CdkAccordionModule,
    FontAwesomeModule,
    BtnComponent,
    ReactiveFormsModule,
  ],
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
  constructor(private dialog: Dialog) {}
  // icons
  faSquarePollHorizontal = faSquarePollHorizontal;
  faPlus = faPlus;
  faX = faX;
  faTrashCan = faTrashCan;
  // forms
  newCardCtrl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });
  newColumnCtrl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });
  // cdk accordion
  addCard = false;
  checkColumn = false;
  columns: column[] = [
    {
      id: '1',
      title: 'toDo',
      todos: [
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
      ],
    },
    {
      id: '2',
      title: 'doing',
      todos: [
        {
          id: '4',
          title: 'play games',
        },
        {
          id: '6',
          title: 'coding',
        },
      ],
    },
    {
      id: '3',
      title: 'done',
      todos: [
        {
          id: '5',
          title: 'make homework',
        },
      ],
    },
  ];
  todos: toDO[] = [];
  doing: toDO[] = [];
  done: toDO[] = [];
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
  dropHorizontal(event: CdkDragDrop<column[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }
  addNewColumn() {
    if (this.newColumnCtrl.valid) {
      const id = Date.now();
      const idString = id.toString();
      // console.log(idString);
      const value = this.newColumnCtrl.value;
      const newColumn = {
        id: idString,
        title: value,
        todos: [],
      };
      this.columns.push(newColumn);
      // clear input
      this.newColumnCtrl.setValue('');
    }
  }
  addNewCard(index: number) {
    if (this.newCardCtrl.valid) {
      const value = this.newCardCtrl.value;
      // console.log(value);

      const id = Date.now();
      const idString = id.toString();
      // add
      const newTaskTitle = {
        id: idString,
        title: value,
      };
      this.columns[index].todos.push(newTaskTitle);

      // clear input
      this.newCardCtrl.setValue('');
    }
  }
  deleteColumn(id: string) {
    console.log(id);

    const columIndex = this.columns.findIndex(
      (column) => column.id === id.toString()
    );
    const newColums = [...this.columns];
    newColums.splice(columIndex, 1);
    this.columns = newColums;
  }
  openDialog(todo: toDO) {
    const dialogRef = this.dialog.open(ModalComponent, {
      minWidth: '300px',
      maxWidth: '50%',
      autoFocus: false,
      // mandamos los datos al modal
      data: {
        todo: todo,
      },
    });
    // para obtener una respuesta desde el modal
    dialogRef.closed.subscribe((output) => console.log(output));
  }
}
