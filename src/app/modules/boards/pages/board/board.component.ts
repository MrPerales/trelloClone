import { Component } from '@angular/core';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { NavbarComponent } from '../../../layout/components/navbar/navbar.component';
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
import { ActivatedRoute } from '@angular/router';
import { Board } from '../../../../models/board.model';
import { BoardsService } from '../../../../services/boards.service';
import { Card, UpdateCardDto } from '../../../../models/card.model';
import { CardsService } from '../../../../services/cards.service';
import { List } from '../../../../models/list.model';
import { ListsService } from '../../../../services/lists.service';
import { BACKGROUNDCOLORS } from '../../../../models/colors.model';
import { CommonModule } from '@angular/common';
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
    CommonModule,
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
  constructor(
    private dialog: Dialog,
    private route: ActivatedRoute,
    private boardService: BoardsService,
    private cardsService: CardsService,
    private listsService: ListsService
  ) {}
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
  newListCtrl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });
  // cdk accordion
  showListForm = false;
  boards: Board | null = null;
  colorBackground = BACKGROUNDCOLORS;
  // columns: column[] = [
  //   {
  //     id: '1',
  //     title: 'toDo',
  //     todos: [
  //       {
  //         id: '1',
  //         title: 'buy a game',
  //       },
  //       {
  //         id: '2',
  //         title: 'wathc a movie',
  //       },
  //       {
  //         id: '3',
  //         title: 'Make dishes',
  //       },
  //     ],
  //   },
  //   {
  //     id: '2',
  //     title: 'doing',
  //     todos: [
  //       {
  //         id: '4',
  //         title: 'play games',
  //       },
  //       {
  //         id: '6',
  //         title: 'coding',
  //       },
  //     ],
  //   },
  //   {
  //     id: '3',
  //     title: 'done',
  //     todos: [
  //       {
  //         id: '5',
  //         title: 'make homework',
  //       },
  //     ],
  //   },
  // ];

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      // obtenemos el id
      const id = params.get('id');
      if (id) {
        this.getBoard(id);
      }
    });
  }
  ngOnDestroy() {
    // para que al salir de board cambie el color a sky y no mantenga el color del board
    this.boardService.setBackgroundColor('sky');
  }
  private getBoard(id: Board['id']) {
    this.boardService.getBoards(id).subscribe({
      next: (board) => {
        this.boards = board;
        // console.log(board);
        // seteamos el stado con el color que queremos y
        //  despues poder usarlo en el navbar
        this.boardService.setBackgroundColor(board.backgroundColor);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  drop(event: CdkDragDrop<Card[]>) {
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
    // position cards
    const position = this.boardService.getPosition(
      event.container.data,
      event.currentIndex
    );
    // lista[position]
    const card = event.container.data[event.currentIndex];
    // para obtener el id de la lista se agrega en el template en la seccion de cdkDropList
    // como [id]=list.id
    const listId = event.container.id;
    // console.log(listId);
    this.updateCard(card, position, listId);
  }
  dropHorizontal(event: CdkDragDrop<Card[]>) {
    // moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
  }
  addNewList() {
    if (this.newListCtrl.valid && this.boards) {
      const title = this.newListCtrl.value;
      // console.log(title);
      this.listsService
        .create({
          title: title,
          boardId: this.boards.id,
          position: this.boardService.getPositionNewItems(this.boards.lists),
        })
        .subscribe({
          next: (list) => {
            this.boards?.lists.push({
              ...list,
              // se le agrega cards para solucionar el bug del dragAndDrop entre listas
              cards: [],
            });
            // clear input
            this.newListCtrl.setValue('');
            this.showListForm = false;
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }
  addNewCard(list: List) {
    if (this.newCardCtrl.valid && this.boards) {
      const title = this.newCardCtrl.value;
      // console.log(value);
      this.cardsService
        .create({
          title: title,
          listId: list.id,
          boardId: this.boards.id,
          position: this.boardService.getPositionNewItems(list.cards),
        })
        .subscribe({
          next: (card) => {
            list.cards.push(card);
            // clear input
            this.newCardCtrl.setValue('');
            list.showFormCard = false;
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }
  deleteColumn(id: string) {
    console.log(id);

    // const columIndex = this.columns.findIndex(
    //   (column) => column.id === id.toString()
    // );
    // const newColums = [...this.columns];
    // newColums.splice(columIndex, 1);
    // this.columns = newColums;
  }
  openDialog(card: Card) {
    const dialogRef = this.dialog.open(ModalComponent, {
      minWidth: '300px',
      maxWidth: '50%',
      autoFocus: false,
      // mandamos los datos al modal
      data: {
        card: card,
      },
    });
    // para obtener una respuesta desde el modal
    dialogRef.closed.subscribe((output) => console.log(output));
  }
  // update card position
  updateCard(card: Card, position: number, listId: UpdateCardDto['listId']) {
    this.cardsService.update(card.id, { position, listId }).subscribe({
      next: (cardUodate) => {
        console.log(cardUodate);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  openFormCard(list: List) {
    // verificamos si tenemos listas
    if (this.boards?.lists) {
      // modificamos el mismo estado ya que no estamos usando signals
      this.boards.lists = this.boards.lists.map((itemList) => {
        // modificando un solo elemento
        if (itemList.id === list.id) {
          return {
            ...itemList,
            showFormCard: true,
          };
        }
        return {
          ...itemList,
          showFormCard: false,
        };
      });
    }
  }
  closeFormCard(list: List) {
    list.showFormCard = false;
  }
  closeFormList() {
    this.showListForm = false;
  }
  get colors() {
    if (this.boards) {
      const color = this.colorBackground[this.boards.backgroundColor];
      return color ? color : {};
    }
    return {};
  }
}
