// import { HttpInterceptorFn } from '@angular/common/http';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environment/environment';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Add your authentication logic here
    const authToken = localStorage.getItem('access_token')


    // Clone the request and add the Authorization header
    const authReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    // Pass the cloned request with the updated header to the next handler
    return next.handle(authReq).pipe(

      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.log('auth interceptor in error.status === 401 log');
          localStorage.clear();
          localStorage.setItem('logout-event', 'logout' + Math.random());
          window.location.href = environment.HOME;
        }
        return throwError(() => error);
      })

    );
  }
}

