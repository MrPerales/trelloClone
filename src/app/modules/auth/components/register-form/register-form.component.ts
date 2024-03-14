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
  formUser = this.formBuiler.nonNullable.group({
    email: ['', [Validators.required]],
  });
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
  statusUser: RequestStatus = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  showRegister = false;
  message = '';

  register() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email, name, password } = this.form.getRawValue();
      // registramso y logeamos
      this.authServices.registerAndLogin(email, password, name).subscribe({
        next: () => {
          this.status = 'succes';
          // this.router.navigate(['/login']);
          // cambiamos la ruta ya que registramos y damos acceso a la app
          this.router.navigate(['app/boards']);
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
  validateUser() {
    if (this.formUser.valid) {
      this.statusUser = 'loading';
      const { email } = this.formUser.getRawValue();

      this.authServices.isAvailable(email).subscribe({
        next: (response) => {
          this.statusUser = 'succes';
          // isAvailable is Boolean
          // if email is available continue the register
          if (response.isAvailable) {
            this.showRegister = true;
            this.form.controls.email.setValue(email);
          } else {
            this.router.navigate(['/login'], {
              queryParams: {
                email,
              },
            });
          }
        },
        error: (error) => {
          this.statusUser = 'failed';
          console.log(error);
        },
      });
    }
  }
}
