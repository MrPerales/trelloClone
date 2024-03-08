import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { BtnComponent } from '../../../shared/components/btn/btn.component';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, BtnComponent],
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
  constructor(private formBuiler: FormBuilder) {}
  form = this.formBuiler.nonNullable.group(
    {
      name: [],
      email: [],
      password: [],
      confirmPassword: [],
    },
    {
      // validators
    }
  );
  status: string = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  register() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email, name, password } = this.form.getRawValue();
      console.log(name, email, password);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
