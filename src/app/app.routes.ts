import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { ScrollComponent } from './pages/scroll/scroll.component';
import { TablesComponent } from './pages/tables/tables.component';
import { ForgotPasswordComponent } from './modules/auth/pages/forgot-password/forgot-password.component';
import { RegisterComponent } from './modules/auth/pages/register/register.component';
import { RecoveryComponent } from './modules/auth/pages/recovery/recovery.component';
import { LayoutComponent } from '../app/modules/layout/components/layout/layout.component';
import { BoardsComponent } from '../app/modules/boards/pages/boards/boards.component';
import { ProfileComponent } from './modules/profile/pages/profile/profile.component';
import { UsersTableComponent } from '../app/modules/users/pages/users-table/users-table.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'recovery',
    component: RecoveryComponent,
  },
  // *************Rutes /App **************************
  {
    path: 'app',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'boards',
        pathMatch: 'full',
      },
      {
        path: 'boards',
        component: BoardsComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'users',
        component: UsersTableComponent,
      },
    ],
  },
  {
    path: 'scroll',
    component: ScrollComponent,
  },
  {
    path: 'tables',
    component: TablesComponent,
  },
];
