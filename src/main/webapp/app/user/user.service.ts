import {Injectable} from "@angular/core";

@Injectable()
export class UserService {

  public isAuthenticated: boolean;

  constructor() {
    this.isAuthenticated = false;
  }

  user: {
    username: string
  };
}
