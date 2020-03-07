import {Inject, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { BASE_URL } from '../app.tokens';

@Injectable()
export class LoginService {
  token: string;

  constructor (private http: HttpClient, @Inject(BASE_URL) private baseUrl: string) {}

  sendCredential(model) {
    let headers1 = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.baseUrl + '/user/login', JSON.stringify(model), {headers: headers1});          
    // localStorage.setItem("currentUserName", model.username);
  }

  sendToken(token) {
    console.log('Bearer '+ token);
    let getHeaders = new HttpHeaders({'Authorization':'Bearer '+ token});
    return this.http.get(this.baseUrl + '/rest/user/users', {headers: getHeaders})
  }

  logout() {
    localStorage.setItem("token","");
    localStorage.setItem("currentUserName", '');
    alert("You just logged out.");
  }

  checkLogin() {
    if (localStorage.getItem("currentUserName")!=null && localStorage.getItem("currentUserName")!='' && localStorage.getItem("token")!=null && localStorage.getItem("token")!='') {
      console.log(localStorage.getItem("currentUserName"));
      console.log(localStorage.getItem("token"));
      return true;
    } else {
      return false;
    }
  }

}
