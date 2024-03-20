import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const redirectGuard: CanActivateFn = () => {
  // ahora la sesion va a durar lo del refresh token
  const isValidToken = inject(TokenService).isvalidRefreshToken();
  const router = inject(Router);
  if (isValidToken) {
    router.navigate(['/app']);
  }
  return true;
};
