import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    ) {
  }

  canActivate(): Observable<boolean> {
    return this.checkLogin();
  }

  private checkLogin(): Observable<boolean> {
    if (this.authService.hasValidToken()) {
      return of(true);
    }

    return new Observable<boolean>((observer) => {
      if (!this.authService.hasValidToken()) {
        this.authService.onUserLogout.next();
        return;
      }

      observer.next(true);
      observer.complete();
    });
  }
}
