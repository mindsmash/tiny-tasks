import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "app/tasks/task.service";
import {Location} from "@angular/common";
import {UserService} from "app/utils/user.service";

@Component({
  selector: 'tiny-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
  });
  showSpinner = false;
  error: any;
  private model: any = {};

  constructor(private _location: Location,
              @Inject('UserService') private userService: UserService) {
  }

  ngOnInit() {
  }

  backButton() {
    this._location.back();
  }

  onSubmit() {
    this.model.username = this.registerForm.value.username;
    this.model.phoneNumber = this.registerForm.value.phoneNumber;
    this.model.password = this.registerForm.value.password;

    if (this.registerForm.value.password != this.registerForm.value.confirmPassword) {
      this.userService.notify("Passwords not matching");
      return;
    }


    this.userService.register(this.model).subscribe(res => {
        this.userService.notify("Successfully Registered your account");
      },
      error => {
        this.userService.notify(error.error.message);
      });
  }

}
