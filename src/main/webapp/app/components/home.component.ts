import {Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss'],

  })
export class HomeComponent{
  constructor(private router: Router) { }


  registerClick = function () {
    this.router.navigate('/register');
  }

}