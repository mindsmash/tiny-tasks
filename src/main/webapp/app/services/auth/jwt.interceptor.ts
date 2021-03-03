import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    public authService: AuthService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
  ) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    const reqNoToken = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
      }
    });

    if (!token) {
      return next.handle(reqNoToken);
    }

    const req = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // do stuff with response.. ?!
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          console.log(err);
          if (err.status !== 200) {
            // token expired or other error => logout!
            this.authService.onUserLogout.next();
          }
        }
      })
    );
  }
}
