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
import { BtnComponent } from '../../../shared/components/btn/btn.component';
import { Card } from '../../../../models/card.model';

// tipado para el dato que nos va a llegar
interface InputData {
  card: Card;
}
// tipado para la respuesta
interface OutputData {
  rta: boolean;
}

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [DialogModule, FontAwesomeModule, BtnComponent],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  card: Card;
  faClose = faClose;
  faCheckToSlot = faCheckToSlot;
  faBars = faBars;
  faUser = faUser;
  faTag = faTag;
  faCheckSquare = faCheckSquare;
  faClock = faClock;

  constructor(
    private dialogRef: DialogRef<OutputData>,
    // obtenemos los datos que nos mandaron
    @Inject(DIALOG_DATA) data: InputData
  ) {
    // guardamos la data para poder renderizar
    this.card = data.card;
  }
  closeModal() {
    this.dialogRef.close();
  }
  closeWithRta(rta: boolean) {
    this.dialogRef.close({
      rta,
    });
  }
}
