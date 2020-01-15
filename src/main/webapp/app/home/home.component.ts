import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {Observable, timer} from "rxjs";
import {Task} from "app/tasks/task";
import {TaskService} from "app/tasks/task.service";
import {map, startWith} from "rxjs/operators";
import {Router} from "@angular/router";
import {UserService} from "app/utils/user.service";

@Component({
  selector: 'tiny-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  now$: Observable<Date>;

  tasks$: Observable<Task[]>;
  username: string;

  constructor(@Inject('TaskService') private taskService: TaskService,
              private route: Router,
              @Inject('UserService') private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.now$ = timer((60 - new Date().getSeconds()) * 1000, 60 * 1000)
      .pipe(startWith(0))
      .pipe(map(() => new Date()));
    this.tasks$ = this.taskService.getAll();
    this.username = localStorage.getItem("tiny.username");
  }

  created(): void {
    this.tasks$ = this.taskService.getAll();
  }

  deleted(): void {
    this.tasks$ = this.taskService.getAll();
  }

  logout() {
    this.userService.doLogoutUser();
  }

  changePass() {
    this.route.navigate(["/change-pass"])
  }
}
