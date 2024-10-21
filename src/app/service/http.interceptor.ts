import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  let auth = inject(AuthService)

  const clonedReq = req.clone({
    setHeaders: {
      "Content-Type": 'application/json; charset=utf-8',
      "Accept": 'application/json',
      "Authorization": `Bearer ${auth.get_token()}`
    }
  });

  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        auth.logout()
      }
      return throwError(error);
    })
  );
};