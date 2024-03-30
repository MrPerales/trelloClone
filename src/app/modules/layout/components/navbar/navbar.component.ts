import { Component } from '@angular/core';
import { BtnComponent } from '../../../shared/components/btn/btn.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faAngleDown,
  faBell,
  faClose,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { User } from '../../../../models/user.model';
import { BoardFormComponent } from '../board-form/board-form.component';
import { BoardsService } from '../../../../services/boards.service';
import {
  Colors,
  NAVBARBACKGROUNDCOLORS,
} from '../../../../models/colors.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    BtnComponent,
    OverlayModule,
    FontAwesomeModule,
    RouterModule,
    CommonModule,
    BoardFormComponent,
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private boardService: BoardsService
  ) {
    // pasamos el valor que nos mandaron desde el bopard hasta el nav
    this.boardService.navBarBackgroundColor$.subscribe((color) => {
      this.navBarBackgroundColor = color;
    });
  }
  //navbar  Color
  // variable donde esta el estado del color
  navBarBackgroundColor: Colors = 'sky';
  // variable donde esta el arreglo de colores
  navBarColors = NAVBARBACKGROUNDCOLORS;
  // para abir overlay
  isOpen = false;
  isOpenOverlayCreateBoard = false;
  // icons
  fabell = faBell;
  faInfoCircle = faInfoCircle;
  faAngleDown = faAngleDown;
  faClose = faClose;
  user: User | null = null;

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    // ya que en el layout ejecutamos el getPrefile ya podemos
    // llamar al observable
    this.authService.user$.subscribe((user) => (this.user = user));
  }
  closeOverlay(event: boolean) {
    this.isOpenOverlayCreateBoard = event;
  }
  get colors() {
    const color = this.navBarColors[this.navBarBackgroundColor];
    return color ? color : {};
  }
}
