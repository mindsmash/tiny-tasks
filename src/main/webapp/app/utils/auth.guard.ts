import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private static readonly STORAGE_KEY: string = 'tiny.isLoggedIn';

  constructor(private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if (localStorage.getItem(AuthGuard.STORAGE_KEY)) {
    //   return true;
    // }
    // this.router.navigate(['/login']);
    return true;
  }

}
