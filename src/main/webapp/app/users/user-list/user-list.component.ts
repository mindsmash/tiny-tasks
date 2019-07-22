import { Component, Inject, Input, OnInit } from '@angular/core';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'tiny-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @Input() users: User[];

  constructor(@Inject('UserService') private userService: UserService) { }

  ngOnInit() {
  }

}
