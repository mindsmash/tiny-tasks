import {Component} from '@angular/core';
import {AuthService} from "app/login/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(authService: AuthService, router: Router) {
    if (authService.isLoggedIn()) {
      router.navigate(['/tasks']);
    }
    router.navigate(['/login']);
  }

}
