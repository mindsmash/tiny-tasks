import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {LoginService} from "app/_shared/_services/login.service";
import {Token} from "app/_shared/_dto/token";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username: string;
  public password: string;
  public rememberMe: boolean;

  constructor(private router: Router,
              private snackBar: MatSnackBar,
              @Inject('LoginService') private loginService: LoginService) {
  }

  ngOnInit() {
  }

  login(): void {
    this.loginService.login(this.username, this.password).subscribe((result: Token) => {
      localStorage.setItem('token', result.token);
      console.log(result);
      this.router.navigate(['']);
    });

    console.log(this.rememberMe);
  }

}
