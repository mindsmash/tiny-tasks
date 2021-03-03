import { Component, Inject, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BASE_URL } from 'app/app.tokens';
import { AuthService } from 'app/services';

export enum FormField {
  UserName = 'username',
  UserPassword = 'userpw',
}

export enum Source {
  Header = 'header',
  Register = 'register',
}

@Component({
  selector: 'tiny-task-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() source: string;

  public loginForm: FormGroup;
  public fieldNames = FormField;

  constructor(
    @Inject(BASE_URL) private baseUrl: string,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      [FormField.UserName]: new FormControl('', [Validators.required, Validators.maxLength(32)]),
      [FormField.UserPassword]: new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    if (!this.loginForm.valid) {
      return;
    }

    let url;
    switch (this.source) {
      case Source.Header:
        url = `${this.baseUrl}/users/login`;
        break;
      case Source.Register:
        url = `${this.baseUrl}/users`;
        break;
    }

    this.authService.login(this.loginForm.value, url).subscribe(() => {
      this.loginForm.reset();
      this.router.navigate(['tasks']);
    });
  }

  getErrorMessage(fieldName: string) {
    if (this.hasError(fieldName)) {
      return 'You must enter a value';
    }
  }

  hasError(fieldName: string): boolean {
    const field: AbstractControl = this.loginForm.get(fieldName);
    return field.invalid;
  }

}
