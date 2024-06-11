import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'tiny-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  email: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.userAuth$.subscribe((user) => {
      this.email = user.email;
    });
  }

  logoutClick() {
    this.userService.logout();
  }
}
