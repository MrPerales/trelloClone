import {
  HttpContext,
  HttpContextToken,
  HttpInterceptorFn,
} from '@angular/common/http';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';

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
  }

  return next(req);
};
