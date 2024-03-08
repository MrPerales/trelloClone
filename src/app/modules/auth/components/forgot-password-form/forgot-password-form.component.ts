import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BtnComponent } from '../../../shared/components/btn/btn.component';

@Component({
  selector: 'app-forgot-password-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BtnComponent],
  templateUrl: './forgot-password-form.component.html',
})
export class ForgotPasswordFormComponent {
  constructor(private formBuilder: FormBuilder) {}
  form = this.formBuilder.nonNullable.group({
    // nombre del campo : ['valor inicial', reglas de validacion]
    email: ['', [Validators.email, Validators.required]],
  });
  status: string = 'init';
  emailSent = false;
  sendLink() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email } = this.form.getRawValue();
    } else {
      this.form.markAllAsTouched();
    }
  }
}
