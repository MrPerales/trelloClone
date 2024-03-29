import { Component } from '@angular/core';
import { DataSourceUser } from './data-source';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../../services/users.service';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../models/user.model';
import { BtnComponent } from '../../../shared/components/btn/btn.component';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [CdkTableModule, CommonModule, BtnComponent],
  templateUrl: './users-table.component.html',
})
export class UsersTableComponent {
  dataSource = new DataSourceUser();
  columns: string[] = ['id', 'avatar', 'name', 'email'];
  user: User | null = null;
  constructor(
    private usersServices: UsersService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.getUsers();
    // obtenermos datos de forma reactiva :D
    this.authService.user$.subscribe((user) => (this.user = user));
  }
  getUsers() {
    this.usersServices.getUsers().subscribe((user) => {
      this.dataSource.init(user);
    });
  }
}
