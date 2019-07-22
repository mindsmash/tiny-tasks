import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BASE_URL } from '../app.tokens';
import { User } from './user';
import { UserService } from './user.service';

@Injectable()
export class DefaultUserService implements UserService {

  constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl: string) {
  }

  create(name: string, email: string): Observable<User> {
    return this.http.post<User>(this.baseUrl + '/users', {name, email} as User);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/users/' + id);
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/users');
  }
}
