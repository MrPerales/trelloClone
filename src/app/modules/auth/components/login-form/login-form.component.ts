import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash, faPen } from '@fortawesome/free-solid-svg-icons';
import { BtnComponent } from '../../../shared/components/btn/btn.component';
import { AuthService } from '../../../../services/auth.service';
import { RequestStatus } from '../../../../models/request-status.model';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, BtnComponent],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authServie: AuthService
  ) {}

  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  faPen = faPen;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  status: RequestStatus = 'init';

  doLogin() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email, password } = this.form.getRawValue();

      this.authServie.login(email, password).subscribe({
        // nos suscribimos a la respuesta y  nos mande a otra ruta
        next: () => {
          this.status = 'succes';
          this.router.navigate(['/app']);
        },
        error: () => {
          this.status = 'failed';
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
