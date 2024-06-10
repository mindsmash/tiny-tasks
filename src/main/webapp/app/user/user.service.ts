import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BASE_URL } from '../app.tokens';
import { User } from './user';

const initialUser: User = {
  id: 0,
  email: '',
  jwtToken: '',
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userAuthSubject = new BehaviorSubject<User>(initialUser);
  userAuth$ = this.userAuthSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(BASE_URL) private baseUrl: string
  ) {
    // TODO: use local storage
  }

  login(email: string, password: string, successCallback?: () => void) {
    this.http
      .post<User>(this.baseUrl + '/users/login', {
        email,
        password,
      })
      .subscribe({
        next: (userRes) => {
          this.userAuthSubject.next(userRes);
          successCallback && successCallback();
        },
        error: (e) => console.error('Wrong authentication: ', e),
      });
  }
}
