import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

  login(email: string, password: string): Observable<User> {
    return this.callAuthEndpoint(email, password, 'login');
  }

  register(email: string, password: string): Observable<User> {
    return this.callAuthEndpoint(email, password, 'register');
  }

  private callAuthEndpoint(
    email: string,
    password: string,
    action: 'login' | 'register'
  ): Observable<User> {
    const endpoint = action === 'login' ? '/users/login' : '/users/register';
    const response$ = this.http.post<User>(this.baseUrl + endpoint, {
      email,
      password,
    });
    response$.subscribe((userRes) => {
      this.userAuthSubject.next(userRes);
    });
    return response$;
  }

  logout() {
    this.userAuthSubject.next(initialUser);
  }
}
