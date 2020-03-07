import {Component} from '@angular/core';
import { User } from '../models/user'
import {RegisterService} from '../services/register.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html'
})
export class Register {

  registerService: RegisterService;
  constructor (registerService: RegisterService) {
    this.registerService = registerService
  }


  onSubmit(registerForm) {
    console.log("submit test"); 
    console.log(registerForm.value); 

    this.registerService.sendUser(registerForm.value)
    .subscribe(
      data => {
        console.log('done')
        // this.router.navigate(['/']);
      },
      error => console.log(error)
    );
  }
}
