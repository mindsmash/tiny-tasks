import { ChangeDetectionStrategy, Component, Inject, OnInit, inject } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Task } from './tasks/task';
import { TaskService } from './tasks/task.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './user/user';
import { UserService } from './user/user.service';

@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  isLogado: boolean = false;
  errorLogin: boolean = false;
  now$: Observable<Date>;

  tasks$: Observable<Task[]>;
  user: User = new User();
  constructor(
    @Inject('UserService') public userService: UserService,
    @Inject('TaskService') public taskService: TaskService
  ) { }

  ngOnInit(): void {
    console.log("init")
    this.now$ = timer((60 - new Date().getSeconds()) * 1000, 60 * 1000)
      .pipe(startWith(0))
      .pipe(map(() => new Date()));
    this.tasks$ = this.taskService.getAll();

  }

  loginForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)

  });


  onSubmit(): void {
    console.log("login form submit", this.loginForm.value.name);
    console.log("login form submit", this.loginForm.value.password);
    this.user.email = this.loginForm.value.name;
    this.user.password = this.loginForm.value.password;
    console.log(this.userService)
    this.userService.signIn(this.user).subscribe(res => {
      console.log(res)
      if (res != null) {
        this.user = res;
        this.taskService.user = this.user;
        this.tasks$ = this.taskService.getAll();
        this.isLogado = true;
        this.errorLogin = false;
      } else {
        this.isLogado = false;
        this.errorLogin = true;
      }
    }
    );

  }

  created(): void {
    this.tasks$ = this.taskService.getAll();
  }

  deleted(task: Task): void {
    this.taskService.delete(task.id)
  }
}
