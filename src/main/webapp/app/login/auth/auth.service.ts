import {Injectable} from "@angular/core";

@Injectable()
export class AuthService {

  constructor() {
  }

  public isLoggedIn(): boolean {
    const token = sessionStorage.getItem('token');
    return token != null;
  }

  user: {
    username: string
  };

  public logout() {
    sessionStorage.removeItem('token');
  }
}
