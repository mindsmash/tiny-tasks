import {Component, Inject, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {UserService} from "app/utils/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'tiny-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent implements OnInit {
  changePassword: FormGroup = new FormGroup({
    currentPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  });
  error: string;
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
    this.model.currentPassword = this.changePassword.value.currentPassword;
    this.model.newPassword = this.changePassword.value.newPassword;
    this.model.confirmPassword = this.changePassword.value.confirmPassword;

    if (this.changePassword.value.newPassword != this.changePassword.value.confirmPassword) {
      this.userService.notify("Passwords not matching");
      return;
    }

    this.userService.changePass(this.model).subscribe(res => {
        this.userService.notify("Successfully Updated your password");
      },
      error => {
        this.userService.notify(error.error.message);
      });
  }
}
