import { Injectable } from '@angular/core';
import {AppGlobalValuesService} from "app/service/app-global-values.service";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {JwtService} from "app/service/jwt.service";

@Injectable({
  providedIn: 'root'
})
export class HttpTokenInterceptorService implements HttpInterceptor {

  constructor(private jwtService: JwtService,
              private globalService: AppGlobalValuesService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const token = this.globalService.getJWTString();

    if (token !== null) {
      console.log('setting authorization');
      headersConfig['Authorization'] = `Bearer ${token}`;
    }

    const request = req.clone({setHeaders: headersConfig});
    return next.handle(request);
  }
}
