import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BtnComponent } from '../../../shared/components/btn/btn.component';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BoardsService } from '../../../../services/boards.service';
import { Colors } from '../../../../models/colors.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-form',
  standalone: true,
  imports: [ReactiveFormsModule, BtnComponent, FontAwesomeModule],
  templateUrl: './board-form.component.html',
})
export class BoardFormComponent {
  constructor(
    private formBuilder: FormBuilder,
    private boardsService: BoardsService,
    private router: Router
  ) {}
  faCheck = faCheck;
  form = this.formBuilder.nonNullable.group({
    title: ['', [Validators.minLength(3), Validators.required]],
    // se agrega el formControl para tipar el backgroundColor
    backgroundColor: new FormControl<Colors>('sky', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });
  doSave() {
    if (this.form.valid) {
      const { backgroundColor, title } = this.form.getRawValue();
      console.log(title, backgroundColor);
      this.boardsService.createNewBoard(title, backgroundColor).subscribe({
        next: (board) => {
          this.router.navigate(['/app/boards', board.id]);
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
