import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { BtnComponent } from '../../../shared/components/btn/btn.component';
import { CustomValidators } from '../../../../utils/validators';
import { AuthService } from '../../../../services/auth.service';
import { RequestStatus } from '../../../../models/request-status.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, BtnComponent],
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
  constructor(
    private formBuiler: FormBuilder,
    private router: Router,
    private authServices: AuthService
  ) {}
  form = this.formBuiler.nonNullable.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [
        CustomValidators.MatchValidator('password', 'confirmPassword'),
      ],
    }
  );
  status: RequestStatus = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  message = '';

  register() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email, name, password } = this.form.getRawValue();
      this.authServices.register(email, password, name).subscribe({
        next: () => {
          this.status = 'succes';
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.log(error);
          if (error.error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            this.message = 'This user already exists';
            this.status = 'failed';
          }
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
