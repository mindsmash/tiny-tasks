import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import {
  AuthService,
} from './services';

@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  public userName: string;
  private tokenValid: boolean;
  private loginSubscription: Subscription;
  private logoutSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.logoutSubscription = this.authService.onUserLogout.subscribe(() => this.handleTokenState());
    this.loginSubscription = this.authService.onUserLogin.subscribe(() => this.handleTokenState());

    this.handleTokenState();
  }

  private handleTokenState() {
    this.tokenValid = this.authService.hasValidToken();
    let target: string = 'register';
    if (this.tokenValid) {
      target = 'tasks';
      this.userName = this.authService.getTokenValue('username');
    }

    this.router.navigate([target]);
  }
}
