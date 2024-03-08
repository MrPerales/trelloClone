import { Component } from '@angular/core';
import { BackgroundComponent } from '../../components/background/background.component';
import { HeaderComponent } from '../../components/header/header.component';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    BackgroundComponent,
    HeaderComponent,
    RegisterFormComponent,
    FooterComponent,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {}
