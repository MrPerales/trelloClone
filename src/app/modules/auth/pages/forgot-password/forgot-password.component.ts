import { Component } from '@angular/core';
import { ForgotPasswordFormComponent } from '../../components/forgot-password-form/forgot-password-form.component';
import { BackgroundComponent } from '../../components/background/background.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ForgotPasswordFormComponent,
    BackgroundComponent,
    HeaderComponent,
    FooterComponent,
    RouterModule,
  ],
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {}
