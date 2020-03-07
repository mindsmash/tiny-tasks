import {Component} from '@angular/core';
import {Observable}  from 'rxjs';
import {LoginService} from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class Login {
  private currentUserName;

  constructor (private loginService: LoginService,
              private router: Router){
    this.currentUserName=localStorage.getItem("currentUserName");
  }

  onSubmit(form) {
    this.loginService.sendCredential(form.value).subscribe(
      data => {
                localStorage.setItem("token", JSON.parse(JSON.stringify(data))._body);
                this.loginService.sendToken(localStorage.getItem("token")).subscribe(
                  data => {
                            this.currentUserName=form.value.username;
                            localStorage.setItem("currentUserName", form.value.username);
                            form.value.username='';
                            form.value.password='';
                            this.router.navigate(['/']);
                          },
                  error => console.log(error)
                );
              },
      error => console.log(error)
    );
  }


}
