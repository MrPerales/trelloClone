import { CanActivateFn } from '@angular/router';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
export const authGuard: CanActivateFn = () => {
  const token = inject(TokenService).getToken();
  if (!token) {
    inject(Router).navigate(['/login']);
    return false;
  }
  return true;
};
