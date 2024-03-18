import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    // llamamos al observable y lo ejecutamos con subscribe
    // se ejecuta en este componente ya que es el compoenente pricipal de la app
    // tambien se puede ejecutar en el app.component.ts
    //
    this.authService.getProfile().subscribe();
  }
}
