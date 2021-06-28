import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { CustomValidators } from '../customvalidators';
import { User } from '../user';


@Component({
  selector: 'tiny-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: any;
  user= new User();

  constructor(private authenticationService: AuthenticationService, private router: Router ,  private readonly fb: FormBuilder) {
    this.registerForm = this.createregisterForm();

   }



   createregisterForm(): FormGroup{
    return this.fb.group(
      {
          firstName: ['',
          Validators.compose([Validators.required,
          Validators.pattern('^[a-zA-Z ]*$')
          ]),],
          lastName: ['',
          Validators.compose([Validators.required,
          Validators.pattern('^[a-zA-Z ]*$')
          ]),],
        login: [
          '',
          Validators.compose([Validators.email, Validators.required]),
        ],
        password: [
          '',
          Validators.compose([
            // 1. Password Field is Required
            Validators.required,
            // 2. check whether the entered password has a number
            CustomValidators.patternValidator(/\d/, { hasNumber: true }),
            // 3. check whether the entered password has upper case letter
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true,
            }),
            // 4. check whether the entered password has a lower-case letter
            CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
            // 5. Has a minimum length of 8 characters
            Validators.minLength(8),
          ]),
        ],
        confirmPassword: ['', Validators.compose([Validators.required])],
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator,
      }
    );

   }

  ngOnInit(): void {
  }


  register(){
      this.user.firstName=this.registerForm.get('firstName').value;
      this.user.lastName=this.registerForm.get('lastName').value;
      this.user.login=this.registerForm.get('login').value;
      this.user.password=this.registerForm.get('password').value;




      this.authenticationService.register(this.user).subscribe(
          data=>console.log(data),
          (err)=>console.log(err),
          ()=>{
            this.router.navigate(['']);
          }


      )
  }

  Back(){
    this.router.navigate(['']);
  }
}
