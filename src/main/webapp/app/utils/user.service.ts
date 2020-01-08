import {Observable} from "rxjs";

export interface UserService {
  /**
   *Logs in a user
   *
   * @returns an `Observable`
   * @param params form parameters
   */
  login(params: any): Observable<any>;

  /**
   * register new User
   *
   * @returns an `Observable` holding the created user
   */
  register(params: any): Observable<any>;

  changePass(params: any): Observable<any>;

  doLoginUser(username: string, token: string): void;

  doLogoutUser(): void;

  getToken(): string;

  isLoggedIn(): boolean;

  notify(msg: string): void;
}
