import { CanActivateFn } from '@angular/router';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
export const authGuard: CanActivateFn = () => {
  // ahora la sesion va a durar lo del refresh token
  const isValidToken = inject(TokenService).isvalidRefreshToken();
  console.log('is valid Token from authGuard:', isValidToken);

  if (!isValidToken) {
    inject(Router).navigate(['/login']);
    return false;
  }
  return true;
};
