import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BASE_URL } from '../app.tokens';
import { User } from './user';

const LOCAL_STORAGE_KEY = 'user-auth';

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
    const userAuth = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (userAuth) {
      this.userAuthSubject.next(JSON.parse(userAuth));
    }
    this.userAuth$.subscribe((user) => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
    });
  }

  login(
    email: string,
    password: string,
    successCallback?: () => void,
    errorCallback?: (e: any) => void
  ) {
    return this.http
      .post<User>(this.baseUrl + '/users/login', {
        email,
        password,
      })
      .subscribe({
        next: (userRes) => {
          this.userAuthSubject.next(userRes);
          successCallback && successCallback();
        },
        error: (e) => errorCallback && errorCallback(e),
      });
  }

  register(
    email: string,
    password: string,
    successCallback?: () => void,
    errorCallback?: (e: any) => void
  ) {
    return this.http
      .post<User>(this.baseUrl + '/users/register', {
        email,
        password,
      })
      .subscribe({
        next: (userRes) => {
          this.userAuthSubject.next(userRes);
          successCallback && successCallback();
        },
        error: (e) => errorCallback && errorCallback(e),
      });
  }

  logout() {
    this.userAuthSubject.next(initialUser);
  }
}
