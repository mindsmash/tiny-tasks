import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BASE_URL } from 'app/app.tokens';
import { User } from 'app/users/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl: string) {
  }

  get(email: string): Observable<User> {
    return this.http.get<User>(this.baseUrl + '/users/email', {params: {email: email} });
  }
}
