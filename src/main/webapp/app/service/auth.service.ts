import {Injectable} from '@angular/core';

//import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from "../../environments/environment";

import 'rxjs/Rx';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  userData: any;

  constructor(
    private router: Router,
    private httpDefaultClient: HttpClient) {
  }

  /*
   *  getLocalStorageUser function is used to get local user profile data.
   */
  getLocalStorageUser() {
    this.userData = JSON.parse(sessionStorage.getItem('userProfile'));
    if (this.userData) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * authenticate user
   * @param username
   * @param password
   */
  loginUser(username: string, password: string): Observable<HttpResponse<any>> {
    return this
      .httpDefaultClient
      .post(environment.api_root_url + environment.login_endpoint,
        {username: username, password: password}, {observe: 'response'})
      .map((r: HttpResponse<any>) => {
        return r;
      });
  }

  /*
   * resetPassword is used to reset your password
   */
  resetPassword(value) {
  }


}
