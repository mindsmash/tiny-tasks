import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../app.tokens';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl: string) {
  }

  signIn(user: User): Observable<User> {
    console.log("user service ", user)
    return this.http.post<User>(this.baseUrl + '/user', user);
  }
}
