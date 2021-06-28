import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { BASE_URL } from '../app.tokens';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})


export class AuthenticationService {
  private headers = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private jwtToken = null;
  private username: string = '';


  constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl: string) { }


  login(user) {
    return this.http.post(this.baseUrl + '/login', user, { observe: "response" })
  }

  register(user) {
    return this.http.post<User>(this.baseUrl + '/users/register', user);
  }

  resetPassword(login,oldpassword, newpassword) {
    return this.http.put<User>(this.baseUrl + '/users/resetpassword?login=' + login + '&oldpassword=' + oldpassword+ '&newpassword=' + newpassword, { });
  }

  getUserById(id) {
    return this.http.get(this.baseUrl + '/users/userbyid/' + id);
  }

  getUserByLogin(login) {
    return this.http.get(this.baseUrl + '/users/userbylogin/' + login);
  }

  getAllUsers() {
    return this.http.get(this.baseUrl + '/users/allusers');
  }


  saveToken(jwt: string) {
    this.jwtToken = jwt;
    localStorage.setItem('token', jwt);
    let jwtHelper = new JwtHelperService();
    this.username = jwtHelper.decodeToken(this.jwtToken).sub;
  }

  loadToken() {
    this.jwtToken = localStorage.getItem('token');
  }


  logout() {
    this.jwtToken = null;
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');

  }

}
