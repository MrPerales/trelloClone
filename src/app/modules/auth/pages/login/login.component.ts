import { Component } from '@angular/core';
import { BtnComponent } from '../../../shared/components/btn/btn.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { BackgroundComponent } from '../../components/background/background.component';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    BackgroundComponent,
    LoginFormComponent,
    RouterModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {}
