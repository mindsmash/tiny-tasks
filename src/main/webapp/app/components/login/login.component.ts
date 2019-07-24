import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Task} from "app/tasks/task";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "app/tasks/task.service";
import {AuthService} from "app/service/auth.service";
import {ToastrService} from "ngx-toastr";
import {AppGlobalValuesService} from "app/service/app-global-values.service";
import {Router} from "@angular/router";

@Component({
  selector: 'tiny-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  now$: Observable<Date>;

  tasks$: Observable<Task[]>;

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(@Inject('TaskService') private taskService: TaskService,
              private authService: AuthService,
              private toastr: ToastrService,
              public globalAppValuesService: AppGlobalValuesService,
              private router: Router) {
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    this.authService.loginUser(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(data => {
          if (data.status === 200) {
            this.globalAppValuesService.setLocalUserProfile(data.body);
            this.toastr.success('Welcome, ' + this.globalAppValuesService.getUserProfileObject().firstName);
            this.router.navigateByUrl('/home');
          } else {
            this.toastr.error(data.body.message);
          }
        },
        error => {
          this.toastr.error(error.error.message || this.globalAppValuesService.getGeneralErrorString());
        });
  }

}
