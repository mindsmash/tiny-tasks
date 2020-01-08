import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from "app/utils/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              @Inject('UserService') private userService: UserService) {
  }

  canActivate() {
    if (this.userService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
    return !this.userService.isLoggedIn();
  }

}
