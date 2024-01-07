// import { CanActivateFn } from '@angular/router';

// export const checkAuthGuard: CanActivateFn = (route, state) => {
//   return true;
// };

// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };


// auth.guard.ts

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CheckAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // console.log('isLogged ', this.authService.isLoggedIn());
    
    if (!this.authService.isLoggedIn()) {
      // Token is valid, allow access to the route
      return true;
    } else {
        return this.router.createUrlTree([`${environment.HOME}/film/list`]);
      // Token is not valid, redirect to the login page
    }
  }
}
