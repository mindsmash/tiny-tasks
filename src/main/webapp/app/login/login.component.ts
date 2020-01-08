import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "app/utils/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'tiny-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  showSpinner = false;
  error: any;
  model: any = {};

  constructor(
    @Inject('UserService') private userService: UserService,
    private route: Router
  ) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.model.username = this.loginForm.value.username;
    this.model.password = this.loginForm.value.password;
    this.userService.login(this.model).subscribe(res => {
      this.route.navigate(["/home"]);
    });
  }
}
