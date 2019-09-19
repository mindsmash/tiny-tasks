import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {Observable, timer} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import {Task} from './task';
import {TaskService} from './task.service';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "app/user/user.service";

@Component({
  selector: 'task-component',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent implements OnInit {

  now$: Observable<Date>;

  tasks$: Observable<Task[]>;

  constructor(@Inject('TaskService') private taskService: TaskService,
              @Inject('UserService') private userService: UserService,
              route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.now$ = timer((60 - new Date().getSeconds()) * 1000, 60 * 1000)
    .pipe(startWith(0))
    .pipe(map(() => new Date()));
    this.tasks$ = this.taskService.getAllByUsername(this.userService.user.username);
  }

  created(): void {
    this.tasks$ = this.taskService.getAllByUsername(this.userService.user.username);
  }

  deleted(): void {
    this.tasks$ = this.taskService.getAllByUsername(this.userService.user.username);
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
