import {Inject, Injectable} from '@angular/core';
import {CanActivate, CanLoad, Router} from '@angular/router';
import {UserService} from "app/utils/user.service";

@Injectable({
  providedIn: 'root'
})
export class RandomGuard implements CanActivate, CanLoad {

  constructor(private router: Router,
              @Inject('UserService') private userService: UserService) {
  }

  canActivate() {
    return this.canLoad();
  }

  canLoad() {
    console.log(this.userService.isLoggedIn());
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    return this.userService.isLoggedIn();
  }
}
