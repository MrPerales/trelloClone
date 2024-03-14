import { Component } from '@angular/core';
import { BackgroundComponent } from '../../components/background/background.component';
import { HeaderComponent } from '../../components/header/header.component';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    BackgroundComponent,
    HeaderComponent,
    RegisterFormComponent,
    FooterComponent,
    RouterModule,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {}
