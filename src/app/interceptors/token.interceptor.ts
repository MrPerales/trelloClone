import {
  HttpContext,
  HttpContextToken,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { switchMap } from 'rxjs';

// creamos contexto para el interceptor
// Declaramos una constante como nuestro Token, con una callback que nos devuelve false por defecto.
const CHECK_TOKEN = new HttpContextToken<boolean>(() => false);
// function para aplicar (crear) el contexto
// Declaramos la función checkToken que nos devuelve un HttpContext
// con el Token creado anteriormente pero sobreescribiendo el valor por defecto para devolver true.
//  Esto nos permitirá llamar a esta función, alterar el contexto de la request y discriminar en el interceptor.
export function checkToken() {
  return new HttpContext().set(CHECK_TOKEN, true);
}

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  // si cumple con el contexto
  if (req.context.get(CHECK_TOKEN)) {
    const tokenService = inject(TokenService);
    const isValidToken = tokenService.isvalidToken();
    // if() {valida si el access token es valido y agrega los headers requeridos } ,
    // else {  si ya caduco vuelve a pedir un access token con el refresh token}
    if (isValidToken) {
      // addToken
      return addToken(req, next);
    } else {
      return updateAccessTokenAndRefreshToken(req, next);
    }
  }

  return next(req);
};

const addToken = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const tokenServices = inject(TokenService);
  const accessToken = tokenServices.getToken();
  if (accessToken) {
    // clonamos los headers y agregamos ubo
    const authRequest = req.clone({
      headers: req.headers.set('authorization', `bearer ${accessToken}`),
    });
    return next(authRequest);
  }
  return next(req);
};

function updateAccessTokenAndRefreshToken(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const authService = inject(AuthService);
  const tokenService = inject(TokenService);
  const refreshToken = tokenService.getRefreshToken();
  const isvalidRefreshToken = tokenService.isvalidRefreshToken();
  // validamos los tokens
  if (refreshToken && isvalidRefreshToken) {
    return authService
      .refreshToken(refreshToken) //generando nuevos tokens con el refresh anterior
      .pipe(
        //esperamos los nuevos tokens y volvemos a llamar
        //  a addToken para que tengamos acceso completo otra vez
        switchMap(() => addToken(req, next))
      );
  }
  return next(req);
}
