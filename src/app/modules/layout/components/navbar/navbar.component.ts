import { Component } from '@angular/core';
import { BtnComponent } from '../../../shared/components/btn/btn.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [BtnComponent, OverlayModule, FontAwesomeModule, RouterModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}
  // para abir overlay
  isOpen = false;
  // icons
  fabell = faBell;
  faInfoCircle = faInfoCircle;
  user: User | null = null;
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  ngOnInit() {
    this.authService.getProfile().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
