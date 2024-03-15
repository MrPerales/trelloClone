import { Component } from '@angular/core';
import { DataSourceUser } from './data-source';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../../services/users.service';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [CdkTableModule, CommonModule],
  templateUrl: './users-table.component.html',
})
export class UsersTableComponent {
  dataSource = new DataSourceUser();
  columns: string[] = ['id', 'avatar', 'name', 'email'];
  constructor(private usersServices: UsersService) {}
  ngOnInit() {
    this.usersServices.getUsers().subscribe((users) => {
      this.dataSource.init(users);
    });
  }
}
