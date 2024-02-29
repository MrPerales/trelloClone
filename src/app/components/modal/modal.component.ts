import { Component } from '@angular/core';
import { DialogModule, DialogRef } from '@angular/cdk/dialog';
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
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [DialogModule, FontAwesomeModule, BtnComponent],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  constructor(private dialogRef: DialogRef) {}

  faClose = faClose;
  faCheckToSlot = faCheckToSlot;
  faBars = faBars;
  faUser = faUser;
  faTag = faTag;
  faCheckSquare = faCheckSquare;
  faClock = faClock;

  closeModal() {
    this.dialogRef.close();
  }
}
