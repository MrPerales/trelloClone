import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const redirectGuard: CanActivateFn = () => {
  const isValidToken = inject(TokenService).isvalidToken();
  const router = inject(Router);
  if (isValidToken) {
    router.navigate(['/app']);
  }
  return true;
};
