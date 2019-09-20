import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "app/login/auth/auth.service";

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  @Output() eventEmitter = new EventEmitter();

  constructor(@Inject('AuthService') private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private httpClient: HttpClient) {
  }

  public ngOnInit(): void {
    sessionStorage.setItem('token', '');
    this.authService.user = {username: ''};
  }

  public submit() {
    if (this.form.valid) {
      this.login();
    }
  }

  public login() {
    const url = 'http://localhost:8080/login';
    this.httpClient.post<Observable<boolean>>(url, this.form.value).subscribe(loginSuccess => {
      if (loginSuccess) {
        sessionStorage.setItem('token', this.base64EncodeUsernameAndPassword());
        this.authService.user.username = this.form.get('username').value;
        this.router.navigate(['/tasks']);
      } else {
        alert('Login failed.');
      }
    });
  }

  private base64EncodeUsernameAndPassword() {
    return btoa(this.form.get('username').value + ':' + this.form.get('password').value);
  }
}
