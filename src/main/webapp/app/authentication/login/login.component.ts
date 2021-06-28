import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { User } from '../user';

@Component({
  selector: 'tiny-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginResult: any;
  loginForm: any;
  resetForm: any;
  updatePasswordModal: any;
  user = new User();
  resetUser: any;
  passwordsmatch = false;
  encodpassword: any;

  constructor(private authenticationService: AuthenticationService, private router: Router, private readonly fb: FormBuilder) {
    this.loginForm = this.createloginForm();
    this.resetForm = this.createresetForm();

  }

  ngOnInit(): void {
  }


  createloginForm(): FormGroup {
    return this.fb.group(
      {
        login: [
          '',
          Validators.compose([Validators.email, Validators.required]),
        ],
        password: ['', Validators.required]
      },

    );
  }

  createresetForm(): FormGroup {
    return this.fb.group(
      {
        login: [
          '',
          Validators.compose([Validators.email, Validators.required]),
        ],
        newpassword: ['', Validators.required],
        oldpassword: ['', Validators.required]
      },

    );
  }





  login() {
    this.user.login = this.loginForm.get('login').value;
    this.user.password = this.loginForm.get('password').value;
    this.authenticationService.login(this.user).subscribe(
      data => {
        console.log("token ", data)
        this.loginResult = data;
      },
      (err) => { console.log(err) },
      () => {

        localStorage.setItem('currentUser', this.user.login);

        this.authenticationService.getUserByLogin(this.loginForm.get('login').value).subscribe(data=>{console.log("user",data)
          let us:any=data
          localStorage.setItem('userid', us.id.toString());

        })




        if (this.loginResult.status == 200) {
          this.router.navigate(['dashboard']);
        }
      }
    )
  }


  goToRegister() {
    this.router.navigate(['register']);
  }

  resetPasswordModal() {
    this.updatePasswordModal = true;
  }

  resetPassword() {


      this.authenticationService.resetPassword(this.resetForm.get('login').value, this.resetForm.get('newpassword').value,  this.resetForm.get('newpassword').value).subscribe(
        data => console.log(data),
        (err) => console.log(err),
        () => {
          this.updatePasswordModal = false }
      )

    }

    cancel(){
      this.updatePasswordModal = false;
    }


}
