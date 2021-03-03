import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class AuthService {

  private jwtHelper: JwtHelperService;
  private tokenData: object;

  public onUserLogin = new Subject<any>();
  public onUserLogout = new Subject<any>();

  constructor(

    private http: HttpClient,
    private storageService: StorageService,
  ) {
    this.jwtHelper = new JwtHelperService();
  }

  login({username, userpw}, url: string): Observable<string> {
    return this.http.post<string>(url, {
      username,
      userpw,
    })
    .pipe(
      map((response: any) => {
        this.setToken(response['token']);
        this.onUserLogin.next();
        return of();
      }),
      catchError((err) => {
        console.error(err);
        return of(err);
      })
    );
  }

  logout() {
    this.storageService.remove('auth');
    this.tokenData = null;
    this.onUserLogout.next();
  }

  getToken(): string {
    return this.storageService.get('auth');
  }

  getTokenValue(key: string) {
    if (!this.tokenExists()) {
      return;
    }

    if (this.tokenData) {
      return this.tokenData[key];
    }

    const token = this.storageService.get('auth');
    this.tokenData = this.jwtHelper.decodeToken(token);
    return this.tokenData[key];
  }

  tokenExists(): boolean {
    return !!this.storageService.get('auth');
  }

  isTokenExpired(): boolean {
    if (!this.tokenExists()) {
      return;
    }

    return this.jwtHelper.isTokenExpired(this.storageService.get('auth'));
  }

  hasValidToken() {
    return this.tokenExists() && !this.isTokenExpired();
  }

  setToken(token: string) {
    this.storageService.save('auth', token);
    this.tokenData = this.jwtHelper.decodeToken(token);
    console.info(this.tokenData)
  }
}
