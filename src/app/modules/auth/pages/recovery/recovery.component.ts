import { Component } from '@angular/core';
import { BackgroundComponent } from '../../components/background/background.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RecoveryFormComponent } from '../../components/recovery-form/recovery-form.component';

@Component({
  selector: 'app-recovery',
  standalone: true,
  imports: [
    BackgroundComponent,
    HeaderComponent,
    RecoveryFormComponent,
    FooterComponent,
  ],
  templateUrl: './recovery.component.html',
})
export class RecoveryComponent {}
