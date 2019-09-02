import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user/user.service';
import { User } from '../user/user';
import { Router } from '@angular/router';

@Component({
  selector: 'tiny-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)

  });

  user: User = new User();
  constructor(
    @Inject('UserService') public userService: UserService,
    public route: Router
  ) { }

  ngOnInit() {
    console.log("init login")
  }

  onSubmit(): void {

    console.log("login form submit", this.loginForm.value.name);
    console.log("login form submit", this.loginForm.value.password);
    this.user.name = this.loginForm.value.name;
    this.user.password = this.loginForm.value.password;
    console.log(this.userService)
    this.userService.signIn(this.user).subscribe(res => {
      console.log(res);
    }
    );

  }

}
