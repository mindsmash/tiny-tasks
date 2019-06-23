import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';

import {BASE_URL} from 'app/app.tokens';
import {LoginService} from "app/_shared/_services/login.service";
import {Login} from "app/_shared/_entities/login";
import {Observable} from "rxjs";
import {Token} from "app/_shared/_dto/token";

@Injectable()
export class LoginServiceImpl implements LoginService {

  constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl: string) {
  }

  login(username: string, password: string): Observable<Token> {
    const login = new Login(username, password);
    return this.http.post<Token>(this.baseUrl + '/login', login);

  }
}
