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
import { authGuard } from './guards/auth.guard';
import { redirectGuard } from './guards/redirect.guard';
import { BoardComponent } from './modules/boards/pages/board/board.component';

export const routes: Routes = [
  {
    path: '',
    // component: LoginComponent,
    canActivate: [redirectGuard],
    children: [
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
    ],
  },
  // *************Rutes /App **************************
  {
    path: 'app',
    // protect routes
    canActivate: [authGuard],
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'boards',
        pathMatch: 'full',
      },
      {
        path: 'boards',
        canActivate: [authGuard],
        component: BoardsComponent,
      },
      {
        path: 'boards/:id',
        canActivate: [authGuard],
        component: BoardComponent,
      },
      {
        path: 'profile',
        canActivate: [authGuard],
        component: ProfileComponent,
      },
      {
        path: 'users',
        canActivate: [authGuard],
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
