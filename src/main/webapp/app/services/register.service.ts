import { Inject, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';
import { BASE_URL } from '../app.tokens';


@Injectable()
export class RegisterService {
  constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl: string) {}

  sendUser(user:User) {
    let headers1 = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.baseUrl + '/user/register', JSON.stringify(user), {headers: headers1});
  }
}
