import {Inject, Injectable} from '@angular/core';
import {UserService} from "app/utils/user.service";
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BASE_URL} from "app/app.tokens";
import {Router} from "@angular/router";
import {catchError, mapTo, tap} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class DefaultUserServiceService implements UserService {

  private readonly headersLogin: HttpHeaders;
  private readonly headers: HttpHeaders;
  private readonly headersBearer: HttpHeaders;

  constructor(private http: HttpClient,
              @Inject(BASE_URL) private baseUrl: string,
              private _snackBar: MatSnackBar,
              private route: Router) {
    this.headersLogin = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': 'Basic ' + btoa('coyo_client:Data2020.')
    });
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
    this.headersBearer = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + this.getToken()
    });
  }

  login(params: any): Observable<any> {
    const param = new URLSearchParams();
    param.append('username', params.username);
    param.append('password', params.password);
    param.append('grant_type', 'password');
    console.log(param.toString());
    return this.http.post<any>(this.baseUrl + '/oauth/token', param.toString(), {headers: this.headersLogin}).pipe(
      tap(tkn => this.doLoginUser(params.username, tkn.access_token)),
      mapTo(true),
      catchError(error => {
        this.notify(error.error.message);
        return of(false);
      })
    );
  }

  register(params: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/users', JSON.stringify(params), {headers: this.headers});
  }

  doLoginUser(username: string, token: string): void {
    localStorage.setItem('tiny.username', username);
    localStorage.setItem('tiny.access_token', token);
    localStorage.setItem('tiny.isLoggedIn', "true");
  }

  doLogoutUser(): void {
    localStorage.clear();
    this.route.navigate(["/login"]);
  }

  getToken(): string {
    return localStorage.getItem('tiny.access_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  changePass(params: any): Observable<any> {
    console.log(params);
    return this.http.post<any>(this.baseUrl + '/users/change-password', JSON.stringify(params), {headers: this.headersBearer});
  }

  notify(msg: string): void {
    this._snackBar.open(msg, 'Notification', {
      duration: 5000,
      panelClass: 'snackbar-success',
      horizontalPosition: 'right'
    });
  }
}
