import { Component, Inject } from '@angular/core';
import { DIALOG_DATA, DialogModule, DialogRef } from '@angular/cdk/dialog';
import {
  faBars,
  faCheckSquare,
  faCheckToSlot,
  faClock,
  faClose,
  faTag,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BtnComponent } from '../btn/btn.component';
import { toDO } from '../../models/toDo.Model';

// tipado para el dato que nos va a llegar
interface InputData {
  todo: toDO;
}

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [DialogModule, FontAwesomeModule, BtnComponent],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  todo: toDO;
  faClose = faClose;
  faCheckToSlot = faCheckToSlot;
  faBars = faBars;
  faUser = faUser;
  faTag = faTag;
  faCheckSquare = faCheckSquare;
  faClock = faClock;

  constructor(
    private dialogRef: DialogRef<InputData>,
    // obtenemos los datos que nos mandaron
    @Inject(DIALOG_DATA) data: InputData
  ) {
    // guardamos la data para poder renderizar
    this.todo = data.todo;
  }
  closeModal() {
    this.dialogRef.close();
  }
}
