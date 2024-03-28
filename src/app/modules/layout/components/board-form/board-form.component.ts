import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BtnComponent } from '../../../shared/components/btn/btn.component';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-board-form',
  standalone: true,
  imports: [ReactiveFormsModule, BtnComponent, FontAwesomeModule],
  templateUrl: './board-form.component.html',
})
export class BoardFormComponent {
  constructor(private formBuilder: FormBuilder) {}
  faCheck = faCheck;
  form = this.formBuilder.nonNullable.group({
    title: ['', [Validators.minLength(3), Validators.required]],
    backgroundColor: ['', [Validators.required]],
  });
  doSave() {
    if (this.form.valid) {
      const { backgroundColor, title } = this.form.getRawValue();
      console.log(title, backgroundColor);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
